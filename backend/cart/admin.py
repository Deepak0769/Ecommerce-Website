from django.contrib import admin
from .models import CartItem


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['product', 'session_id', 'quantity', 'total_price', 'created_at']
    search_fields = ['session_id', 'product__name']
    list_filter = ['created_at']
