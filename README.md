#  Todo-List-Appln 

## Overview

This is a full-stack To-Do List application that allows users to create, update, delete, and manage tasks efficiently. The application consists of:

* **Frontend**: React.js
* **Backend**: Node.js + Express.js
* **Database**: MongoDB

---

##  Setup & Installation

### Dependencies 

#### Frontend

> npm i axios

Used to make HTTP requests (GET, POST, etc.) to communicate with backend APIs.

> npm i date-fns

Provides simple utilities to format, parse, and manipulate dates.

> npm i react-router-dom

Enables navigation and routing between different pages in a React app.


#### Backend

> npm i cors

Allows frontend and backend to communicate across different origins (domains).

> npm i dotenv

Loads environment variables from a .env file into your application.

> npm i express

Lightweight framework to build APIs and handle server-side logic.

> npm i mongoDB

NoSQL database used to store application data in JSON-like format.

> npm i mongoose

ODM library to define schemas and interact with MongoDB easily.

---


## To Start the Project

### In Backend

    cd Backend
    npm i
    npm run dev

### In Frontend

     cd frontend
     npm i
     npm start

    
---

## Environment Variable

####  Backend Env

    >> MONGO_URL=mongodb+srv://AbdulMalik:NJd6Gt8Nervwr2OW@cluster0.abwfplh.mongodb.net/?appName=Cluster0

    >> PORT=4000

#### Frontend Env

    >> REACT_APP_API_URL=https://xyz-8x1y.onrender.com

---
##  Features

* Add new tasks
* Edit existing tasks
* Delete tasks with confirmation popup
* Task status (Completed / Pending)
* Persistent storage using database
* Scrollable task list UI

---

##  API Endpoints (Backend)

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| GET    | /api/todos     | Fetch all todos |
| POST   | /api/todos     | Create a todo   |
| PUT    | /api/todos/:id | Update a todo   |
| DELETE | /api/todos/:id | Delete a todo   |

---

##  Challenges Faced & Solutions

### 1. CORS Issues

**Problem:** Frontend couldn’t communicate with backend.

**Solution:** Used proxy in React (`package.json`) instead of configuring CORS manually.

---

### 2. State Not Persisting After Reload

**Problem:** Tasks were resetting or showing incorrect status.

**Solution:** Ensured proper backend fetch (`GET API`) on component load using `useEffect`.

---

### 3. Delete Without Confirmation

**Problem:** Tasks were deleted instantly.

**Solution:** Added confirmation popup:

```js
if (window.confirm(`Do you want to delete ${todo.Title}`)) {
   handleDelete(id);
}
```

---

### 4. Scroll Not Working Properly

**Problem:** Task list overflow issue.

**Solution:** Applied CSS:

```css
overflow-y: auto;
max-height: 300px;
```

---

### 5. Deployment Confusion

**Problem:** Changes not reflecting after updates.

**Solution:** Learned that backend must be **re-deployed after every change**, not just committed.


##  Run Summary

1. Start backend → `npm run dev`
2. Start frontend → `npm start`
3. Open browser → `https://xyz-nine-mu.vercel.app`

---

##  Author

ABDUL MALIK


