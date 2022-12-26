from django.contrib import admin
from django.urls import include, path
from .views import PostContentView, UserView, ReactView

urlpatterns = [
    path("", ReactView.as_view()),
    path("api/post_content/<str:room>", PostContentView.as_view()),
    path("api/users", UserView.as_view()),
]
