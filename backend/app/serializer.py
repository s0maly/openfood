from rest_framework import serializers
from app.models import User, Product, Cart, Category


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'login', 'password', 'token')


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ('cart_id', 'product_id', 'user_id')


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('product_id', 'name', 'description', 'code', 'url', 'image_url', 'category')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('category_id', 'name', 'description')


