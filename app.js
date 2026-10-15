/**
 * City Hospital - Clean, Simple MVP Prototype Logic
 * Uncluttered patient view + Top-right Staff Admin Login
 */

// ================= INITIAL DEMO DATA =================
const DEFAULT_DOCTORS = [
  {
    id: "doc-1",
    name: "Dr. Aisha Sharma, MD",
    dept: "Cardiology",
    experience: "15 Years Exp",
    room: "Cabin 201",
    timings: "09:00 AM - 01:00 PM",
    status: "Available" // Available, In OPD, In Surgery, Off Duty
  },
  {
    id: "doc-2",
    name: "Dr. Robert Chen, MD",
    dept: "Neurology",
    experience: "18 Years Exp",
    room: "Cabin 305",
    timings: "10:00 AM - 02:00 PM",
    status: "In Surgery"
  },
  {
    id: "doc-3",
    name: "Dr. Meera Patel, MS",
    dept: "Orthopedics",
    experience: "12 Years Exp",
    room: "Cabin 108",
    timings: "02:00 PM - 06:00 PM",
    status: "In OPD"
  },
  {
    id: "doc-4",
    name: "Dr. David Miller, MD",
    dept: "Pediatrics",
    experience: "10 Years Exp",
    room: "Cabin 112",
    timings: "09:00 AM - 01:00 PM",
    status: "Available"
  },
  {
    id: "doc-5",
    name: "Dr. Sarah Jenkins, MD",
    dept: "General Medicine",
    experience: "14 Years Exp",
    room: "Cabin 102",
    timings: "08:30 AM - 12:30 PM",
    status: "Available"
  },
  {
    id: "doc-6",
    name: "Dr. Vikram Roy, DM",
    dept: "Pulmonology",
    experience: "11 Years Exp",
    room: "Cabin 215",
    timings: "03:00 PM - 07:00 PM",
    status: "Off Duty"
  }
];

const DEFAULT_WARDS = [
  {
    id: "ward-icu",
    category: "ICU",
    title: "Intensive Care Unit (ICU)",
    rate: "$450 / Day",
    amenities: "Ventilator & 24/7 dedicated critical care monitor",
    beds: [
      { id: "ICU-01", status: "Available" },
      { id: "ICU-02", status: "Occupied" },
      { id: "ICU-03", status: "Occupied" },
      { id: "ICU-04", status: "Available" },
      { id: "ICU-05", status: "Occupied" },
      { id: "ICU-06", status: "Maintenance" }
    ]
  },
  {
    id: "ward-gen",
    category: "General",
    title: "General Medical Ward",
    rate: "$80 / Day",
    amenities: "Motorized bed with central oxygen & call bell",
    beds: [
      { id: "GEN-101", status: "Available" },
      { id: "GEN-102", status: "Occupied" },
      { id: "GEN-103", status: "Available" },
      { id: "GEN-104", status: "Occupied" },
      { id: "GEN-105", status: "Occupied" },
      { id: "GEN-106", status: "Available" }
    ]
  },
  {
    id: "ward-sp",
    category: "Semi-Private",
    title: "Semi-Private Room",
    rate: "$160 / Day",
    amenities: "Twin sharing with AC and attached washroom",
    beds: [
      { id: "SP-201A", status: "Occupied" },
      { id: "SP-201B", status: "Available" },
      { id: "SP-202A", status: "Available" },
      { id: "SP-202B", status: "Occupied" }
    ]
  },
  {
    id: "ward-dlx",
    category: "Deluxe",
    title: "Deluxe Private Suite",
    rate: "$320 / Day",
    amenities: "Private suite with attendant bed, TV, Wi-Fi",
    beds: [
      { id: "DLX-301", status: "Available" },
      { id: "DLX-302", status: "Occupied" },
      { id: "DLX-303", status: "Available" }
    ]
  },
  {
    id: "ward-er",
    category: "Emergency",
    title: "Emergency Observation",
    rate: "$120 / Day",
    amenities: "Immediate resuscitation & trauma care bed",
    beds: [
      { id: "ER-01", status: "Occupied" },
      { id: "ER-02", status: "Available" },
      { id: "ER-03", status: "Available" },
      { id: "ER-04", status: "Occupied" }
    ]
  }
];

