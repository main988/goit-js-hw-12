import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function imageTemplate({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img
          class="gallery-image"
          src="${webformatURL}"
          alt="${tags}"
        />
      </a>
      <div class="info-block">
        <div class="info-item">
          <p class="label">Likes</p>
          <p class="value">${likes}</p>
        </div>
        <div class="info-item">
          <p class="label">Views</p>
          <p class="value">${views}</p>
        </div>
        <div class="info-item">
          <p class="label">Comments</p>
          <p class="value">${comments}</p>
        </div>
        <div class="info-item">
          <p class="label">Downloads</p>
          <p class="value">${downloads}</p>
        </div>
      </div>
    </li>
  `;
}

export function createGallery(images) {
  const markup = images.map(imageTemplate).join('');
  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  if (loader) {
    loader.classList.remove('is-hidden');
  }
}

export function hideLoader() {
  if (loader) {
    loader.classList.add('is-hidden');
  }
}

export function showLoadMoreButton() {
  if (loadMoreBtn) {
    loadMoreBtn.classList.remove('is-hidden');
  }
}

export function hideLoadMoreButton() {
  if (loadMoreBtn) {
    loadMoreBtn.classList.add('is-hidden');
  }
}