# API Documentation

## Overview
This document provides details about the endpoints for the "local" API, including request methods, URLs, payloads, and responses.
## Db Diagram

![Alt Text](/Railway_system.png)

## Endpoints

### 1. Book Ticket
- **URL:** `http://localhost:8001/api/v1/tickets/book`
- **Method:** `POST`
- **Description:** Books a train ticket.
- **Request Body:**
  ```json
  {
      "passengerId": 10,
      "trainId": 1,
      "berthType": "upper"
  }
  ```
- **Response:**
  Not documented.

### 2. Create Passenger
- **URL:** `http://localhost:8001/api/v1/passenger/create_passenger`
- **Method:** `POST`
- **Description:** Creates a new passenger.
- **Request Body:**
  Empty (No request body provided).
- **Response:**
  Not documented.

### 3. Cancel Ticket
- **URL:** `http://localhost:8001/api/v1/tickets/cancel/{ticketId}`
- **Method:** `POST`
- **Description:** Cancels a booked ticket.
- **Path Parameter:**
  - `ticketId` (integer): The ID of the ticket to be canceled.
- **Response:**
  Not documented.

### 4. Final Chart Preparation
- **URL:** `http://localhost:8001/api/v1/tickets/final_chart_prepared/{trainId}`
- **Method:** `POST`
- **Description:** Marks the final chart as prepared for a specific train.
- **Path Parameter:**
  - `trainId` (integer): The ID of the train.
- **Response:**
  ```json
  {
      "code": 200,
      "message": "Chart prepared successfully",
      "result": [
          {
              "berthType": "lower",
              "count": 27
          },
          {
              "berthType": "upper",
              "count": 27
          },
          {
              "berthType": "side-lower",
              "count": 18
          },
          {
              "berthType": "side-upper",
              "count": 9
          }
      ]
  }
  ```

### 5. Get Booked Tickets
- **URL:** `http://localhost:8001/api/v1/tickets/booked/{ticketId}`
- **Method:** `GET`
- **Description:** Fetches details of a specific booked ticket.
- **Path Parameter:**
  - `ticketId` (integer): The ID of the booked ticket.
- **Response:**
  Not documented.

### 6. Check Ticket Availability
- **URL:** `http://localhost:8001/api/v1/tickets/available/{trainId}`
- **Method:** `GET`
- **Description:** Checks ticket availability for a specific train.
- **Path Parameter:**
  - `trainId` (integer): The ID of the train.
- **Response:**
  ```json
  {
      "code": 200,
      "message": "All ticket statuses fetched successfully!",
      "data": {
          "confirmedAvailable": 61
      }
  }
  ```

## Notes
- Ensure all required parameters are provided in the requests.
- Replace `{ticketId}` and `{trainId}` in URLs with actual IDs.
- Some responses and request payloads are not documented and may need further clarification from the API developers.

