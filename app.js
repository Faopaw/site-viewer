const parsedJSON = {
        "type": "FeatureCollection",
        "name": "Leicestershire Locations",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": [
        { "type": "Feature", "properties": { "Name": "Old John Tower", "description": "Bradgate Park" }, "geometry": { "type": "Point", "coordinates": [ -1.2237636, 52.6963498 ] } },
        { "type": "Feature", "properties": { "Name": "Beacon Hill, Leicestershire", "description": "Beacon Hill Country Park" }, "geometry": { "type": "Point", "coordinates": [ -1.24772, 52.72846 ] } },
        { "type": "Feature", "properties": { "Name": "Croft Hill", "description": null }, "geometry": { "type": "Point", "coordinates": [ -1.2488721, 52.5656001 ] } },
        { "type": "Feature", "properties": { "Name": "Hamilton", "description": null }, "geometry": { "type": "Point", "coordinates": [ -1.074298, 52.662891 ] } },
        { "type": "Feature", "properties": { "Name": "Hamilton", "description": null }, "geometry": { "type": "Point", "coordinates": [ -1.07245964568234, 52.662773180339599 ] } },
        { "type": "Feature", "properties": { "Name": "Bardon Hill Quarry", "description": null }, "geometry": { "type": "Point", "coordinates": [ -1.3206114, 52.7144707 ] } },
        { "type": "Feature", "properties": { "Name": "Porsche Garage", "description": "Hamilton Porsche\/Aldi" }, "geometry": { "type": "Point", "coordinates": [ -1.0828292, 52.657914 ] } },
        { "type": "Feature", "properties": { "Name": "Evington Lane", "description": null }, "geometry": { "type": "Point", "coordinates": [ -1.0912036, 52.6214907 ] } },
        { "type": "Feature", "properties": { "Name": "Beal Street", "description": null }, "geometry": { "type": "Point", "coordinates": [ -1.11793914530396, 52.636269601952499 ] } }
        ]
        }

const body = document.getElementById("body");

const loadData = function(parsedJSON){
    for(let i = 0; i < parsedJSON.features.length - 1 ; i++){
        const cardsContainer = document.querySelector("#cardsContainer");
        console.log("cards container created")
        const divCard = document.createElement("div");
        divCard.classList.add("card");
        divCard.style.width = "100%";

        // const img = document.createElement("img");
        // img.classList.add("card-img-top");
        // img.alt = "No Image Available"
        // img.src = "images/No_image_3x4.svg.png";

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
        a.classList.add("btn","btn-primary");
        a.innerText = "Go here!";
        a.href = `https://www.google.com/maps/search/?api=1&query=${parsedJSON.features[i].geometry.coordinates[1]},${parsedJSON.features[i].geometry.coordinates[0]}`;

        divCardBody.appendChild(h5)
        divCardBody.appendChild(h6)
        divCardBody.appendChild(p)
        divCardBody.appendChild(a)

        // divCard.appendChild(img); Image stuff
        divCard.appendChild(divCardBody);

        cardsContainer.appendChild(divCard);
    }
}

body.addEventListener("load", loadData(parsedJSON));

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}