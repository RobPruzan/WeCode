from django.contrib import admin
from django.urls import include, path
from .views import PostContentView, SpacesView, UserView

urlpatterns = [
    path("api/post_content/<str:space_id>", PostContentView.as_view()),
    path("api/users", UserView.as_view()),
    path("api/spaces", SpacesView.as_view()),
]
