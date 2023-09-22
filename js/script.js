// global variables//
var map;
var service;
var enter = $('#submit')
let cityInput = $('#destination')
var clear = $('#clear')
var trips = [];
var previous = document.querySelector('#previous');

// pulls destination fro input and displays on map
function saveDestination(eventObj) {
  eventObj.preventDefault();
  let durationInput = $("#duration")
  var trip = {
    city: cityInput.val(),
    duration: durationInput.val()
  }
  console.log(trip);
  trips.push(trip);
  localStorage.setItem('trips', JSON.stringify(trips));
  showLocation();
}
// clears loacl storage
function resetTrips() {
  localStorage.clear();
}

// click events//
enter.click(saveDestination);
clear.click(resetTrips);




// Function to initialize the Google Map
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: { lat: 0, lng: 0 }, // Default to the center of the world
  });

  return map;
}

// Function to show a location on the map
function showLocation() {
  var locationInput = document.getElementById('destination').value;
  var map = initMap();

  // Create a Geocoder object to convert location input into coordinates
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ address: locationInput }, (results, status) => {
      if (status === 'OK') {
          const location = results[0].geometry.location;
          map.setCenter(location);

          // Create a marker to mark the location
          var marker = new google.maps.Marker({
              map: map,
              position: location,
              title: locationInput,
          });
      } else {
          alert('Geocode was not successful for the following reason: ' + status);
      }
  });
}











const apiKey = '358fcb793a53c3da26743ae950044af5'; 
const zipCode = '07860'; 
let cityNameCountry = ''
var weatherOutput = $('#weather')


function showWeather() {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameCountry}&units=imperial&appid=${apiKey}`;
    fetch(apiUrl)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .then(data => {
   var info = data.main
   var place = data.name
   var temp = data.main.temp
   var feelsLike = data.main.feels_like

$(weatherOutput).append('<p>' + place + ', ' + temp + ', ' + feelsLike, '</p>')
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
}
document.querySelector('#submit').addEventListener('click', function () {
 cityNameCountry = cityInput.val()
  showWeather()
})





