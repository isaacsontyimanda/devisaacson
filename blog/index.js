
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
