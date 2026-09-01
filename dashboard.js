function initDashboard() {
  renderKPICards();
  renderDPDBuckets();
  setTimeout(() => {
    renderMonthlyChart();
    renderSlippageChart();
  }, 50);
}

function renderKPICards() {
  const d = window.KPI_DATA;
  const cards = [
    {
      label: 'Collections Done',
      value: d.totalCollectionsDone.toLocaleString('en-IN'),
      change: d.collectionsDoneChange,
      unit: '',
      suffix: ' this month',
      dir: 'up',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
    },
    {
      label: 'Total Outstanding',
      value: '₹' + d.totalOutstanding + ' Cr',
      change: Math.abs(d.outstandingChange),
      unit: '%',
      suffix: ' vs last month',
      dir: 'down-good',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`
    },
    {
      label: 'Avg Collection Rate',
      value: d.avgCollectionRate + '%',
      change: d.collectionRateChange,
      unit: '%',
      suffix: ' vs last month',
      dir: 'up',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`
    },
    {
      label: 'PTP Success Rate',
      value: d.ptpSuccessRate + '%',
      change: d.ptpSuccessChange,
      unit: '%',
      suffix: ' vs last month',
      dir: 'up',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
    }
  ];

  const grid = document.getElementById('kpi-grid');
  if (!grid) return;
  grid.innerHTML = cards.map(c => `
    <div class="card kpi-card">
      <div class="kpi-icon">${c.icon}</div>
      <div class="kpi-label">${c.label}</div>
      <div class="kpi-value">${c.value}</div>
      <div class="kpi-change ${c.dir}">
        ${c.dir === 'down-good'
          ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg> ${c.change}${c.unit} decrease`
          : `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg> ${c.change}${c.unit} increase`
        }
        <span style="color:var(--text-muted);font-weight:400">${c.suffix}</span>
      </div>
    </div>
  `).join('');
}

function renderDPDBuckets() {
  const grid = document.getElementById('dpd-grid');
  if (!grid) return;
  grid.innerHTML = window.DPD_BUCKETS.map(b => `
    <div class="card dpd-card">
      <div class="dpd-card-header">
        <span class="dpd-card-label">${b.label}</span>
        <span class="dpd-indicator" style="background:${b.color}"></span>
      </div>
      <div class="dpd-count">${b.customers.toLocaleString('en-IN')}</div>
      <div class="dpd-count-label">Accounts</div>
      <div class="dpd-amount">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:var(--text-muted)"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        ${b.outstanding} Outstanding
      </div>
      <div class="slippage-header">
        <span class="slippage-label">Slippage Risk</span>
        <span class="slippage-pct" style="color:${b.color}">${b.slippageRisk}%</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width:${b.slippageRisk}%;background:${b.color}"></div>
      </div>
      <div class="slippage-header" style="margin-top:10px;">
        <span class="slippage-label">Resolution Rate</span>
        <span class="slippage-pct" style="color:#16A34A">${b.resolutionRate}%</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width:${b.resolutionRate}%;background:#16A34A"></div>
      </div>
    </div>
  `).join('');
}

function renderMonthlyChart() {
  const ctx = document.getElementById('monthly-chart');
  if (!ctx) return;
  const data = window.MONTHLY_COLLECTIONS;

  if (window._monthlyChart) window._monthlyChart.destroy();
  window._monthlyChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: data.datasets.map(ds => ({
        label: ds.label,
        data: ds.data,
        backgroundColor: ds.color + 'CC',
        borderColor: ds.color,
        borderWidth: 1.5,
        borderRadius: 4,
        borderSkipped: false
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0F1F3D',
          titleFont: { size: 11, family: 'Inter' },
          bodyFont: { size: 12, family: 'Inter' },
          padding: 10,
          cornerRadius: 8,
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y} accounts`
          }
        }
      },
      scales: {
        x: {
          stacked: false,
          grid: { display: false },
          border: { display: false },
          ticks: { font: { size: 11, family: 'Inter' }, color: '#8898B8' }
        },
        y: {
          grid: { color: '#EBF2FF', lineWidth: 1 },
          border: { display: false, dash: [4, 4] },
          ticks: { font: { size: 11, family: 'Inter' }, color: '#8898B8', maxTicksLimit: 5 }
        }
      }
    }
  });
}

function renderSlippageChart() {
  const ctx = document.getElementById('slippage-chart');
  if (!ctx) return;
  const data = window.SLIPPAGE_TREND;

  if (window._slippageChart) window._slippageChart.destroy();
  window._slippageChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: data.datasets.map(ds => ({
        label: ds.label,
        data: ds.data,
        borderColor: ds.color,
        backgroundColor: ds.color + '15',
        borderWidth: 2,
        pointBackgroundColor: ds.color,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.4,
        fill: false
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0F1F3D',
          titleFont: { size: 11, family: 'Inter' },
          bodyFont: { size: 12, family: 'Inter' },
          padding: 10,
          cornerRadius: 8,
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y}%`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { font: { size: 11, family: 'Inter' }, color: '#8898B8' }
        },
        y: {
          min: 0,
          max: 100,
          grid: { color: '#EBF2FF', lineWidth: 1 },
          border: { display: false, dash: [4, 4] },
          ticks: {
            font: { size: 11, family: 'Inter' },
            color: '#8898B8',
            maxTicksLimit: 5,
            callback: v => v + '%'
          }
        }
      }
    }
  });
}
