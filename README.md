# E-Commerce MVP - Django + React

A minimal viable e-commerce website built with Django REST Framework backend and React frontend.

## Features

- Browse products with responsive grid layout
- View detailed product information
- Add/remove products from shopping cart
- Session-based cart management
- Clean, modern UI with smooth interactions
- RESTful API architecture

## Tech Stack

**Backend:**
- Django 4.2+
- Django REST Framework
- SQLite database
- CORS headers for cross-origin requests

**Frontend:**
- React 18
- React Router for navigation
- Context API for state management
- Axios for API calls
- CSS3 for styling

## Project Structure

```
ecommerce-mvp/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── ecommerce_backend/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── products/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── urls.py
│   └── cart/
│       ├── models.py
│       ├── views.py
│       ├── serializers.py
│       └── urls.py
├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       └── api/
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment (recommended):
```bash
python -m venv venv
venv\Scripts\activate  # Windows
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create superuser (optional, for admin access):
```bash
python manage.py createsuperuser
```

6. Start development server:
```bash
python manage.py runserver
```

Backend will run at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Frontend will run at `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products/` - List all products
- `GET /api/products/{id}/` - Get product details
- `POST /api/products/` - Create product (admin)
- `PUT /api/products/{id}/` - Update product (admin)
- `DELETE /api/products/{id}/` - Delete product (admin)

### Cart
- `GET /api/cart/?session_id={id}` - Get cart items
- `POST /api/cart/` - Add item to cart
- `POST /api/cart/remove/` - Remove item from cart
- `POST /api/cart/clear/` - Clear cart

## Adding Sample Products

Access Django admin at `http://localhost:8000/admin` and add products with:
- Name
- Description
- Price
- Stock quantity
- Image URL (optional)

## Development Notes

- Cart uses session-based storage (no authentication required for MVP)
- CORS is configured to allow requests from `http://localhost:3000`
- Frontend uses localStorage to maintain session ID across page refreshes
- All prices are stored as decimals with 2 decimal places

## Future Enhancements

- User authentication and profiles
- Order management and checkout
- Payment integration
- Product search and filtering
- Product categories
- Reviews and ratings
- Wishlist functionality

## License

MIT
