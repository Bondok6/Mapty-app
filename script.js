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

class App {
  // private fields
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField);
  }

  _getPosition() {
    navigator?.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        alert("Could not get you position");
      }
    );
  }

  _loadMap(position) {
    // console.log(position);

    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    // Leaflet -> third-party library to display map
    this.#map = L.map("map").setView(coords, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on("click", this._showForm.bind(this));
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");

    inputDistance.focus();
  }

  _newWorkout(e) {
    e.preventDefault();

    // Clear input fields
    inputDistance.value =
      inputCadence.value =
      inputDuration.value =
      inputElevation.value =
        "";

    inputDistance.focus();

    // console.log(mapEvent);
    const { lat, lng } = this.#mapEvent.latlng;
    const newCoords = [lat, lng];

    L.marker(newCoords)
      .addTo(this.#map)
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

    form.classList.add("hidden");
  }
}

const app = new App();

//____________________________________________________________________________________________

// let map, mapEvent;

// Geolocation Api -> is a browser api
// navigator?.geolocation.getCurrentPosition(
//   function (pos) {
//     // console.log(pos);
//     const { latitude } = pos.coords;
//     const { longitude } = pos.coords;
//     const coords = [latitude, longitude];
//     console.log(coords);
//     console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

//     // Leaflet -> third-party library to display map
//     map = L.map("map").setView(coords, 13);

//     L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     map.on("click", function (mapE) {
//       mapEvent = mapE;
//       form.classList.remove("hidden");
//       inputDistance.focus();
//     });
//   },
//   function () {
//     alert("Could not get you position");
//   }
// );

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   // Clear input fields
//   inputDistance.value =
//     inputCadence.value =
//     inputDuration.value =
//     inputElevation.value =
//       "";

//   inputDistance.focus();

//   // console.log(mapEvent);
//   const { lat, lng } = mapEvent.latlng;
//   const newCoords = [lat, lng];

//   L.marker(newCoords)
//     .addTo(map)
//     .bindPopup(
//       L.popup({
//         maxWidth: 250,
//         minWidth: 100,
//         autoClose: false,
//         closeOnClick: false,
//         className: "running-popup",
//       })
//     )
//     .setPopupContent("Workouts")
//     .openPopup();
// });

// inputType.addEventListener("change", (e) => {
//   inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
//   inputCadence.closest(".form__row").classList.toggle("form__row--hidden");

//   inputDistance.focus();
// });
