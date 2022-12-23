from django.contrib import admin
from django.urls import include, path
from .views import PostContent, UserView, ReactView

urlpatterns = [
    path("", ReactView.as_view()),
    path("api/post_content/<str:room>", PostContent.as_view()),
    # endpoint with last url param as roomName variable as str
]
