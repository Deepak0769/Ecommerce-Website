import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ecommerce_backend.settings')
django.setup()

from products.models import Product

# Clear existing products
Product.objects.all().delete()

# Sample products with images from placeholder services
products = [
    {
        'name': 'Wireless Headphones',
        'description': 'Premium noise-cancelling wireless headphones with 30-hour battery life. Crystal clear sound quality and comfortable design for all-day wear.',
        'price': 149.99,
        'image_url': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        'stock': 25
    },
    {
        'name': 'Smart Watch',
        'description': 'Feature-packed smartwatch with fitness tracking, heart rate monitor, and smartphone notifications. Water-resistant and stylish.',
        'price': 299.99,
        'image_url': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
        'stock': 15
    },
    {
        'name': 'Laptop Backpack',
        'description': 'Durable and spacious laptop backpack with multiple compartments. Fits up to 15.6" laptops. Perfect for work or travel.',
        'price': 79.99,
        'image_url': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
        'stock': 40
    },
    {
        'name': 'Mechanical Keyboard',
        'description': 'RGB backlit mechanical gaming keyboard with tactile switches. Programmable keys and premium build quality.',
        'price': 129.99,
        'image_url': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
        'stock': 30
    },
    {
        'name': 'Wireless Mouse',
        'description': 'Ergonomic wireless mouse with precision tracking and long battery life. Perfect for work and gaming.',
        'price': 49.99,
        'image_url': 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
        'stock': 50
    },
    {
        'name': 'USB-C Hub',
        'description': '7-in-1 USB-C hub with HDMI, USB 3.0 ports, SD card reader, and power delivery. Essential for modern laptops.',
        'price': 59.99,
        'image_url': 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
        'stock': 35
    },
    {
        'name': 'Portable SSD 1TB',
        'description': 'Ultra-fast portable SSD with 1TB storage. Compact design with USB-C connectivity. Perfect for backups and file transfers.',
        'price': 179.99,
        'image_url': 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500&h=500&fit=crop',
        'stock': 20
    },
    {
        'name': 'Webcam HD 1080p',
        'description': 'Professional HD webcam with auto-focus and built-in microphone. Perfect for video calls and streaming.',
        'price': 89.99,
        'image_url': 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500&h=500&fit=crop',
        'stock': 28
    },
    {
        'name': 'Phone Stand',
        'description': 'Adjustable aluminum phone stand with anti-slip base. Compatible with all smartphones and tablets.',
        'price': 24.99,
        'image_url': 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop',
        'stock': 60
    },
    {
        'name': 'Bluetooth Speaker',
        'description': 'Portable waterproof Bluetooth speaker with 360° sound. 12-hour battery life and deep bass.',
        'price': 69.99,
        'image_url': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
        'stock': 45
    },
    {
        'name': 'Desk Lamp LED',
        'description': 'Modern LED desk lamp with adjustable brightness and color temperature. USB charging port included.',
        'price': 39.99,
        'image_url': 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
        'stock': 32
    },
    {
        'name': 'Gaming Chair',
        'description': 'Ergonomic gaming chair with lumbar support and adjustable armrests. Premium leather and sturdy construction.',
        'price': 249.99,
        'image_url': 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=500&h=500&fit=crop',
        'stock': 12
    }
]

# Create products
created_count = 0
for product_data in products:
    product = Product.objects.create(**product_data)
    created_count += 1
    print(f"Created: {product.name} - ${product.price}")

print(f"\n✅ Successfully created {created_count} products!")
