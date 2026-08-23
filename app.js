let currentView = null;
let dashboardInitialized = false;

function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const view = document.getElementById(name + '-view');
  const nav = document.getElementById('nav-' + name);
  if (view) view.classList.add('active');
  if (nav) nav.classList.add('active');

  const titles = {
    dashboard: { title: 'Collections Dashboard', sub: 'Overview of collection performance across all DPD buckets' },
    customers: { title: 'Customer Portfolio', sub: 'Individual borrower profiles and PTP intent scoring' }
  };
  const t = titles[name] || {};
  const el = document.getElementById('topbar-title');
  const sub = document.getElementById('topbar-subtitle');
  if (el) el.textContent = t.title || '';
  if (sub) sub.textContent = t.sub || '';

  if (name === 'dashboard' && !dashboardInitialized) {
    initDashboard();
    dashboardInitialized = true;
  }
  if (name === 'customers') {
    initCustomers();
  }

  currentView = name;
  window.location.hash = name;
}

document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');
  showView(['dashboard', 'customers'].includes(hash) ? hash : 'dashboard');
});

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '');
  if (hash && hash !== currentView) {
    showView(['dashboard', 'customers'].includes(hash) ? hash : 'dashboard');
  }
});
