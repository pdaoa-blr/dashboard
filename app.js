// Fetch and initialize data
let appData = null;

async function init() {
  try {
    const response = await fetch('data.json');
    appData = await response.json();
    
    // Set official link
    document.getElementById('officialLink').href = appData.officialLink;
    
    // Set header subtitle
    document.getElementById('headerSubtitle').textContent = `Welcome to the Pavani Divine Community! Stay updated with the latest news, events, and important information about our apartment complex.`;
    
    setupMonthSelector();
    loadMonthData(appData.months[0].id);
    
    // Setup navigation
    setupNavigation();
  } catch (error) {
    console.error('Error loading data:', error);
  }
}


function setupMonthSelector() {
  const selector = document.getElementById('monthSelector');
  
  // Populate dropdown with months (latest first)
  selector.innerHTML = appData.months.map(month => 
    `<option value="${month.id}">${month.label}</option>`
  ).join('');
  
  // Add change event listener
  selector.addEventListener('change', (e) => {
    loadMonthData(e.target.value);
  });
}


function loadMonthData(monthId) {
  // Find the selected month data
  currentMonthData = appData.months.find(m => m.id === monthId);
  
  if (!currentMonthData) {
    console.error('Month not found:', monthId);
    return;
  }
  
  // Re-render all tabs with new month data
  renderDashboard();
  renderFinancials();
  renderFacilities();
  renderProjects();
  renderDocuments();
}


function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.dataset.tab;
      
      // Update nav items
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
      // Update tab contents
      tabContents.forEach(content => content.classList.remove('active'));
      document.getElementById(`tab-${tab}`).classList.add('active');
    });
  });
}

