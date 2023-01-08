from django.contrib import admin
from django.urls import include, path
from .views import (
    CommentsView,
    FollowView,
    FollowingView,
    PostContentView,
    SpacesView,
    UnfollowView,
    UserPostView,
    UserView,
    UsersView,
    UsernameView,
)

urlpatterns = [
    path("api/post_content/<str:space_id>", PostContentView.as_view()),
    path("api/user_posts/<str:user_id>", UserPostView.as_view()),
    path("api/user", UserView.as_view()),
    path("api/users", UsersView.as_view()),
    path("api/user_names", UsernameView.as_view()),
    path("api/spaces/<int:member_id>", SpacesView.as_view()),
    path("api/comments", CommentsView.as_view()),
    path("api/follow/<int:user_id>", FollowView.as_view()),
    path(
        "api/unfollow/<int:user_id>/<int:user_to_unfollow_id>", UnfollowView.as_view()
    ),
    path("api/following/<int:user_id>", FollowingView.as_view()),
]
