# 🧪 Testing Guide - E-Commerce Website

## ✅ Quick Verification Checklist

### 1. Check Servers are Running
- **Backend:** http://127.0.0.1:8000
- **Frontend:** http://localhost:3000

### 2. Test Basic Features

#### Homepage (http://localhost:3000)
- [ ] Products are displayed in a grid
- [ ] All 12 products are visible
- [ ] Product images load correctly
- [ ] Prices are displayed
- [ ] Stock information shows

#### Search Feature
- [ ] Type "wireless" in search bar → Should show Wireless Headphones and Wireless Mouse
- [ ] Type "keyboard" → Should show Mechanical Keyboard
- [ ] Type "chair" → Should show Gaming Chair
- [ ] Clear search shows all products again

#### Filter Feature
- [ ] Click "Filters" button to expand panel
- [ ] Set Min Price: 50, Max Price: 150
- [ ] Products filter to show only items in that range
- [ ] Check "In Stock Only" → Shows only available items
- [ ] Click "Clear Filters" → All products return

#### Sort Feature
- [ ] Select "Price: Low to High" → Products sort by ascending price
- [ ] Select "Price: High to Low" → Products sort by descending price
- [ ] Select "Name: A to Z" → Products sort alphabetically
- [ ] Select "Newest First" → Returns to default order

### 3. Test Authentication

#### Register New User
1. Click "Register" button in navbar
2. Fill in form:
   - Username: testuser
   - Email: test@example.com
   - First Name: Test
   - Last Name: User
   - Password: test123
   - Confirm Password: test123
3. Click "Register"
4. Should see username in navbar
5. Should see "Logout" button

#### Login Existing User
1. Click "Logout" if logged in
2. Click "Login" button
3. Enter username and password
4. Click "Login"
5. Should see username in navbar

#### Logout
1. Click "Logout" button
2. Should see "Login" and "Register" buttons return
3. Wishlist link should disappear

### 4. Test Product Details

#### View Product
1. Click any product card
2. Should navigate to product detail page
3. Verify:
   - [ ] Product image displays
   - [ ] Product name and description show
   - [ ] Price is correct
   - [ ] Stock information displays
   - [ ] Rating stars show (0 initially)
   - [ ] Review count shows

#### Add to Cart
1. On product detail page
2. Set quantity (e.g., 2)
3. Click "Add to Cart"
4. Should see success message
5. Cart badge in navbar should update
6. Navigate to cart to verify item is there

#### Add to Wishlist
1. **Must be logged in**
2. On product detail page
3. Click "❤️ Wishlist" button
4. Should see success message
5. Click "Wishlist" in navbar
6. Product should appear in wishlist

### 5. Test Reviews

#### Write a Review
1. **Must be logged in**
2. Go to any product detail page
3. Click "Write a Review" button
4. Select rating (1-5 stars)
5. Write comment
6. Click "Submit Review"
7. Should see success message
8. Review should appear in reviews list

#### View Reviews
1. Go to product with reviews
2. Scroll to "Customer Reviews" section
3. Verify:
   - [ ] Reviews display with username
   - [ ] Star rating shows
   - [ ] Comment text displays
   - [ ] Date shows

### 6. Test Cart Management

#### View Cart
1. Click "Cart" in navbar
2. Should see all added items
3. Verify:
   - [ ] Product images show
   - [ ] Product names and prices correct
   - [ ] Quantities display
   - [ ] Total price per item calculates correctly
   - [ ] Grand total is accurate

#### Remove from Cart
1. In cart page
2. Click "Remove" button on any item
3. Item should disappear
4. Cart badge should update
5. Total should recalculate

### 7. Test Wishlist

#### View Wishlist
1. **Must be logged in**
2. Click "Wishlist" in navbar
3. Should see all wishlisted products
4. Verify:
   - [ ] Product images show
   - [ ] Product names and prices correct
   - [ ] Can click to view product details

#### Remove from Wishlist
1. In wishlist page
2. Click "Remove" button
3. Item should disappear from wishlist

### 8. Test Responsive Design

#### Desktop View (>768px)
- [ ] Navbar shows all links horizontally
- [ ] Products display in multi-column grid
- [ ] Product detail shows 2-column layout
- [ ] Filters show horizontally

#### Mobile View (<768px)
- [ ] Navbar items stack or wrap
- [ ] Products display in single or 2-column grid
- [ ] Product detail stacks vertically
- [ ] Filters stack vertically

## 🐛 Common Issues & Solutions

### Issue: Products not loading
**Solution:** 
- Check backend server is running on port 8000
- Check browser console for errors
- Verify API endpoint: http://localhost:8000/api/products/

### Issue: Login not working
**Solution:**
- Check if user exists (try registering first)
- Check browser console for errors
- Verify token is being saved in localStorage

### Issue: Wishlist/Reviews require login message
**Solution:**
- This is expected behavior
- Click "Login" or "Register" first
- Then try the feature again

### Issue: Images not loading
**Solution:**
- Images are from Unsplash CDN
- Check internet connection
- Some images may be blocked by firewall

### Issue: Cart badge not updating
**Solution:**
- Refresh the page
- Check if item was actually added (check cart page)
- Clear browser cache

## 🔍 API Testing (Optional)

### Test Backend Directly

#### Get All Products
```bash
curl http://localhost:8000/api/products/
```

#### Search Products
```bash
curl "http://localhost:8000/api/products/?search=wireless"
```

#### Filter by Price
```bash
curl "http://localhost:8000/api/products/?min_price=50&max_price=150"
```

#### Register User
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"test123","password2":"test123"}'
```

#### Login
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test123"}'
```

## ✨ Expected Behavior Summary

### Without Login:
- ✅ Browse products
- ✅ Search products
- ✅ Filter and sort
- ✅ View product details
- ✅ Add to cart
- ✅ View cart
- ✅ View reviews
- ❌ Add to wishlist
- ❌ Write reviews

### With Login:
- ✅ All above features
- ✅ Add to wishlist
- ✅ View wishlist
- ✅ Write reviews
- ✅ User profile in navbar

## 📊 Test Data

### Sample Products (12 total):
1. Wireless Headphones - $149.99
2. Smart Watch - $299.99
3. Laptop Backpack - $79.99
4. Mechanical Keyboard - $129.99
5. Wireless Mouse - $49.99
6. USB-C Hub - $59.99
7. Portable SSD 1TB - $179.99
8. Webcam HD 1080p - $89.99
9. Phone Stand - $24.99
10. Bluetooth Speaker - $69.99
11. Desk Lamp LED - $39.99
12. Gaming Chair - $249.99

### Test User Credentials:
Create your own during testing or use:
- Username: admin
- Password: (set during createsuperuser)

## 🎯 Success Criteria

All features should work smoothly:
- ✅ No console errors
- ✅ All API calls succeed
- ✅ UI updates correctly
- ✅ Navigation works
- ✅ Forms submit properly
- ✅ Data persists correctly

If all checkboxes are ticked, your e-commerce website is working perfectly! 🎉
