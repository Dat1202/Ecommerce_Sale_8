# Generated by Django 4.2.6 on 2024-02-19 09:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0002_alter_category_name_alter_orderdetail_product'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='create_date',
        ),
    ]
