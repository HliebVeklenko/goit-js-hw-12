import{S as h,a as g,i as u}from"./assets/vendor-bad0427b.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const v=document.querySelector(".form"),i=document.querySelector(".add-more-button"),b=document.querySelector(".input-text"),p=document.querySelector(".gallery"),l=document.querySelector(".load");l.style.display="none";const L=new h(".gallery a",{captionsData:"alt",captionDelay:250});let c=1,d,y=40;v.addEventListener("submit",async t=>{t.preventDefault(),c=1,p.innerHTML="",f(),i.addEventListener("click",w),i.style.display="block"});async function w(){c+=1,await f()}function S(){const t=Math.ceil(d/y);c>=t&&(i.style.display="none",u.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}async function f(){const t=b.value,s=new URLSearchParams({key:"41881977-c3e0a259ee9c86064d37a09ba",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0});l.style.display="block";try{await g.get(`https://pixabay.com/api/?${s}&per_page=${y}&page=${c}`).then(a=>{if(l.style.display="none",d=a.data.totalHits,d>0){const n=a.data.hits.reduce((r,m)=>r+$(m),"");p.innerHTML+=n,L.refresh();const o=document.querySelector(".card").getBoundingClientRect().height;window.scrollBy({top:2*o,behavior:"smooth"})}else{i.style.display="none",u.error({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",backgroundColor:"#EF4040",position:"topRight"});return}S()}).catch(a=>{console.log(a)})}catch(a){console.log(a)}}function $(t){return`<li class="card">
    <a href="${t.largeImageURL}">
      <img src="${t.webformatURL}" alt="${t.tags}">
    </a>
    <div class="info">
      <div class="crit-info">
        <span>Likes</span>
        <span class="crit-value">${t.likes}</span>
      </div>
      <div class="crit-info">
        <span>Views</span>
        <span class="crit-value">${t.views}</span>
      </div>
      <div class="crit-info">
        <span>Comments</span>
        <span class="crit-value">${t.comments}</span>
      </div>
      <div class="crit-info">
        <span>Downloads</span>
        <span class="crit-value">${t.downloads}</span>
      </div>
    </div>
  </li>`}
//# sourceMappingURL=commonHelpers.js.map