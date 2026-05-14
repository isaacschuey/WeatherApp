import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = "3000";

const API_KEY = process.env.API_KEY;
const FARGO_LATITUDE = process.env.FARGO_LATITUDE;
const FARGO_LONGITUDE = process.env.FARGO_LONGITUDE;

// const getWeatherData = async () => {
//     const data = await fetch(
//         `https://api.openweathermap.org/data/3.0/onecall?lat=${FARGO_LATITUDE}&lon=${FARGO_LONGITUDE}&appid=${API_KEY}`,
//     );
//     return data;
// };

app.get("/", async (req, res) => {
    const data = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${FARGO_LATITUDE}&lon=${FARGO_LONGITUDE}&appid=${API_KEY}`,
    ).then((response) => response.json());
    res.send(data);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
