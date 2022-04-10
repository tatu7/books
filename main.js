"use strict";
const Suralar = document.querySelector(".Suralar");
const box__Left = document.querySelector(".box__Left");
const box__Right = document.querySelector(".box__Right");
const yozuvKurinish = document.querySelector(".yozuvKurinish");
const btnMenu = document.querySelector(".btnMenu");
let ArrBox = [];

// window.innerHeight
let i = 1;
btnMenu.addEventListener("click", () => {
  if (i == 1) {
    box__Left.style.display = "block";
    box__Left.style.opacity = "1";
    btnMenu.textContent = "Close";
    i = 0;
  } else if (i == 0) {
    box__Left.style.display = "none";
    box__Left.style.opacity = "0";
    btnMenu.textContent = "Menu";
    i = 1;
  }
});

const fetchFunc = async function () {
  let a = 1;
  let b = 114;
  let nomi = await fetch(`https://api.quran.sutanlab.id/surah`);
  let nomiJson = await nomi.json();
  let uzb = await fetch(
    `https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/uzb-alaaudeenmansou.json`
  );
  let uzbJson = await uzb.json();

  for (let i = a; i <= b; i++) {
    let b = await fetch(`https://api.quran.sutanlab.id/surah/${i}`);
    let bJson = await b.json();
    ArrBox.push(bJson);
    renderFunc(bJson.data, uzbJson.quran, nomiJson.data);
  }
};
fetchFunc();
let findEl;
const renderFunc = (obj, uzb, nomi) => {
  let uzbArr = uzb.filter((val) => {
    return val.chapter == obj.number;
  });
  Suralar.innerHTML = "";
  nomi.forEach((val) => {
    let div = document.createElement("div");
    let p1 = document.createElement("p");
    p1.textContent = val.name.long;
    p1.classList.add("num");
    let p2 = document.createElement("p");
    p2.textContent = val.name.transliteration.en;
    p2.classList.add("nomi");
    div.classList.add("card");
    div.id = `${val.name.transliteration.en}`;
    div.appendChild(p1);
    div.appendChild(p2);
    Suralar.append(div);
    div.addEventListener("click", () => {
      box__Right.style.display = "block";
      yozuvKurinish.innerHTML = "";
      findEl = div.id;
      let filter = ArrBox.find((val) => {
        return val.data.name.transliteration.en == findEl;
      });

      for (let i = 0; i < ArrBox.length; i++) {
        let parag = ` 
        <p class="manolri">${i + 1} ${filter.data.verses[i].text.arab}</p>
        <p class="manolri">${filter.data.verses[i].text.transliteration.en}</p>
        <p class="tafsiv">English</p>
        <p class="manolri2">${filter.data.verses[i].translation.en}</p>
        <p class="tafsiv">Uzbek</p>
        <p class="manolri2">${uzbArr[i] ? uzbArr[i].text : ""}</p>
        <audio controls class="audio">
             <source src="${
               filter.data.verses[i].audio.secondary[0]
             }" type="audio/ogg">
             <source src="${
               filter.data.verses[i].audio.secondary[0]
             }" type="audio/mpeg">
           </audio>`;
        yozuvKurinish.insertAdjacentHTML("beforeend", parag);
      }
    });
    // let html = ` <div class="card"  id="${val.name.transliteration.en}">
    // <p class="num">${val.name.long}</p>
    // <p class="nomi">${val.name.transliteration.en}</p>
    // </div>`;
    // Suralar.insertAdjacentHTML("beforebegin", html);
  });
  //   let html = ` <div class="card"  id="${obj.name.transliteration.en}">
  // <p class="num">${obj.name.long}</p>
  // <p class="nomi">${obj.name.transliteration.en}</p>
  // </div>`;
  // let login = nomi.forEach((val) => {
  //   val.addEventListener("click", () => {
  //     console.log(val);
  //   });
  // });

  // div.addEventListener("click", () => {});
};
