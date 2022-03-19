    let lat, lon, weatherdata, air;
    // const button = document.getElementById('submit');
  
    if ('geolocation' in navigator) {
      console.log('geolocation available');
      navigator.geolocation.getCurrentPosition(async position => {
        // let lat, lon, weather, air;
        try {
        lat = position.coords.latitude;
        lon = position.coords.longitude;

          // lat = 33;
          // lon = 133;

        document.getElementById('latitude').textContent = lat.toFixed(2);
        document.getElementById('longitude').textContent = lon.toFixed(2);

        const api_url = `../getweather/${lat},${lon}`;
        const response = await fetch(api_url);
        const json = await response.json();
        console.log(json);

        weatherdata = json.weather;
        document.getElementById('place').textContent = weatherdata.name;
        document.getElementById('country').textContent = weatherdata.sys.country;
        document.getElementById('weatherdesc').textContent = weatherdata.weather[0].description;  //////////////////AAARRRAAAYYYYYYY
        document.getElementById('temp').textContent = (weatherdata.main.temp - 273.15).toFixed(2);

        try {
            air = json.air_quality.results[0].measurements[0];
            document.getElementById('aq_parameter').textContent = air.parameter;
            document.getElementById('aq_value').textContent = air.value;
            document.getElementById('aq_units').textContent = air.unit;
            document.getElementById('aq_date').textContent = air.lastUpdated;
        } catch (error) {
            console.log(error);
            document.getElementById('aq_parameter').textContent = "NO DATA";
        }

        } catch (error) {
          console.log(error);
          air = { value: -1 };
          document.getElementById('place').textContent = "NO DATA";
        }


      });
    } else {
      console.log('geolocation not available'); 
    }



    //BUTTON handling
     submit2.addEventListener('click', async event => {

      const data = { lat, lon, weatherdata, air };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };

      const response = await fetch('/weatherDB', options);
      const json = await response.json();
      console.log(json);

     });
  
  //     const mword = document.getElementById('inp_input').value;
  //     canvas.loadPixels();
  //     const image64 = canvas.elt.toDataURL();
  //     const data = { lat, lon, mword, image64 };

  //     const options = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(data)
  //     };
  //     const response = await fetch('/api', options);
  //     const json = await response.json();
  //     console.log(json);
  //   });
  

  // function keyPressed() {
  //   if (key == 'c') {
  //     background(0);
  //   }
  // }
  
  // function draw() {
  //   stroke(255);
  //   strokeWeight(8);
  //   if (mouseIsPressed) {
  //     line(pmouseX, pmouseY, mouseX, mouseY);
  //   }
  // }
  