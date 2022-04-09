"use strict";
const Suralar = document.querySelector(".Suralar");
const box__Left = document.querySelector(".box__Left");
const yozuvKurinish = document.querySelector(".yozuvKurinish");
let ArrBox = [];

// window.innerHeight
const fetchFunc = async function () {
  let a = 1;
  let b = 10;
  box__Left.addEventListener("scroll", (e) => {});
  for (let i = a; i < b; i++) {
    let b = await fetch(`https://api.quran.sutanlab.id/surah/${i}`);
    let bJson = await b.json();
    ArrBox.push(bJson);
    renderFunc(bJson.data);
  }
};
fetchFunc();
let findEl;
const renderFunc = (obj) => {
  let html = ` <div class="card"  id="${obj.name.transliteration.en}">
<p class="num">${obj.name.long}</p>
<p class="nomi">${obj.name.transliteration.en}</p>
</div>`;
  Suralar.insertAdjacentHTML("afterbegin", html);
  const el = document.querySelector(".card");
  el.addEventListener("click", () => {
    yozuvKurinish.innerHTML = "";
    findEl = el.id;
    let filter = ArrBox.find((val) => {
      return val.data.name.transliteration.en == findEl;
    });
    let html2 = `<h2 class="til">${filter.data.name.long}</h2>
     ${filter.data.verses.forEach((element) => {
       let parag = ` <p class="manolri">${element.text.arab}</p>
       <p class="manolri">${element.text.transliteration.en}</p>
       <p class="tafsiv">Tafsiv</p>
       <p class="manolri2">${element.translation.en}</p>
       <audio controls class="audio">
            <source src="${element.audio.secondary[0]}" type="audio/ogg">
            <source src="${element.audio.secondary[0]}" type="audio/mpeg">
          </audio>`;

       yozuvKurinish.insertAdjacentHTML("beforeend", parag);
     })}`;
  });
};
