from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import CartItem
from .serializers import CartItemSerializer
from products.models import Product


class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        session_id = self.request.query_params.get('session_id', 'default')
        return CartItem.objects.filter(session_id=session_id)

    def create(self, request, *args, **kwargs):
        session_id = request.data.get('session_id', 'default')
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        cart_item, created = CartItem.objects.get_or_create(
            session_id=session_id,
            product=product,
            defaults={'quantity': quantity}
        )

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        serializer = self.get_serializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def remove(self, request):
        session_id = request.data.get('session_id', 'default')
        product_id = request.data.get('product_id')

        try:
            cart_item = CartItem.objects.get(session_id=session_id, product_id=product_id)
            cart_item.delete()
            return Response({'message': 'Item removed from cart'}, status=status.HTTP_200_OK)
        except CartItem.DoesNotExist:
            return Response({'error': 'Item not found in cart'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['post'])
    def clear(self, request):
        session_id = request.data.get('session_id', 'default')
        CartItem.objects.filter(session_id=session_id).delete()
        return Response({'message': 'Cart cleared'}, status=status.HTTP_200_OK)
