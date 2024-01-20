// 41881977-c3e0a259ee9c86064d37a09ba
import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.querySelector('.form');
const input = document.querySelector('.input-text');
const gallery = document.querySelector('.gallery');
const load = document.querySelector('.load');
load.style.display = 'none';
const modal = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchedWord = input.value;

    gallery.innerHTML = '';
    input.value = '';
    load.style.display = 'block';

    const searchParams = new URLSearchParams({
        key: '41881977-c3e0a259ee9c86064d37a09ba',
        q: searchedWord,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true
    })

axios.get(`https://pixabay.com/api/?${searchParams}`)
    .then((response) => {
      if (response.data.hits.length === 0) {
        iziToast.error({
        message: 'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#FAFAFB',
        backgroundColor: '#EF4040',
        position: 'topRight'});
        return;
      }
      const imagesList = response.data.hits.reduce((html, image) => {
        return html + imageCard(image);
      }, '');
      gallery.innerHTML = imagesList;
      modal.refresh();
      load.style.display = 'none';
    })
});

function imageCard(images) {
    return `<li>
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
    </li>
  `;

}