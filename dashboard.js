function initDashboard() {
  renderKPICards();
  renderDPDBuckets();
  setTimeout(() => {
    renderMonthlyChart();
    renderSlippageChart();
    renderCaseStatusChart();
  }, 50);
}

/* ── Sparkline SVG helper ───────────────────────────────────────── */
function makeSpark(data, color, w, h) {
  w = w || 220; h = h || 48;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 4;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return [+x.toFixed(1), +y.toFixed(1)];
  });
  const polyPts  = pts.map(([x, y]) => `${x},${y}`).join(' ');
  const fillPts  = `0,${h} ` + polyPts + ` ${w},${h}`;
  const gid      = 'sg' + color.replace(/[^a-z0-9]/gi, '');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}"
      preserveAspectRatio="none" style="display:block;">
    <defs>
      <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0.01"/>
      </linearGradient>
    </defs>
    <polygon points="${fillPts}" fill="url(#${gid})"/>
    <polyline points="${polyPts}" fill="none" stroke="${color}"
      stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${pts[pts.length-1][0]}" cy="${pts[pts.length-1][1]}"
      r="3.5" fill="${color}" stroke="white" stroke-width="1.5"/>
  </svg>`;
}

/* ── KPI Cards ──────────────────────────────────────────────────── */
function renderKPICards() {
  const d  = window.KPI_DATA;
  const tr = window.KPI_TRENDS;

  const cards = [
    {
      label: 'Collections Done',
      value: d.totalCollectionsDone.toLocaleString('en-IN'),
      suffix: 'accounts resolved this month',
      change: d.collectionsDoneChange,
      changeLabel: 'vs last month',
      dir: 'up',
      color: '#16A34A',
      spark: tr.collections,
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
    },
    {
      label: 'Total Outstanding',
      value: '₹' + d.totalOutstanding + ' Cr',
      suffix: 'across all DPD buckets',
      change: Math.abs(d.outstandingChange),
      changeLabel: 'decrease vs last month',
      dir: 'down-good',
      color: '#2563EB',
      spark: tr.outstanding,
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`
    },
    {
      label: 'Avg Collection Rate',
      value: d.avgCollectionRate + '%',
      suffix: 'of accounts in resolution',
      change: d.collectionRateChange,
      changeLabel: 'vs last month',
      dir: 'up',
      color: '#7C3AED',
      spark: tr.collectionRate,
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`
    },
    {
      label: 'PTP Success Rate',
      value: d.ptpSuccessRate + '%',
      suffix: 'of PTPs honored on time',
      change: d.ptpSuccessChange,
      changeLabel: 'vs last month',
      dir: 'up',
      color: '#D97706',
      spark: tr.ptpSuccess,
      icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
    }
  ];

  const grid = document.getElementById('kpi-grid');
  if (!grid) return;

  grid.innerHTML = cards.map(c => {
    const isGood = c.dir === 'up' || c.dir === 'down-good';
    const arrowSvg = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">${
      isGood ? '<polyline points="18 15 12 9 6 15"/>' : '<polyline points="6 9 12 15 18 9"/>'
    }</svg>`;
    return `
    <div class="card kpi-card-v2">
      <div class="kpi2-top">
        <div class="kpi2-icon" style="background:${c.color}18;color:${c.color}">${c.icon}</div>
        <div class="kpi2-change-chip ${isGood ? 'up' : 'down'}">
          ${arrowSvg} ${c.change}%
        </div>
      </div>
      <div class="kpi2-value">${c.value}</div>
      <div class="kpi2-label">${c.label}</div>
      <div class="kpi2-suffix">${c.suffix}</div>
      <div class="kpi2-spark">${makeSpark(c.spark, c.color)}</div>
    </div>`;
  }).join('');
}

/* ── DPD Bucket Cards ───────────────────────────────────────────── */
function renderDPDBuckets() {
  const grid = document.getElementById('dpd-grid');
  if (!grid) return;

  const dsMap = {};
  (window.MONTHLY_COLLECTIONS.datasets || []).forEach(ds => {
    dsMap[ds.label] = ds.data;
  });

  const bucketLabelMap = {
    '0-30': '0–30 DPD', '30-60': '30–60 DPD',
    '60-90': '60–90 DPD', '90+': '90+ DPD', 'settlement': 'Settlement'
  };

  grid.innerHTML = window.DPD_BUCKETS.map(b => {
    const sparkData = dsMap[b.label] || [];
    const spark = sparkData.length ? makeSpark(sparkData, b.color, 220, 44) : '';

    const riskLevel = b.slippageRisk <= 20 ? 'Low Risk'
      : b.slippageRisk <= 45 ? 'Moderate Risk'
      : b.slippageRisk <= 65 ? 'High Risk' : 'Critical';

    return `
    <div class="card dpd-card-v2">
      <div class="dpd2-header" style="border-color:${b.color}">
        <div class="dpd2-label-row">
          <span class="dpd2-label">${b.label}</span>
          <span class="dpd2-risk-pill" style="background:${b.color}18;color:${b.color}">
            <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${b.color};margin-right:5px;vertical-align:middle;"></span>${riskLevel}
          </span>
        </div>
        <div class="dpd2-count">${b.customers.toLocaleString('en-IN')}</div>
        <div class="dpd2-count-label">Active Accounts</div>
      </div>

      <div class="dpd2-chips">
        <div class="dpd2-chip">
          <div class="dpd2-chip-label">Outstanding</div>
          <div class="dpd2-chip-value">${b.outstanding}</div>
        </div>
        <div class="dpd2-chip">
          <div class="dpd2-chip-label">Resolution</div>
          <div class="dpd2-chip-value" style="color:#16A34A">${b.resolutionRate}%</div>
        </div>
        <div class="dpd2-chip">
          <div class="dpd2-chip-label">Slippage</div>
          <div class="dpd2-chip-value" style="color:${b.color}">${b.slippageRisk}%</div>
        </div>
      </div>

      <div class="dpd2-spark">${spark}</div>
    </div>`;
  }).join('');
}

/* ── Case Status Donut ──────────────────────────────────────────── */
function renderCaseStatusChart() {
  const ctx = document.getElementById('case-status-chart');
  if (!ctx || !window.CASE_STATUS) return;
  const d = window.CASE_STATUS;
  if (window._caseChart) window._caseChart.destroy();
  window._caseChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: d.labels,
      datasets: [{
        data: d.data,
        backgroundColor: d.colors.map(c => c + 'DD'),
        borderColor: d.colors,
        borderWidth: 2,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            font: { size: 11, family: 'Inter' },
            color: '#4A5E80',
            padding: 14,
            usePointStyle: true,
            pointStyleWidth: 8,
            generateLabels: chart => {
              const ds = chart.data.datasets[0];
              return chart.data.labels.map((label, i) => ({
                text: `${label}  ${ds.data[i]}%`,
                fillStyle: ds.backgroundColor[i],
                strokeStyle: ds.borderColor[i],
                pointStyle: 'circle',
                index: i
              }));
            }
          }
        },
        tooltip: {
          backgroundColor: '#0F1F3D',
          titleFont: { size: 11, family: 'Inter' },
          bodyFont: { size: 12, family: 'Inter' },
          padding: 10,
          cornerRadius: 8,
          callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` }
        }
      }
    }
  });
}

/* ── Monthly Collections Bar ────────────────────────────────────── */
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
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y} accounts` }
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

/* ── Slippage Trend Line ────────────────────────────────────────── */
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
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y}%` }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: { font: { size: 11, family: 'Inter' }, color: '#8898B8' }
        },
        y: {
          min: 0, max: 100,
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
