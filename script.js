/*
  COMO ADICIONAR SEUS MATERIAIS:
  - Para imagens: coloque o arquivo dentro da pasta assets e informe o caminho em src.
  - Para abrir uma imagem ampliada, use type: "image".
  - Para abrir um vídeo local, use type: "video" e coloque o caminho do arquivo em url.
  - Para abrir um link externo/YouTube/Vimeo, use type: "link" e informe a URL.
  - Troque os exemplos abaixo pelos SEUS arquivos e links reais.
*/

const projects = {
  // Quando o vídeo estiver no YouTube/Vimeo, troque type: "image" por type: "link"
  // e acrescente url: "https://LINK-DO-VIDEO" — a imagem vira a capa do vídeo.
  weddings: [
    {
      title: "Casamento 01",
      kind: "Vídeo",
      src: "img/casamentos/casamento-1.jpg",
      type: "image",
      alt: "Noivos sorrindo no altar, ela com buquê de flores claras"
    },
    {
      title: "Casamento 02",
      kind: "Vídeo",
      src: "img/casamentos/casamento-2.jpg",
      type: "image",
      alt: "Placa de boas-vindas do casamento de Jhenefer e Nathália em um cavalete à beira do lago"
    }
  ],
  art: [
    {
      title: "Retoques de Rose",
      kind: "Identidade visual",
      src: "img/artes/arte-1.png",
      type: "image",
      alt: "Arte da oficina de costura Retoques de Rose sobre tecido, fita métrica, linha e tesoura"
    },
    {
      title: "Creamy Skincare",
      kind: "Design gráfico",
      src: "img/artes/arte-2.png",
      type: "image",
      alt: "Peça publicitária do protetor solar Creamy com o título leveza e proteção"
    },
    {
      title: "Du Doces",
      kind: "Logotipo",
      src: "img/artes/arte-3.jpg",
      type: "image",
      fit: "contain", // mostra o logo inteiro na miniatura, sem cortar
      alt: "Logotipo Du Doces com um brigadeiro no lugar da letra O"
    }
  ],
  social: [
    {
      title: "Cartaz — Ilha da Pólvora",
      kind: "Arte de divulgação",
      src: "img/social-media/posterilha.jpg",
      type: "image",
      alt: "Cartaz do documentário Ilha da Pólvora: esquecida pela sentença"
    },
    {
      title: "Perfil @ilhadapolvora",
      kind: "Social media",
      src: "img/social-media/instailha.jpg",
      type: "image",
      alt: "Perfil do projeto Ilha da Pólvora no Instagram com as publicações"
    }
  ],
  portraits: [
    {
      title: "Retrato 01",
      kind: "Fotografia",
      src: "img/retratos/retrato-1.jpg",
      type: "image",
      alt: "Mulher de óculos escuros deitada em uma escada de madeira sobre a areia, vista de cima"
    },
    {
      title: "Retrato 02",
      kind: "Fotografia",
      src: "img/retratos/retrato-2.jpg",
      type: "image",
      alt: "Duas amigas de óculos escuros encostadas uma na outra diante de uma porta verde"
    },
    {
      title: "Retrato 03",
      kind: "Fotografia",
      src: "img/retratos/retrato-3.jpg",
      type: "image",
      alt: "Mulher de tranças e lenço na cabeça sorrindo diante de um fundo azul"
    },
    {
      title: "Retrato 04",
      kind: "Fotografia",
      src: "img/retratos/retrato-4.jpg",
      type: "image",
      alt: "Mulher de cabelos cacheados e olhos fechados, com as mãos junto ao pescoço"
    }
  ]
};

// Link do projeto Ilha da Pólvora (perfil no Instagram).
// Se o documentário for publicado no YouTube/Vimeo, troque por esse link.
const islandProjectUrl = "https://www.instagram.com/ilhadapolvora/";

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  mainNav.classList.toggle("open", !isOpen);
  document.body.classList.toggle("locked", !isOpen);
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    document.body.classList.remove("locked");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

