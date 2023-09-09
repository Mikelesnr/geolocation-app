'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');


const renderCountry = function(data, className = ""){
  const html = `
        <article class="country ${className}">
          <img class="country__img" src=https://flagsapi.com/${data.cca2}/shiny/64.png />
          <div class="country__data">
            <h3 class="country__name">${Object.values(data.name)[0]}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>🧑‍🤝‍🧑</span>${(+data.population/1000000).toFixed(1)}M people</p>
            <p class="country__row"><span>🗣️</span>${Object.values(data.name)[0] === 'Zimbabwe'?
            Object.values(data.languages)[7]:Object.values(data.languages)[0]}</p>
            <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
          </div>
        </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
}

const getJSON = (url)=>{
  return (fetch(url)
    .then((response) => {

      if(!response.ok)
        throw new Error(`country not found ${response.status}`)
      
      return response.json()
    
}))
}


const fetchCountryData = function(country){
  let neighbour
  let url =`https://restcountries.com/v3.1/name/${country}`;
    getJSON(url).then((data)=>{renderCountry(data[0])
    
      neighbour = data[0].borders[0];

      if(!neighbour) throw new Error("No Neighbour found");

      //country 2
      url = `https://restcountries.com/v3.1/alpha/${neighbour}`;
      return getJSON(url)
    })
    .then((data)=>{renderCountry(data[0], 'neighbour')})
    .catch(err => alert(err))
    .finally(()=> {
      countriesContainer.style.opacity = 1;
    })
  
}

const getPosition = function () {
  return new Promise(function(resolve,reject){
    navigator.geolocation.getCurrentPosition(resolve,reject);
  })
};

function whereAmI(lat,long) {
  getPosition().then(pos => {
      const {latitude : lat, longitude: long} = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${long}?geoit=json&auth=994719422283797871829x95799`);
  
  })
  .then(response => {

    if(!response.ok)
        throw new Error(`country not found ${response.status}`)
      
      return response.json()
  })
  .then(data => fetchCountryData(data.country.toLowerCase()))
  .catch(err => alert(err))
  .finally(()=> {
    countriesContainer.style.opacity = 1;
  })
  
}

btn.addEventListener('click', whereAmI);