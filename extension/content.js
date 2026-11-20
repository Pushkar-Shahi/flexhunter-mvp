// FlexHunter Content Script for Internshala, LinkedIn, and Indeed

function detectJobDetails() {
  const url = window.location.href;
  let title = document.title;
  let company = "Company";
  let stipend = "Competitive";

  // Internshala heuristic
  if (url.includes("internshala.com")) {
    const titleEl = document.querySelector(".profile_on_detail_page") || document.querySelector("h1") || document.querySelector(".heading_4_5");
    const compEl = document.querySelector(".company_name") || document.querySelector(".link_display_like_text");
    const stipendEl = document.querySelector(".stipend") || document.querySelector(".item_body");

    if (titleEl) title = titleEl.innerText.trim();
    if (compEl) company = compEl.innerText.trim();
    if (stipendEl) stipend = stipendEl.innerText.trim();
  } 
  // LinkedIn heuristic
  else if (url.includes("linkedin.com")) {
    const titleEl = document.querySelector(".job-details-jobs-unified-top-card__job-title") || document.querySelector("h1");
    const compEl = document.querySelector(".job-details-jobs-unified-top-card__company-name") || document.querySelector(".jobs-unified-top-card__company-name");
    
    if (titleEl) title = titleEl.innerText.trim();
    if (compEl) company = compEl.innerText.trim();
  }
  // Generic fallback
  else {
    const h1 = document.querySelector("h1");
    if (h1) title = h1.innerText.trim();
  }

  return { title, company, stipend, url };
}

// Auto-fill active inputs on the page
function autofillForm(candidate) {
  let filledCount = 0;

  // Name
  const nameInputs = document.querySelectorAll('input[name*="name" i], input[id*="name" i], input[placeholder*="name" i]');
  nameInputs.forEach((input) => {
    input.value = candidate.name;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    filledCount++;
  });

  // Email
  const emailInputs = document.querySelectorAll('input[type="email"], input[name*="email" i], input[placeholder*="email" i]');
  emailInputs.forEach((input) => {
    input.value = candidate.email;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    filledCount++;
  });

  // College / University
  const collegeInputs = document.querySelectorAll('input[name*="college" i], input[name*="university" i], input[placeholder*="college" i]');
  collegeInputs.forEach((input) => {
    input.value = candidate.college;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    filledCount++;
  });

  // Cover Letter / Why Hire You textarea
  const textareas = document.querySelectorAll('textarea');
  if (textareas.length > 0 && candidate.pitch) {
    textareas[0].value = candidate.pitch;
    textareas[0].dispatchEvent(new Event('input', { bubbles: true }));
    textareas[0].dispatchEvent(new Event('change', { bubbles: true }));
    filledCount++;
  }

  return filledCount;
}

// Message Listener from Popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "GET_PAGE_JOB") {
    const details = detectJobDetails();
    sendResponse(details);
  } else if (request.action === "AUTOFILL_FORM") {
    const count = autofillForm(request.candidate);
    sendResponse({ success: true, filledCount: count });
  }
  return true;
});