function renderGallery(containerId, items, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!items.length) {
    container.innerHTML = `<p class="empty-gallery">${options.emptyText || "Adicione seus materiais no arquivo script.js para exibi-los aqui."}</p>`;
    container.style.display = "block";
    return;
  }

  container.innerHTML = items.map((item, index) => `
    <button class="media-card" type="button" data-gallery="${containerId}" data-index="${index}" aria-label="Abrir ${escapeHtml(item.title)}">
      <span class="media-thumb${item.fit === "contain" ? " media-thumb--contain" : ""}">
        <img src="${escapeAttribute(item.src)}" alt="${escapeAttribute(item.alt || item.title)}">
      </span>
      <span class="media-meta">
        <span class="media-title">${escapeHtml(item.title)}</span>
        <span class="media-kind">${escapeHtml(item.kind || "")}</span>
      </span>
    </button>
  `).join("");

  // Galeria justificada: cada cartão ocupa largura proporcional à imagem,
  // assim a foto aparece inteira e as linhas ficam alinhadas.
  container.querySelectorAll(".media-card img").forEach(img => {
    const setRatio = () => {
      if (img.naturalWidth) img.closest(".media-card").style.setProperty("--ar", img.naturalWidth / img.naturalHeight);
    };
    img.complete ? setRatio() : img.addEventListener("load", setRatio);
  });

  container.querySelectorAll(".media-card").forEach(card => {
    card.addEventListener("click", () => {
      const index = Number(card.dataset.index);
      openMedia(items, index);
    });
  });
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}
function escapeAttribute(value = "") {
  return escapeHtml(value);
}

const lightbox = document.getElementById("lightbox");
const lightboxContent = lightbox.querySelector(".lightbox-content");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
let activeItems = [];
let activeIndex = 0;
let previousFocus = null;

function openMedia(items, index) {
  activeItems = items;
  activeIndex = index;
  previousFocus = document.activeElement;
  showActiveMedia();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("locked");
  lightbox.querySelector(".lightbox-close").focus();
}

function showActiveMedia() {
  const item = activeItems[activeIndex];
  if (!item) return;
  lightboxContent.innerHTML = "";

  if (item.type === "video") {
    const video = document.createElement("video");
    video.src = item.url;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    lightboxContent.appendChild(video);
  } else if (item.type === "link") {
    // Links externos são abertos em nova aba para não prender o usuário no modal.
    window.open(item.url, "_blank", "noopener,noreferrer");
    closeLightbox();
    return;
  } else {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt || item.title || "Imagem do portfólio";
    lightboxContent.appendChild(img);
  }

  lightboxCaption.textContent = `${item.title || ""}${item.kind ? " — " + item.kind : ""}`;
  const multiple = activeItems.length > 1;
  lightbox.querySelector(".lightbox-prev").hidden = !multiple;
  lightbox.querySelector(".lightbox-next").hidden = !multiple;
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("locked");
  lightboxContent.innerHTML = "";
  if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
}
function moveMedia(direction) {
  if (!activeItems.length) return;
  activeIndex = (activeIndex + direction + activeItems.length) % activeItems.length;
  showActiveMedia();
}

lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => moveMedia(-1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => moveMedia(1));
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveMedia(-1);
  if (event.key === "ArrowRight") moveMedia(1);
});

renderGallery("wedding-gallery", projects.weddings, { emptyText: "Adicione seus vídeos de casamento no arquivo script.js." });
// Obs.: os caminhos das imagens são relativos (sem "/" no início) para funcionar
// tanto no Live Server quanto no GitHub Pages.
renderGallery("art-gallery", projects.art, { emptyText: "Adicione suas artes no arquivo script.js." });
renderGallery("social-gallery", projects.social, { emptyText: "Você pode adicionar aqui outros materiais de social media." });
renderGallery("portrait-gallery", projects.portraits, { emptyText: "Adicione seus retratos no arquivo script.js." });

const islandLink = document.getElementById("island-link");
const islandCta = document.getElementById("island-cta");
if (islandProjectUrl.trim()) {
  [islandLink, islandCta].forEach(link => {
    link.href = islandProjectUrl;
    link.target = "_blank";
    link.rel = "noreferrer";
  });
  islandCta.hidden = false;
} else {
  islandLink.href = "#social-media";
  islandLink.addEventListener("click", event => {
    event.preventDefault();
    alert("Adicione o link real do documentário no campo islandProjectUrl, no arquivo script.js.");
  });
  islandCta.href = "#social-media";
  islandCta.addEventListener("click", event => {
    event.preventDefault();
    alert("Adicione o link real do documentário no campo islandProjectUrl, no arquivo script.js.");
  });
}
