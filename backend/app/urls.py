from django.urls import re_path
from app import views

urlpatterns = [
    re_path('users', views.userApi),
    re_path('users/([0-9]+)$', views.userApi),

    re_path('categories', views.categoryApi),
    re_path('categories/([0-9]+)$', views.categoryApi),

    re_path('carts', views.cartApi),
    re_path('carts/([0-9]+)$', views.cartApi),

    re_path('products', views.productApi),
    re_path('products/([0-9]+)$', views.productApi),

    re_path('login', views.loginApi),
]
