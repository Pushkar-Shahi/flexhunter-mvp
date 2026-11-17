import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('FlexHunter UI State Verification (Semantic DOM & Persistence Testing)', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  // Test 1: Theme State Verification & LocalStorage Synchronization
  it('toggles theme state to dark mode, mutates document root class, and persists to localStorage', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Initially light mode
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Find and click the dark mode toggle button in TopBar
    const toggleButton = screen.getByTitle(/Switch to dark mode/i);
    expect(toggleButton).toBeInTheDocument();
    await user.click(toggleButton);

    // Verify observable DOM state change (Class attached to root <html>)
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Verify state persistence in localStorage
    expect(localStorage.getItem('flexhunter_theme')).toBe('dark');

    // Toggle back to light
    const lightToggleButton = screen.getByTitle(/Switch to light mode/i);
    await user.click(lightToggleButton);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('flexhunter_theme')).toBe('light');
  });

  // Test 2: Navigation State Transition
  it('transitions active view state across sidebar navigation destinations', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Initial view: Settings / Availability & Preferences
    expect(screen.getByText(/Availability & Career Preferences/i)).toBeInTheDocument();
    expect(screen.getByText(/Settings \/ Availability & Preferences/i)).toBeInTheDocument();

    // Navigate to Match Feed
    const feedNavButton = screen.getByRole('button', { name: /Match Feed/i });
    await user.click(feedNavButton);

    // Verify observable state changed to Feed
    expect(screen.getByText(/Discover \/ Match Feed/i)).toBeInTheDocument();
    expect(screen.getByText(/Quick filters/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remote Only' })).toBeInTheDocument();

    // Navigate to Application Tracker
    const trackerNavButton = screen.getByRole('button', { name: /Application Tracker/i });
    await user.click(trackerNavButton);

    // Verify observable state changed to Kanban Tracker
    expect(screen.getByText(/Tracker \/ Applications/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Application Tracker/i })).toBeInTheDocument();
  });

  // Test 3: Weekly Hours Slider State Transition & Persistence
  it('updates weekly hours limit state via user interaction and synchronizes with localStorage', async () => {
    render(<App />);

    // Find the hours slider input
    const slider = document.querySelector('input[type="range"]');
    expect(slider).toBeInTheDocument();

    // Simulate user changing hours to 25
    fireEvent.change(slider, { target: { value: '25' } });

    // Verify DOM updates with the newly verified state
    expect(screen.getByText(/25 hrs \/ week/i)).toBeInTheDocument();
    expect(localStorage.getItem('flexhunter_exact_hours')).toBe('25');
  });

  // Test 4: Skill Addition & Deletion State Correctness
  it('modifies candidate skills state accurately upon adding and removing skills', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Click "Add skill" button
    const addSkillBtn = screen.getByRole('button', { name: /Add skill/i });
    await user.click(addSkillBtn);

    // Find the skill input field
    const skillInput = screen.getByPlaceholderText('Skill...');
    fireEvent.change(skillInput, { target: { value: 'Solidity' } });
    fireEvent.submit(skillInput.closest('form'));

    // Verify "Solidity" badge is present in DOM
    expect(screen.getByText('Solidity')).toBeInTheDocument();

    // Remove the skill by clicking its badge
    const solidityBadge = screen.getByText('Solidity').closest('button');
    await user.click(solidityBadge);

    // Verify skill has been removed from state and DOM
    expect(screen.queryByText('Solidity')).not.toBeInTheDocument();
  });

  // Test 5: Save Job to Board State Mutation
  it('mutates application state when saving a role from Match Feed, incrementing saved counter', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Go to Match Feed
    const feedNavButton = screen.getByRole('button', { name: /Match Feed/i });
    await user.click(feedNavButton);

    // Select second job card (Orbit Growth - not in initial applications)
    const orbitJob = screen.getByText(/Orbit Growth/i);
    await user.click(orbitJob);

    // Find "Save to Board" button
    const saveButton = screen.getByRole('button', { name: /Save to Board/i });
    await user.click(saveButton);

    // Notification toast appears confirming save
    expect(await screen.findByText(/Saved "Social Media Marketing Associate" to your saved collection!/i)).toBeInTheDocument();

    // Verify saved collection persisted to localStorage
    const savedApps = JSON.parse(localStorage.getItem('flexhunter_exact_apps') || '[]');
    expect(savedApps.some((a) => a.company === 'Orbit Growth' && a.status === 'saved')).toBe(true);
  });

  // Test 6: Kanban Stage Transition State Mutation
  it('advances application state across Kanban stages upon user action', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Go to Tracker
    const trackerNavButton = screen.getByRole('button', { name: /Application Tracker/i });
    await user.click(trackerNavButton);

    // Advance first card in Saved column to Applied
    const moveButtons = screen.getAllByTitle(/Advance to next stage/i);
    expect(moveButtons.length).toBeGreaterThan(0);

    // Card 1 is "Brightside Co." with status 'saved'
    await user.click(moveButtons[0]);

    // Check localStorage reflects the state transition from saved -> applied
    await waitFor(() => {
      const apps = JSON.parse(localStorage.getItem('flexhunter_exact_apps') || '[]');
      const brightside = apps.find((a) => a.company === 'Brightside Co.');
      expect(brightside.status).toBe('applied');
    });
  });

  // Test 7: Email Draft Modal State Verification
  it('opens and closes actionable follow-up email modal without state corruption', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Go to Tracker
    const trackerNavButton = screen.getByRole('button', { name: /Application Tracker/i });
    await user.click(trackerNavButton);

    // Click "Draft Follow-Up Email" on an applied application card
    const draftEmailButtons = screen.getAllByRole('button', { name: /Draft Follow-Up Email/i });
    expect(draftEmailButtons.length).toBeGreaterThan(0);
    await user.click(draftEmailButtons[0]);

    // Verify modal is displayed with generated email draft
    expect(screen.getByRole('heading', { name: /Draft Follow-Up Email/i })).toBeInTheDocument();
    expect(screen.getByText(/Subject Line/i)).toBeInTheDocument();
    expect(screen.getByText(/AI-Tailored/i)).toBeInTheDocument();

    // Click Close (the X button)
    const closeButtons = document.querySelectorAll('button');
    const xButton = Array.from(closeButtons).find((b) => b.querySelector('svg.lucide-x'));
    expect(xButton).toBeTruthy();
    await user.click(xButton);

    // Verify modal state is unmounted
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /Draft Follow-Up Email/i })).not.toBeInTheDocument();
    });
  });

  // Test 8: Chrome Extension Simulation Auto-Fill & Track State Transition
  it('simulates Chrome extension overlay auto-fill and tracks application into Kanban CRM', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Open extension via button
    const openExtBtn = screen.getAllByRole('button', { name: /Extension/i })[0];
    await user.click(openExtBtn);

    // Verify overlay appears with auto-extracted job and applicant details
    expect(screen.getByText(/One-Click Autofill/i)).toBeInTheDocument();
    expect(screen.getByText(/Tanmay Shahi/i)).toBeInTheDocument();

    // Click Auto-Fill Application & Track in CRM
    const autofillBtn = screen.getByRole('button', { name: /Auto-Fill Application & Track in CRM/i });
    await user.click(autofillBtn);

    // Notification toast appears once auto-fill completes
    expect(await screen.findByText(/Application submitted! Logged into "Applied" on your Kanban\./i, {}, { timeout: 2000 })).toBeInTheDocument();

    // Verify persistence in localStorage with applied status
    const apps = JSON.parse(localStorage.getItem('flexhunter_exact_apps') || '[]');
    expect(apps.some((a) => a.status === 'applied')).toBe(true);
  });
});
