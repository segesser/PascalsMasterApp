//SERVER CODE JavaScript

// const express = require("express");
import express from "express";
// const Datastore = require("nedb");
import Datastore from "nedb";
// const fetch = require("node-fetch");
import fetch from "node-fetch";


if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}
console.log(process.env);

const app = express();
app.listen(3000, () => console.log("listening at 3000"));
app.use(express.static("public"));
app.use(express.json({limit: "1mb"}));

const database = new Datastore("database.db");
database.loadDatabase();

const database2 = new Datastore("database2.db");
database2.loadDatabase();


app.get("/api", (request, response) => {
    database.find({},(err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

app.get("/api2", (request, response) => {
    database2.find({},(err, data) => {
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

app.post("/weatherDB", (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database2.insert(data);
    response.json(data);
});



// app.get("/weather/", async (request, response) => {
app.get('/getweather/:latlon', async (request, response) => {
    const latlon = request.params.latlon.split(',');
    const lat = latlon[0];
    const lon = latlon[1];
    // const lat = 33;
    // const lon = 133;
    const api_key = process.env.API_KEY;

    console.log("TEST TEST"); 
    console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`);


    // const weatherapi_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
    const weatherapi_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=629ca2bda3c026ba55ca72312cd3ae76
    `;
    // const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=25&lon=139&appid=629ca2bda3c026ba55ca72312cd3ae76`;
    const weather_response = await fetch(weatherapi_url);
    const weather_json = await weather_response.json();

    // const airapi_url = `https://docs.openaq.org/v2/latest?coordinates=40.73,-73.99`;
    const airapi_url = `https://docs.openaq.org/v2/latest?coordinates=${lat},${lon}`;
    const air_response = await fetch(airapi_url);
    const air_json = await air_response.json();

    const data = {
        weather: weather_json,
        air_quality: air_json
    };

    response.json(data);
});

