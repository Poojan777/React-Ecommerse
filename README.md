# Practical 7 - MERN Authentication & Testing

This workspace contains:

- A React frontend (Vite) in the root project.
- A Node.js + Express backend practical in [backend](backend) with:
	- JWT authentication
	- Password hashing
	- Protected routes
	- Image upload with Multer
	- Mock payment API
	- Validation with express-validator

## Backend Structure

The backend practical is implemented in [backend](backend):

- [backend/server.js](backend/server.js)
- [backend/models/User.js](backend/models/User.js)
- [backend/models/Product.js](backend/models/Product.js)
- [backend/routes/authRoutes.js](backend/routes/authRoutes.js)
- [backend/routes/productRoutes.js](backend/routes/productRoutes.js)
- [backend/middleware/authMiddleware.js](backend/middleware/authMiddleware.js)
- [backend/uploads](backend/uploads)

## Installation

1. Go to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

## Environment Setup

Create [backend/.env](backend/.env) (already added) with:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mern_practical
JWT_SECRET=mysecretkey
```

## Run Backend

1. Start MongoDB locally on `127.0.0.1:27017`.
2. Start the server:

```bash
cd backend
npm run dev
```

Expected startup logs:

- `MongoDB Connected`
- `Server started on port 5000`

## API Endpoints

Base URL: `http://localhost:5000`

- `GET /` -> health check (`API Running`)
- `POST /api/auth/register` -> register user
- `POST /api/auth/login` -> login and get JWT token
- `POST /api/products` -> protected, create product with image upload
- `GET /api/products` -> get all products
- `POST /api/payment` -> mock payment status

Image files are served from:

- `GET /uploads/<filename>`

## Postman Final Test Flow

Follow this exact sequence:

1. Register

Request:

```http
POST /api/auth/register
Content-Type: application/json
```

Body:

```json
{
	"email": "test@gmail.com",
	"password": "123456"
}
```

2. Login (copy token)

Request:

```http
POST /api/auth/login
Content-Type: application/json
```

Body:

```json
{
	"email": "test@gmail.com",
	"password": "123456"
}
```

Response includes:

```json
{
	"token": "<jwt-token>"
}
```

3. Add product (protected + image upload)

Request:

```http
POST /api/products
Authorization: Bearer <jwt-token>
Content-Type: multipart/form-data
```

Form-data fields:

- `name` (text)
- `price` (text/number)
- `image` (file)

4. Get products

Request:

```http
GET /api/products
```

5. Payment

Request:

```http
POST /api/payment
Content-Type: application/json
```

Body:

```json
{
	"amount": 1200
}
```

Success response:

```json
{
	"status": "success"
}
```

If `amount <= 0`, response status is `400` with:

```json
{
	"status": "failed"
}
```

## Notes

- Current backend verification in this environment fails only because MongoDB is not running locally (`ECONNREFUSED 127.0.0.1:27017`).
- Once MongoDB is started, the implementation is ready to run and test.
