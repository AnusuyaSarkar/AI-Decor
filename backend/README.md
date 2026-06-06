# Decor With Love Backend

Production-ready Node.js + Express backend for the Decor With Love interior decoration platform.

## Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT authentication
- bcrypt
- Cloudinary
- OpenAI API
- Multer
- Express Validator
- dotenv
- CORS
- Helmet
- Rate limiting
- Mongo sanitization

## Architecture

The backend follows MVC with a clear separation of concerns:

- `src/config` for database, Cloudinary, OpenAI, and email configuration
- `src/controllers` for request handling
- `src/middleware` for auth, validation, upload, and errors
- `src/models` for Mongoose schemas
- `src/routes` for REST endpoints
- `src/services` for Cloudinary, AI, and password reset flows
- `src/utils` for helpers and shared response/error handling
- `src/validations` for Express Validator rules

## Folder Structure

```text
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validations/
│   └── app.js
├── server.js
├── package.json
└── .env.example
```

## Environment Variables

Copy `.env.example` to `.env` and fill the values.

| Variable | Purpose |
| --- | --- |
| `PORT` | API server port |
| `NODE_ENV` | `development` or `production` |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | JWT access token secret |
| `JWT_EXPIRES_IN` | Access token TTL |
| `CLIENT_URL` | Frontend URL for CORS and password reset links |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary key |
| `CLOUDINARY_API_SECRET` | Cloudinary secret |
| `OPENAI_API_KEY` | OpenAI key |
| `OPENAI_MODEL` | Text model for analysis |
| `OPENAI_IMAGE_MODEL` | Image generation model |
| `EMAIL_HOST` | SMTP host |
| `EMAIL_PORT` | SMTP port |
| `EMAIL_SECURE` | `true` or `false` |
| `EMAIL_USER` | SMTP username |
| `EMAIL_PASS` | SMTP password |
| `EMAIL_FROM` | Sender address |
| `MAX_FILE_SIZE` | Upload limit in bytes |

## Core API Endpoints

### Auth

#### Register user
`POST /api/auth/register`

Request:

```json
{
  "name": "Aanya Sharma",
  "email": "aanya@example.com",
  "password": "secret123"
}
```

Response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "Aanya Sharma",
      "email": "aanya@example.com",
      "role": "user",
      "accountType": "user"
    },
    "token": "jwt-token"
  }
}
```

#### Login user
`POST /api/auth/login`

#### Forgot password
`POST /api/auth/forgot-password`

#### Reset password
`POST /api/auth/reset-password`

### Users

#### Get profile
`GET /api/users/profile`

#### Update profile
`PUT /api/users/profile`

### Sellers

#### Register seller
`POST /api/sellers/register`

#### Login seller
`POST /api/sellers/login`

#### Seller dashboard
`GET /api/sellers/dashboard`

#### Seller products for dashboard
`GET /api/sellers/dashboard/products?page=1&limit=10&status=active`

#### Seller reviews for dashboard
`GET /api/sellers/dashboard/reviews?page=1&limit=10`

### Products

#### Create product
`POST /api/products`

#### List products
`GET /api/products?page=1&limit=12&search=chair&category=bedroom&sort=-createdAt`

#### Get product details
`GET /api/products/:id`

#### Update product
`PUT /api/products/:id`

#### Delete product
`DELETE /api/products/:id`

### AI Design

#### Analyze room
`POST /api/designs/analyze`

Form-data fields:

- `image` file upload
- `prompt` text

Example prompt:

```text
I want a modern minimalist bedroom under ₹15000
```

Response includes:

- decoration suggestions
- budget recommendation
- color palette
- furniture suggestions

#### Redesign room
`POST /api/designs/redesign`

Form-data fields:

- `image` file upload
- `style` one of `Modern`, `Minimalist`, `Luxury`, `Scandinavian`, `Bohemian`
- `prompt` optional text

### Design History

#### List history
`GET /api/designs`

#### Get one design
`GET /api/designs/:id`

### Wishlist

#### Add product
`POST /api/wishlist/add`

#### Remove product
`DELETE /api/wishlist/remove`

#### Get wishlist
`GET /api/wishlist`

### Reviews

#### Add review
`POST /api/reviews`

#### Update review
`PUT /api/reviews/:id`

#### Delete review
`DELETE /api/reviews/:id`

### Admin

#### View users
`GET /api/admin/users`

#### View sellers
`GET /api/admin/sellers`

#### View products
`GET /api/admin/products`

#### Delete product
`DELETE /api/admin/products/:id`

#### Block or unblock user
`PATCH /api/admin/users/:id/block`

#### Dashboard stats
`GET /api/admin/stats`

## Example AI Responses

### Analysis response

```json
{
  "decorationSuggestions": ["Use matte beige paint", "Add a low-profile bed"],
  "budgetRecommendation": "Allocate around ₹12,000 for the main furniture and decor pieces.",
  "colorPalette": ["#F4EDE4", "#C9B8A6", "#7A6A58"],
  "furnitureSuggestions": ["Floating side tables", "Minimal wardrobe", "Warm LED lamps"],
  "summary": "A calm modern-minimal room with soft tones and streamlined furniture."
}
```

### Redesign response

```json
{
  "generatedImage": "https://res.cloudinary.com/.../image.png"
}
```

## Security

Implemented protections include:

- `helmet`
- `express-rate-limit`
- `express-mongo-sanitize`
- JWT auth middleware
- role-based access control
- centralized error handling
- server-side validation with `express-validator`

## Database Design

### User

- name
- email
- password
- role
- profileImage
- wishlist
- savedDesigns
- isBlocked

### Seller

- shopName
- ownerName
- email
- password
- products
- ratings
- isBlocked

### Product

- title
- description
- category
- price
- stock
- images
- sellerId
- ratings
- reviewCount
- isActive

### Design

- userId
- originalImage
- userPrompt
- analysisType
- style
- aiResponse
- generatedImage
- budgetRecommendation
- colorPalette
- furnitureSuggestions

### Review

- userId
- productId
- rating
- comment

## Deployment

### MongoDB Atlas

1. Create a new cluster.
2. Add a database user with read/write access.
3. Whitelist your deployment IP or use `0.0.0.0/0` for managed platforms.
4. Copy the connection string into `MONGODB_URI`.

### Cloudinary

1. Create a Cloudinary account.
2. Copy cloud name, API key, and API secret.
3. Add them to the environment variables.
4. Use the image upload endpoints through the backend only.

### Render

1. Create a new Web Service.
2. Point the build/start commands to the backend folder.
3. Set environment variables in the Render dashboard.
4. Use `npm start` as the start command.
5. Set `CLIENT_URL` to the frontend URL.

### Railway

1. Create a new project and connect the repository.
2. Select the `backend` directory as the service root if you deploy from the monorepo.
3. Add all environment variables.
4. Use `npm start` for production.
5. Attach the MongoDB Atlas and Cloudinary credentials.

## Frontend Integration

The frontend should send requests to the backend base URL, for example:

```text
https://api.yourdomain.com/api
```

Recommended client usage:

- store the JWT token in memory or secure storage
- send it as `Authorization: Bearer <token>`
- use `multipart/form-data` for design analysis and redesign uploads
- keep `CLIENT_URL` aligned with the frontend deployment domain

## Notes

- Password reset links are generated against the configured client URL.
- The AI services are designed to fail gracefully if a model response is not perfectly structured.
- Seller and user accounts are stored in separate collections, which keeps their workflows isolated but still JWT-compatible.