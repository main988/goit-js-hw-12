import{a as S,S as E,i as c}from"./assets/vendor-BgmC94F3.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const P="53021043-6beb26dd5ed38e7bac2943366",q="https://pixabay.com/api/";async function p(e,r){const s={key:P,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15};try{return(await S.get(q,{params:s})).data}catch(a){throw console.error("Error fetching images:",a),new Error("Failed to fetch images from API")}}const g=document.querySelector(".gallery"),l=document.querySelector(".loader"),d=document.querySelector(".load-more-btn");let F=new E(".gallery a",{captionsData:"alt",captionDelay:250});function M({webformatURL:e,largeImageURL:r,tags:s,likes:a,views:t,comments:o,downloads:i}){return`
    <li class="gallery-item">
      <a class="gallery-link" href="${r}">
        <img
          class="gallery-image"
          src="${e}"
          alt="${s}"
        />
      </a>
      <div class="info-block">
        <div class="info-item">
          <p class="label">Likes</p>
          <p class="value">${a}</p>
        </div>
        <div class="info-item">
          <p class="label">Views</p>
          <p class="value">${t}</p>
        </div>
        <div class="info-item">
          <p class="label">Comments</p>
          <p class="value">${o}</p>
        </div>
        <div class="info-item">
          <p class="label">Downloads</p>
          <p class="value">${i}</p>
        </div>
      </div>
    </li>
  `}function h(e){const r=e.map(M).join("");g.insertAdjacentHTML("beforeend",r),F.refresh()}function B(){g.innerHTML=""}function y(){l&&l.classList.remove("is-hidden")}function v(){l&&l.classList.add("is-hidden")}function $(){d&&d.classList.remove("is-hidden")}function m(){d&&d.classList.add("is-hidden")}const b=document.querySelector(".form"),O=document.querySelector(".load-more-btn");let n=1,u="",f=0;const I=15,R={title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#EF4040",messageColor:"#FFFFFF",position:"topRight"};b.addEventListener("submit",x);O.addEventListener("click",A);async function x(e){e.preventDefault();const r=e.currentTarget.elements["search-text"].value.trim();if(!r){c.error({title:"Error",message:"Search field cannot be empty!",position:"topRight"});return}u=r,n=1,B(),m(),y();try{const s=await p(u,n);f=s.totalHits;const a=s.hits;if(a.length===0){c.error(R);return}h(a),L()}catch(s){console.error(s),w()}finally{v(),b.reset()}}async function A(){n+=1,y(),m();try{const r=(await p(u,n)).hits;h(r),L(),C()}catch(e){console.error(e),w()}finally{v()}}function L(){const e=Math.ceil(f/I);n>=e?(m(),f>0&&c.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):$()}function C(){const e=document.querySelector(".gallery-item");if(e){const r=e.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}}function w(e){c.error({title:"Error",message:"Something went wrong while fetching images. Please try again!",position:"topRight"})}
//# sourceMappingURL=index.js.map
