import time

from django.contrib.auth.hashers import make_password, check_password
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser

from app.models import User, Product, Cart, Category
from app.serializer import ProductSerializer, CategorySerializer, UserSerializer, CartSerializer


@csrf_exempt
def userApi(request, id=0):
    if request.method == 'GET':
        if id != 0:
            userData = JSONParser().parse(request)
            user = User.objects.get(user_id=id)
            userSerialized = UserSerializer(user, data=userData)
            if userSerialized.is_valid():
                return JsonResponse(userSerialized.data, safe=False)
            else:
                return JsonResponse('Failed', safe=False)
        users = User.objects.all()
        usersSerialized = UserSerializer(users, many=True)

        # Safe pour indiquer une tentative de conversion en format JSON, au cas ou ça passe  str(year)
        return JsonResponse(usersSerialized.data, safe=False)
    elif request.method == 'POST':
        userData = JSONParser().parse(request)
        userData['token'] = str(time.time())
        userData['password'] = make_password(userData['password'])
        userSerialized = UserSerializer(data=userData)
        if userSerialized.is_valid():
            userSerialized.save()
            return JsonResponse({"token": userData['token']}, safe=False)
        return JsonResponse('Failed', safe=False)
    elif request.method == 'PUT':
        userData = JSONParser().parse(request)
        user = User.objects.get(user_id=userData['id'])
        userSerialized = UserSerializer(user, data=userData)
        if userSerialized.is_valid():
            userSerialized.save()
            return JsonResponse('Success update', safe=False)
        return JsonResponse('Failed', safe=False)
    elif request.method == 'DELETE':
        userData = JSONParser().parse(request)
        user = User.objects.get(user_id=userData['id'])
        user.delete()
        return JsonResponse('Success', safe=False)


@csrf_exempt
def productApi(request, id=0):
    if request.method == 'GET':
        productData = JSONParser().parse(request)
        user = User.objects.get(token=productData['token'])

        user_cart = Cart.objects.filter(user_id=user.user_id)
        products = Product.objects.prefetch_related(
            'cart_set'
        ).filter(cart__in=user_cart)
        productsSerialized = ProductSerializer(products, many=True)
        return JsonResponse(productsSerialized.data, safe=False)
    elif request.method == 'POST':
        productData = JSONParser().parse(request)
        user = User.objects.get(token=str(productData['token']))

        print("*************************************************")
        print(user.user_id, user.token, user.login)

        category = {'name': productData['category']}
        categorySerialized = CategorySerializer(data=category)
        categorySerialized.is_valid()
        categorySerialized.save()

        lastCat = Category.objects.latest('category_id')

        newProductData = {
            'name': productData['name'],
            'url': productData['url'],
            'image_url': productData['image_url'],
            'description': productData['description'],
            'category_id': lastCat.category_id,
            'code': productData['code']
        }
        productSerialized = ProductSerializer(data=newProductData)
        if productSerialized.is_valid():
            productSerialized.save()
            lastProduct = Product.objects.latest('product_id')
            cart = {'product_id': lastProduct.product_id, 'user': user.user_id}

            cartSerialized = CartSerializer(data=cart)
            if cartSerialized.is_valid():
                cartSerialized.save()
            return JsonResponse('Success', safe=False)
        return JsonResponse('Failed', safe=False)
    elif request.method == 'PUT':
        productData = JSONParser().parse(request)
        product = Product.objects.get(product_id=productData['id'])
        productSerialized = ProductSerializer(product, data=productData)
        if productSerialized.is_valid():
            productSerialized.save()
            return JsonResponse('Success update', safe=False)
        return JsonResponse('Failed', safe=False)
    elif request.method == 'DELETE':
        productData = JSONParser().parse(request)
        user = User.objects.get(token=productData['token'])
        product = Product.objects.get(product_id=productData['id'])
        product.delete()
        Cart.objects.filter(user=user['id'], product_id=productData['id']).delete()
        return JsonResponse('Success', safe=False)


@csrf_exempt
def cartApi(request, id=0):
    if request.method == 'GET':
        carts = Cart.objects.all()
        cartsSerialized = CartSerializer(carts, many=True)
        return JsonResponse(cartsSerialized.data, safe=False)
    elif request.method == 'POST':
        cartData = JSONParser().parse(request)
        cartSerialized = CartSerializer(data=cartData)
        if cartSerialized.is_valid():
            cartSerialized.save()
            return JsonResponse('Success', safe=False)
        return JsonResponse('Failed', safe=False)
    elif request.method == 'PUT':
        cartData = JSONParser().parse(request)
        cart = Cart.objects.get(cart_id=cartData['id'])
        cartSerialized = CartSerializer(cart, data=cartData)
        if cartSerialized.is_valid():
            cartSerialized.save()
            return JsonResponse('Success update', safe=False)
        return JsonResponse('Failed', safe=False)
    elif request.method == 'DELETE':
        cartData = JSONParser().parse(request)
        cart = Cart.objects.get(category_id=cartData['id'])
        cart.delete()
        return JsonResponse('Success', safe=False)


@csrf_exempt
def categoryApi(request, id=0):
    if request.method == 'GET':
        categories = Category.objects.all()
        categoriesSerialized = CategorySerializer(categories, many=True)
        return JsonResponse(categoriesSerialized.data, safe=False)
    elif request.method == 'POST':
        categoryData = JSONParser().parse(request)
        categorySerialized = CategorySerializer(data=categoryData)
        if categorySerialized.is_valid():
            categorySerialized.save()
            return JsonResponse('Success', safe=False)
        return JsonResponse('Failed', safe=False)
    elif request.method == 'PUT':
        categoryData = JSONParser().parse(request)
        category = Category.objects.get(category_id=categoryData['id'])
        categorySerialized = CategorySerializer(category, data=categoryData)
        if categorySerialized.is_valid():
            categorySerialized.save()
            return JsonResponse('Success update', safe=False)
        return JsonResponse('Failed', safe=False)
    elif request.method == 'DELETE':
        categoryData = JSONParser().parse(request)
        category = Category.objects.get(category_id=categoryData['id'])
        category.delete()
        return JsonResponse('Success', safe=False)


@csrf_exempt
def loginApi(request, id=0):
    userData = JSONParser().parse(request)
    user = User.objects.get(login=userData['login'])
    if check_password(userData['password'], user.password):
        return JsonResponse({"token": user.token}, safe=False)
    return JsonResponse('Failed', safe=False)
