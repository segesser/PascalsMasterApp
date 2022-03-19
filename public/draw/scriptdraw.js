function setup() {
    const canvas = createCanvas(320, 240);
    pixelDensity(1);
    background(0);
    let lat, lon;
    const button = document.getElementById('submit');
  
  
  
  
    
    button.addEventListener('click', async event => {
  
      const mword = document.getElementById('inp_input').value;
      canvas.loadPixels();
      const image64 = canvas.elt.toDataURL();
      const data = { lat, lon, mword, image64 };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const response = await fetch('/api', options);
      const json = await response.json();
      console.log(json);
    });
  
    if ('geolocation' in navigator) {
      console.log('geolocation available');
      navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log(lat, lon);
        document.getElementById('latitude').textContent = lat.toFixed(2);
        document.getElementById('longitude').textContent = lon.toFixed(2);
      });
    } else {
      console.log('geolocation not available');
    }
  }
  
  function keyPressed() {
    if (key == 'c') {
      background(0);
    }
  }
  
  function draw() {
    stroke(255);
    strokeWeight(8);
    if (mouseIsPressed) {
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  }
  