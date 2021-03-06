const express = require("express");
const Datastore = require("nedb");
const fetch = require("node-fetch");

const app = express();
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
app.use(express.json({limit: "1mb"}));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (request, response) => {
    database.find({},(err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

app.post("/api", (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json(data);
});


app.get("/weather/:latlon", async (request, response) => {
    const latlon = request.params.latlon.split(",");
    const lat  = latlon[0];
    const lon  = latlon[1];

    // DARKSKY geht nicht, muss eigenes suchen
    const api_url = `https://darksky.net/forecast/XXXXXXXXXXXX/${lat},${lon}`;
    const fetch_response = await fetch(api_url);
    const jsonfile = await fetch_response.json();
    response.json(jsonfile);
});
