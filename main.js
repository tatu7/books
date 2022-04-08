"use strict";
const Suralar = document.querySelector(".Suralar");

const fetchFunc = async function () {
  let a = await fetch(`http://api.alquran.cloud/v1/surah`);
  let aJson = await a.json();
  renderFunc(aJson.data);
  console.log(aJson);
};
fetchFunc();
const renderFunc = (Arr) => {
  let ArrBox = [];
  let findEl;
  Arr.forEach((obj) => {
    ArrBox.push(obj);
    let html = ` <div class="card"  id="${obj.number}">
<p class="num">${obj.name}</p>
<p class="nomi">${obj.englishName}</p>
</div>`;
    Suralar.insertAdjacentHTML("afterbegin", html);
    const el = document.querySelector(".card");
    el.addEventListener("click", () => {
      findEl = el.id;
      let topilgan = ArrBox.find((el) => {
        return findEl == el.number;
      });
      // console.log(topilgan.englishName);
      for (let i = 1; i < 10; i++) {
        fetch(
          `https://api.alquran.cloud/v1/ayah/${i}/editions/quran-uthmani,uz.sodik`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data.data[0].surah.englishName);
            if (data.data[0].surah.englishName == topilgan.englishName) {
              console.log(data.data[0].surah.englishName);
            }
          });
      }
    });
  });
};
