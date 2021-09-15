"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

// Geolocation Api -> is a browser api
navigator?.geolocation.getCurrentPosition(
  function (pos) {
    // console.log(pos);
    const { latitude } = pos.coords;
    const { longitude } = pos.coords;
    const coords = [latitude, longitude];
    console.log(coords);
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    // Leaflet -> third-party library to display map
    const map = L.map("map").setView(coords, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.on("click", function (mapEvent) {
      // console.log(mapEvent);
      const { lat, lng } = mapEvent.latlng;
      const newCoords = [lat, lng];

      L.marker(newCoords)
        .addTo(map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: "running-popup",
          })
        )
        .setPopupContent("Workouts")
        .openPopup();
    });
  },
  function () {
    alert("Could not get you position");
  }
);
