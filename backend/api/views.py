from ctypes import Union
import os
from pprint import pprint
from rest_framework import generics
from django.shortcuts import render
from django.db.models import Q
from enum import Enum
from .utils import filter_data
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.http import FileResponse
from django.conf import settings
from django.contrib.auth.hashers import make_password, check_password


from .models import Challenge, Post, Space, User, Answer, Vote, Comment
from .serializers import (
    AnswerSerializer,
    ChallengeSerializer,
    CommentSerializer,
    PostSerializer,
    SpaceSerializer,
    UserSerializer,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from print_color import print


# Create your views here.
class UsersView(generics.CreateAPIView):
    def get(self, request, *args, **kwargs):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class SignUpView(APIView):
    def post(self, request, *args, **kwargs):
        password = request.data.get("password")
        user_name = request.data.get("name")
        print("password ", password)
        print("user_name", user_name)

        if not user_name:
            return Response(
                data="Username is required", status=status.HTTP_411_LENGTH_REQUIRED
            )
        if password is None:
            return Response(
                data="Password is required", status=status.HTTP_411_LENGTH_REQUIRED
            )
        if len(password) < 4:
            return Response(
                data="Password must be greater than 4 characters",
                status=status.HTTP_411_LENGTH_REQUIRED,
            )
        if User.objects.filter(name=user_name).first():
            return Response(data="Username taken", status=status.HTTP_409_CONFLICT)
        if User.objects.filter(password=password).first():
            return Response(
                data="Password taken", status=status.HTTP_412_PRECONDITION_FAILED
            )
        password = make_password(password)
        request.data["password"] = password
        user = User.objects.create(**request.data)
        user = UserSerializer(user)
        return Response(user.data)


class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        name = request.data.get("name")
        password = request.data.get("password")
        if name is None:
            return Response(
                data="Username required to login",
                status=status.HTTP_411_LENGTH_REQUIRED,
            )
        if password is None:
            return Response(
                data="Password required to login",
                status=status.HTTP_411_LENGTH_REQUIRED,
            )

        user = User.objects.filter(name=name).first()
        if user is None:
            return Response(
                data="Username not found", status=status.HTTP_411_LENGTH_REQUIRED
            )
        if check_password(password, user.password):
            serializer = UserSerializer(user)
            return Response(serializer.data)
        else:
            return Response(
                data="Password incorrect", status=status.HTTP_401_UNAUTHORIZED
            )


class UserView(generics.CreateAPIView):
    def get(self, request, *args, **kwargs):
        user_id = kwargs.get("user_id")
        user = User.objects.filter(id=user_id).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)

    # def post(self, request, *args, **kwargs):
    #     name = request.data.get("name", None)
    #     if name is not None:
    #         user = User.objects.get(name=name)
    #         if user:
    #             serializer = UserSerializer(user)
    #             return Response(serializer.data)
    #     user = User.objects.create(**request.data)
    #     user = UserSerializer(user)
    #     return Response(user.data)


class PostContentView(APIView):
    def post(self, request, *args, **kwargs):
        space_id = kwargs.get("space_id")
        post = Post.objects.create(**request.data, space_id=space_id)
        return Response("Post Created")

    def get(self, request, *args, **kwargs):
        space_id = filter_data(kwargs.get("space_id", 1))
        number_of_posts = int(request.GET.get("number_of_posts", 25))
        if space_id is None:
            return Response("No Space ID Found")
        postData = Post.objects.filter(space_id=space_id).order_by("-date")[
            :number_of_posts
        ]
        serializer = PostSerializer(postData, many=True)

        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        likes_amount = request.data
        return Response()


class VoteView(APIView):
    UPVOTE = "UPVOTE"
    DOWNVOTE = "DOWNVOTE"
    NOVOTE = "NOVOTE"

    def put(self, request, *args, **kwargs):
        post_id = kwargs.get("post_id")
        user_id = request.data.get("user_id")
        vote_type = request.data.get("vote_type")
        if user_id is None or post_id is None or vote_type is None:

            return Response("Invalid IDs Provided")
        vote = Vote.objects.filter(user_id=user_id, post_id=post_id).first()
        post = Post.objects.filter(id=post_id).first()

        if post is None:
            print("Post Not Found", color="red")
            return Response("Post Not Found")
        if vote is None:
            Vote.objects.create(user_id=user_id, post_id=post_id, vote_type=vote_type)
            if vote_type == self.UPVOTE:
                post.likes += 1
            elif vote_type == self.DOWNVOTE:
                post.likes -= 1

        else:
            if vote.vote_type == self.UPVOTE:
                if vote_type == self.DOWNVOTE:
                    vote.vote_type = self.DOWNVOTE
                    post.likes -= 2
                elif vote_type == self.NOVOTE:
                    vote.vote_type = self.NOVOTE
                    post.likes -= 1
                elif vote.vote_type == self.UPVOTE:
                    vote.vote_type = self.NOVOTE
                    post.likes -= 1
            elif vote.vote_type == self.DOWNVOTE:
                if vote_type == self.UPVOTE:
                    vote.vote_type = self.UPVOTE
                    post.likes += 2
                elif vote_type == self.NOVOTE:
                    vote.vote_type = self.NOVOTE
                    post.likes += 1
                elif vote.vote_type == self.DOWNVOTE:
                    vote.vote_type = self.NOVOTE
                    post.likes += 1
            elif vote.vote_type == self.NOVOTE:
                if vote_type == self.UPVOTE:
                    vote.vote_type = self.UPVOTE
                    post.likes += 1
                elif vote_type == self.DOWNVOTE:
                    vote.vote_type = self.DOWNVOTE
                    post.likes -= 1

            vote.save()

        post.save()
        serializer = PostSerializer(post)

        return Response(serializer.data)


