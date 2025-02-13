# Lesson: Introduction to MongoDB, Mongoose, and Creating Models

## Objective
By the end of this lesson, you will:
- Understand what MongoDB is and why it's used.
- Learn how Mongoose helps in working with MongoDB in Node.js.
- Be able to create Mongoose models and interact with a MongoDB database.

---

## 1. Introduction to MongoDB
### What is MongoDB?
MongoDB is a NoSQL database that stores data in a flexible, JSON-like format called **BSON**. It is:
- **Document-based**: Instead of tables and rows, MongoDB stores data in collections and documents.
- **Schema-less**: Documents can have different structures.
- **Scalable**: Designed for large-scale applications.

### Key Concepts
- **Database**: A container for collections.
- **Collection**: A container for documents.
- **Document**: A JSON-like object with key-value pairs.

### Example Document
```json
{
  "_id": "60db2a6f9b1e8a5f5c8a6f7d",
  "name": "Alice",
  "email": "alice@example.com",
  "age": 25
}
```

---

## 2. Introduction to Mongoose
### What is Mongoose?
Mongoose is an **ODM (Object Data Modeling)** library for MongoDB in Node.js. It helps manage relationships, provides schema validation, and makes database operations easier.

### Why Use Mongoose?
- Enforces a **schema** for MongoDB documents.
- Provides **built-in validation**.
- Supports **middleware/hooks** for pre/post-processing of data.
- Simplifies **querying** with methods like `.find()`, `.save()`, etc.

### Installing MongoDB & Mongoose
Ensure you have **Node.js** installed, then install Mongoose via npm:

```sh
npm install mongoose
```

---

## 3. Connecting to MongoDB with Mongoose
Create a new file **`index.js`** and set up the connection:

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/myDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));
```

---

## 4. Creating a Mongoose Model
A **model** represents a collection and enforces a schema. Let’s define a **User** model.

### Step 1: Define the Schema
Create a new file **`models/User.js`**:

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 0 }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```

---

## 5. Using the Model to Interact with the Database
### Creating and Saving a New User
In **`index.js`**, import the model and create a user:

```javascript
const User = require('./models/User');

const createUser = async () => {
    try {
        const user = new User({ name: "Alice", email: "alice@example.com", age: 25 });
        await user.save();
        console.log("User saved:", user);
    } catch (error) {
        console.error("Error creating user:", error);
    }
};

createUser();
```

### Finding Users
```javascript
const findUsers = async () => {
    const users = await User.find();
    console.log(users);
};

findUsers();
```

### Updating a User
```javascript
const updateUser = async () => {
    const user = await User.findOneAndUpdate(
        { email: "alice@example.com" },
        { age: 30 },
        { new: true }
    );
    console.log("Updated user:", user);
};

updateUser();
```

### Deleting a User
```javascript
const deleteUser = async () => {
    await User.deleteOne({ email: "alice@example.com" });
    console.log("User deleted.");
};

deleteUser();
```

---

## 6. Adding Mongoose Validation
Mongoose provides built-in validation to ensure data integrity.

### Example: Adding More Validation
Modify **`models/User.js`**:

```javascript
const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"] },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    age: { type: Number, min: [18, "Minimum age is 18"], max: 100 }
});
```

---

## 7. Middleware & Hooks
Mongoose allows running code **before or after** database operations.

### Example: Pre-save Hook
```javascript
userSchema.pre('save', function (next) {
    console.log("Before saving user:", this);
    next();
});
```

---

## 8. Summary
- **MongoDB** is a NoSQL database storing data in JSON-like documents.
- **Mongoose** is an ODM library that helps interact with MongoDB in Node.js.
- **Schemas and models** define data structure and enforce validation.
- **CRUD operations** include creating, reading, updating, and deleting documents.
- **Mongoose middleware** can run before/after operations.

---

## Next Steps
- Experiment with **relationships** between models using `ref`.
- Learn about **MongoDB Aggregations** for advanced queries.
- Implement **pagination and indexing** for performance.

