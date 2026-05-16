import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = "3000";

const API_KEY = process.env.API_KEY;
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1505287988425392249/y4dOOC6QpuRh48aepbJKDp2gNyYv909B8gDnbRVxj8Bsd7GMrtJsmYdyd0fyQoAMIfzv';

app.post("/", async (req, res) => {
    const raw_data = await fetch(`http://api.weatherapi.com/v1/current.json?q=58104&lang=en`, {
        method: "GET",
        headers: { key: API_KEY as string },
    });
    const weather_data = await raw_data.json();

    console.log(
        `The current temperature in Fargo is ${weather_data.current.temp_f}°F and ${weather_data.current.condition.text}`,
    );

    await fetch(DISCORD_WEBHOOK_URL as string, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content: `The current temperature in Fargo is ${weather_data.current.temp_f}°F and ${weather_data.current.condition.text}`,
        }),
    });

    res.send("Data posted successfully!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
