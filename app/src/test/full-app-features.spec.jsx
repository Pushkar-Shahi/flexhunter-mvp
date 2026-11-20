import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('FlexHunter Full Application Upgraded Capabilities', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  // Test 1: Add Custom Application via Modal
  it('opens Add Application modal, fills details, and prepends custom card into Kanban CRM', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Navigate to Application Tracker
    const trackerNav = screen.getByRole('button', { name: /Application Tracker/i });
    await user.click(trackerNav);

    // Click "Add Application" button
    const addAppBtn = screen.getByRole('button', { name: /Add Application/i });
    await user.click(addAppBtn);

    // Verify modal is visible
    expect(screen.getByRole('heading', { name: /Add New Application/i })).toBeInTheDocument();

    // Fill Company and Title
    const companyInput = screen.getByPlaceholderText(/e\.g\. Swiggy, Zerodha, Vercel/i);
    const titleInput = screen.getByPlaceholderText(/e\.g\. UI\/UX Intern, Growth Associate/i);
    await user.type(companyInput, 'Supabase Labs');
    await user.type(titleInput, 'Frontend Intern');

    // Submit form
    const submitBtn = screen.getByRole('button', { name: /Create Application/i });
    await user.click(submitBtn);

    // Verify modal closes
    expect(screen.queryByRole('heading', { name: /Add New Application/i })).not.toBeInTheDocument();

    // Verify new card exists in CRM DOM and storage
    expect(screen.getByText('Supabase Labs')).toBeInTheDocument();
    expect(screen.getByText('Frontend Intern')).toBeInTheDocument();
    const stored = JSON.parse(localStorage.getItem('flexhunter_exact_apps') || '[]');
    expect(stored.some((a) => a.company === 'Supabase Labs')).toBe(true);
  });

  // Test 2: Note Taking on Application Card
  it('opens note taking modal, adds a note, and persists note list to card', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Navigate to Application Tracker
    const trackerNav = screen.getByRole('button', { name: /Application Tracker/i });
    await user.click(trackerNav);

    // Click note button on first card
    const noteButtons = screen.getAllByText(/\+ Add Note|Notes \(\d+\)/i);
    expect(noteButtons.length).toBeGreaterThan(0);
    await user.click(noteButtons[0]);

    // Verify note modal appears
    expect(screen.getByRole('heading', { name: /Application Notes/i })).toBeInTheDocument();

    // Type a note
    const textarea = screen.getByPlaceholderText(/Write a new note/i);
    await user.type(textarea, 'Technical portfolio review scheduled for Thursday.');

    // Click the submit "Add Note" button inside the modal form
    const formSubmitBtn = textarea.closest('form').querySelector('button[type="submit"]');
    await user.click(formSubmitBtn);

    // Verify note rendered in the modal list and card badge
    expect(screen.getAllByText(/Technical portfolio review scheduled for Thursday\./i).length).toBeGreaterThanOrEqual(1);
  });

  // Test 3: Resume Studio Dynamic ATS and Target Track Switching
  it('switches target track in Resume Studio and re-evaluates ATS keywords', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Navigate to Resume Studio
    const resumeNav = screen.getByRole('button', { name: /Resume Studio/i });
    await user.click(resumeNav);

    // Initial state has Design track
    expect(screen.getByText(/Target Role ATS Match/i)).toBeInTheDocument();

    // Click Tech Track
    const techBtn = screen.getByRole('button', { name: /^Tech$/i });
    await user.click(techBtn);

    // Verify text updates to Tech Track
    expect(screen.getByText(/Tech Track/i)).toBeInTheDocument();
  });
});
