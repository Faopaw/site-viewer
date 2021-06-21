(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const body = document.getElementById("body");
const cardsContainer = document.querySelector("#cardsContainer");
const myform = document.getElementById("form");
const locationInput = document.getElementById("locationInput");
let userlocation = [];



// JSON file.
const parsedJSON = {
  "type": "FeatureCollection",
  "name": "Leicestershire Locations",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  "features": [
  { "type": "Feature", "properties": { "Name": "Old John Tower", "description": "Bradgate Park" }, "geometry": { "type": "Point", "coordinates": [ 52.6963498, -1.2237636] } },
  { "type": "Feature", "properties": { "Name": "Beacon Hill, Leicestershire", "description": "Beacon Hill Country Park" }, "geometry": { "type": "Point", "coordinates": [ 52.72846, -1.24772] } },
  { "type": "Feature", "properties": { "Name": "Croft Hill", "description": null }, "geometry": { "type": "Point", "coordinates": [ 52.5656001, -1.2488721] } },
  { "type": "Feature", "properties": { "Name": "Hamilton", "description": null }, "geometry": { "type": "Point", "coordinates": [ 52.662891, -1.074298] } },
  { "type": "Feature", "properties": { "Name": "Hamilton", "description": null }, "geometry": { "type": "Point", "coordinates": [ 52.662773180339599, -1.07245964568234] } },
  { "type": "Feature", "properties": { "Name": "Bardon Hill Quarry", "description": null }, "geometry": { "type": "Point", "coordinates": [ 52.7144707, -1.3206114] } },
  { "type": "Feature", "properties": { "Name": "Porsche Garage", "description": "Hamilton Porsche\/Aldi" }, "geometry": { "type": "Point", "coordinates": [ 52.657914, -1.0828292] } },
  { "type": "Feature", "properties": { "Name": "Evington Lane", "description": null }, "geometry": { "type": "Point", "coordinates": [ 52.6214907, -1.0912036] } },
  { "type": "Feature", "properties": { "Name": "Beal Street", "description": null }, "geometry": { "type": "Point", "coordinates": [ 52.636269601952499, -1.11793914530396] } },
  { "type": "Feature", "properties": { "Name": "Mason Mount Road", "description": "CL2021" }, "geometry": { "type": "Point", "coordinates": [ 52.636269601952499, -1.11793914530396] } },
  { "type": "Feature", "properties": { "Name": "LCFC Road", "description": "FA Cup" }, "geometry": { "type": "Point", "coordinates": [ 52.636269601952499, -1.11793914530396] } },
  { "type": "Feature", "properties": { "Name": "Bardon Hill Quarry", "description": null }, "geometry": { "type": "Point", "coordinates": [ 52.7144707, -1.3206114] } },
  { "type": "Feature", "properties": { "Name": "Beal Street", "description": null }, "geometry": { "type": "Point", "coordinates": [ 52.636269601952499, -1.11793914530396] } },
  { "type": "Feature", "properties": { "Name": "Mason Mount Road", "description": "CL2021" }, "geometry": { "type": "Point", "coordinates": [ 52.636269601952499, -1.11793914530396] } },
  { "type": "Feature", "properties": { "Name": "LCFC Road", "description": "FA Cup" }, "geometry": { "type": "Point", "coordinates": [ 52.636269601952499, -1.11793914530396] } }
  ]
  }

// Makes the HTML elements appear once the page is loaded
const loadData = function(parsedJSON){
    for(let i = 0; i < parsedJSON.features.length ; i++){
        
        console.log("cards container created")
        const divCard = document.createElement("div");
        divCard.classList.add("card");
        divCard.style.width = "100%";

        const divCardBody = document.createElement("div");
        divCardBody.classList.add("card-body");

        const h5 = document.createElement("h5");
        h5.classList.add("card-title");
        h5.innerText = parsedJSON.features[i].properties.Name;
        
        const h6 = document.createElement("h6");
        h6.classList.add("card-subtitle", "mb-2", "text-muted");
        h6.innerText = parsedJSON.features[i].properties.description;
        
        const p = document.createElement("p");
        p.classList.add("card-text")
        p.innerText = "";
        
        const a = document.createElement("a");
        a.classList.add("btn","btn-primary","floatright");
        a.innerText = "Go here!";
        a.href = `https://www.google.com/maps/search/?api=1&query=${parsedJSON.features[i].geometry.coordinates[0]},${parsedJSON.features[i].geometry.coordinates[1]}`;

        const carIcon = document.createElement("i");
        carIcon.classList.add("fas","fa-car","floatright");

        const distanceIndicator = document.createElement("p")
        distanceIndicator.classList.add("floatright");
        distanceIndicator.innerText = "15 Km";
        
        const apics = document.createElement("a");
        apics.classList.add("btn","btn-info","floatleft");
        apics.innerText = "Pictures";
        apics.href = `#`;



        divCardBody.appendChild(h5)
        divCardBody.appendChild(h6)
        divCardBody.appendChild(p)
        divCardBody.appendChild(apics)
        divCardBody.appendChild(a)
        divCardBody.appendChild(distanceIndicator)
        divCardBody.appendChild(carIcon)
        
        

        // divCard.appendChild(img); Image stuff
        divCard.appendChild(divCardBody);

        cardsContainer.appendChild(divCard);
    }
}

window.initMap = function() {  

  loadData(parsedJSON);


    // Map is centered around Leicester
    const options = {
      center: {lat: 52.6369, lng:-1.1398},
      zoom: 10
  }

  // Creats a new map
  map = new google.maps.Map(document.getElementById('map'), options)



  //Make an array of markers
  const markersArray = parsedJSON.features;


  // Loop through the array of markers and add them to the map
  for (let index = 0; index < markersArray.length; index++) {
    addMarkers(markersArray[index])
    
  }

  //function to add the marker to the map

  function addMarkers(properties){
    const position = {lat:properties.geometry.coordinates[0], lng:properties.geometry.coordinates[1]}
    const marker = new google.maps.Marker({
      position : position,
      map:map,
      //icon:"https......" you can add your own custom marker here.
    })

    if (properties.properties.Name & properties.properties.description) {
      const detailWindow = new google.maps.InfoWindow({
      content: `${properties.properties.Name}, ${properties.properties.description}`
      }) 
      
      marker.addListener("mouseover", () => { 
      detailWindow.open(map,marker);
      })
    }



  }


}

//Distance Matrix calculates the distance between the users and the locations
// const calculateDistanceMatrix = function() {

//   const [origin,destinations] = fetchOriginandDestinations();
  
//   const service = new google.maps.DistanceMatrixService(); // instantiate Distance Matrix service
//   const matrixOptions = {
//     origins: [origin], // technician locations
//     destinations: [destinations], // customer address
//     travelMode: 'DRIVING',
//     unitSystem: google.maps.UnitSystem.IMPERIAL
//   };

//   console.log("origin => ",origin)
//   console.log("destinations => ",destinations)
//   console.log("matrixOptions.origins => ",matrixOptions.origins)
//   console.log("matrixOptions.destinations => ",matrixOptions.destinations)

// // Call Distance Matrix service
//   service.getDistanceMatrix(matrixOptions, callback);

//   // Callback function used to process Distance Matrix response
//   function callback(response, status) {
//     if (status !== "OK") {
//       alert("Error with distance matrix");
//       return;
//     }
//     console.log(response);        
//   }

  
// }

myform.onsubmit = (e) => {
  e.preventDefault();
  console.log("Form has been submitted")
  // const request = new XMLHttpRequest();
  // request.open("get","data.json");
  // request.onload = function () {
  // console.log(request.responseText);
  // }
  // request.send(new FormData(myform));
  // console.log("sedfghbwesewjg")

  // calculateDistanceMatrix();
  getLocation();
};


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
    const location = [position.coords.latitude,position.coords.longitude];
    userlocation = location;
    console.log(`Your location is : ${location[0]}, ${location[1]}`);
    callDirectionsAPI(userlocation);
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}


