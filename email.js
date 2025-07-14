document.addEventListener("DOMContentLoaded", () => {
  const SERVICE_ID = "service_ch2qh7v";
  const TEMPLATE_CONTATO = "template_ux4l55s";
  const TEMPLATE_NEWSLETTER = "template_v31nrws";

  // 📨 Formulário de Contato
  const contatoForm = document.getElementById("contato-form");
  const status = document.getElementById("status-msg");

  if (contatoForm && status) {
    contatoForm.addEventListener("submit", function (e) {
      e.preventDefault();
      status.innerText = "Enviando...";
      status.style.opacity = "1";
      status.classList.remove("fade-out");

      emailjs.sendForm(SERVICE_ID, TEMPLATE_CONTATO, contatoForm)
        .then(() => {
          status.innerText = "Mensagem enviada com sucesso!";
          status.style.color = "#0f0";
          contatoForm.reset();

          setTimeout(() => {
            status.classList.add("fade-out");
          }, 5000);
        })
        .catch((error) => {
          console.error("Erro ao enviar:", error);
          status.innerText = "Erro ao enviar. Tente novamente.";
          status.style.color = "#f00";

          setTimeout(() => {
            status.classList.add("fade-out");
          }, 5000);
        });
    });
  }

  // 📰 Newsletter
  const newsletterForm = document.getElementById("newsletter-form");
  const statusMsg = document.getElementById("newsletter-status");

  if (newsletterForm && statusMsg) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = this.querySelector("input[name='subscriber_name']").value;
      const email = this.querySelector("input[name='subscriber_email']").value;

      statusMsg.style.opacity = "1";
      statusMsg.classList.remove("fade-out");

      emailjs.sendForm(SERVICE_ID, TEMPLATE_NEWSLETTER, newsletterForm)
        .then(() => {
          statusMsg.classList.remove("status-error");
          statusMsg.classList.add("status-success");
          statusMsg.innerText = "✅ Inscrição realizada com sucesso!";

          const data = new URLSearchParams();
          data.append("subscriber_name", name);
          data.append("subscriber_email", email);

          fetch("https://script.google.com/macros/s/AKfycby3WGOw9QzOZswaEFao19WUjG2DRWaF0buCpSud0ROJgs6aAZAfsophHwcuO9pfo7GuIg/exec", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: data.toString(),
          });

          newsletterForm.reset();

          setTimeout(() => {
            statusMsg.classList.add("fade-out");
          }, 5000);
        })
        .catch((error) => {
          console.error("Erro ao enviar inscrição:", error);
          statusMsg.classList.remove("status-success");
          statusMsg.classList.add("status-error");
          statusMsg.innerText = "❌ Ocorreu um erro. Tente novamente.";

          setTimeout(() => {
            statusMsg.classList.add("fade-out");
          }, 5000);
        });
    });
  }
});
