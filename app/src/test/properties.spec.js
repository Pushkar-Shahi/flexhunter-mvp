import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { initialJobsData } from '../data/mockData';

describe('FlexHunter Mathematical & State Invariants (fast-check)', () => {
  // Invariant 1: Timetable slot toggling is an involution (f(f(S)) === S)
  it('schedule slot toggling satisfies the involution property (double toggle = identity)', () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM'];

    const toggleSlot = (schedule, day, hour) => {
      const key = `${day}-${hour}`;
      const next = { ...schedule };
      if (next[key]?.blocked) {
        delete next[key];
      } else {
        next[key] = { blocked: true, label: '' };
      }
      return next;
    };

    fc.assert(
      fc.property(
        fc.constantFrom(...days),
        fc.constantFrom(...hours),
        fc.dictionary(
          fc.stringMatching(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)-(8 AM|9 AM|10 AM|11 AM|12 PM|1 PM|2 PM|3 PM|4 PM|5 PM|6 PM|7 PM)$/),
          fc.record({ blocked: fc.boolean(), label: fc.string() })
        ),
        (day, hour, initialSchedule) => {
          const once = toggleSlot(initialSchedule, day, hour);
          const twice = toggleSlot(once, day, hour);

          // The key must be toggled once
          const key = `${day}-${hour}`;
          const initialBlocked = !!initialSchedule[key]?.blocked;
          const onceBlocked = !!once[key]?.blocked;
          expect(onceBlocked).toBe(!initialBlocked);

          // Invariant: Two toggles must restore original state
          const twiceBlocked = !!twice[key]?.blocked;
          expect(twiceBlocked).toBe(initialBlocked);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Invariant 2: Weekly Hours Slider Boundary & Clamping Invariant
  it('hours slider values strictly respect the boundary contract [5, 30] and calculated free hours remain non-negative', () => {
    const clampHours = (val) => Math.min(30, Math.max(5, Number(val) || 5));
    const calculateFreeHours = (maxHours, classHours) => Math.max(0, 168 - (56 + classHours + maxHours)); // 168 total hrs/week, 56 sleep

    fc.assert(
      fc.property(
        fc.integer({ min: -100, max: 200 }),
        fc.integer({ min: 0, max: 50 }),
        (rawHours, classHours) => {
          const clamped = clampHours(rawHours);
          
          // Invariant: Clamped hours is strictly within [5, 30]
          expect(clamped).toBeGreaterThanOrEqual(5);
          expect(clamped).toBeLessThanOrEqual(30);

          // Invariant: Free hours is strictly non-negative
          const freeHours = calculateFreeHours(clamped, classHours);
          expect(freeHours).toBeGreaterThanOrEqual(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Invariant 3: Search Filter Soundness & Completeness
  it('search filter guarantees that all returned items contain the query in title or company', () => {
    const filterJobs = (jobs, query) => {
      if (!query || !query.trim()) return jobs;
      const q = query.toLowerCase().trim();
      return jobs.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          (j.skills && j.skills.some((s) => s.toLowerCase().includes(q)))
      );
    };

    // Substring of known jobs
    const knownWords = ['React', 'Designer', 'Figma', 'Marketing', 'Intern', 'Frontend', 'Growth'];

    fc.assert(
      fc.property(
        fc.constantFrom('', ...knownWords),
        (query) => {
          const filtered = filterJobs(initialJobsData, query);

          if (!query.trim()) {
            // Completeness: empty query must return all jobs
            expect(filtered.length).toBe(initialJobsData.length);
          } else {
            // Soundness: every filtered job must satisfy the predicate
            const q = query.toLowerCase();
            for (const job of filtered) {
              const matchesTitle = job.title.toLowerCase().includes(q);
              const matchesCompany = job.company.toLowerCase().includes(q);
              const matchesSkills = job.skills?.some((s) => s.toLowerCase().includes(q));
              expect(matchesTitle || matchesCompany || matchesSkills).toBe(true);
            }
          }
        }
      ),
      { numRuns: 50 }
    );
  });

  // Invariant 4: Kanban CRM Column Partition Invariant
  it('every application is partitioned into exactly one status column without leaks or double counting', () => {
    const columns = ['saved', 'applied', 'interview', 'offers', 'rejected'];

    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.uuid(),
            company: fc.string({ minLength: 1 }),
            title: fc.string({ minLength: 1 }),
            status: fc.constantFrom(...columns),
          }),
          { minLength: 0, maxLength: 30 }
        ),
        (apps) => {
          // Partition apps by status
          const columnBuckets = {};
          columns.forEach((c) => {
            columnBuckets[c] = apps.filter((a) => a.status === c);
          });

          // Invariant: sum of bucket lengths must equal total applications length
          const totalInBuckets = Object.values(columnBuckets).reduce(
            (acc, curr) => acc + curr.length,
            0
          );
          expect(totalInBuckets).toBe(apps.length);

          // Invariant: No application exists in more than one column
          const allFoundIds = Object.values(columnBuckets).flatMap((b) => b.map((a) => a.id));
          const uniqueIds = new Set(allFoundIds);
          expect(allFoundIds.length).toBe(uniqueIds.size);
        }
      ),
      { numRuns: 100 }
    );
  });
});
