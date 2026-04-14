function toggleFaq(btn) {
  const resposta = btn.nextElementSibling;
  const aberta = resposta.classList.contains('aberta');

  // fecha todos
  document.querySelectorAll('.faq-resposta').forEach(r => r.classList.remove('aberta'));
  document.querySelectorAll('.faq-pergunta').forEach(b => b.classList.remove('aberta'));

  // abre o clicado se estava fechado
  if (!aberta) {
    resposta.classList.add('aberta');
    btn.classList.add('aberta');
  }
}

function bindFaqTouch() {
  document.querySelectorAll('.faq-pergunta').forEach(btn => {
    btn.addEventListener('touchend', event => {
      event.preventDefault();
      toggleFaq(btn);
    }, { passive: false });
  });
}

function resetDoacaoTab() {
  document.querySelectorAll('.pag-content').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.pag-tab').forEach(t => t.classList.remove('active'));

  const abaAtiva = localStorage.getItem('abaAtiva');
  const abaTitulo = abaAtiva ? document.getElementById('pag-' + abaAtiva) : null;
  const abaBotao = abaAtiva ? document.querySelector(`[onclick="showPag('${abaAtiva}', this)"]`) : null;

  if (abaTitulo && abaBotao) {
    abaTitulo.classList.add('active');
    abaBotao.classList.add('active');
  } else {
    const pixTab = document.getElementById('pag-pix');
    const pixBtn = document.querySelector('.pag-tab:nth-of-type(1)');
    if (pixTab) pixTab.classList.add('active');
    if (pixBtn) pixBtn.classList.add('active');
  }
}

function showPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));

  const page = document.getElementById('page-' + id);
  if (page) page.classList.add('active');
  if (btn) btn.classList.add('active');

  if (id === 'doacao') resetDoacaoTab();

  localStorage.setItem('paginaAtiva', id);
  window.scrollTo(0, 0);
  closeMobileMenu();
}

function showPag(id, btn) {
  document.querySelectorAll('.pag-content').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.pag-tab').forEach(b => b.classList.remove('active'));
  document.getElementById('pag-' + id).classList.add('active');
  btn.classList.add('active');
  localStorage.setItem('abaAtiva', id);
}

function toggleMobileMenu() {
  const menu = document.querySelector('.nav-links');
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const backdrop = document.querySelector('.menu-backdrop');
  const isOpen = menu.classList.toggle('open');
  toggleBtn.classList.toggle('open', isOpen);
  backdrop.classList.toggle('open', isOpen);
}

function closeMobileMenu() {
  const menu = document.querySelector('.nav-links');
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const backdrop = document.querySelector('.menu-backdrop');
  if (menu) menu.classList.remove('open');
  if (toggleBtn) toggleBtn.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

function initNavigation() {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;

  const navigate = event => {
    const btn = event.target.closest('.nav-link[data-page]');
    if (!btn) return;
    event.preventDefault();
    showPage(btn.dataset.page, btn);
  };

  navLinks.addEventListener('click', navigate);
  navLinks.addEventListener('touchend', navigate, { passive: false });
}

function copiarChave(button) {
  if (!button) return;
  const chave = '123.456.789-01';
  navigator.clipboard.writeText(chave).then(() => {
    const original = button.textContent;
    button.textContent = 'chave copiada!';
    setTimeout(() => button.textContent = original, 2000);
  });
}

function copiarVakinhaLink(button) {
  if (!button) return;
  const vakinhaElement = document.getElementById('vakinha-link');
  const link = vakinhaElement?.href || '';
  if (!link) return;
  navigator.clipboard.writeText(link).then(() => {
    const original = button.textContent;
    button.textContent = 'link copiado!';
    setTimeout(() => button.textContent = original, 2000);
  });
}

function fecharCookies(aceitar) {
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.style.display = 'none';
  localStorage.setItem('cookies_aceitos', aceitar ? 'sim' : 'nao');
}

if (localStorage.getItem('cookies_aceitos')) {
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.style.display = 'none';
}

const themeToggle = document.querySelector('.theme-toggle');
let currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark-theme');
    themeToggle.textContent = '☀️';
    themeToggle.setAttribute('aria-label', 'Ativar modo claro');
  } else {
    document.documentElement.classList.remove('dark-theme');
    themeToggle.textContent = '🌙';
    themeToggle.setAttribute('aria-label', 'Ativar modo escuro');
  }
}

applyTheme(currentTheme);

themeToggle.addEventListener('click', () => {
  const next = document.documentElement.classList.contains('dark-theme') ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

window.addEventListener('load', () => {
  setTimeout(() => {
    const paginaAtiva = localStorage.getItem('paginaAtiva');
    if (paginaAtiva && paginaAtiva !== 'home') {
      const pageBtn = document.querySelector(`.nav-link[data-page="${paginaAtiva}"]`);
      if (pageBtn) showPage(paginaAtiva, pageBtn);
    }
    const abaAtiva = localStorage.getItem('abaAtiva');
    if (abaAtiva) {
      const abaBtn = document.querySelector(`[onclick="showPag('${abaAtiva}', this)"]`);
      if (abaBtn) showPag(abaAtiva, abaBtn);
    }
    bindFaqTouch();
    initNavigation();
  }, 50);
});
