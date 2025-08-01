
document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("search-bar");
  const postsContainer = document.getElementById("posts-container");

  fetch("posts.json")
    .then(res => res.json())
    .then(posts => {
      renderPosts(posts);

      searchBar.addEventListener("input", () => {
        const query = searchBar.value.toLowerCase();
        const filtered = posts.filter(post =>
          post.title.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
        );
        renderPosts(filtered);
      });
    });

  function renderPosts(posts) {
    postsContainer.innerHTML = "";
    posts.forEach(post => {
      const postEl = document.createElement("div");
      postEl.className = "blog-post";
      postEl.innerHTML = `
        <h2>${post.title}</h2>
        <div class="meta">${post.date} • ${post.author}</div>
        <p>${post.content}</p>
        <a class="link-post" href="post.html?slug=${post.slug}">Ver post completo</a>
      `;
      postsContainer.appendChild(postEl);
    });
  }
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

window.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = "1";
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