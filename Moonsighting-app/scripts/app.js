    fetch("scripts/moonsighting.json")
        .then(function(res){
            const parsedJSON = JSON.parse(res);
            return parsedJSON; 
        })
        .then(function(parsedJSON){
            loadData(parsedJSON)
        })
        .catch(function(err){
            console.log(err)
        })


const mainContainer = document.getElementById("maincontianer");

function loadData(parsedJSON){
    for(var i = 0; i < parsedJSON.length; i++){
        const divCard = document.createElement("div");
        divCard.classList.add("card");
        divCard.style.width = "18rem";

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.alt = "No Image Available"
        img.src = "moonsighting-app/images/No_image_3x4.svg.png";

        const divCardBody = document.createElement("div");
        divCardBody.classList.add("card-body");

        const h5 = document.createElement("h5");
        h5.classList.add("card-title");
        h5.innerText = parsedJSON.features[i].properties.Name;
        
        const h6 = document.createElement("h6");
        h6.classList.add("card-subtitle mb-2 text-muted");
        h6.innerText = parsedJSON.features[i].properties.description;
        
        const p = document.createElement("p");
        p.classList.add("card-text")
        p.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent placerat posuere elementum. Donec et massa.";
        
        const a = document.createElement("a");
        a.classList.add("btn btn-primary");
        a.innerText("Go here!");
        a.href = "#";

        divCardBody.appendChild(h5)
        divCardBody.appendChild(h6)
        divCardBody.appendChild(p)
        divCardBody.appendChild(a)

        divCard.appendChild(img);
        divCard.appendChild(divCardBody);

        mainContainer.appendChild(divCard);
    }
}