class FilteredPostContentView(APIView):
    def get(self, request, *args, **kwargs):
        NO_FILTER_CASES = [[""], []]
        space_id = kwargs.get("space_id")
        if space_id:
            space_id = int(space_id)
        else:
            return Response("No Space ID Found")
        number_of_posts = int(request.GET.get("number_of_posts", 25))
        languages = [i.lower() for i in request.GET.get("languages", []).split(",")]
        names = [int(i) for i in request.GET.get("names", []).split(",") if i]
        flairs = request.GET.get("flairs", []).split(",")
        postData = Post.objects.filter(space_id=space_id).order_by("-date")

        if languages not in NO_FILTER_CASES:
            postData = postData.filter(language__in=languages)
        if names not in NO_FILTER_CASES:
            postData = postData.filter(user__in=names)
        if flairs not in NO_FILTER_CASES:
            postData = postData.filter(flair__in=flairs)
        print(
            postData,
            Post.objects.filter(space_id=space_id, flair__in=flairs).order_by("-date"),
            flairs,
            color="red",
        )
        serializer = PostSerializer(postData, many=True)
        # sort by serialize.data['date'] (django date field)

        return Response(serializer.data[:number_of_posts])


class UserPostView(APIView):
    def get(self, request, *args, **kwargs):
        user_id = filter_data(kwargs.get("user_id"))
        number_of_posts = int(request.GET.get("number_of_posts", 25))
        if user_id is None:
            return Response("No User ID Found")
        user_id = int(user_id)
        user = User.objects.filter(id=user_id).first()
        posts = Post.objects.filter(user=user).order_by("-date")[:number_of_posts]
        serializer = PostSerializer(posts, many=True)

        return Response(serializer.data)


class UsernameView(APIView):
    def get(self, request, *args, **kwargs):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        user_names = [
            {"label": user.get("name", "No Username Found"), "id": user.get("id", 0)}
            for user in serializer.data
        ]

        return Response(user_names)


