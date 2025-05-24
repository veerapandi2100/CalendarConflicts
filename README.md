# Calendar Conflicts API

This Node.js API detects and resolves calendar scheduling conflicts by checking overlapping meetings for participants and suggesting alternative time slots.

## Features

- **Check Conflicts:** POST `/api/calendar/check-conflicts`  
  Check if a proposed event conflicts with existing events based on participant availability and buffer time.

- **Suggest Times:** POST `/api/calendar/suggest-times`  
  Suggest up to 3 alternative meeting times if the proposed time conflicts.

## Technologies

- Node.js
- Express.js
- Day.js (for time handling)

## Configuration

- Default buffer time between meetings: 15 minutes
- Default working hours: 9:00 AM to 5:00 PM

## API Endpoints

### 1. Check Conflicts

**URL:** `/api/calendar/check-conflicts`  
**Method:** `POST`  
**Body parameters:**

```json
{
  "proposedEvent": {
    "start": "10:30",
    "end": "11:30",
    "participants": ["user1", "user2"]
  },
  "existingEvents": [
    {
      "start": "10:00",
      "end": "11:00",
      "participants": ["user1"]
    },
    {
      "start": "12:00",
      "end": "13:00",
      "participants": ["user2"]
    }
  ],
  "bufferMinutes": 15
}

Response:
If there are conflicts:

{
  "conflicts": [
    {
      "event": {
        "start": "10:00",
        "end": "11:00",
        "participants": ["user1"]
      },
      "commonParticipants": ["user1"]
    }
  ]
}
If no conflicts:
{
  "conflicts": []
}
2. Suggest Times
URL: /api/calendar/suggest-times
Method: POST
Body parameters: Same as /check-conflicts endpoint.

Response: Returns up to 3 alternative time slots that avoid conflicts and respect working hours.

{
  "suggestedTimes": [
    {
      "start": "11:15",
      "end": "12:15"
    },
    {
      "start": "13:00",
      "end": "14:00"
    }
  ]
}```
How to Run
Clone the repository

Run npm install to install dependencies

Run npm start to start the server

Use tools like Postman or curl to test the endpoints

Notes
Times are in HH:mm 24-hour format.

Buffer time and working hours are configurable in the config file.


## API Testing Screenshot

Here's a screenshot of the Postman request testing the `/check-conflicts` endpoint:

![Postman Check Conflicts](./assets/screenshot.png)


