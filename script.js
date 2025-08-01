const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const links = sidebar.querySelectorAll('a');
const line2 = document.querySelector('.line2');
const content = document.getElementById('content');
const foot = document.querySelector('.foot');

function closeMenu() {
  menuBtn.classList.remove('active');
  sidebar.classList.remove('active');
  content.classList.remove('blurred');
  foot.classList.remove('blurred'); // remove o blur no footer
  toggleLine2(true);
}

function toggleLine2(show) {
  line2.classList.remove('show', 'hide');
  void line2.offsetWidth; // Reinicia a transição

  // Define a direção da animação
  line2.style.transformOrigin = show ? 'left' : 'right';
  line2.classList.add(show ? 'show' : 'hide');
}

menuBtn.addEventListener('click', () => {
  const isOpening = !menuBtn.classList.contains('active');

  // Alterna a classe 'active' no botão do menu (hambúrguer)
// Isso ativa ou desativa a animação e o estilo do botão
menuBtn.classList.toggle('active');

// Alterna a classe 'active' na sidebar para abrir ou fechar o menu lateral
sidebar.classList.toggle('active');

// Aplica ou remove o desfoque no conteúdo principal enquanto o menu estiver aberto
content.classList.toggle('blurred');

// Aplica ou remove o desfoque no rodapé também
foot.classList.toggle('blurred');


 // Abrindo: hide a linha do meio | Fechando: show a linha do meio
toggleLine2(!isOpening);
});

links.forEach(link => link.addEventListener('click', closeMenu));

document.addEventListener('click', (e) => {
  if (
    sidebar.classList.contains('active') &&
    !sidebar.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    closeMenu();
  }
});

// Loader para a página
// Exibe o loader por um tempo mínimo para melhorar a experiência do usuário
const loader = document.getElementById("loader");

// Simula tempo mínimo de exibição
const MIN_LOADING_TIME = 2000;
const startTime = Date.now();

window.addEventListener("load", () => {
  const elapsed = Date.now() - startTime;
  const remainingTime = MIN_LOADING_TIME - elapsed;

  setTimeout(() => {
    loader.classList.add("hidden");
  }, remainingTime > 0 ? remainingTime : 0);
});

// Slider de projetos
let index = 0;
const slider = document.getElementById('slider');
const slides = slider.querySelectorAll('.slide');
const desc = document.getElementById('desc-slide');

if (slider && desc) {
  function autoSlide() {
    index = (index + 1) % slides.length;
    slider.style.transform = `translateX(-${index * 100}%)`;

    // Adiciona efeito de fade
    desc.classList.add('fade-text');

    setTimeout(() => {
      // Atualiza a descrição diretamente do atributo data-descricao
      const descricao = slides[index]?.dataset?.descricao || "Sem descrição";
      desc.textContent = descricao;
      desc.classList.remove('fade-text');
    }, 200);
  }

  setInterval(autoSlide, 3000);
}

// Redirecionar ao clicar em serviços ativos
  document.querySelectorAll('.service-card:not(.service-disabled)').forEach(card => {
    card.addEventListener('click', () => {
      const contato = document.querySelector('#contato'); // ajusta o ID se for diferente
      if (contato) {
        contato.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Efeito de revelação para elementos com a classe "reveal"
  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');

    for (let i = 0; i < reveals.length; i++) {
      const windowHeight = window.innerHeight;
      const revealTop = reveals[i].getBoundingClientRect().top;
      const revealPoint = 100;

      if (revealTop < windowHeight - revealPoint) {
        reveals[i].classList.add('active');
      }
    }
  }

  window.addEventListener('scroll', revealOnScroll);
  // Ativa ao carregar também
  window.addEventListener('load', revealOnScroll);

/*Animação main*/
  document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("content");
  if (main) {
    requestAnimationFrame(() => {
      main.classList.add("fade-in");
    });
  }
});

/* CSS para alteração entre dark theme e light theme */
// script.js
const toggleBtn = document.getElementById("theme-toggle");
const icon = toggleBtn?.querySelector("i"); // usa optional chaining para evitar erro
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  updateThemeIcon(theme);
}

function getSavedTheme() {
  return localStorage.getItem("theme");
}

function updateThemeIcon(theme) {
  if (!icon) return;
  icon.classList.remove("fa-sun", "fa-moon");
  icon.classList.add(theme === "dark" ? "fa-moon" : "fa-sun");

  // Adiciona a animação de rotação
  icon.classList.add("spin");
  setTimeout(() => icon.classList.remove("spin"), 600);
}

toggleBtn?.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
});

document.addEventListener("DOMContentLoaded", () => {
  let theme = getSavedTheme();

  if (!theme) {
    // Se não tem no localStorage, define com base na hora e preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const hour = new Date().getHours();
    theme = (prefersDark || hour < 6 || hour >= 18) ? "dark" : "light";
  }

  setTheme(theme);
});

// Botão Voltar ao Topo
const btnTopo = document.getElementById("btn-topo");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    btnTopo.classList.add("show");
  } else {
    btnTopo.classList.remove("show");
  }
});

btnTopo.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