class SpacesView(APIView):
    MAIN_PUBLIC_SPACE = 1

    def get(self, request, *args, **kwargs):
        member_Id = kwargs.get("member_id")
        if member_Id is None:
            print("No Member ID Found", color="red")
            return Response("No Member ID Found")
        user = User.objects.filter(id=member_Id).first()
        spaces = (
            Space.objects.filter(
                Q(members__in=[user]) | Q(is_public=True) | Q(id=self.MAIN_PUBLIC_SPACE)
            )
            .distinct()
            .order_by("-date")
        )
        print("what the", spaces)
        serializer = SpaceSerializer(spaces, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        description = request.data.get("description", "")
        name = request.data.get("name", "")
        members = request.data.get("members")
        is_public = request.data.get("is_public", False)
        user_id = kwargs.get("member_id")
        members = [*members, {"id": user_id}]
        members = [
            User.objects.filter(id=member.get("id")).first() for member in members
        ]
        space = Space.objects.create(
            description=description, name=name, is_public=is_public
        )
        space.members.set(members)
        space.save()

        return Response("Space Created")


class CommentsView(APIView):
    def get(self, request, *args, **kwargs):
        post_id = kwargs.get("post_id")
        print("postid", post_id, color="red")
        if post_id is None:
            print("No Post ID Found", color="red")
            return Response("No Post ID Found")

        comments = Comment.objects.filter(post_id=post_id).order_by("-date")
        serializer = CommentSerializer(comments, many=True)

        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        print(request.data)
        post_id = kwargs.get("post_id")
        user_id = request.data.get("user_id")
        content = request.data.get("content")
        up_votes = request.data.get("up_votes")
        print(post_id, user_id, content, up_votes)
        if post_id is not None:

            Comment.objects.create(
                post_id=post_id,
                user_id=user_id,
                content=content,
                up_votes=up_votes,
            )
            print("should have saved")

            return Response("Comment Created")
        else:
            return Response("No Comment Provided")


class FriendsView(APIView):
    def get(self, request, *args, **kwargs):
        user_id = kwargs.get("user_id")
        if user_id is None:
            return Response("No User ID Provided")
        user_id = int(filter_data(user_id))
        user = User.objects.filter(id=user_id).first()
        friends = user.friends.all()
        serializer = UserSerializer(friends, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        user_id = request.data.get("user_id")
        friend_id = request.data.get("friend_id")
        if user_id is None or friend_id is None:
            return Response("Invalid User IDs Provided")
        user = User.objects.filter(id=user_id).first()
        friend = User.objects.filter(id=friend_id).first()
        user.friends.add(friend)
        user.save()
        return Response("Friend Added")


class FollowView(APIView):
    def get(self, request, *args, **kwargs):
        user_id = kwargs.get("user_id")
        if user_id is None:
            return Response("No User ID Provided")
        user_id = int(filter_data(user_id))
        user = User.objects.filter(id=user_id).first()
        followers = user.followers.all()

        serializer = UserSerializer(followers, many=True)

        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        user_id = request.data.get("user_id")
        user_to_follow_id = request.data.get("user_to_follow_id")
        if user_id is None or user_to_follow_id is None:
            return Response("Invalid User IDs Provided")
        user = User.objects.filter(id=user_id).first()
        user_to_follow = User.objects.filter(id=user_to_follow_id).first()
        user.following.add(user_to_follow)
        user_to_follow.followers.add(user)
        user.save()
        user_to_follow.save()

        return Response("Follower Added")


class UnfollowView(APIView):
    def delete(self, request, *args, **kwargs):
        user_id = kwargs.get("user_id")
        user_to_unfollow_id = kwargs.get("user_to_unfollow_id")
        if user_id is None or user_to_unfollow_id is None:
            return Response("Invalid User IDs Provided")
        user = User.objects.filter(id=user_id).first()
        user_to_unfollow = User.objects.filter(id=user_to_unfollow_id).first()
        user.following.remove(user_to_unfollow)
        user_to_unfollow.followers.remove(user)
        user.save()
        user_to_unfollow.save()
        return Response("Follower Removed")


class FollowingView(APIView):
    def get(self, request, *args, **kwargs):
        user_id = kwargs.get("user_id")
        if user_id is None:
            return Response("No User ID Provided")
        user_id = int(filter_data(user_id))
        user = User.objects.filter(id=user_id).first()
        following = user.following.all()
        serializer = UserSerializer(following, many=True)
        return Response(serializer.data)


class ChallengeView(APIView):
    def get(self, request, *args, **kwargs):
        space_id = kwargs.get("space_id")
        if space_id is None:
            return Response("No Space ID Provided")
        space_id = int(filter_data(space_id))
        challenges = Challenge.objects.filter(space_id=space_id).all()
        challenge_serializer = ChallengeSerializer(challenges, many=True)
        return Response(challenge_serializer.data)

    def post(self, request, *args, **kwargs):
        user_id = request.data.get("user_id")
        space_id = kwargs.get("space_id")

        if user_id is None or space_id is None:
            return Response("Invalid IDs Provided")
        answers = request.data.get("challenge").get("answers")
        correct_answer_index = request.data.get("challenge").get("correct_answer")
        new_challenge = Challenge.objects.create(
            # **request.data,
            title=request.data.get("challenge").get("title"),
            description=request.data.get("challenge").get("description"),
            question=request.data.get("challenge").get("question"),
            difficulty=request.data.get("challenge").get("difficulty"),
            space_id=space_id,
            author_id=user_id,
        )
        answer_objects = [
            Answer.objects.create(text=ans.get("text"), challenge_id=new_challenge.id)
            for ans in answers
            if answers
        ]

        new_challenge.correct_answer = Answer.objects.filter(
            id=answer_objects[correct_answer_index].id
        ).first()
        new_challenge.save()
        return Response("Challenge Created")


class AnswerView(APIView):
    def post(self, request, *args, **kwargs):
        user_id = request.data.get("user_id")
        challenge_id = request.data.get("challenge_id")
        answer_id = request.data.get("answer_id")
        if user_id is None or challenge_id is None or answer_id is None:
            return Response("Invalid IDs Provided")
        user = User.objects.filter(id=user_id).first()
        challenge = Challenge.objects.filter(id=challenge_id).first()
        answer = Answer.objects.filter(id=answer_id).first()
        if answer.challenge.id != challenge.id:
            return Response("Invalid Answer")
        challenge.users_that_attempted.add(user)
        if answer.id == challenge.correct_answer.id:
            challenge.users_that_succeeded.add(user)
            challenge.save()
            return Response("Correct Answer")
        else:
            challenge.users_that_failed.add(user)
            challenge.save()
            return Response("Incorrect Answer")


# this is tied to the VoteType enum in the frontend
