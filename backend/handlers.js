const { google } = require("googleapis")
const { CLIENT_ID, CLIENT_SECRET } = process.env



// VIPPPPPPPP 
// this was created when I first wanted to use google calendar but when that changed, didn't end up using it so disregard- 
// please see pricelisthandlers!

const createEvent = async (req, res) => {



    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, "http://localhost:3000")

    oauth2Client.setCredentials(
        {
            access_token: "google access token",
            refresh_token: "google refresh token",
            expiry_date: "token expiry data"
        }
    )

    const calendar = google.calendar({ version: "v3", oauth2Client })
    const event = {
        summary: 'Test event',
        description: "Google add event testing.",
        start: {
            dateTime: '2021-11-28T01:00:00-07:00',
            timeZone: 'Asia/kolkata',
        },
        end: {
            dateTime: '2021-11-28T05:00:00-07:00',
            timeZone: 'Asia/Kolkata',
        },
        reminders: {
            useDefault: false,
            overrides: [
                { method: "email", minutes: 24 * 60 },
                { method: "popup", minutes: 30 },
            ],
        },
    };


    calendar.events.insert({
        auth: oauth2Client,
        calendarId: "primary",
        resource: event,
    })
        .then((event) => console.log('Event created: %s', event.htmlLink))
        .catch((error) => console.log('Some error occured', error));

    res.status(200).json({ status: 200, message: "done" })

    console.log("test");
}


module.exports = { createEvent }