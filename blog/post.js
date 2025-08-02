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

const form = document.getElementById("comment-form");
const textArea = document.getElementById("comment-text");
const list = document.getElementById("comment-list");

// Carregar comentários do localStorage
window.addEventListener("DOMContentLoaded", () => {
  const comments = JSON.parse(localStorage.getItem("blog_comments")) || [];
  comments.forEach(comment => addComment(comment));
});

// Adicionar comentário
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const comment = textArea.value.trim();
  if (comment === "") return;

  addComment(comment);
  saveComment(comment);
  textArea.value = "";
});

function addComment(text) {
  const li = document.createElement("li");
  li.textContent = text;
  list.appendChild(li);
}

function saveComment(comment) {
  const comments = JSON.parse(localStorage.getItem("blog_comments")) || [];
  comments.push(comment);
  localStorage.setItem("blog_comments", JSON.stringify(comments));
}

function loadComments() {
  const commentList = document.getElementById("comment-list");
  commentList.innerHTML = "";

  const comments = JSON.parse(localStorage.getItem("comments") || "[]");

  comments.forEach((comment, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${comment}
      <button class="btn-delete" onclick="deleteComment(${index})" title="Excluir comentário">
        <i class="fas fa-trash"></i>
      </button>
    `;
    commentList.appendChild(li);
  });
}

function deleteComment(index) {
  const comments = JSON.parse(localStorage.getItem("comments") || "[]");
  comments.splice(index, 1); // Remove 1 item na posição index
  localStorage.setItem("comments", JSON.stringify(comments));
  loadComments(); // Recarrega a lista
}

// Garante que comentários sejam carregados ao abrir o post
document.addEventListener("DOMContentLoaded", loadComments);