const DEFAULT_PROCEDURES = [
  {
    id: "proc-1",
    name: "Coronary Angiography & Stenting",
    dept: "Cardiology",
    description: "Minimally invasive catheter diagnostic and stenting procedure for clearing blocked arteries.",
    recovery: "1 - 2 Days Stay",
    package: "Cashless Insurance Eligible"
  },
  {
    id: "proc-2",
    name: "Total Knee Replacement",
    dept: "Orthopedics",
    description: "Computer-navigated prosthetic joint replacement for severe arthritis and joint degradation.",
    recovery: "3 - 4 Days Stay",
    package: "Standard Package: $2,800"
  },
  {
    id: "proc-3",
    name: "Laparoscopic Gallbladder Removal",
    dept: "General Surgery",
    description: "Keyhole laparoscopic surgery for gallstones with minimal incision and rapid recovery.",
    recovery: "1 Day (Day-Care)",
    package: "Standard Package: $1,200"
  },
  {
    id: "proc-4",
    name: "Craniotomy & Neuro-Surgery",
    dept: "Neurology",
    description: "Surgical intervention for cranial trauma, aneurysms, and localized neurological lesions.",
    recovery: "5 - 7 Days Stay",
    package: "Specialized Surgical Protocol"
  },
  {
    id: "proc-5",
    name: "Diagnostic Bronchoscopy",
    dept: "Pulmonology",
    description: "Fiber-optic airway inspection and biopsy under mild sedation for respiratory conditions.",
    recovery: "Day Care (4 Hours)",
    package: "OPD Diagnostic Procedure"
  },
  {
    id: "proc-6",
    name: "Pediatric Immunization & Wellness",
    dept: "Pediatrics",
    description: "Complete routine vaccine schedule and growth monitoring for infants and children.",
    recovery: "Outpatient Visit",
    package: "Walk-in & Scheduled"
  }
];

const ADMISSION_STEPS_PLANNED = [
  {
    num: 1,
    title: "Doctor Consultation & Admission Slip",
    desc: "Doctor evaluates patient in OPD and issues an official admission advice slip with room recommendation."
  },
  {
    num: 2,
    title: "Insurance / TPA Pre-Authorization",
    desc: "Attendant presents Insurance Card and ID proof at the TPA desk on the Ground Floor for cashless approval."
  },
  {
    num: 3,
    title: "Room Selection & Registration",
    desc: "Select available room category (ICU, Deluxe, Semi-Private, General) and complete the admission form."
  },
  {
    num: 4,
    title: "Wristband Issuance & Admission Deposit",
    desc: "Receive barcode identification wristband. Non-cashless patients pay nominal package deposit."
  },
  {
    num: 5,
    title: "Ward Transfer & Inpatient Care",
    desc: "Hospital staff escorts the patient to the allocated room. Nurse completes initial assessment."
  }
];

const ADMISSION_STEPS_EMERGENCY = [
  {
    num: 1,
    title: "Immediate ER Triage & Resuscitation",
    desc: "Patient receives urgent clinical care at the emergency bay immediately. No paperwork delays treatment."
  },
  {
    num: 2,
    title: "Fast-Track Registration",
    desc: "Accompanying relative registers at the Emergency Desk in under 2 minutes to generate the case number."
  },
  {
    num: 3,
    title: "Emergency Bed / ICU Allotment",
    desc: "Patient is transferred directly to Emergency Observation, ICU, or Operating Theater based on need."
  },
  {
    num: 4,
    title: "Insurance Emergency Intimation",
    desc: "Hospital TPA desk intimates the insurance provider within 24 hours for emergency cashless approval."
  }
];

// ================= STATE =================
let doctors = [];
let wards = [];
let procedures = [];
let currentSection = "overview";
let currentStaffTab = "doctors";
let currentAdmissionType = "planned";
let isStaffLoggedIn = false;

