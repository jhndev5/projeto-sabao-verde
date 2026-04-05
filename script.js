function resetDoacaoTab() {
  document.querySelectorAll('.pag-content').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.pag-tab').forEach(t => t.classList.remove('active'));
  const pixTab = document.getElementById('pag-pix');
  const pixBtn = document.querySelector('.pag-tab:nth-of-type(1)');
  if (pixTab) pixTab.classList.add('active');
  if (pixBtn) pixBtn.classList.add('active');
}

function showPage(id, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  if (btn) btn.classList.add('active');

  if (id === 'doacao') {
    resetDoacaoTab();
  }

  window.scrollTo(0, 0);
}

function showPag(id, btn) {
  document.querySelectorAll('.pag-content').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.pag-tab').forEach(b => b.classList.remove('active'));
  document.getElementById('pag-' + id).classList.add('active');
  btn.classList.add('active');
}

function selecionarValor(btn, valor) {
  // removido: seleção de valor para doação
}

function atualizarImpacto(valor) {
  const txt = document.getElementById('impacto-txt');
  if (txt) {
    txt.innerHTML = 'Sua contribuição ajuda a coletar óleo, proteger rios e fortalecer a comunidade.';
  }
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
