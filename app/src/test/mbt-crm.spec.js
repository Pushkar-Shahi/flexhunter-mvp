import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';

/**
 * Model-Based Testing (MBT) for FlexHunter Kanban Application Tracker
 * 
 * Demonstrates the principles from "Automated Verification of State Correctness":
 * - Pure Abstract Model representing the idealized mathematical state.
 * - Formal Commands (State Transitions) with Preconditions (`check`).
 * - Post-execution Invariant Assertions proving the Real System state mirrors the Model.
 * - Automatic property exploration and shrinking over randomized transition sequences.
 */

// Pure Model representation
class KanbanModel {
  constructor() {
    this.apps = [];
  }

  addApp(app) {
    this.apps.push({ ...app });
  }

  moveNext(id) {
    const sequence = ['saved', 'applied', 'interview', 'offers'];
    const item = this.apps.find((a) => a.id === id);
    if (!item) return;
    const currentIndex = sequence.indexOf(item.status);
    if (currentIndex !== -1 && currentIndex < sequence.length - 1) {
      item.status = sequence[currentIndex + 1];
    }
  }

  removeApp(id) {
    this.apps = this.apps.filter((a) => a.id !== id);
  }

  getCountByStatus(status) {
    return this.apps.filter((a) => a.status === status).length;
  }
}

// Real System Under Test (simulating the state store & localStorage sync of FlexHunter)
class KanbanRealSystem {
  constructor() {
    this.state = [];
    this.storageKey = 'flexhunter_test_apps';
    localStorage.removeItem(this.storageKey);
  }

  getState() {
    return this.state;
  }

  add(app) {
    this.state = [app, ...this.state];
    this.persist();
  }

  moveNext(appId, currentStatus) {
    const sequence = ['saved', 'applied', 'interview', 'offers'];
    const currentIndex = sequence.indexOf(currentStatus);
    if (currentIndex !== -1 && currentIndex < sequence.length - 1) {
      const nextStatus = sequence[currentIndex + 1];
      this.state = this.state.map((a) => (a.id === appId ? { ...a, status: nextStatus } : a));
      this.persist();
    }
  }

  remove(appId) {
    this.state = this.state.filter((a) => a.id !== appId);
    this.persist();
  }

  persist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.state));
  }

  readPersisted() {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : [];
  }
}

// Commands
class AddApplicationCommand {
  constructor(app) {
    this.app = app;
  }

  check(model) {
    // Cannot add duplicate ID
    return !model.apps.some((a) => a.id === this.app.id);
  }

  run(model, real) {
    model.addApp(this.app);
    real.add(this.app);

    // Invariant 1: Total element count matches
    expect(real.getState().length).toBe(model.apps.length);

    // Invariant 2: Persistence synchronization
    expect(real.readPersisted().length).toBe(model.apps.length);
  }

  toString() {
    return `AddApplication(${this.app.id}, status=${this.app.status})`;
  }
}

class MoveNextCommand {
  constructor(appId) {
    this.appId = appId;
  }

  check(model) {
    const app = model.apps.find((a) => a.id === this.appId);
    if (!app) return false;
    return app.status !== 'offers' && app.status !== 'rejected';
  }

  run(model, real) {
    const beforeModel = model.apps.find((a) => a.id === this.appId);
    const prevStatus = beforeModel.status;

    model.moveNext(this.appId);
    real.moveNext(this.appId, prevStatus);

    const afterModel = model.apps.find((a) => a.id === this.appId);
    const afterReal = real.getState().find((a) => a.id === this.appId);

    // Invariant 3: Precise status transition correctness
    expect(afterReal.status).toBe(afterModel.status);

    // Invariant 4: Persistence matches in-memory mutated status
    const persisted = real.readPersisted().find((a) => a.id === this.appId);
    expect(persisted.status).toBe(afterModel.status);
  }

  toString() {
    return `MoveNext(${this.appId})`;
  }
}

class RemoveApplicationCommand {
  constructor(appId) {
    this.appId = appId;
  }

  check(model) {
    return model.apps.some((a) => a.id === this.appId);
  }

  run(model, real) {
    model.removeApp(this.appId);
    real.remove(this.appId);

    // Invariant 5: Item is completely removed from both real memory and persistence
    expect(real.getState().some((a) => a.id === this.appId)).toBe(false);
    expect(real.readPersisted().some((a) => a.id === this.appId)).toBe(false);
    expect(real.getState().length).toBe(model.apps.length);
  }

  toString() {
    return `RemoveApplication(${this.appId})`;
  }
}

describe('Kanban CRM - Stateful Model-Based Testing (fast-check)', () => {
  it('should maintain mathematical state invariants across randomized command chains', () => {
    // Generator for application entities
    const appArbitrary = fc.record({
      id: fc.uuid(),
      company: fc.constantFrom('Linear', 'Notion', 'Figma', 'Stripe', 'Supabase'),
      title: fc.constantFrom('Frontend Intern', 'Product Designer', 'Growth Lead'),
      status: fc.constantFrom('saved', 'applied', 'interview'),
    });

    const allCommands = [
      appArbitrary.map((app) => new AddApplicationCommand(app)),
      fc.uuid().map((id) => new MoveNextCommand(id)),
      fc.uuid().map((id) => new RemoveApplicationCommand(id)),
    ];

    fc.assert(
      fc.property(fc.commands(allCommands, { size: '+1' }), (cmds) => {
        const s = () => ({
          model: new KanbanModel(),
          real: new KanbanRealSystem(),
        });
        fc.modelRun(s, cmds);
      }),
      { numRuns: 100 }
    );
  });
});