// ================= INITIALIZATION =================
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  renderAll();
  switchSection("overview");
  updateStaffAuthHeader();
});

function loadData() {
  const savedDoctors = localStorage.getItem("cityhosp_doctors");
  const savedWards = localStorage.getItem("cityhosp_wards");
  const savedProcedures = localStorage.getItem("cityhosp_procedures");

  doctors = savedDoctors ? JSON.parse(savedDoctors) : JSON.parse(JSON.stringify(DEFAULT_DOCTORS));
  wards = savedWards ? JSON.parse(savedWards) : JSON.parse(JSON.stringify(DEFAULT_WARDS));
  procedures = savedProcedures ? JSON.parse(savedProcedures) : JSON.parse(JSON.stringify(DEFAULT_PROCEDURES));
}

function saveData() {
  localStorage.setItem("cityhosp_doctors", JSON.stringify(doctors));
  localStorage.setItem("cityhosp_wards", JSON.stringify(wards));
  localStorage.setItem("cityhosp_procedures", JSON.stringify(procedures));
}

// ================= SECTION NAVIGATION =================
function switchSection(sectionId) {
  currentSection = sectionId;
  const sections = ["overview", "doctors", "beds", "procedures", "admission", "emergency", "staff"];

  sections.forEach(sec => {
    const el = document.getElementById(`section-${sec}`);
    if (el) {
      el.style.display = (sec === sectionId) ? "block" : "none";
      if (sec === sectionId) el.classList.add("active");
      else el.classList.remove("active");
    }

    const navBtn = document.getElementById(`navBtn-${sec}`);
    if (navBtn) {
      if (sec === sectionId) navBtn.classList.add("active");
      else navBtn.classList.remove("active");
    }
  });

  if (sectionId === "doctors") filterDoctors();
  else if (sectionId === "beds") filterBeds();
  else if (sectionId === "procedures") filterProcedures();
  else if (sectionId === "staff") renderStaffView();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ================= ADMISSION STEPS =================
function setAdmissionType(type) {
  currentAdmissionType = type;
  const btnPlan = document.getElementById("btnPlanAdmission");
  const btnEmerg = document.getElementById("btnEmergAdmission");

  if (type === "planned") {
    btnPlan.classList.add("active");
    btnEmerg.classList.remove("active");
  } else {
    btnEmerg.classList.add("active");
    btnPlan.classList.remove("active");
  }
  renderAdmissionSteps();
}

function renderAdmissionSteps() {
  const container = document.getElementById("admissionStepsContainer");
  if (!container) return;
  const steps = currentAdmissionType === "planned" ? ADMISSION_STEPS_PLANNED : ADMISSION_STEPS_EMERGENCY;

  container.innerHTML = steps.map(s => `
    <div class="step-item">
      <div class="step-num">${s.num}</div>
      <div class="step-body">
        <h4>${s.title}</h4>
        <p>${s.desc}</p>
      </div>
    </div>
  `).join("");
}

// ================= PROCEDURES RENDERING =================
function renderProcedures(list) {
  const container = document.getElementById("proceduresGridContainer");
  if (!container) return;

  container.innerHTML = list.map(proc => `
    <div class="procedure-card">
      <div class="proc-head">
        <h4 class="proc-title">${escapeHtml(proc.name)}</h4>
        <span class="proc-dept">${escapeHtml(proc.dept)}</span>
      </div>
      <p class="proc-desc">${escapeHtml(proc.description)}</p>
      <div class="proc-info">
        <span>Stay: <strong>${escapeHtml(proc.recovery)}</strong></span>
        <span>Coverage: <strong>${escapeHtml(proc.package)}</strong></span>
      </div>
      <button class="btn btn-outline full-width" onclick="inquireProcedure('${proc.name}')">
        Inquire Procedure
      </button>
    </div>
  `).join("");
}

function filterProcedures() {
  const dept = document.getElementById("procedureDeptSelect")?.value || "all";
  const filtered = procedures.filter(p => dept === "all" || p.dept === dept);
  renderProcedures(filtered);
}

function inquireProcedure(name) {
  alert(`Inquiry Registered for: ${name}\n\nOur Clinical Coordinator will contact you with pre-procedure instructions.`);
  showToast(`Inquiry for ${name} registered.`);
}

// ================= METRICS & BADGES =================
function updateMetricsBar() {
  const availableDocs = doctors.filter(d => d.status === "Available" || d.status === "In OPD").length;
  const statDocsEl = document.getElementById("statDoctorsOnDuty");
  if (statDocsEl) statDocsEl.innerText = availableDocs;

  const badgeDocsEl = document.getElementById("navBadgeDoctors");
  if (badgeDocsEl) badgeDocsEl.innerText = availableDocs;

  let totalFree = 0;
  let totalOcc = 0;
  let totalMaint = 0;
  let icuFree = 0;

  wards.forEach(ward => {
    ward.beds.forEach(bed => {
      if (bed.status === "Available") {
        totalFree++;
        if (ward.category === "ICU") icuFree++;
      } else if (bed.status === "Occupied") {
        totalOcc++;
      } else if (bed.status === "Maintenance") {
        totalMaint++;
      }
    });
  });

  const statAvailBedsEl = document.getElementById("statAvailableBeds");
  const statIcuBedsEl = document.getElementById("statIcuBeds");
  if (statAvailBedsEl) statAvailBedsEl.innerText = totalFree;
  if (statIcuBedsEl) statIcuBedsEl.innerText = icuFree;

  const badgeBedsEl = document.getElementById("navBadgeBeds");
  if (badgeBedsEl) badgeBedsEl.innerText = totalFree;

  const summaryAvail = document.getElementById("summaryAvailBeds");
  const summaryOcc = document.getElementById("summaryOccBeds");
  const summaryMaint = document.getElementById("summaryMaintBeds");

  if (summaryAvail) summaryAvail.innerText = totalFree;
  if (summaryOcc) summaryOcc.innerText = totalOcc;
  if (summaryMaint) summaryMaint.innerText = totalMaint;

  const staffFree = document.getElementById("staffFreeCount");
  const staffOcc = document.getElementById("staffOccCount");

  if (staffFree) staffFree.innerText = `${totalFree} Available`;
  if (staffOcc) staffOcc.innerText = `${totalOcc} Occupied`;
}

// ================= DOCTOR RENDERING =================
function renderDoctorsList(list) {
  const container = document.getElementById("doctorCardsContainer");
  const countEl = document.getElementById("doctorResultsCount");

  if (countEl) countEl.innerText = `Showing ${list.length} doctors`;

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 30px; background: white; border-radius: 8px; border: 1px solid #e2e8f0; color: #64748b;">
        No doctors match your search or filter.
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(doc => {
    const badgeClass = getStatusBadgeClass(doc.status);
    return `
      <div class="doctor-card">
        <div class="doc-top">
          <h4 class="doc-name">${escapeHtml(doc.name)}</h4>
          <span class="status-pill ${badgeClass}">${escapeHtml(doc.status)}</span>
        </div>
        <div class="doc-dept">${escapeHtml(doc.dept)}</div>

        <div class="doc-meta-clean">
          <div class="doc-row">
            <span>Room:</span>
            <span>${escapeHtml(doc.room)}</span>
          </div>
          <div class="doc-row">
            <span>OPD Hours:</span>
            <span>${escapeHtml(doc.timings)}</span>
          </div>
        </div>

        <button class="btn btn-outline full-width" onclick="openDoctorModal('${doc.id}')">
          Get OPD Token
        </button>
      </div>
    `;
  }).join("");
}

function getStatusBadgeClass(status) {
  switch (status) {
    case "Available": return "available";
    case "In OPD": return "opd";
    case "In Surgery": return "surgery";
    case "Off Duty": return "offduty";
    default: return "available";
  }
}

function filterDoctors() {
  const query = (document.getElementById("doctorSearchInput")?.value || "").toLowerCase().trim();
  const dept = document.getElementById("doctorDeptSelect")?.value || "all";
  const status = document.getElementById("doctorStatusSelect")?.value || "all";

  const filtered = doctors.filter(doc => {
    const matchesQuery = doc.name.toLowerCase().includes(query) || doc.dept.toLowerCase().includes(query);
    const matchesDept = dept === "all" || doc.dept === dept;
    const matchesStatus = status === "all" || doc.status === status;
    return matchesQuery && matchesDept && matchesStatus;
  });

  renderDoctorsList(filtered);
}

// ================= BED MATRIX RENDERING =================
function renderBedMatrix() {
  const container = document.getElementById("bedMatrixContainer");
  if (!container) return;
  const wardFilter = document.getElementById("wardFilterSelect")?.value || "all";
  const bedStatusFilter = document.getElementById("bedStatusFilterSelect")?.value || "all";

  const filteredWards = wards.filter(w => wardFilter === "all" || w.category === wardFilter);

  container.innerHTML = filteredWards.map(ward => {
    const matchingBeds = ward.beds.filter(b => bedStatusFilter === "all" || b.status === bedStatusFilter);
    const availableCount = ward.beds.filter(b => b.status === "Available").length;

    return `
      <div class="ward-card">
        <div class="ward-header">
          <h4 class="ward-title">${escapeHtml(ward.title)}</h4>
          <span style="font-size:0.8rem; font-weight:700; color:#0284c7;">${escapeHtml(ward.rate)}</span>
        </div>
        <div class="ward-avail-count">${availableCount} of ${ward.beds.length} beds available</div>

        <div class="bed-pills-row">
          ${matchingBeds.map(bed => {
            const pillClass = bed.status.toLowerCase();
            return `
              <div class="bed-tag ${pillClass}">
                ${escapeHtml(bed.id)}
              </div>
            `;
          }).join("")}
          ${matchingBeds.length === 0 ? '<div style="font-size:0.75rem; color:#94a3b8; grid-column:1/-1;">No beds match filter.</div>' : ''}
        </div>

        <div class="ward-amenities-text">${escapeHtml(ward.amenities)}</div>
      </div>
    `;
  }).join("");
}

function filterBeds() {
  renderBedMatrix();
}

// ================= STAFF LOGIN & AUTH =================
function openStaffModalOrDashboard() {
  if (isStaffLoggedIn) {
    switchSection("staff");
  } else {
    document.getElementById("loginErrorMessage").style.display = "none";
    openModal("modalStaffLogin");
  }
}

function fillDemoCredentials() {
  document.getElementById("adminUsername").value = "admin";
  document.getElementById("adminPassword").value = "hospital123";
  document.getElementById("loginErrorMessage").style.display = "none";
}

function handleAdminLogin(e) {
  e.preventDefault();
  const user = document.getElementById("adminUsername").value.trim();
  const pass = document.getElementById("adminPassword").value.trim();
  const errorEl = document.getElementById("loginErrorMessage");

  if ((user === "admin" && pass === "hospital123") || (user === "staff" && pass === "staff123")) {
    errorEl.style.display = "none";
    isStaffLoggedIn = true;
    closeModal("modalStaffLogin");
    updateStaffAuthHeader();
    switchSection("staff");
    showToast("Staff logged in successfully.");
  } else {
    errorEl.style.display = "block";
    document.getElementById("adminPassword").value = "";
    document.getElementById("adminPassword").focus();
  }
}

function handleStaffLogout() {
  isStaffLoggedIn = false;
  updateStaffAuthHeader();
  switchSection("overview");
  showToast("Logged out of staff portal.");
}

function updateStaffAuthHeader() {
  const container = document.getElementById("staffAuthContainer");
  if (!container) return;

  if (isStaffLoggedIn) {
    container.innerHTML = `
      <div class="staff-session-pill">
        <span>Staff: <strong>Admin</strong></span>
        <button class="btn btn-outline" style="padding: 4px 10px; font-size: 0.78rem;" onclick="switchSection('staff')">Dashboard</button>
        <button class="btn-logout-mini" onclick="handleStaffLogout()">Logout</button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <button class="btn btn-staff-login" id="btnStaffLoginTop" onclick="openStaffModalOrDashboard()">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        <span>Staff Login</span>
      </button>
    `;
  }
}

// ================= STAFF DASHBOARD =================
function switchStaffTab(tabName) {
  currentStaffTab = tabName;
  const btnDocs = document.getElementById("staffTabBtnDoctors");
  const btnRooms = document.getElementById("staffTabBtnRooms");
  const panelDocs = document.getElementById("staffPanelDoctors");
  const panelRooms = document.getElementById("staffPanelRooms");

  btnDocs.classList.remove("active");
  btnRooms.classList.remove("active");
  panelDocs.classList.remove("active");
  panelRooms.classList.remove("active");

  if (tabName === "doctors") {
    btnDocs.classList.add("active");
    panelDocs.classList.add("active");
  } else {
    btnRooms.classList.add("active");
    panelRooms.classList.add("active");
  }
}

function renderStaffView() {
  renderStaffDoctorsTable();
  renderStaffBedManager();
  updateMetricsBar();
}

function renderStaffDoctorsTable() {
  const tbody = document.getElementById("staffDoctorTableBody");
  if (!tbody) return;

  tbody.innerHTML = doctors.map(doc => `
    <tr>
      <td>
        <div style="font-weight:700; color:#0f172a;">${escapeHtml(doc.name)}</div>
        <div style="font-size:0.75rem; color:#64748b;">${escapeHtml(doc.dept)}</div>
      </td>
      <td>
        <span class="status-pill ${getStatusBadgeClass(doc.status)}">${escapeHtml(doc.status)}</span>
      </td>
      <td>
        <select class="quick-select" onchange="updateDoctorStatus('${doc.id}', this.value)">
          <option value="Available" ${doc.status === "Available" ? "selected" : ""}>Available</option>
          <option value="In OPD" ${doc.status === "In OPD" ? "selected" : ""}>In OPD</option>
          <option value="In Surgery" ${doc.status === "In Surgery" ? "selected" : ""}>In Surgery</option>
          <option value="Off Duty" ${doc.status === "Off Duty" ? "selected" : ""}>Off Duty</option>
        </select>
      </td>
      <td>${escapeHtml(doc.timings)}</td>
      <td>${escapeHtml(doc.room)}</td>
      <td>
        <button class="btn-small-del" onclick="deleteDoctor('${doc.id}')">Remove</button>
      </td>
    </tr>
  `).join("");
}

function updateDoctorStatus(docId, newStatus) {
  const doc = doctors.find(d => d.id === docId);
  if (doc) {
    doc.status = newStatus;
    saveData();
    renderAll();
    showToast(`Updated ${doc.name} to: ${newStatus}`);
  }
}

function deleteDoctor(docId) {
  const doc = doctors.find(d => d.id === docId);
  if (!doc) return;
  if (confirm(`Remove ${doc.name}?`)) {
    doctors = doctors.filter(d => d.id !== docId);
    saveData();
    renderAll();
    showToast(`${doc.name} removed.`);
  }
}

function renderStaffBedManager() {
  const container = document.getElementById("staffBedManagerGrid");
  if (!container) return;

  container.innerHTML = wards.map(ward => `
    <div class="staff-ward-card">
      <div class="staff-ward-name">${escapeHtml(ward.title)}</div>
      <div class="staff-bed-list">
        ${ward.beds.map(bed => `
          <div class="staff-bed-item">
            <span>${escapeHtml(bed.id)}</span>
            <div>
              <button 
                class="bed-toggle-btn ${bed.status === 'Available' ? 'avail' : ''}" 
                onclick="toggleStaffBedStatus('${ward.id}', '${bed.id}', 'Available')">
                Free
              </button>
              <button 
                class="bed-toggle-btn ${bed.status === 'Occupied' ? 'occ' : ''}" 
                onclick="toggleStaffBedStatus('${ward.id}', '${bed.id}', 'Occupied')">
                Occupied
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

function toggleStaffBedStatus(wardId, bedId, newStatus) {
  const ward = wards.find(w => w.id === wardId);
  if (!ward) return;
  const bed = ward.beds.find(b => b.id === bedId);
  if (!bed) return;

  bed.status = newStatus;
  saveData();
  renderAll();
  showToast(`Bed ${bedId} updated to: ${newStatus}`);
}

// ================= DOCTOR TOKEN MODAL =================
function openDoctorModal(docId) {
  const doc = doctors.find(d => d.id === docId);
  if (!doc) return;

  document.getElementById("modalDoctorName").innerText = doc.name;
  document.getElementById("modalDoctorContent").innerHTML = `
    <div style="margin-bottom: 14px;">
      <h4 style="font-size: 1.1rem; color: #0f172a; margin-bottom: 2px;">${escapeHtml(doc.name)}</h4>
      <div style="color: #0284c7; font-weight: 600; font-size: 0.85rem;">${escapeHtml(doc.dept)}</div>
    </div>

    <div class="doc-meta-clean" style="margin-bottom: 14px;">
      <div class="doc-row">
        <span>Status:</span>
        <span class="status-pill ${getStatusBadgeClass(doc.status)}">${escapeHtml(doc.status)}</span>
      </div>
      <div class="doc-row">
        <span>Room:</span>
        <span>${escapeHtml(doc.room)}</span>
      </div>
      <div class="doc-row">
        <span>OPD Hours:</span>
        <span>${escapeHtml(doc.timings)}</span>
      </div>
    </div>

    <p style="font-size: 0.82rem; color: #64748b;">
      Click "Generate OPD Token" to get your queue number for consultation.
    </p>
  `;

  openModal("modalAppointment");
}

function submitDemoAppointment() {
  const tokenNum = "TK-" + Math.floor(100 + Math.random() * 900);
  closeModal("modalAppointment");
  alert(`Digital OPD Token Generated!\n\nToken: ${tokenNum}\nEstimated Wait: 15 Minutes\nPlease report to the Nurse Desk.`);
  showToast(`Token ${tokenNum} generated.`);
}

// ================= ADD DOCTOR MODAL =================
function openAddDoctorModal() {
  document.getElementById("modalEditDoctorTitle").innerText = "Add Doctor";
  document.getElementById("editDoctorId").value = "";
  document.getElementById("editDocName").value = "";
  document.getElementById("editDocDept").value = "Cardiology";
  document.getElementById("editDocStatus").value = "Available";
  document.getElementById("editDocRoom").value = "";
  document.getElementById("editDocTimings").value = "";
  document.getElementById("editDocExp").value = "";

  openModal("modalEditDoctor");
}

function saveDoctorForm(e) {
  e.preventDefault();
  const name = document.getElementById("editDocName").value.trim();
  const dept = document.getElementById("editDocDept").value;
  const status = document.getElementById("editDocStatus").value;
  const room = document.getElementById("editDocRoom").value.trim();
  const timings = document.getElementById("editDocTimings").value.trim();
  const exp = document.getElementById("editDocExp").value.trim() || "Consultant";

  const newDoc = {
    id: "doc-" + Date.now(),
    name: name,
    dept: dept,
    experience: exp,
    room: room,
    timings: timings,
    status: status
  };

  doctors.push(newDoc);
  saveData();
  renderAll();
  closeModal("modalEditDoctor");
  showToast(`Added ${name}`);
}

// ================= MODAL HELPERS =================
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add("open");
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove("open");
}

function openInfoModal() {
  openModal("modalInfoSummary");
}

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    e.target.classList.remove("open");
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.open").forEach(m => m.classList.remove("open"));
  }
});

let toastTimeout;
function showToast(message) {
  const toast = document.getElementById("toastNotification");
  const msgEl = document.getElementById("toastMessage");
  if (!toast || !msgEl) return;

  msgEl.innerText = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

function renderAll() {
  updateMetricsBar();
  renderDoctorsList(doctors);
  renderBedMatrix();
  renderProcedures(procedures);
  renderAdmissionSteps();
  renderStaffDoctorsTable();
  renderStaffBedManager();
}

function escapeHtml(string) {
  if (!string) return "";
  return String(string)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
