from django.contrib import admin
from django.urls import include, path
from .views import (
    CommentsView,
    FollowView,
    FollowingView,
    PostContentView,
    SpacesView,
    UnfollowView,
    UserView,
)

urlpatterns = [
    path("api/post_content/<str:space_id>", PostContentView.as_view()),
    path("api/users", UserView.as_view()),
    path("api/user_names", UserView.as_view()),
    path("api/spaces", SpacesView.as_view()),
    path("api/comments", CommentsView.as_view()),
    path("api/follow", FollowView.as_view()),
    path(
        "api/unfollow/<int:user_id>/<int:user_to_unfollow_id>", UnfollowView.as_view()
    ),
    path("api/following/<int:user_id>", FollowingView.as_view()),
]
