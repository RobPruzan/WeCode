from django.contrib import admin
from .models import User, Space, Challenge, Answer


# Register your models here.
admin.site.register(User)
admin.site.register(Space)
admin.site.register(Challenge)
admin.site.register(Answer)
