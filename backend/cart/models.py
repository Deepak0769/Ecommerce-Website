from django.db import models
from products.models import Product


class CartItem(models.Model):
    session_id = models.CharField(max_length=255)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.product.name} x {self.quantity}"

    class Meta:
        unique_together = ['session_id', 'product']
        ordering = ['-created_at']

    @property
    def total_price(self):
        return self.product.price * self.quantity
