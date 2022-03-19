const mymap = L.map('checkinMap').setView([0, 0], 1);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tileUrl =
  'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();

async function getData() {
    const response = await fetch('/api2');
    const data = await response.json();

    for (item of data) {
        const marker = L.marker([item.lat, item.lon]).addTo(mymap);


        let txt = `The weather here at ${item.weatherdata.name}, ${item.lat.toFixed(2)}&deg;,
        ${item.lon.toFixed(2)}&deg; is "${item.weatherdata.weather[0].description}" with
        a temperature of ${(item.weatherdata.main.temp - 273.15).toFixed(2)}&deg; C.`;
        try {
            if (item.air.value < 0) {
                txt += '  No air quality reading.';
            } else {
                txt += `  The concentration of particulate matter 
                (${item.air.parameter}) is ${item.air.value} 
                ${item.air.unit} last read on ${item.air.lastUpdated}`;
            }
        } catch (error) {
            txt += '  No air quality reading.';    
            console.log(error);
        }
        marker.bindPopup(txt);
    }

}