function renderDashboard() {
  const container = document.getElementById('tab-dashboard');
  
  container.innerHTML = `
    <!-- Hero Section -->
    <div class="hero">
      <img src="./assets/images/pd.webp?auto=format&fit=crop&w=1200&q=80" alt="Pavani Divine Exterior" class="hero-image" crossorigin="anonymous">
      <div class="hero-overlay">
        <div>
          <h2 class="hero-title">Pavani Divine</h2>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-header">
          <div class="stat-icon indigo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="12" width="20" height="12" rx="2"/><path d="M12 12h.01"/><path d="M17 12a5 5 0 0 0-10 0"/></svg>
          </div>
          <span class="stat-badge indigo">Income</span>
        </div>
        <h3 class="stat-label">Maintenance Collected</h3>
        <p class="stat-value">${currentMonthData.financials.maintenanceCollected}</p>
        <p class="stat-footer">For ${currentMonthData.financials.month}</p>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <div class="stat-icon amber">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
        </div>
        <h3 class="stat-label">Weekly Activities</h3>
        <p class="stat-value">${appData.weeklyActivities.length} Classes</p>
        <p class="stat-footer">Karate, Dance, Meditation & more</p>
      </div>
    </div>

    <!-- Dashboard Grid -->
    <div class="dashboard-grid">
      <!-- Weekly Schedule -->
      <section>
        <div class="section-header">
          <h2 class="section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Clubhouse Weekly Activities
          </h2>
        </div>
        <div class="activity-list">
          ${appData.weeklyActivities.map(item => `
            <div class="activity-card">
              <div class="activity-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div class="activity-content">
                <div class="activity-header">
                  <span class="activity-day">${item.day}</span>
                  <span class="activity-time">${item.time}</span>
                </div>
                <h4 class="activity-name">${item.activity}</h4>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- What's Coming Next -->
      <section>
        <div class="section-header">
          <h2 class="section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
            What's Coming Next?
          </h2>
        </div>
        <div class="update-list">
          ${currentMonthData.whatsComingNext.map(update => `
            <div class="update-card">
              <p class="update-text">${update}</p>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}

function renderFinancials() {
  const container = document.getElementById('tab-financials');
  const colors = ['#4F46E5', '#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#64748B'];
  
  container.innerHTML = `
    <div class="section-header">
      <h2 class="section-title" style="font-size: 1.5rem;">Financial Highlights</h2>
      <span style="font-size: 0.875rem; color: var(--slate-500); font-weight: 500;">${currentMonthData.label}</span>
    </div>

    <div class="financial-grid">
      <div class="financial-card">
        <div class="financial-icon indigo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="12" width="20" height="12" rx="2"/><path d="M12 12h.01"/><path d="M17 12a5 5 0 0 0-10 0"/></svg>
        </div>
        <h4 class="financial-label">Corpus & Deposits</h4>
        <p class="financial-value">${currentMonthData.financials.corpus}</p>
      </div>
      <div class="financial-card">
        <div class="financial-icon emerald">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
        </div>
        <h4 class="financial-label">Maintenance Collected</h4>
        <p class="financial-value">${currentMonthData.financials.maintenanceCollected}</p>
      </div>
      <div class="financial-card">
        <div class="financial-icon blue">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"/><path d="M17.64 15L22 10.64"/></svg>
        </div>
        <h4 class="financial-label">Infra Fund</h4>
        <p class="financial-value">${currentMonthData.financials.infraFund}</p>
      </div>
      <div class="financial-card">
        <div class="financial-icon amber">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <h4 class="financial-label">Stalls Income</h4>
        <p class="financial-value">${currentMonthData.financials.stalls}</p>
      </div>
    </div>

    <div class="expense-section">
      <div class="expense-chart-card">
        <h3 class="chart-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
          Major Monthly Expenses
        </h3>
        
        <div class="chart-container">
          <svg viewBox="0 0 200 200" width="160" height="160">
            ${generateDonutChart(currentMonthData.financials.expenseBreakdown, colors)}
          </svg>
        </div>

        <div class="chart-legend">
          ${currentMonthData.financials.expenseBreakdown.map((item, idx) => `
            <div class="legend-item">
              <span class="legend-color" style="background: ${colors[idx % colors.length]}"></span>
              <span>${item.name}</span>
            </div>
          `).join('')}
        </div>

        <div class="expense-summary">
          <div class="expense-row">
            <span class="expense-row-label">Total Operational Expenses</span>
            <span class="expense-row-value">${currentMonthData.financials.totalOperationalExpenses}</span>
          </div>
          <div class="expense-row">
            <span class="expense-row-label">Cauvery Water EMI</span>
            <span class="expense-row-value">${currentMonthData.financials.cauveryEMI}</span>
          </div>
          <div class="expense-highlight">
            <span class="expense-highlight-label">Remaining for O&M</span>
            <span class="expense-highlight-value">${currentMonthData.financials.remainingOM}</span>
          </div>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div class="fund-plan-card">
          <div class="fund-plan-bg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01"/><path d="M17 12a5 5 0 0 0-10 0"/></svg>
          </div>
          <h3 class="fund-plan-title">Fund Collection Plan</h3>
          <ul class="fund-plan-list">
            <li class="fund-plan-item">
              <div class="fund-plan-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </div>
              <p class="fund-plan-text">Kaveri fund collection will be completed by July 2026</p>
            </li>
            <li class="fund-plan-item">
              <div class="fund-plan-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </div>
              <p class="fund-plan-text">Corpus Fund collection will continue for two additional months thereafter</p>
            </li>
            <li class="fund-plan-item">
              <div class="fund-plan-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
              </div>
              <p class="fund-plan-text">No additional special fund collection is planned for this year</p>
            </li>
          </ul>
        </div>

        <div class="management-card">
          <h3 class="management-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            Financial Management
          </h3>
          <p class="management-text">Any additional financial requirement, if necessary, will be managed through:</p>
          <ul class="management-list">
            <li class="management-item">
              <span class="management-dot"></span>
              Interest earned from Fixed Deposits (FDs)
            </li>
            <li class="management-item">
              <span class="management-dot"></span>
              Optimized expense control
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Miscellaneous Expenses Table -->
    <div class="misc-expenses-card">
      <div class="misc-header">
        <div>
          <h3 class="misc-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
            Miscellaneous Expenses
          </h3>
          <p class="misc-subtitle">Detailed breakdown of one-time costs for ${currentMonthData.label}</p>
        </div>
        <div class="misc-total">
          <span class="misc-total-label">Total Misc</span>
          <span class="misc-total-value">${currentMonthData.financials.totalMisc}</span>
        </div>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th style="width: 3rem;">S.No</th>
              <th>Item</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${currentMonthData.financials.miscExpenses.map(expense => `
              <tr>
                <td>${expense.id}</td>
                <td>${expense.item}</td>
                <td>${expense.description}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function generateDonutChart(data, colors) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const centerX = 100;
  const centerY = 100;
  const outerRadius = 80;
  const innerRadius = 60;
  
  let paths = '';
  let startAngle = -90;
  
  data.forEach((item, idx) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;
    
    const startRadians = (startAngle * Math.PI) / 180;
    const endRadians = (endAngle * Math.PI) / 180;
    
    const x1 = centerX + outerRadius * Math.cos(startRadians);
    const y1 = centerY + outerRadius * Math.sin(startRadians);
    const x2 = centerX + outerRadius * Math.cos(endRadians);
    const y2 = centerY + outerRadius * Math.sin(endRadians);
    const x3 = centerX + innerRadius * Math.cos(endRadians);
    const y3 = centerY + innerRadius * Math.sin(endRadians);
    const x4 = centerX + innerRadius * Math.cos(startRadians);
    const y4 = centerY + innerRadius * Math.sin(startRadians);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    const pathData = [
      `M ${x1} ${y1}`,
      `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
      'Z'
    ].join(' ');
    
    paths += `<path d="${pathData}" fill="${colors[idx % colors.length]}" />`;
    
    startAngle = endAngle;
  });
  
  return paths;
}

function renderFacilities() {
  const container = document.getElementById('tab-facilities');
  
  const facilityIcons = {
    'Gymnasium': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6.5 6.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 1 0-7 0"/><path d="M14 17.5a3 3 0 1 0 6 0 3 3 0 1 0-6 0"/><path d="M20.5 6.5h-7"/><path d="M14.5 20.5H3.5"/></svg>',
    'Swimming Pool': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>',
    'Clubhouse': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>'
  };
  
  container.innerHTML = `
    <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem;">Apartment Facilities</h2>
    <div class="facilities-grid">
      ${appData.facilities.map(facility => `
        <div class="facility-card">
          <div class="facility-header">
            <div class="facility-info">
              <div class="facility-icon">
                ${facilityIcons[facility.name] || facilityIcons['Clubhouse']}
              </div>
              <div>
                <h3 class="facility-name">${facility.name}</h3>
                <div class="facility-status">
                  <span class="status-dot ${facility.status.toLowerCase()}"></span>
                  <span>${facility.status}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="facility-details">
            <div class="facility-timing">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${facility.timings}</span>
            </div>
            <div class="facility-rules">
              <div class="rules-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Rules & Guidelines
              </div>
              <p>"${facility.rules}"</p>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderProjects() {
  const container = document.getElementById('tab-projects');
  
  container.innerHTML = `
    <h2 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem;">Major Ongoing Projects</h2>
    <div class="projects-grid">
      ${appData.projects.map(project => `
        <div class="project-card">
          <div class="project-header">
            <h3 class="project-name">${project.name}</h3>
            <span class="project-cost">${project.cost}</span>
          </div>
          <div class="project-body">
            <div class="project-status-section">
              <span class="project-label">Status</span>
              <p class="project-status">${project.status}</p>
            </div>
            <div class="project-next">
              <span class="project-next-label">What's Next</span>
              <p class="project-next-text">${project.next}</p>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderDocuments() {
  const container = document.getElementById('tab-documents');
  
  container.innerHTML = `
    <div class="documents-container">
      <div class="section-header" style="margin-bottom: 1.5rem;">
        <h2 class="section-title" style="font-size: 1.5rem;">Communication & Documents</h2>
      </div>
      
      <div class="documents-section">
        <h3 class="documents-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
          Monthly Newsletters
        </h3>
        <div class="newsletter-grid">
          ${appData.newsletters.map(newsletter => `
            <a href="${newsletter.link}" target="_blank" rel="noopener noreferrer" class="newsletter-item">
              <div class="newsletter-info">
                <div class="newsletter-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <span class="newsletter-name">${newsletter.month} Newsletter</span>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          `).join('')}
        </div>
      </div>

      <div class="documents-section">
        <h3 class="documents-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          Communication Channels
        </h3>
        <p class="communication-text">
          We insist on <strong>MyGate</strong> because the Facility Manager first handles issues there. If unresolved, it escalates to the Managing Committee.
        </p>
        <div class="communication-grid">
          ${appData.communicationChannels.map((channel, idx) => `
            <a href="${channel.link}" target="_blank" rel="noopener noreferrer" class="communication-item">
              <span class="communication-name">${channel.title}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="communication-link-icon"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          `).join('')}
        </div>
      </div>

      <div class="documents-section">
        <h3 class="documents-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
          Important Documents
        </h3>
        <div class="documents-grid">
          ${appData.documents.map(doc => `
            <a href="${doc.link}" target="_blank" rel="noopener noreferrer" class="document-item">
              <div class="document-info">
                <div class="document-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                </div>
                <span class="document-name">${doc.title}</span>
              </div>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// Initialize app
document.addEventListener('DOMContentLoaded', init);
