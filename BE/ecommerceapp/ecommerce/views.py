from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets, generics, parsers, permissions, status
from ecommerce import serializers, paginators
from rest_framework.decorators import action
from .models import *
from .permission import StoreOwnerPermission


# from permission import OwnerAuthenticated


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    # queryset = Category.objects.filter(active=True).all().order_by('?')[:10]
    queryset = Category.objects.filter(active=True).all().order_by('?')
    serializer_class = serializers.CategorySerializer

    def get_queryset(self):
        queries = self.queryset

        q = self.request.query_params.get("q")
        if q:
            queries = queries.filter(name__icontains=q)

        return queries

    @action(methods=['get'], detail=True)
    def products(self, request, pk):
        products = self.get_object().product_set.filter(active=True).all()

        store_id = self.request.query_params.get("store_id")
        if store_id:
            products = products.filter(store_id=store_id)

        return Response(serializers.ProductSerializer(products, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)


class ProductViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveUpdateDestroyAPIView,
                     generics.CreateAPIView):
    queryset = Product.objects.all().order_by('?')
    serializer_class = serializers.ProductSerializer
    pagination_class = paginators.ProductPaginator

    def get_queryset(self):
        queries = self.queryset

        q = self.request.query_params.get("q")
        if q:
            queries = queries.filter(name__icontains=q)

        cate_id = self.request.query_params.get('cate_id')
        if cate_id:
            queries = queries.filter(category_id=cate_id)

        return queries

    # def get_permissions(self):
    #     if self.action == "retrieve":
    #         return [permissions.AllowAny()]
    #     return [StoreOwnerPermission()]
    #
    # def get_object(self):
    #     obj = get_object_or_404(self.get_queryset(), pk=self.kwargs["pk"])
    #     self.check_object_permissions(self.request, obj)
    #     return obj

    @action(methods=['get'], detail=True)
    def comments(self, request, pk):
        c = Comment.objects.filter(active=True, product=self.get_object()).all()

        return Response(serializers.CommentSerializer(c, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True)
    def add_comments(self, request, pk):
        c = Comment.objects.create(user=request.user, product=self.get_object(),
                                   content=request.data.get('content'))

        return Response(serializers.CommentSerializer(c).data,
                        status=status.HTTP_201_CREATED)


class StoreViewSet(viewsets.ViewSet, generics.RetrieveAPIView, generics.CreateAPIView):
    queryset = Store.objects.all()
    serializer_class = serializers.StoreSerializer

    # permission_classes = [permissions.IsAuthenticated]

    # permission_classes = [permissions.AllowAny]

    # def get_permissions(self):
    #     if self.action in ['add_review']:
    #         return [permissions.IsAuthenticated()]
    #
    #     return self.permission_classes
    @action(methods=['post'], url_path='register-store', url_name='register-store', detail=False)
    def register_store(self, request):
        user = request.user
        s = Store.objects.create(user = user,
                                 name=request.data.get('name'),
                                 description=request.data.get('description'),
                                 location=request.data.get('location'))
        user.status = 'pending'
        user.save()
        return Response(serializers.StoreSerializer(s).data,
                        status=status.HTTP_201_CREATED)

    @action(methods=['get'], detail=True)
    def categories(self, request, pk):
        categories = Category.objects.filter(product__store_id=self.get_object()).distinct()

        return Response(serializers.CategorySerializer(categories, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True)
    def products(self, request, pk):
        products = self.get_object().product_set.filter(active=True).all()

        cate_id = self.request.query_params.get("cate_id")
        sort_by = self.request.query_params.get("sort_by")
        order = self.request.query_params.get("order")
        q = self.request.query_params.get("q")

        if q:
            products = products.filter(name__icontains=q)
        if cate_id:
            products = products.filter(category=cate_id)
        if sort_by == 'sort':
            products = products.order_by('-created_date')
        if order == 'asc':
            products = products.order_by('price')
        if order == 'desc':
            products = products.order_by('-price')

        return Response(serializers.ProductSerializer(products, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True)
    def reviews(self, request, pk):
        r = Review.objects.filter(active=True, store=self.get_object()).all()

        star = self.request.query_params.get("star")

        if star:
            r = r.filter(star=star)

        return Response(serializers.ReviewSerializer(r, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True)
    def add_review(self, request, pk):
        r = Review.objects.create(user=request.user, store=self.get_object(),
                                  star=request.data.get('star'),
                                  note=request.data.get('note'))

        return Response(serializers.ReviewSerializer(r).data,
                        status=status.HTTP_201_CREATED)


class ReviewViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = Review.objects.all()
    serializer_class = serializers.ReviewSerializer


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True).all()
    serializer_class = serializers.UserSerializer
    parser_classes = [parsers.MultiPartParser]

    def get_permissions(self):
        if self.action.__eq__('current_user'):
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], url_path='current-user', url_name='current-user', detail=False)
    def current_user(self, request):
        return Response(serializers.UserSerializer(request.user).data)


class ReceiptViewSet(viewsets.ViewSet):
    # permission_classes = [permissions.IsAuthenticated]

    def create(self, request):
        # # Tao Order
        # o = Order()
        # o.user = request.user
        # o.save()
        # # Loop Request tao ra cac receipt(OrderDetail), moi detail co id gan vao Order
        # for order_detail in request.data:
        #     od = OrderDetail()
        #     od.order = o
        #     od.product = Product.objects.get(order_detail["product_id"])
        #     od.quantity = order_detail["quantity"]
        #     od.unit_price = order_detail["unit_price"]
        #     od.save()

        # user = self.get_object()
        print(request.user)
        serialized = serializers.OrderDetailSerializer(data=request.data, many=True, context={'user': request.user.pk})
        if serialized.is_valid():
            # for item in serialized.validated_data:
            #     print(item)
            #     item.order(serialized.validated_data['password'])
            serialized.save()
            return Response({'status': 'Pay successfully'}, status=status.HTTP_200_OK, )
        else:
            return Response(serialized.errors,
                            status=status.HTTP_400_BAD_REQUEST)
