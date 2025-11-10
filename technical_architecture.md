# Technical Architecture - E-Commerce MVP

## System Overview

This e-commerce MVP follows a client-server architecture with a clear separation between frontend and backend, communicating via RESTful APIs.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│                      (React SPA)                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Components Layer                                     │  │
│  │  - Navbar, ProductList, ProductDetail, Cart          │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Pages Layer                                          │  │
│  │  - HomePage, ProductPage, CartPage                   │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  State Management (Context API)                      │  │
│  │  - CartContext (cart state, operations)              │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API Layer (Axios)                                    │  │
│  │  - HTTP client, session management                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/JSON
                            │ REST API
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                         Backend                              │
│                  (Django REST Framework)                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API Layer (ViewSets)                                │  │
│  │  - ProductViewSet, CartViewSet                       │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Serializers                                          │  │
│  │  - ProductSerializer, CartItemSerializer             │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Models (ORM)                                         │  │
│  │  - Product, CartItem                                 │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Database (SQLite)                                    │  │
│  │  - products_product, cart_cartitem                   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Data Models

### Product Model
```python
{
    id: Integer (PK),
    name: String(200),
    description: Text,
    price: Decimal(10,2),
    image_url: URL(500),
    stock: Integer,
    created_at: DateTime,
    updated_at: DateTime
}
```

### CartItem Model
```python
{
    id: Integer (PK),
    session_id: String(255),
    product: ForeignKey(Product),
    quantity: Integer,
    created_at: DateTime,
    updated_at: DateTime,
    total_price: Computed Property
}
```

## API Endpoints & Data Flow

### 1. Product Listing Flow
```
User visits homepage
    ↓
React: HomePage component mounts
    ↓
API call: GET /api/products/
    ↓
Django: ProductViewSet.list()
    ↓
Query: Product.objects.all()
    ↓
Serialize: ProductSerializer
    ↓
Response: JSON array of products
    ↓
React: Update state, render ProductList
```

### 2. Product Detail Flow
```
User clicks product
    ↓
React Router: Navigate to /product/:id
    ↓
API call: GET /api/products/{id}/
    ↓
Django: ProductViewSet.retrieve()
    ↓
Query: Product.objects.get(id=id)
    ↓
Serialize: ProductSerializer
    ↓
Response: JSON product object
    ↓
React: Render ProductDetail component
```

### 3. Add to Cart Flow
```
User clicks "Add to Cart"
    ↓
React: ProductDetail.handleAddToCart()
    ↓
Context: CartContext.addToCart()
    ↓
API call: POST /api/cart/
Body: {session_id, product_id, quantity}
    ↓
Django: CartViewSet.create()
    ↓
Logic: Get or create CartItem
    ↓
If exists: Increment quantity
If new: Create CartItem
    ↓
Save to database
    ↓
Serialize: CartItemSerializer
    ↓
Response: JSON cart item
    ↓
React: Refresh cart, update UI
```

### 4. View Cart Flow
```
User navigates to cart
    ↓
React: CartPage component mounts
    ↓
Context: CartContext initialized
    ↓
API call: GET /api/cart/?session_id={id}
    ↓
Django: CartViewSet.list()
    ↓
Query: CartItem.objects.filter(session_id=id)
    ↓
Serialize: CartItemSerializer (includes product)
    ↓
Response: JSON array of cart items
    ↓
React: Render Cart component with items
```

### 5. Remove from Cart Flow
```
User clicks "Remove"
    ↓
React: Cart.removeFromCart()
    ↓
Context: CartContext.removeFromCart()
    ↓
API call: POST /api/cart/remove/
Body: {session_id, product_id}
    ↓
Django: CartViewSet.remove()
    ↓
Query: CartItem.objects.get(...)
    ↓
Delete cart item
    ↓
Response: Success message
    ↓
React: Refresh cart, update UI
```

## Session Management

### Frontend Session Handling
```javascript
// Generate unique session ID
sessionId = 'session_' + random_string()

// Store in localStorage
localStorage.setItem('sessionId', sessionId)

// Include in all cart API calls
```

### Backend Session Handling
```python
# Extract from request
session_id = request.data.get('session_id', 'default')

# Filter cart items by session
CartItem.objects.filter(session_id=session_id)
```

## State Management

### CartContext Structure
```javascript
{
    cartItems: Array,      // Current cart items
    cartCount: Number,     // Total item count
    cartTotal: Number,     // Total price
    loading: Boolean,      // Loading state
    addToCart: Function,   // Add item
    removeFromCart: Function, // Remove item
    fetchCart: Function    // Refresh cart
}
```

## Security Considerations

### Current Implementation (MVP)
- AllowAny permissions for all endpoints
- CORS restricted to localhost:3000
- Session-based cart (no authentication)
- SQLite database

### Production Recommendations
- Implement user authentication (JWT/OAuth)
- Add permission classes (IsAuthenticated)
- Use PostgreSQL database
- Add rate limiting
- Implement HTTPS
- Validate input data
- Add CSRF protection
- Secure session management

## Performance Optimizations

### Backend
- Database indexing on frequently queried fields
- Pagination for product listings
- Caching for product data
- Optimized queries with select_related/prefetch_related

### Frontend
- Lazy loading for routes
- Image optimization
- Debouncing for search/filter
- Memoization for expensive computations
- Code splitting

## Error Handling

### Backend
```python
try:
    # Operation
except Product.DoesNotExist:
    return Response({'error': 'Not found'}, 404)
except Exception as e:
    return Response({'error': str(e)}, 500)
```

### Frontend
```javascript
try {
    await api.call()
} catch (error) {
    setError('Operation failed')
    console.error(error)
}
```

## Deployment Architecture

### Development
- Backend: Django dev server (port 8000)
- Frontend: React dev server (port 3000)
- Database: SQLite file

### Production (Recommended)
- Backend: Gunicorn + Nginx
- Frontend: Static build served by CDN
- Database: PostgreSQL
- Caching: Redis
- Storage: AWS S3 for images

## Scalability Considerations

### Horizontal Scaling
- Stateless API design
- Session data in Redis/database
- Load balancer for multiple instances

### Vertical Scaling
- Database optimization
- Caching layer
- CDN for static assets

### Microservices Evolution
- Product service
- Cart service
- Order service
- User service
- Payment service

## Testing Strategy

### Backend Testing
- Unit tests for models
- API endpoint tests
- Integration tests

### Frontend Testing
- Component unit tests
- Integration tests
- E2E tests with Cypress

## Monitoring & Logging

### Backend
- Django logging configuration
- API request/response logging
- Error tracking (Sentry)

### Frontend
- Console error tracking
- User analytics
- Performance monitoring

## Future Architecture Enhancements

1. **Authentication Service**
   - JWT token management
   - User profiles
   - OAuth integration

2. **Order Management**
   - Order processing pipeline
   - Payment gateway integration
   - Email notifications

3. **Search & Filtering**
   - Elasticsearch integration
   - Advanced filtering
   - Faceted search

4. **Real-time Features**
   - WebSocket for live updates
   - Stock availability notifications
   - Chat support

5. **Admin Dashboard**
   - Analytics and reporting
   - Inventory management
   - Order fulfillment
