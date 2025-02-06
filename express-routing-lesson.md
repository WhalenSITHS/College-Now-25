# 📌 Express.js Routing - A Complete Lesson

## **Lesson Objective**
By the end of this lesson, you will understand how routing works in Express.js, how to define different types of routes, and how to use route parameters, query parameters, middleware, and modular routing.

---

## **1️⃣ What is Routing in Express.js?**
Routing in Express.js determines how an application responds to client requests to specific endpoints (URLs). Each route defines an HTTP method (GET, POST, PUT, DELETE) and a callback function that executes when a request matches the route.

### **Basic Syntax**
```javascript
app.METHOD(PATH, HANDLER)
```
- `METHOD` - HTTP method (GET, POST, PUT, DELETE, etc.).
- `PATH` - URL endpoint (e.g., `/users`, `/products`).
- `HANDLER` - Function executed when the route is matched.

---

## **2️⃣ Basic Routing Example**
Let's start with a simple Express application that handles basic routing.

### **Setup Express.js**
First, install Express.js if you haven’t already:

```sh
npm init -y
npm install express
```

Create a file called `server.js` and add the following code:

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to Express.js!');
});

// About route
app.get('/about', (req, res) => {
    res.send('This is the about page.');
});

// Contact route
app.get('/contact', (req, res) => {
    res.send('Contact us at contact@example.com');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

Run the server:

```sh
node server.js
```

Visit `http://localhost:3000/` in your browser to see the output.

---

## **3️⃣ Route Parameters**
Route parameters allow dynamic values in URLs. Use a colon (`:`) before the parameter name in the route.

### **Example: User Profile Route**
```javascript
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID: ${userId}`);
});
```

- If a user visits `/users/123`, the response will be: `User ID: 123`.

### **Multiple Route Parameters**
```javascript
app.get('/users/:userId/orders/:orderId', (req, res) => {
    const { userId, orderId } = req.params;
    res.send(`User ID: ${userId}, Order ID: ${orderId}`);
});
```

---

## **4️⃣ Query Parameters**
Query parameters are passed in the URL after `?` and can be accessed using `req.query`.

### **Example: Search Route**
```javascript
app.get('/search', (req, res) => {
    const keyword = req.query.q;
    res.send(`Searching for: ${keyword}`);
});
```

If a user visits `/search?q=express`, the response will be: `Searching for: express`.

---

## **5️⃣ Handling POST Requests**
To handle POST requests, use `app.post()`. You need middleware like `express.json()` to parse JSON body data.

### **Example: Handling Form Data**
```javascript
app.use(express.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    res.send(`Login attempt with Username: ${username}`);
});
```

Test with **Postman** or **cURL**:

```sh
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username":"john","password":"1234"}'
```

---

## **6️⃣ Express Router for Modular Routing**
For large applications, you should separate routes into different files using `express.Router()`.

### **Example: Using a Router**
Create a `routes/users.js` file:

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('User List');
});

router.get('/:id', (req, res) => {
    res.send(`User ID: ${req.params.id}`);
});

module.exports = router;
```

Modify `server.js`:

```javascript
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
```

Now:
- `GET /users` → `User List`
- `GET /users/123` → `User ID: 123`

---

## **7️⃣ Best Practice for Importing Multiple Route Files**
When you have multiple route files, a **centralized `routes/index.js` file** is the best practice.

### **Folder Structure**
```
/my-express-app
│── /routes
│   ├── users.js
│   ├── products.js
│   ├── orders.js
│   ├── index.js   <-- (Centralized route file)
│── server.js
```

### **Step 1: Create `routes/index.js`**
```javascript
const express = require('express');
const router = express.Router();

// Import individual routes
const userRoutes = require('./users');
const productRoutes = require('./products');
const orderRoutes = require('./orders');

// Use the routes
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
```

### **Step 2: Import into `server.js`**
```javascript
const routes = require('./routes');
app.use('/api', routes);
```

Now, your routes are structured and easy to manage.

---

## **8️⃣ Middleware in Routes**
Middleware functions can execute before sending a response.

### **Example: Logging Middleware**
```javascript
const logRequest = (req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    next();
};

app.use(logRequest);
```

Now every request is logged before it is processed.

---

## **9️⃣ Handling 404 (Not Found) Routes**
A catch-all route should be defined at the end to handle unmatched routes.

```javascript
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});
```

---

## **🔟 Summary**
✅ Use `app.get()`, `app.post()`, `app.put()`, and `app.delete()` for routing.  
✅ Use **route parameters** (`/users/:id`) for dynamic routing.  
✅ Use **query parameters** (`/search?q=express`) for optional parameters.  
✅ Use **express.Router()** to structure routes in separate files.  
✅ Use **middleware** for logging, authentication, and error handling.  
✅ Implement a **404 handler** for unmatched routes.  
✅ Organize multiple route files using a **centralized `routes/index.js`**.

---

## **📌 Challenge**
Try creating a simple Express app with:
1️⃣ A `/products` route that returns a list of products.  
2️⃣ A `/products/:id` route that returns a product by ID.  
3️⃣ A `/login` route that accepts POST requests with username and password.  

🚀 **Happy Coding!** 🚀
