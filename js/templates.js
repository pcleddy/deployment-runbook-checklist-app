/* ── Template Picker ──
   Loads .md files from the templates/ folder via fetch,
   so template content lives in its own files instead of
   being embedded as giant strings in the JS.             */

const TEMPLATE_FILES = {
  "Software Deployment":        "templates/01-software-deployment.md",
  "New Employee Onboarding":    "templates/02-new-employee-onboarding.md",
  "Event Planning":             "templates/03-event-planning.md",
  "Website Launch":             "templates/04-website-launch.md",
  "Project Kickoff":            "templates/05-project-kickoff.md",
  "Moving House":               "templates/06-moving-house.md",
  "Security Audit":             "templates/07-security-audit.md",
  "Product Launch":             "templates/08-product-launch.md",
  "Travel Planning":            "templates/09-travel-planning.md",
  "Code Review":                "templates/10-code-review.md",
  "Incident Response":          "templates/11-incident-response.md",
  "Hiring Process":             "templates/12-hiring-process.md",
  "Sprint Planning":            "templates/13-sprint-planning.md",
  "Database Migration":         "templates/14-database-migration.md",
  "Content Publishing":         "templates/15-content-publishing.md",
  "Wedding Planning":           "templates/16-wedding-planning.md",
  "API Integration":            "templates/17-api-integration.md",
  "Seasonal Home Maintenance":  "templates/18-seasonal-home-maintenance.md",
  "Emergency Preparedness":     "templates/19-emergency-preparedness.md",
  "Employee Offboarding":       "templates/20-employee-offboarding.md",
  "Car Buying":                 "templates/21-car-buying.md",
  "Meeting Facilitation":       "templates/22-meeting-facilitation.md",
  "Cloud Infrastructure Setup": "templates/23-cloud-infrastructure-setup.md",
  "GDPR Compliance":            "templates/24-compliance-gdpr.md",
  "Monthly Personal Finance":   "templates/25-monthly-personal-finance.md",
  "Selling a House":            "templates/26-selling-a-house.md",
  "Planning a Road Trip":       "templates/27-planning-a-road-trip.md",
  "Planning a Trip Abroad":     "templates/28-planning-a-trip-abroad.md"
};

const templateSelect = document.getElementById("templateSelect");
const loadTemplateBtn = document.getElementById("loadTemplateBtn");

// Populate the <select> dropdown
for (const name of Object.keys(TEMPLATE_FILES)) {
  const opt = document.createElement("option");
  opt.value = name;
  opt.textContent = name;
  templateSelect.appendChild(opt);
}

loadTemplateBtn.addEventListener("click", async () => {
  const selected = templateSelect.value;
  if (!selected) return;

  const file = TEMPLATE_FILES[selected];
  if (!file) return;

  loadTemplateBtn.disabled = true;
  loadTemplateBtn.textContent = "Loading…";

  try {
    const resp = await fetch(file);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const md = await resp.text();

    source.value = md;
    saveText(STORAGE_KEYS.source, source.value);
    checkState = {};
    saveJson(STORAGE_KEYS.checks, checkState);
    renderChecklist();
    templateSelect.value = "";
  } catch (err) {
    console.error("Failed to load template:", err);
    alert("Could not load template. Check the console for details.");
  } finally {
    loadTemplateBtn.disabled = false;
    loadTemplateBtn.textContent = "Load";
  }
});
