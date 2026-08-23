let activeFilters = { dpd: [], propensity: [], ptp: [], loanType: [] };
let searchQuery = '';
let filterPanelOpen = false;

function initCustomers() {
  renderCustomerCards(getFilteredCustomers());
  bindCustomerEvents();
}

function getFilteredCustomers() {
  return window.CUSTOMERS.filter(c => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || c.name.toLowerCase().includes(q) ||
      c.loanId.toLowerCase().includes(q) || c.phone.includes(q);

    const matchDpd = !activeFilters.dpd.length || activeFilters.dpd.includes(c.dpd);
    const matchPropensity = !activeFilters.propensity.length || activeFilters.propensity.includes(c.propensity);
    const matchPtp = !activeFilters.ptp.length || activeFilters.ptp.includes(c.ptpStatus);
    const matchLoan = !activeFilters.loanType.length || activeFilters.loanType.includes(c.loanType);

    return matchSearch && matchDpd && matchPropensity && matchPtp && matchLoan;
  });
}

function renderCustomerCards(customers) {
  const grid = document.getElementById('customers-grid');
  const meta = document.getElementById('customers-meta');
  if (!grid) return;

  if (meta) {
    meta.innerHTML = `Showing <span>${customers.length}</span> of <span>${window.CUSTOMERS.length}</span> customers`;
  }

  if (!customers.length) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <div class="no-results-text">No customers match your current filters.<br>Try adjusting your search or filter criteria.</div>
      </div>`;
    return;
  }

  grid.innerHTML = customers.map(c => {
    const propClass = c.propensity.toLowerCase();
    const dpdClass = 'badge-dpd-' + (c.dpd === '90+' ? '90-plus' : c.dpd.replace('-', '-'));
    const scoreColor = propClass === 'green' ? 'var(--green)' : propClass === 'amber' ? 'var(--amber)' : 'var(--red-risk)';
    const ptpDotClass = c.ptpStatus === 'PTP Given' ? 'green' : c.ptpStatus === 'Broken PTP' ? 'red' : 'amber';
    const ptpText = c.ptpStatus === 'PTP Given'
      ? `${c.ptpStatus} · ${c.ptpDate} · ${c.ptpAmount}`
      : c.ptpStatus === 'Broken PTP'
        ? `${c.ptpStatus} (${c.ptpDate})`
        : 'No PTP committed yet';

    return `
      <div class="card customer-card" onclick="openDetailPanel(${c.id})">
        <div class="customer-card-top">
          <div class="customer-avatar" style="background:${c.avatarBg}">${c.initials}</div>
          <div class="customer-meta">
            <div class="customer-name">${c.name}</div>
            <div class="customer-loan-id">${c.loanId}</div>
          </div>
          <div class="propensity-badge-top">
            <span class="propensity-badge ${propClass}">${c.propensity}</span>
          </div>
        </div>

        <div class="badges-row">
          <span class="badge badge-loan">${c.loanType}</span>
          <span class="badge ${dpdClass}">${c.dpd} DPD · ${c.dpdDays}d</span>
        </div>

        <div class="score-row">
          <div class="score-bar-wrap">
            <div class="score-bar-label">Propensity Score</div>
            <div class="score-track">
              <div class="score-fill" style="width:${c.propensityScore}%;background:${scoreColor}"></div>
            </div>
          </div>
          <div class="score-number ${propClass}">${c.propensityScore}</div>
        </div>

        <div class="ptp-info">
          <span class="ptp-dot ${ptpDotClass}"></span>
          <span class="ptp-label">${c.ptpStatus}</span>
          ${c.ptpDate ? `<span style="color:var(--text-muted)">·</span><span>${c.ptpDate}</span>` : ''}
          ${c.ptpAmount ? `<span style="color:var(--text-muted)">·</span><span style="font-weight:600;color:var(--text-primary)">${c.ptpAmount}</span>` : ''}
        </div>

        <button class="view-link" onclick="event.stopPropagation();openDetailPanel(${c.id})">View Details →</button>
      </div>
    `;
  }).join('');
}

function openDetailPanel(id) {
  const c = window.CUSTOMERS.find(x => x.id === id);
  if (!c) return;

  const propClass = c.propensity.toLowerCase();
  const scoreDesc = {
    Green: 'High likelihood of repayment — low intervention needed',
    Amber: 'Moderate risk — active follow-up required',
    Red: 'High risk of NPA — escalation recommended'
  }[c.propensity];

  const iconMap = {
    phone: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 10.5 19.79 19.79 0 0 1 1.61 2 2 2 0 0 1 3.6 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 7.91a16 16 0 0 0 5.47 5.47l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/></svg>`,
    chat: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
    email: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    visit: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    legal: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`
  };

  const panelBody = document.getElementById('detail-panel-body');
  panelBody.innerHTML = `
    <div class="detail-header">
      <button class="detail-close-btn" onclick="closeDetailPanel()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="detail-header-top">
        <div class="detail-avatar" style="background:${c.avatarBg}">${c.initials}</div>
        <div class="detail-customer-info">
          <div class="detail-customer-name">${c.name}</div>
          <div class="detail-loan-id">${c.loanId} · ${c.loanType}</div>
        </div>
      </div>
      <div class="detail-header-badges">
        <span class="propensity-badge ${propClass}">${c.propensity} Propensity</span>
        <span class="badge badge-loan">${c.loanType}</span>
        <span class="badge badge-dpd-${c.dpd === '90+' ? '90-plus' : c.dpd.replace('-', '-')}">${c.dpd} DPD · ${c.dpdDays} days</span>
      </div>
    </div>

    <div class="detail-stat-row">
      <div class="detail-stat">
        <div class="detail-stat-label">Outstanding</div>
        <div class="detail-stat-value">${c.outstandingAmount}</div>
      </div>
      <div class="detail-stat">
        <div class="detail-stat-label">PTP Status</div>
        <div class="detail-stat-value" style="color:${c.ptpStatus === 'PTP Given' ? 'var(--green)' : c.ptpStatus === 'Broken PTP' ? 'var(--red-risk)' : 'var(--amber)'}">${c.ptpStatus}</div>
      </div>
      <div class="detail-stat">
        <div class="detail-stat-label">Contact</div>
        <div class="detail-stat-value" style="font-size:12px">${c.phone}</div>
      </div>
    </div>

    <div class="detail-content">

      <div class="detail-section">
        <div class="detail-section-heading">AI-Generated Summary</div>
        <div class="ai-box">
          <div class="ai-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            AI Analysis · Based on ${c.interactions.length} interactions
          </div>
          <div class="ai-text">${c.aiSummary}</div>
        </div>
      </div>

      <div class="detail-section">
        <div class="detail-section-heading">PTP Intent</div>
        <div class="ptp-box">
          <div class="ptp-row">
            <span class="ptp-row-label">PTP Status</span>
            <span class="ptp-row-value" style="color:${c.ptpStatus === 'PTP Given' ? 'var(--green)' : c.ptpStatus === 'Broken PTP' ? 'var(--red-risk)' : 'var(--amber)'}">${c.ptpStatus}</span>
          </div>
          <div class="ptp-row">
            <span class="ptp-row-label">Committed Amount</span>
            <span class="ptp-row-value">${c.ptpAmount || '—'}</span>
          </div>
          <div class="ptp-row">
            <span class="ptp-row-label">PTP Date</span>
            <span class="ptp-row-value">${c.ptpDate || '—'}</span>
          </div>
          <div class="ptp-row">
            <span class="ptp-row-label">Days Past Due</span>
            <span class="ptp-row-value">${c.dpdDays} days</span>
          </div>
        </div>
      </div>

      <div class="detail-section">
        <div class="detail-section-heading">Interaction History</div>
        <div class="timeline">
          ${c.interactions.map(i => `
            <div class="tl-item">
              <div class="tl-icon">${iconMap[i.icon] || iconMap.phone}</div>
              <div class="tl-body">
                <div class="tl-meta">
                  <span>${i.date}</span>
                  <span>·</span>
                  <strong>${i.channel}</strong>
                  <span>·</span>
                  <span>${i.agent}</span>
                  ${i.duration !== '—' ? `<span>·</span><span>${i.duration}</span>` : ''}
                </div>
                <div class="tl-outcome">${i.outcome}</div>
                <div class="tl-notes">${i.notes}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="detail-section">
        <div class="detail-section-heading">Propensity Score Breakdown</div>
        <div class="score-display ${propClass}">
          <div class="score-circle ${propClass}">
            <div class="score-circle-num">${c.propensityScore}</div>
            <div class="score-circle-label">/ 100</div>
          </div>
          <div class="score-desc-block">
            <div class="score-status ${propClass}">${c.propensity} Risk</div>
            <div class="score-desc-text">${scoreDesc}</div>
          </div>
        </div>
        <ul class="score-reasons-list">
          ${c.scoreReasons.map(r => `
            <li class="score-reason-item">
              <span class="score-reason-arrow">→</span>
              <span>${r}</span>
            </li>
          `).join('')}
        </ul>
      </div>

    </div>
  `;

  document.getElementById('detail-overlay').classList.add('open');
  document.getElementById('detail-panel').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDetailPanel() {
  document.getElementById('detail-overlay').classList.remove('open');
  document.getElementById('detail-panel').classList.remove('open');
  document.body.style.overflow = '';
}

function toggleFilterPanel() {
  filterPanelOpen = !filterPanelOpen;
  const panel = document.getElementById('filter-panel');
  const btn = document.getElementById('filter-btn');
  if (filterPanelOpen) {
    panel.classList.add('open');
    btn.classList.add('active');
  } else {
    panel.classList.remove('open');
    btn.classList.remove('active');
  }
}

function toggleChip(el, filterKey, value) {
  const idx = activeFilters[filterKey].indexOf(value);
  if (idx >= 0) {
    activeFilters[filterKey].splice(idx, 1);
    el.classList.remove('selected');
  } else {
    activeFilters[filterKey].push(value);
    el.classList.add('selected');
  }
  updateFilterCount();
}

function updateFilterCount() {
  const total = Object.values(activeFilters).reduce((s, a) => s + a.length, 0);
  const badge = document.getElementById('filter-count');
  if (badge) {
    badge.textContent = total;
    badge.classList.toggle('visible', total > 0);
  }
}

function applyFilters() {
  renderCustomerCards(getFilteredCustomers());
  toggleFilterPanel();
}

function resetFilters() {
  activeFilters = { dpd: [], propensity: [], ptp: [], loanType: [] };
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('selected'));
  updateFilterCount();
  renderCustomerCards(getFilteredCustomers());
}

function bindCustomerEvents() {
  const searchInput = document.getElementById('customer-search');
  if (searchInput && !searchInput._bound) {
    searchInput._bound = true;
    searchInput.addEventListener('input', e => {
      searchQuery = e.target.value;
      renderCustomerCards(getFilteredCustomers());
    });
  }

  document.addEventListener('click', e => {
    const panel = document.getElementById('filter-panel');
    const btn = document.getElementById('filter-btn');
    if (filterPanelOpen && panel && btn && !panel.contains(e.target) && !btn.contains(e.target)) {
      filterPanelOpen = false;
      panel.classList.remove('open');
      btn.classList.remove('active');
    }
  }, { capture: true });
}
