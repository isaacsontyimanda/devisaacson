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

const toggleBtn = document.getElementById("theme-toggle");
const icon = toggleBtn.querySelector("i");
const body = document.body;

function updateThemeIcon(isDark) {
  icon.classList.remove("fa-sun", "fa-moon");
  icon.classList.add(isDark ? "fa-moon" : "fa-sun");

  // Adiciona a animação
  icon.classList.add("spin");
  setTimeout(() => icon.classList.remove("spin"), 600); // Remove para permitir nova animação depois
}

toggleBtn.addEventListener("click", () => {
  const isNowLight = body.classList.toggle("light-theme");
  updateThemeIcon(!isNowLight);
});

// Define tema inicial
document.addEventListener("DOMContentLoaded", () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const hour = new Date().getHours();
  const shouldUseDark = prefersDark || hour < 6 || hour >= 18;

  if (!shouldUseDark) {
    body.classList.add("light-theme");
  }

  updateThemeIcon(shouldUseDark);
});

/* 
  IndexNow - Envio automático de URL para mecanismos de busca compatíveis (como Bing, Yandex)
  Autor: Isaacson Tchimanda
  Data: 13/07/2025
  Descrição: Este script envia automaticamente a URL atual do site para o IndexNow,
  ajudando os buscadores a descobrirem e indexarem páginas atualizadas com mais agilidade.
*/

(function() {
  const url = window.location.href; // Obtém a URL atual da página
  const key = 'd1338c4d25cd428c8475887ba6734e9d'; // Sua chave de API IndexNow
  const keyLocation = 'https://devisaacson.site/indexnow.txt'; // Caminho público onde a chave está hospedada

  // Faz o envio da URL para o endpoint do IndexNow
  fetch(`https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${key}&keyLocation=${keyLocation}`)
    .then(response => {
      if (response.ok) {
        console.log('✅ URL enviada ao IndexNow com sucesso.');
      } else {
        console.warn('⚠️ Falha ao enviar URL ao IndexNow.', response.status);
      }
    })
    .catch(error => {
      console.error('❌ Erro ao conectar ao IndexNow:', error);
    });
})();

/* 
  Envio automático da URL para o IndexNow ao carregar o site
  Autor: Isaacson Tchimanda
  Site: devisaacson.site
*/

document.addEventListener('DOMContentLoaded', () => {
  const url = window.location.href;
  const key = "d1338c4d25cd428c8475887ba6734e9d";
  const keyLocation = "https://devisaacson.site/indexnow.txt";

  fetch(`https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${key}&keyLocation=${keyLocation}`)
    .then(response => {
      if (response.ok) {
        showPopup("✅ URL enviada ao IndexNow com sucesso.");
        console.log("✅ URL enviada ao IndexNow com sucesso.");
      } else {
        showPopup("⚠️ Falha ao enviar URL ao IndexNow.");
        console.warn("⚠️ Falha ao enviar URL ao IndexNow.");
      }
    })
    .catch(error => {
      showPopup("❌ Erro ao conectar ao IndexNow.");
      console.error("❌ Erro ao conectar ao IndexNow:", error);
    });
});

// Função para exibir pop-up
function showPopup(message) {
  const popup = document.createElement("div");
  popup.textContent = message;
  popup.style.position = "fixed";
  popup.style.bottom = "20px";
  popup.style.right = "20px";
  popup.style.padding = "10px 16px";
  popup.style.background = "#222";
  popup.style.color = "#fff";
  popup.style.borderRadius = "8px";
  popup.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
  popup.style.zIndex = "1000";
  popup.style.fontSize = "0.9rem";
  popup.style.opacity = "0";
  popup.style.transition = "opacity 0.4s ease";

  document.body.appendChild(popup);

  setTimeout(() => { popup.style.opacity = "1"; }, 100);
  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => document.body.removeChild(popup), 500);
  }, 4000);
}
