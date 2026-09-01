function initDashboard() {
  renderKPICards();
  setTimeout(() => {
    renderBucketAnalysis();
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

/* ── Bucket Analysis (interactive) ─────────────────────────────── */
const BUCKET_LABEL_MAP = {
  '0-30': '0–30 DPD', '30-60': '30–60 DPD',
  '60-90': '60–90 DPD', '90+': '90+ DPD', 'settlement': 'Settlement'
};

function renderBucketAnalysis() {
  updateBucketView('0-30');
}

function selectBucket(key) {
  updateBucketView(key);
}

function updateBucketView(key) {
  const dsLabel = BUCKET_LABEL_MAP[key];
  const bucket   = (window.DPD_BUCKETS || []).find(b => b.label === dsLabel);
  const collDs   = (window.MONTHLY_COLLECTIONS.datasets || []).find(d => d.label === dsLabel);
  const slipDs   = (window.SLIPPAGE_TREND.datasets || []).find(d => d.label === dsLabel);
  if (!bucket || !collDs) return;

  const riskLabel = bucket.slippageRisk <= 20 ? 'Low Risk'
    : bucket.slippageRisk <= 45 ? 'Moderate'
    : bucket.slippageRisk <= 65 ? 'High Risk' : 'Critical';

  const statsEl = document.getElementById('bucket-stats');
  if (statsEl) {
    statsEl.innerHTML = `
      <div class="bucket-stat">
        <div class="bucket-stat-label">Active Accounts</div>
        <div class="bucket-stat-value" style="color:${bucket.color}">${bucket.customers.toLocaleString('en-IN')}</div>
        <div class="bucket-stat-sub">in this bucket</div>
      </div>
      <div class="bucket-stat">
        <div class="bucket-stat-label">Outstanding</div>
        <div class="bucket-stat-value">${bucket.outstanding}</div>
        <div class="bucket-stat-sub">total exposure</div>
      </div>
      <div class="bucket-stat">
        <div class="bucket-stat-label">Resolution Rate</div>
        <div class="bucket-stat-value" style="color:#16A34A">${bucket.resolutionRate}%</div>
        <div class="bucket-stat-sub">accounts resolved</div>
      </div>
      <div class="bucket-stat">
        <div class="bucket-stat-label">Slippage Risk</div>
        <div class="bucket-stat-value" style="color:${bucket.color}">${bucket.slippageRisk}%</div>
        <div class="bucket-stat-sub">${riskLabel}</div>
      </div>`;
  }

  updateBucketChart(collDs, slipDs, bucket);
}

function updateBucketChart(collDs, slipDs, bucket) {
  const ctx = document.getElementById('bucket-chart');
  if (!ctx) return;
  if (window._bucketChart) window._bucketChart.destroy();

  const labels = window.MONTHLY_COLLECTIONS.labels;
  const color  = bucket.color;

  window._bucketChart = new Chart(ctx, {
    data: {
      labels,
      datasets: [
        {
          type: 'bar',
          label: 'Accounts Resolved',
          data: collDs.data,
          backgroundColor: color + 'BB',
          borderColor: color,
          borderWidth: 1.5,
          borderRadius: 6,
          borderSkipped: false,
          yAxisID: 'y'
        },
        {
          type: 'line',
          label: 'Slippage Risk %',
          data: slipDs ? slipDs.data : [],
          borderColor: '#DC2626',
          backgroundColor: '#DC262610',
          borderWidth: 2,
          pointBackgroundColor: '#DC2626',
          pointRadius: 3,
          pointHoverRadius: 5,
          tension: 0.4,
          fill: false,
          yAxisID: 'y2'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0F1F3D',
          titleFont: { size: 11, family: 'Inter' },
          bodyFont: { size: 12, family: 'Inter' },
          padding: 10,
          cornerRadius: 8,
          callbacks: {
            label: ctx => ctx.datasetIndex === 0
              ? ` Accounts resolved: ${ctx.parsed.y}`
              : ` Slippage risk: ${ctx.parsed.y}%`
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
          position: 'left',
          grid: { color: '#EBF2FF', lineWidth: 1 },
          border: { display: false },
          ticks: { font: { size: 11, family: 'Inter' }, color: '#8898B8', maxTicksLimit: 5 },
          title: { display: true, text: 'Accounts resolved', font: { size: 10, family: 'Inter' }, color: '#8898B8' }
        },
        y2: {
          position: 'right',
          min: 0, max: 100,
          grid: { display: false },
          border: { display: false },
          ticks: {
            font: { size: 11, family: 'Inter' },
            color: '#DC2626',
            maxTicksLimit: 5,
            callback: v => v + '%'
          },
          title: { display: true, text: 'Slippage risk', font: { size: 10, family: 'Inter' }, color: '#DC2626' }
        }
      }
    }
  });
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

