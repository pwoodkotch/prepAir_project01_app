// global variables//
var map;
var service;
var enter = $('#submit')
let cityInput = $('#destination')
var clear = $('#clear')
var trips = [];
var previous = $('#previous');
var pastTrips = document.querySelector("#previousTrips");

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

      $(weatherOutput).append('<ul>' + '<li>' + place  + '</li>' + '<li>' + temp + ' °F' + '</li>' + '<li>' + feelsLike + ' °F' + '</li>', '</ul>')
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}
document.querySelector('#submit').addEventListener('click', function () {
  cityNameCountry = cityInput.val()
  showWeather()
})





///MODALS///
var modal1 = document.getElementById("modal1");
var openModalBtn1 = document.getElementById("oModal1");
var closeModalBtn1 = document.getElementById("closeModalBtn1");
var modal2 = document.getElementById("modal2");
var openModalBtn2 = document.getElementById("oModal2");
var closeModalBtn2 = document.getElementById("closeModalBtn2");
var modal3 = document.getElementById("modal3");
var openModalBtn3 = document.getElementById("oModal3");
var closeModalBtn3 = document.getElementById("closeModalBtn3");

// Function to open the modal
function openModal1() {
  modal1.style.display = "block";
}

// Function to close the modal
function closeModal1() {
  modal1.style.display = "none";
}

// Event listeners for opening and closing the modal
openModalBtn1.addEventListener("click", openModal1);
closeModalBtn1.addEventListener("click", closeModal1);

// Close the modal if the user clicks outside of it
window.addEventListener("click", function (event1) {
  if (event1.target == modal1) {
    closeModal1();
  }
});
function openModal2() {
  modal2.style.display = "block";
}

// Function to close the modal
function closeModal2() {
  modal2.style.display = "none";
}

// Event listeners for opening and closing the modal
openModalBtn2.addEventListener("click", openModal2);
closeModalBtn2.addEventListener("click", closeModal2);

// Close the modal if the user clicks outside of it
window.addEventListener("click", function (event2) {
  if (event2.target == modal2) {
    closeModal2();
  }
});
function openModal3() {
  modal3.style.display = "block";
}

// Function to close the modal
function closeModal3() {
  modal3.style.display = "none";
}

// Event listeners for opening and closing the modal
openModalBtn3.addEventListener("click", openModal3);
closeModalBtn3.addEventListener("click", closeModal3);

// Close the modal if the user clicks outside of it
window.addEventListener("click", function (event3) {
  if (event3.target == modal3) {
    closeModal3();
  }
});
///MODALS///


// local storage recall//
previous.click(ShowPrevious);



function ShowPrevious() {
  clearCache();
  console.log(trips);
  var pastTrips = document.querySelector("#previousTrips");
trips.forEach(function(trip) {
  var li = document.createElement('li');
  li.textContent = trip.city + '  -  ' + trip.duration + ' Days'; 
  pastTrips.appendChild(li);
});
}

function clearCache() {
pastTrips.innerHTML = '';
}