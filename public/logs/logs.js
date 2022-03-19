getData();

const selfies = [];

document.getElementById('time').addEventListener('click', event => {
    sortData((a, b) => b.time - a.time);
});
  
document.getElementById('mword').addEventListener('click', event => {
    sortData((a, b) => {
      if (b.mood > a.mood) return -1;
      else return 1;
    });
});

function sortData(compare) {
    for (let item of selfies) {
        item.elt.remove();
    }
    selfies.sort(compare);
    for (let item of selfies) {
      document.body.append(item.elt);
    }
}

async function getData(){
    const response = await fetch("/api");
    const data = await response.json();

    for (item of data) {
        const root = document.createElement("p");
        const mword = document.createElement("div");
        const geo = document.createElement("div");
        const date = document.createElement("div");
        const image = document.createElement("img");

        mword.textContent = `word: ${item.mword}`;
        geo.textContent = `geo: ${item.lat}°, ${item.lon}°`;
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;
        image.src = item.image64;
        image.alt = "Pascal Webcam Snapshots!"

        root.append(mword, geo, date, image);

        //
        selfies.push({ elt: root, time: item.timestamp, mood: item.mood });
        //

        document.body.append(root);
    }
    console.log(data);
}