function fetchDestinations(){
  //This function gets all the destinations and puts them in an array

  const destinations = []

  for (let i = 0; i < parsedJSON.features.length; i++) {
    const lat = parsedJSON.features[i].geometry.coordinates[0];
    const lng = parsedJSON.features[i].geometry.coordinates[1];
    destinations.push({lat:lat,lng:lng})
  }
  console.log(`These are the destinations: ${destinations}`);
  return destinations;
}



function callDirectionsAPI (userlocation) {
  const destinations = fetchDestinations();
  
  const params = new URLSearchParams({
    origin: userlocation,
    destination: '52.636269601952499, -1.11793914530396',
    key: 'AIzaSyBpC8Xf9RATOlAMmPAbdgViO-o5G8QoG00' 
  })

  const url = `https://maps.googleapis.com/maps/api/directions/json?${params.toString()}`
  console.log(`this is the url: ${url}`)

  fetch(url)
    .then(response => response.text())
    .then(console.log)









  // const axios = require('axios').default;
  // const url   = require('url');

  // const destinations = fetchDestinations();

  // async function makeGetRequest(userlocation,destination) {

  //   let payload = { origin: userlocation, destination: destination, key: 'AIzaSyBpC8Xf9RATOlAMmPAbdgViO-o5G8QoG00' };

  //   const params = new url.URLSearchParams(payload);

  //   let res = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?${params}`);

  //   let data = res.data;
  //   console.log(data);
  // }

  // for (let index = 0; index < destinations.length; index++) {
  //   makeGetRequest(userlocation,destinations[index]);
  
  // }

}
},{}]},{},[1]);
