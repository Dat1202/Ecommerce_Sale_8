from django.contrib.auth.models import AbstractUser, Group
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField
from django.db import models


class BaseModel(models.Model):
    created_date = models.DateTimeField (auto_now_add=True, null=True)
    updated_date = models.DateTimeField (auto_now=True, null=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class User(AbstractUser):
    user_role = models.ForeignKey(Group, on_delete=models.RESTRICT, default=2, related_name='user_role')
    status = models.CharField(max_length=50, null=True)
    avatar = CloudinaryField('avatar', null=True)

    def __str__(self):
        return self.status


class Store(BaseModel):
    name = models.CharField(max_length=100, null=False)
    description = RichTextField()
    location = models.CharField(max_length=100, null=False)
    user = models.OneToOneField(User, on_delete=models.RESTRICT)

    def __str__(self):
        return self.name


class Category(BaseModel):
    name = models.CharField(max_length=100, null=False, unique=True)

    def __str__(self):
        return self.name


class Product(BaseModel):
    name = models.CharField(max_length=100, null=False)
    price = models.DecimalField(max_digits=12, decimal_places=2, null=False)
    image = models.ImageField(upload_to='ecommerce/%Y/%m')
    description = RichTextField()
    quantity = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.RESTRICT)
    store = models.ForeignKey(Store, on_delete=models.RESTRICT, editable=False)
    #editable

    def __str__(self):
        return self.name


class Order(models.Model):
    order_date = models.DateField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.RESTRICT)


class OrderDetail(models.Model):
    unit_price = models.DecimalField(max_digits=12, decimal_places=2, null=False)
    quantity = models.IntegerField()
    order = (models.ForeignKey
             (Order, on_delete=models.RESTRICT))
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)


class Interaction(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)

    class Meta:
        abstract = True


class Comment(Interaction):
    content = models.CharField(max_length=100, null=False)
    product = models.ForeignKey(Product, on_delete=models.RESTRICT)


class Review(Interaction):
    star = models.IntegerField()
    note = models.CharField(max_length=100, null=False)
    store = models.ForeignKey(Store, on_delete=models.RESTRICT)


