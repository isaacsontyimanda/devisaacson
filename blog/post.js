
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
          document.getElementById("post-content").innerHTML = html;
        });
    });
});
