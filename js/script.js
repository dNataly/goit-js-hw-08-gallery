import defaultArray from "./gallery-items.js";

const refs = {
  galleryList: document.querySelector("ul.js-gallery"),
  modalWindow: document.querySelector(".lightbox"),
  modalOverlay: document.querySelector("div.lightbox__overlay"),
  modalContent: document.querySelector("lightbox__content"),
  modalImg: document.querySelector("img.lightbox__image"),
  modalCloseBtn: document.querySelector(".lightbox__button"),
};

function createGallery() {
  const createImagesList = (array) =>
    array
      .map(({ preview, original, description }) => {
        return `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"></a></li>`;
      })
      .join("");
  refs.galleryList.insertAdjacentHTML("beforeend", createImagesList(defaultArray));
}
createGallery(defaultArray);

refs.galleryList.addEventListener("click", modalOpen);

function modalOpen(evt) {
  if (evt.target === refs.galleryList) {
    return;
  }
  evt.preventDefault();
  refs.modalWindow.classList.add("is-open");
  refs.modalImg.src = evt.target.dataset.source;
  refs.modalImg.alt = evt.target.alt;
}

refs.modalCloseBtn.addEventListener("click", closeModal);
refs.modalOverlay.addEventListener("click", closeModal);
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});
function closeModal() {
  refs.modalWindow.classList.remove("is-open");
  refs.modalImg.src = "";
  refs.modalImg.alt = "";
}

const arrayImages = [];
defaultArray.map(({ original }) => arrayImages.push(original));

document.addEventListener("keydown", (e) => {
  let imgIndex = 1;
  const currentIndex = arrayImages.indexOf(refs.modalImg.src);
  if (e.key === "ArrowLeft") {
      imgIndex = currentIndex - 1;
      if (imgIndex == -1) {
        imgIndex = arrayImages.length - 1;
      }
    } else if (e.key === "ArrowRight") {
      imgIndex = currentIndex + 1;
      if (imgIndex === arrayImages.length) {
        imgIndex = 0;
      }
    }
    refs.modalImg.src = arrayImages[imgIndex];
});
