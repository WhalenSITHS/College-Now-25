# **Lesson: Understanding Pagination with Mongoose and Postman (For 6th Graders) 🚀**

## **Objective:**
By the end of this lesson, students will understand **what pagination is**, why it's useful, and how to use **Mongoose and Postman** to request data in pages.

---

## **🧐 What is Pagination?**
Imagine you have **a huge book with 1,000 pages** 📖. If you want to read only **10 pages at a time**, you don’t flip through the whole book—you just go to the page you need.

👉 **Pagination is like reading a book in small chunks instead of all at once.**  

When using **databases**, sometimes we have **too much data**! Instead of sending **100,000 stores** at once, we use **pagination** to get only a few at a time.

---

## **🌍 Real-Life Example**
Think about **Google Search** 🕵️‍♂️. When you search for something, do you see **1 million results at once?** No! Google shows **10 results per page**, and you click **Next Page** to see more.

---

## **👨‍💻 How Do We Use Pagination in Our App?**
We are working with **stores** (like grocery stores, toy stores, and coffee shops). Instead of getting **every store at once**, we will get **only a few stores per page**.

---

## **🛠️ Step 1: Set Up Pagination in Mongoose**
We will modify our **Express.js API** to allow pagination. In our `storeRoutes.js` file, we add this:

```javascript
const express = require("express");
const router = express.Router();
const Store = require("../models/Store");

// 🏪 Get stores with pagination
router.get("/stores", async (req, res) => {
  try {
    let { page = 1, limit = 5 } = req.query; // Default: Page 1, 5 stores per page
    page = parseInt(page);
    limit = parseInt(limit);

    const stores = await Store.find()
      .skip((page - 1) * limit) // Skip previous pages
      .limit(limit); // Get only 'limit' number of stores

    const totalStores = await Store.countDocuments();
    const totalPages = Math.ceil(totalStores / limit);

    res.json({
      currentPage: page,
      totalPages,
      totalStores,
      results: stores,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
```

---

## **📝 Step 2: Understanding the Code**
1. **Page Number (`page`)** 📄  
   - The user asks for a specific page (e.g., page `1`, page `2`).
   
2. **Limit (`limit`)** 🔢  
   - How many stores to show per page (e.g., **5 stores per page**).
   
3. **Skipping Pages (`skip()`)** ⏭  
   - If **page = 2** and **limit = 5**, we skip `(2 - 1) * 5 = 5` stores to start from the **6th store**.

4. **Total Pages (`totalPages`)** 📊  
   - If there are **50 stores** and **we show 5 per page**, we get **10 pages** (`50/5 = 10`).

---

## **🚀 Step 3: Making Pagination Requests in Postman**
### **1️⃣ Get Page 1 (First 5 Stores)**
#### **Method:** `GET`
#### **URL:**
```
http://localhost:5000/api/stores?page=1&limit=5
```
#### **Example Response:**
```json
{
  "currentPage": 1,
  "totalPages": 10,
  "totalStores": 50,
  "results": [
    { "name": "Local Market", "description": "Fresh organic produce." },
    { "name": "Toy Kingdom", "description": "Best toys in town." },
    { "name": "Coffee Spot", "description": "Cozy place for coffee." },
    { "name": "Book Haven", "description": "Your favorite bookstore." },
    { "name": "Tech Hub", "description": "Latest gadgets available." }
  ]
}
```

---

### **2️⃣ Get Page 2 (Next 5 Stores)**
#### **Method:** `GET`
#### **URL:**
```
http://localhost:5000/api/stores?page=2&limit=5
```

---

### **🎯 Activity for Students: Try Different Pages**
1. Open **Postman**.
2. Send a request with different pages:
   - **Page 1:** `/api/stores?page=1&limit=5`
   - **Page 3:** `/api/stores?page=3&limit=5`
   - **Page 5:** `/api/stores?page=5&limit=5`
3. Change **limit** (e.g., `/api/stores?page=1&limit=10`).

💡 **Question:** What happens if you set a limit of `1`? What if you set a limit of `20`?

---

## **🎉 Recap**
✅ **Pagination** helps us break down large amounts of data into smaller chunks.  
✅ **Mongoose** uses `.skip()` and `.limit()` to fetch only a few stores at a time.  
✅ **Postman** lets us test **pagination by changing `page` and `limit` in the URL**.  

---

## **🔍 Challenge:**
1. **Add Sorting** 📌  
   Modify the request to **sort by store name** (`/api/stores?page=1&limit=5&sort=name`).
   
2. **Filter by Tag** 🔍  
   Show only **"Local"** stores (`/api/stores?page=1&limit=5&tag=Local`).

---

This lesson makes pagination fun and easy for 6th graders! Would you like me to add visuals or interactive quizzes? 🚀