from django.contrib import admin
from django.urls import include, path
from .views import (
    AnswerView,
    ChallengeView,
    CommentsView,
    FilteredPostContentView,
    FollowView,
    FollowingView,
    PostContentView,
    SpacesView,
    TestView,
    UnfollowView,
    UserPostView,
    UserView,
    UsersView,
    UsernameView,
    VoteView,
)

urlpatterns = [
    path(
        "api/filtered_post_content/<str:space_id>",
        FilteredPostContentView.as_view(),
    ),
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
    path("api/challenge/<int:space_id>", ChallengeView.as_view()),
    path("api/answer", AnswerView.as_view()),
    path("api/vote/<str:post_id>", VoteView.as_view()),
    path("api/test", TestView.as_view()),
    path("api/consume_image", TestView.as_view()),
]
