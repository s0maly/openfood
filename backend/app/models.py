from django.db import models


class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    login = models.CharField(max_length=50)
    password = models.CharField(max_length=500)


class Cart(models.Model):
    cart_id = models.AutoField(primary_key=True)
    user_id = models.IntegerField()
    product_id = models.IntegerField()


class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=250)
    description = models.CharField(max_length=500)
    code = models.CharField(max_length=50)
    url = models.CharField(max_length=500)
    image_url = models.CharField(max_length=500)


class Category(models.Model):
    category_id = models.AutoField(primary_key=True, unique=True, null=False)
    name = models.CharField(max_length=250)
    description = models.CharField(max_length=500)
