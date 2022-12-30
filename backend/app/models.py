from django.db import models


class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    login = models.CharField(max_length=50)
    password = models.CharField(max_length=500)
    token = models.CharField(max_length=500, blank=False, null=False)


class Category(models.Model):
    category_id = models.AutoField(primary_key=True, unique=True, null=False)
    name = models.CharField(max_length=250)
    description = models.CharField(max_length=500, null=True, blank=True)


class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=250)
    description = models.CharField(max_length=500)
    code = models.CharField(max_length=50)
    url = models.CharField(max_length=500)
    image_url = models.CharField(max_length=500)
    category = models.ForeignKey(Category, null=True, on_delete=models.CASCADE)


class Cart(models.Model):
    cart_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, null=False, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, null=False, on_delete=models.CASCADE)
