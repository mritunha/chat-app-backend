# Real-Time Chat Application

A full-stack real-time chat application built using Spring Boot, React, MongoDB, WebSocket, STOMP, and SockJS.

Users can create chat rooms, join existing rooms, and exchange messages instantly through WebSocket communication.

## Features

- Create chat rooms
- Join existing chat rooms
- Real-time messaging using WebSockets
- STOMP protocol support
- SockJS fallback support
- MongoDB message persistence
- Responsive React frontend
- REST APIs for room management

---

## Tech Stack

### Backend
- Java 21
- Spring Boot 3.5
- Spring Web
- Spring WebSocket
- Spring Data MongoDB
- Maven
- Lombok

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- SockJS
- STOMP.js

### Database
- MongoDB

---

## Project Structure

```
chat-app-backend/
│
├── src/main/java
│   ├── config
│   ├── controllers
│   ├── entities
│   ├── repositories
│   └── payload
│
├── src/main/resources
│   └── application.properties
│
├── front-chat/
│   ├── src
│   ├── components
│   ├── services
│   ├── context
│   └── config
│
└── pom.xml
```

---

## WebSocket Architecture

### Connection Endpoint

```
/chat
```

### Client Sends Messages To

```
/app/sendMessage/{roomId}
```

### Clients Subscribe To

```
/topic/room/{roomId}
```

---

## REST APIs

### Create Room

```http
POST /api/v1/rooms
```

Request Body:

```json
"room123"
```

---

### Join Room

```http
GET /api/v1/rooms/{roomId}
```

Example:

```http
GET /api/v1/rooms/room123
```

---

### Get Room Messages

```http
GET /api/v1/rooms/{roomId}/messages
```

---

## MongoDB Configuration

application.properties

```properties
spring.application.name=chat-app-backend

spring.data.mongodb.uri=mongodb://localhost:27017/chatapp
```

Make sure MongoDB is running before starting the backend.

---

## Running the Backend

### Clone Repository

```bash
git clone https://github.com/mritunha/chat-app-backend.git
cd chat-app-backend
```

### Start MongoDB

```bash
sudo systemctl start mongod
```

### Run Spring Boot Application

```bash
./mvnw spring-boot:run
```

or

```bash
mvn spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

---

## Running the Frontend

Navigate to frontend directory:

```bash
cd front-chat
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## Future Improvements

- User Authentication with Spring Security & JWT
- Online/Offline User Status
- Private Messaging
- File Sharing
- Message Read Receipts
- Docker Deployment
- Kubernetes Deployment
- Cloud Deployment (AWS/Render/Railway)

---

## Resume Description

Developed a full-stack real-time chat application using Spring Boot, React, MongoDB, WebSocket, STOMP, and SockJS. Implemented room-based messaging, persistent chat storage, REST APIs, and real-time communication architecture for scalable user interactions.

---

## Author

**Mrityunjay Yadav**

GitHub:
https://github.com/mritunha
