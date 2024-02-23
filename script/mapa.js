



/************CONTACTO RUTA*********/
 
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var map = L.map('map', {
            center: [latitude, longitude],
            zoom: 12
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var control = L.Routing.control({
            waypoints: [
                L.latLng(latitude, longitude),
                L.latLng(40.4274788, -3.7070391)
            ],
            language: 'es'
        }).addTo(map);
        
    });
}
else{
    var map = L.map('map', {
        center: [37.17059, -3.60552],
        zoom: 17
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
}