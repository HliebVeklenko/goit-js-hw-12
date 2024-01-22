// 41881977-c3e0a259ee9c86064d37a09ba
import axios from "axios";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.querySelector('.form');
const addMoreButton = document.querySelector('.add-more-button');
const input = document.querySelector('.input-text');
const gallery = document.querySelector('.gallery');
const load = document.querySelector('.load'); load.style.display = 'none';
const modal = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let page = 1;
let totalHits;
let per_page = 40;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  page = 1;
  gallery.innerHTML = '';
  loadGallery();
  addMoreButton.addEventListener('click', loadMore);
  addMoreButton.style.display = 'block';
})


async function loadMore() {
  page += 1;
  await loadGallery();
}

function updateButtonVisibility() {
  const totalPages = Math.ceil(totalHits / per_page);
  if (page >= totalPages) {
    addMoreButton.style.display = 'none';
    iziToast.show({
      message: `We're sorry, but you've reached the end of search results.`,
      position: 'topRight',
    })
  }
}

async function loadGallery() {
  const searchedWord = input.value;
  const searchParams = new URLSearchParams({
    key: '41881977-c3e0a259ee9c86064d37a09ba',
    q: searchedWord,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  })
  load.style.display = 'block';
  try {
    await axios.get(`https://pixabay.com/api/?${searchParams}&per_page=${per_page}&page=${page}`)
      .then((response) => {
        load.style.display = 'none';
        totalHits = response.data.totalHits;
        if (totalHits > 0) {              
          const imagesList = response.data.hits.reduce((html, image) => {
            return html + imageCard(image);
          }, '');        
          gallery.innerHTML += imagesList;
          modal.refresh();
          const card = document.querySelector('.card');
          const cardHeight = card.getBoundingClientRect().height;
          window.scrollBy({
            top: 2 * cardHeight,
            behavior: 'smooth'
          });
        } else {
          addMoreButton.style.display = 'none';
        iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#FAFAFB',
          backgroundColor: '#EF4040',
          position: 'topRight'
      });
        return;
      }
      updateButtonVisibility();
    })
    .catch ((error) => {
      console.log(error)
    })
  } catch (error) {
    console.log(error);
  }
}

function imageCard(images) {
  return `<li class="card">
    <a href="${images.largeImageURL}">
      <img src="${images.webformatURL}" alt="${images.tags}">
    </a>
    <div class="info">
      <div class="crit-info">
        <span>Likes</span>
        <span class="crit-value">${images.likes}</span>
      </div>
      <div class="crit-info">
        <span>Views</span>
        <span class="crit-value">${images.views}</span>
      </div>
      <div class="crit-info">
        <span>Comments</span>
        <span class="crit-value">${images.comments}</span>
      </div>
      <div class="crit-info">
        <span>Downloads</span>
        <span class="crit-value">${images.downloads}</span>
      </div>
    </div>
  </li>`;
}