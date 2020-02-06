// API 
// http://api.open-notify.org/iss-now.json

let issLocation = [];
axios
    .get("http://api.open-notify.org/iss-now.json")
    .then(response => {        
        issLocation = response.data.iss_position;  
                
        displayLocation(); // Calls Function     
        displayMap(); // Calls Function            
    });

function displayLocation() {  // Creates a Function
    let locationSection = document.querySelector(".iss-location");  
    let issPosition = document.createElement('div');
    issPosition.className += "iss-location__wrap"; 
    issPosition.innerHTML += `
        <h1 class="iss-location__title">Where's the ISS at?</h1>
        <h2 class="iss-location__latitude">latitude: ${issLocation.latitude}</h2>
        <h2 class="iss-location__longitude">longitude: ${issLocation.longitude}</h2>                    
    `;  //  Creates a whole chunk of HTML elements and content
    locationSection.appendChild(issPosition);
}

function displayMap() {
    const displayIssMap = L.map('issMap').setView([0, 0], 2);
    const attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
    const tileUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(displayIssMap);

    const latitude = issLocation.latitude;
    const longitude = issLocation.longitude;
    
    let issIcon = L.icon({
        iconUrl: './assets/iss.svg',
        iconSize: [150, 80],
        iconAnchor: [25, 16],
    });
    
    displayIssMap.setView([latitude, longitude], 2.5);

    const issMarker = L.marker([0, 0], {icon: issIcon}).addTo(displayIssMap);
    issMarker.setLatLng([latitude, longitude]);           
}

function reloadApi() {
       
}
reloadApi();
setInterval(reloadApi, 1000);





/* function displayLocation() {  // Creates a FUNCTION
    let locationSection = document.getElementsByTagName("Body");    
    let issPosition = document.createElement('div');  
    issPosition.className += "iss-location"; 
    issPosition.innerHTML += `
        <h1 class="iss-location__title">Where's the ISS at?</h1>
        <h2 class="iss-location__latitude"></h2>
        <h2 class="iss-location__longitude"></h2>            
    `;  //  Creates a whole chunk of HTML elements and content
    locationSection.appendChild(issPosition);
}
displayLocation(issLocation); // Calls Function */

/* function displayLocation(issLocation) {  // Creates a FUNCTION
    let locationSection = document.getElementsByTagName("Body");    
    for(coordinates of issLocation){  // Runs through the ARRAY        
        let issPosition = document.createElement('div');  
        issPosition.className += "iss-location"; 
        issPosition.innerHTML += `
            <h1 class="iss-location__title">Where's the ISS at?</h1>
            <h2 class="iss-location__latitude">${coordinates.latitude}</h2>
            <h2 class="iss-location__longitude">${coordinates.longitude}</h2>            
        `;  //  Creates a whole chunk of HTML elements and content
        locationSection.appendChild(issPosition); 
    }
} */