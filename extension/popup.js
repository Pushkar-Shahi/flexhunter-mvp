// FlexHunter Extension Popup Script

document.addEventListener('DOMContentLoaded', () => {
  const jobTitleEl = document.getElementById('jobTitle');
  const jobCompanyEl = document.getElementById('jobCompany');
  const fitScoreEl = document.getElementById('fitScore');
  const pitchNoteEl = document.getElementById('pitchNote');
  const btnAutofill = document.getElementById('btnAutofill');
  const btnSaveCrm = document.getElementById('btnSaveCrm');
  const statusMsg = document.getElementById('statusMsg');

  let currentJob = {
    title: "UI/UX Design Intern",
    company: "Lumen Labs"
  };

  // Query active tab for detected job details
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "GET_PAGE_JOB" }, (response) => {
        if (chrome.runtime.lastError || !response) {
          jobTitleEl.textContent = "Frontend / UI Intern";
          jobCompanyEl.textContent = "Portal detected · Ready to autofill";
          return;
        }
        currentJob = response;
        jobTitleEl.textContent = response.title || "Internship Role";
        jobCompanyEl.textContent = response.company || "Job Board Listing";
      });
    }
  });

  // Autofill button click
  btnAutofill.addEventListener('click', () => {
    const candidateData = {
      name: "Tanmay Shahi",
      email: "tanmay.shahi@msot.edu",
      college: "MSOT",
      pitch: pitchNoteEl.value
    };

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "AUTOFILL_FORM", candidate: candidateData }, (res) => {
          btnAutofill.innerHTML = "<span>✓ Application Form Filled!</span>";
          btnAutofill.style.background = "#059669";
          statusMsg.style.display = "block";
          statusMsg.textContent = "Fields auto-populated with your protected student credentials!";
          setTimeout(() => {
            btnAutofill.innerHTML = "<span>⚡ 1-Click Autofill Form</span>";
            btnAutofill.style.background = "#2563eb";
          }, 3000);
        });
      }
    });
  });

  // Save to CRM button click
  btnSaveCrm.addEventListener('click', () => {
    // Store in chrome storage
    const newEntry = {
      id: "app-ext-" + Date.now(),
      company: currentJob.company || "Company",
      title: currentJob.title || "Internship",
      status: "applied",
      dateMeta: "Applied via Extension",
      pill: "Follow-up due in 5 days",
      pillType: "dark"
    };

    chrome.storage?.local?.get(['flexhunter_exact_apps'], (res) => {
      const existing = res.flexhunter_exact_apps || [];
      existing.unshift(newEntry);
      chrome.storage.local.set({ flexhunter_exact_apps: existing }, () => {
        btnSaveCrm.textContent = "✓ Logged to Kanban CRM!";
        btnSaveCrm.style.color = "#059669";
        statusMsg.style.display = "block";
        statusMsg.textContent = "Saved to 'Applied' column in FlexHunter!";
      });
    });
  });
});
