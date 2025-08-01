document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("slug");

  fetch("posts.json")
    .then(res => res.json())
    .then(posts => {
      const post = posts.find(p => p.slug === slug);

      if (!post) {
        document.body.innerHTML = "<p>Post não encontrado.</p>";
        return;
      }

      document.title = post.title + " | Dev_Isaacson";
      document.getElementById("post-title").textContent = post.title;
      document.getElementById("post-meta").textContent = `${post.date} • ${post.author}`;

      fetch(post.htmlFile)
        .then(res => res.text())
        .then(html => {
          const postContent = document.getElementById("post-content");
          postContent.innerHTML = html;

          // Ativar Scroll Reveal nos elementos carregados
          const reveals = postContent.querySelectorAll('.reveal');
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.1 });

          reveals.forEach(reveal => {
            observer.observe(reveal);
          });
        });
    });
});

// Botão Voltar ao Topo
const btnTopo = document.getElementById("btn-topo");

window.addEventListener("scroll", () => {
  btnTopo.classList.toggle("show", window.scrollY > 200);
});

btnTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
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