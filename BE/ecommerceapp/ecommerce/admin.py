from django.contrib import admin
from django.urls import path
from django import forms
from django.template.response import TemplateResponse
from django.utils.html import mark_safe
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from .models import *
from django.db.models import Sum, F, Q
from django.db.models.functions import ExtractMonth
from django.db.models import Count
from django.shortcuts import render


class EcommerceAdminSite(admin.AdminSite):
    site_header = "Ecommerce"

    class Media:
        css = {
            'all': ('/static/css/style.css',)
        }

    js = ('/static/js/script.js',)

    def get_urls(self):
        return [
            path('stats-revenue/', self.stats_revenue_view),
            path('store-approval/', self.store_approval)
        ] + super().get_urls()


    def stats_revenue_view(self, request):
        month = request.GET.get('month')
        year = request.GET.get('year')
        quarter = request.GET.get('quarter')

        result = (Order.objects.values(month=ExtractMonth('order_date')).
                  annotate(total_price=Sum(F('orderdetail__unit_price') * F('orderdetail__quantity'))).
                  order_by('month'))

        if year:
            if quarter and month:
                result = result.filter(Q(order_date__quarter=quarter) | Q(month=month), order_date__year=year)
            elif month:
                result = result.filter(month=month, order_date__year=year)
            elif quarter:
                result = result.filter(order_date__quarter=quarter, order_date__year=year)
        elif quarter:
            result = result.filter(order_date__quarter=quarter)
        elif month:
            result = result.filter(month=month)

        return TemplateResponse(request, 'admin/stats-revenue.html', {
            'stats_revenue': result,
        })

    def stats(self, request):
        stats_count_product_by_cate = Category.objects.annotate(count=Count('product__name')).values('name', 'count')
        stats_count_product = Product.objects.count()
        stats_count_cate = Category.objects.count()
        stats_revenue_store = (Store.objects.values('name')
                               .annotate(total_price=
                                         Sum(F('product__orderdetail__unit_price') * F(
                                             'product__orderdetail__quantity'))))

        return TemplateResponse(request, 'admin/stats-count-admin.html', {
            'stats_count_products': stats_count_product_by_cate,
            'count_category': stats_count_cate,
            'count_product': stats_count_product,
            'stats_revenue_store': stats_revenue_store
        })

    def store_approval(self, request):
        if request.method == 'POST':
            users = User.objects.filter(pk__in=request.POST.getlist("users"))
            if request.POST["action"] == "reject":
                User.objects.filter(pk__in=request.POST["users"]).update(status="Rejected")
            else:
                store_role = Group.objects.get(pk=3)
                users.update(status="Approved", user_role_id=store_role)

        stores = Store.objects.filter(user__status="Pending").all()
        return render(request, 'admin/store_approval.html', {
            'stores': stores,
        })


class ProductForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Product
        fields = '__all__'


class ProductAdmin(admin.ModelAdmin):
    list_display = ['pk', 'active', 'name', 'price', 'description', 'quantity', 'category']
    search_fields = ['name']
    list_filter = ['category']
    readonly_fields = ['img']
    form = ProductForm

    def save_model(self, request, obj, form, change):
        if getattr(obj, 'store_id ', None) is None:
            obj.store_id = request.user.store.id
        obj.save()

    def img(self, product):
        if product:
            return mark_safe(
                '<img src="/static/{url}" width="120" />'.format(url=product.image.name)
            )


admin_site = EcommerceAdminSite(name='Ecommerce')
admin_site.register(Category)
admin_site.register(Product, ProductAdmin)