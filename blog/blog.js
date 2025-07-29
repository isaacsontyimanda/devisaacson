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
    })
    .catch(err => {
      postsContainer.innerHTML = "<p>Erro ao carregar os posts.</p>";
      console.error(err);
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
        <p class="link-post">${post.link}
      `;
      postsContainer.appendChild(postEl);
    });
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