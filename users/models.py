from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import UserManager
from django.core.exceptions import ValidationError
from PIL import Image


class User(AbstractUser):
    EmployeeNo = models.CharField(max_length=50, null=True)
    EmployeeName = models.CharField(max_length=50, null=True)
    Gender = models.CharField(max_length=50, null=True)
    DOB = models.DateField(null=True, blank=True)
    DeptCode = models.CharField(max_length=50, null=True)
    DeptName = models.CharField(max_length=100, null=True)
    Designation = models.CharField(max_length=100, null=True)
    Location = models.CharField(max_length=100, null=True)
    division = models.IntegerField(null=True)
    category = models.IntegerField(null=True)
    project_manager = models.IntegerField(null=True)
    region = models.IntegerField(null=True)
    CreatedAt = models.DateTimeField(auto_now_add=True)
    Isadmin = models.BooleanField(default=False)
    is_special = models.BooleanField(default=False)
    Delete = models.IntegerField(default=0)

    objects = UserManager()


class UserSignature(models.Model):
    def upload_path(instance, filename):
        return '/'.join(['signature', str(instance.employee), filename])

    user = models.ForeignKey(User, models.CASCADE, null=False)
    employee = models.CharField(max_length=100, null=False, blank=False)
    signature = models.ImageField(upload_to=upload_path, null=True, blank=True)

    objects = models.Manager()

    class Meta:
        db_table = "UserSignature"

    def clean(self):
        if self.signature:
            img = Image.open(self.signature)
            width, height = img.size
            # Check the dimensions
            if width > 229 or height > 132:
                raise ValidationError("Image dimensions must be up to 229x132 pixels.")

    def save(self, *args, **kwargs):
        # Call the clean method to ensure the validation occurs
        self.clean()
        super(UserSignature, self).save(*args, **kwargs)


class ActiveUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    last_activity = models.DateTimeField(default=timezone.now)

    objects = models.Manager()

    class Meta:
        unique_together = ('user',)
