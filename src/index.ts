import express from "express";
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();
const app = express();
const port = "3000";

const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const API_KEY = process.env.API_KEY;

app.get("/", async (req, res) => {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?q=58104&lang=en`, {
        headers: { key: API_KEY as string },
    });
    const data = await response.json();

    console.log(`The current temperature in Fargo is ${data.current.temp_f}°F and ${data.current.condition.text}`);

    // await twilioClient.messages.create({
    //     body: `The current temperature in Fargo is ${data.current.temp_f}°F and ${data.current.condition.text}`,
    //     from: process.env.TWILIO_PHONE_NUMBER as string,
    //     to: process.env.PERSONAL_PHONE_NUMBER as string,
    // });

    res.send("Message sent!");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
