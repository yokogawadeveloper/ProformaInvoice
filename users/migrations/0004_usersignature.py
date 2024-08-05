# Generated by Django 3.2.7 on 2024-08-01 10:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import users.models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_user_isadmin'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserSignature',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('employee', models.CharField(blank=True, max_length=100, null=True)),
                ('signature', models.ImageField(blank=True, null=True, upload_to=users.models.UserSignature.upload_path)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'UserSignature',
            },
        ),
    ]
