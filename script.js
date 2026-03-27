function resetDoacaoTab() {
  const custom = document.getElementById('valor-custom');
  if (custom) custom.style.display = 'none';

  document.querySelectorAll('.valor-btn').forEach(b => b.classList.remove('active'));
  const defaultBtn = document.querySelector('.valor-btn:nth-of-type(2)');
  if (defaultBtn) defaultBtn.classList.add('active');

  atualizarImpacto(25);

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
  document.querySelectorAll('.valor-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const custom = document.getElementById('valor-custom');
  if (valor === 0) {
    custom.style.display = 'block';
    custom.focus();
    custom.oninput = () => atualizarImpacto(Number(custom.value));
  } else {
    custom.style.display = 'none';
    atualizarImpacto(valor);
  }
}

function atualizarImpacto(valor) {
  const litros = Math.round(valor / 5);
  const agua = (litros * 1000000).toLocaleString('pt-BR');
  const txt = document.getElementById('impacto-txt');
  if (txt && valor > 0) {
    txt.innerHTML = `Com <strong>R$ ${valor}</strong> conseguimos coletar e processar <strong>${litros} litros de óleo</strong>, evitando a contaminação de <strong>${agua} litros de água</strong>.`;
  }
}

function copiarChave() {
  const btn = document.querySelector('.copiar-btn');
  btn.textContent = 'chave copiada!';
  setTimeout(() => btn.textContent = 'copiar chave PIX', 2000);
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
