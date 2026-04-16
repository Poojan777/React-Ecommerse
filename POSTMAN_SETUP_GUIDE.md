# 📮 Postman Setup Guide - MERN Practical

## 1️⃣ Download & Install Postman

- **Download**: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
- **Platform**: Windows/Mac/Linux
- **Free Version**: Sufficient for this practical
- **Installation**: Standard setup (no special configuration needed)

---

## 2️⃣ Import the Collection

### Option A: Import from File (Recommended)
1. Open Postman
2. Click **Import** button (top-left)
3. Select **File** tab
4. Upload: `MERN_Practical_Collection.postman_collection.json`
5. Click **Import**

### Option B: Manual Setup
If you prefer to create requests manually, follow the steps in Section 4.

---

## 3️⃣ Create Environment Variable

This will auto-save your token after login, so you don't need to copy/paste it manually.

### Steps:
1. Click **Environments** (left sidebar)
2. Click **Create Environment**
3. Name: `MERN_Practical`
4. Add Variables:
   - **Variable**: `auth_token`
   - **Initial Value**: (leave blank)
   - **Current Value**: (leave blank)
5. Click **Save**

### Set as Active:
- Top-right corner in Postman
- Select dropdown → Choose `MERN_Practical`

---

## 4️⃣ Testing Flow in Postman

### **Step 1: Check Server Status** ✅
```
GET http://localhost:5000/
```
- Click **Send**
- Expected: `API Running` (200 OK)

---

### **Step 2: Register User** 📝
```
POST http://localhost:5000/api/auth/register

BODY (raw JSON):
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

**Steps in Postman:**
1. Click the **Register User** request
2. Verify **POST** method selected
3. Tab: **Body** → Select **raw** → **JSON**
4. Paste the JSON above
5. Click **Send**

**Expected Response (201):**
```json
{
  "message": "User registered",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "test@gmail.com"
  }
}
```

---

### **Step 3: Login & Get Token** 🔑
```
POST http://localhost:5000/api/auth/login

BODY (raw JSON):
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

**Steps in Postman:**
1. Click the **Login User** request
2. Verify **POST** method selected
3. Tab: **Body** → Select **raw** → **JSON**
4. Paste the JSON above
5. Click **Send**

**Expected Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3NDQ5MDA0MzUsImV4cCI6MTc0NDkwNDAzNX0.abc123..."
}
```

✅ **Token automatically saved** to environment variable if using the imported collection

---

### **Step 4: Add Product with Image Upload** 📸
```
POST http://localhost:5000/api/products/

HEADERS:
Authorization: <your_token_here>

BODY: form-data
- name: "Laptop"
- price: "50000"
- image: (select an image file)
```

**Steps in Postman:**

1. Click the **Add Product with Image** request
2. Verify **POST** method selected
3. Tab: **Headers**
   - Key: `Authorization`
   - Value: `{{auth_token}}` (this auto-fills from environment)

4. Tab: **Body** → Select **form-data**
   - Key: `name` | Value: `Laptop`
   - Key: `price` | Value: `50000`
   - Key: `image` | Type: **file** | Select an image from your computer

5. Click **Send**

**Expected Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Laptop",
  "price": 50000,
  "image": "/uploads/1744900435123-laptop.jpg",
  "createdAt": "2026-04-17T12:30:35.123Z",
  "updatedAt": "2026-04-17T12:30:35.123Z"
}
```

---

### **Step 5: Get All Products** 📦
```
GET http://localhost:5000/api/products/
```

**Steps in Postman:**
1. Click the **Get All Products** request
2. Verify **GET** method selected
3. No headers or body needed
4. Click **Send**

**Expected Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Laptop",
    "price": 50000,
    "image": "/uploads/1744900435123-laptop.jpg",
    "createdAt": "2026-04-17T12:30:35.123Z",
    "updatedAt": "2026-04-17T12:30:35.123Z"
  }
]
```

---

### **Step 6: Process Payment** 💳
```
POST http://localhost:5000/api/payment

BODY (raw JSON):
{
  "amount": 50000
}
```

**Steps in Postman:**
1. Click the **Process Payment** request
2. Verify **POST** method selected
3. Tab: **Body** → Select **raw** → **JSON**
4. Paste the JSON above
5. Click **Send**

**Expected Response (200):**
```json
{
  "status": "success"
}
```

---

## 5️⃣ Common Issues & Solutions

### ❌ "Cannot POST /api/auth/register"
- **Solution**: Backend not running. Start it with `npm start` in the backend folder

### ❌ "Connection refused at localhost:5000"
- **Solution**: Verify backend server is running and listening on port 5000

### ❌ "401 Unauthorized"
- **Solution**: Token is missing or invalid
  - Make sure you logged in first
  - Check Authorization header has the correct token
  - Token expires after 1 hour (login again if needed)

### ❌ "400 Bad Request - Only image files are allowed"
- **Solution**: Make sure the file you're uploading is an image (jpg, png, gif, etc.)

### ❌ "ValidationError - Email already exists"
- **Solution**: Use a different email for registration, or you already registered with this email

### ❌ "JSOM parse error"
- **Solution**: Make sure you're sending JSON format, not form-data for auth endpoints

---

## 6️⃣ Pro Tips for Postman

### 📌 Organize Requests
- Group related requests in **Collections**
- Use **Folders** for auth, products, payments
- Already done in the imported collection!

### 🔄 Reuse Variables
- **Environment Variables**: Auto-fill common values
- Example: `{{auth_token}}` = your JWT token
- Can also use: `{{base_url}}` for `http://localhost:5000`

### 📊 View Response
- **Pretty**: Formatted JSON
- **Raw**: Plain text
- **Preview**: Rendered HTML
- **Headers**: Response headers info

### 🧪 Write Tests
- Click **Tests** tab to add assertions
- Example: Verify response status (already included in Login)

### 💾 Save Collections
- **File** → **Export** to backup your collection
- Share with team members

---

## 7️⃣ Quick Reference

| Endpoint | Method | Auth Required | Body |
|----------|--------|---------------|------|
| `/api/auth/register` | POST | ❌ No | email, password |
| `/api/auth/login` | POST | ❌ No | email, password |
| `/api/products` | GET | ❌ No | None |
| `/api/products` | POST | ✅ Yes | name, price, image |
| `/api/payment` | POST | ❌ No | amount |

---

## 8️⃣ Complete Test Sequence

```
1. ✅ Check Server Status (GET /)
2. ✅ Register User (POST /register)
3. ✅ Login User (POST /login) → Get & Save Token
4. ✅ Add Product (POST /products with Token)
5. ✅ Get All Products (GET /products)
6. ✅ Process Payment (POST /payment)
```

**Time Required**: ~5 minutes to complete entire flow

---

## 🎯 What to Verify

✅ **Authentication**
- Can register with email & password
- Can login and receive JWT token
- Token works for protected routes

✅ **Image Upload**
- Can upload image with product
- Image saved in `/uploads` folder
- Image path returned in response

✅ **Payment**
- Positive amounts return success
- Zero/negative amounts return error

✅ **Products**
- Can create products (with auth)
- Can retrieve all products
- Products include image paths

---

## 📞 Need Help?

### Check Backend Logs
```bash
cd backend
npm start
# Watch console for errors
```

### Verify MongoDB Connection
```bash
# MongoDB should be running
mongod
```

### Test API Directly
```bash
# From terminal
curl http://localhost:5000/
# Should show: API Running
```

---

**Ready to test? Start with Postman and follow the 8-step sequence above! 🚀**
