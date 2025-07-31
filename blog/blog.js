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
        <p class="link-post">${post.link}</p>
      `;
      postsContainer.appendChild(postEl);
    });
  }
});

// Loader para a página
const loader = document.getElementById("loader");

// Simula tempo mínimo de exibição
const MIN_LOADING_TIME = 1000;
const startTime = Date.now();

window.addEventListener("load", () => {
  const elapsed = Date.now() - startTime;
  const remainingTime = MIN_LOADING_TIME - elapsed;

  setTimeout(() => {
    loader.classList.add("hidden");
  }, remainingTime > 0 ? remainingTime : 0);
});

 