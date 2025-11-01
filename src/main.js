import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';

import {
  clearGallery,
  createGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
const perPage = 15;

const toastOptions = {
  title: 'Error',
  message: 'Sorry, there are no images matching your search query. Please try again!',
  backgroundColor: '#EF4040',
  messageColor: '#FFFFFF',
  position: 'topRight',
};

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  const query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Search field cannot be empty!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;
    const images = data.hits;

    if (images.length === 0) {
      iziToast.error(toastOptions);
      return;
    }

    createGallery(images);
    checkLoadMoreStatus();
  } catch (error) {
    console.error(error);
    handleError(error);
  } finally {
    hideLoader();
    searchForm.reset();
  }
}

async function onLoadMore() {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const images = data.hits;

    createGallery(images);
    checkLoadMoreStatus();
    smoothScroll();
  } catch (error) {
    console.error(error);
    handleError(error);
  } finally {
    hideLoader();
  }
}

function checkLoadMoreStatus() {
  const totalPages = Math.ceil(totalHits / perPage);

  if (currentPage >= totalPages) {
    hideLoadMoreButton();
    if (totalHits > 0) {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } else {
    showLoadMoreButton();
  }
}

function smoothScroll() {
  const galleryItem = document.querySelector('.gallery-item');
  if (galleryItem) {
    const cardHeight = galleryItem.getBoundingClientRect().height;
    
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

function handleError(error) {
  iziToast.error({
    title: 'Error',
    message: 'Something went wrong while fetching images. Please try again!',
    position: 'topRight',
  });
}