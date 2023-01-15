from ctypes import Union
import os
from pprint import pprint
from tokenize import Comment
from rest_framework import generics
from django.shortcuts import render
from django.db.models import Q
from enum import Enum
from .utils import filter_data
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.http import FileResponse
from django.conf import settings


from .models import Challenge, Post, Space, Test, User, Answer, Vote
from .serializers import (
    AnswerSerializer,
    ChallengeSerializer,
    CommentSerializer,
    PostSerializer,
    SpaceSerializer,
    TestSerializer,
    UserSerializer,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from print_color import print

UPVOTE = "UPVOTE"
DOWNVOTE = "DOWNVOTE"
NOVOTE = "NOVOTE"
# Create your views here.
class UsersView(generics.CreateAPIView):
    def get(self, request, *args, **kwargs):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)


class TestView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        test = Test.objects.all()
        test_serializer = TestSerializer(test, many=True)
        return Response(test_serializer.data)

    def post(self, request, *args, **kwargs):
        test_serializer = TestSerializer(data=request.data)
        if test_serializer.is_valid():
            test_serializer.save()
            return Response(test_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("error", test_serializer.errors)
            return Response(test_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserView(generics.CreateAPIView):
    def get(self, request, *args, **kwargs):
        user_id = kwargs.get("user_id")
        user = User.objects.filter(id=user_id).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        name = request.data.get("name", None)
        if name is not None:
            user = User.objects.get(name=name)
            if user:
                serializer = UserSerializer(user)
                return Response(serializer.data)
        user = User.objects.create(**request.data)
        user = UserSerializer(user)
        return Response(user.data)


class PostContentView(APIView):
    def post(self, request, *args, **kwargs):
        space_id = int(filter_data(kwargs.get("space_id")))
        post = Post.objects.create(**request.data, space_id=space_id)
        return Response("Post Created")

    def get(self, request, *args, **kwargs):
        space_id = filter_data(kwargs.get("space_id", 1))
        number_of_posts = int(request.GET.get("number_of_posts", 50))
        if space_id is None:
            return Response("No Space ID Found")
        postData = Post.objects.filter(space_id=space_id).order_by("-date")[
            :number_of_posts
        ]
        serializer = PostSerializer(postData, many=True)
        # lambda function but with if statement

        # sorted_serializer_data = sorted(
        #     serializer.data, key=lambda k: k["date"] if k["date"] else "", reverse=True
        # )
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        likes_amount = request.data
        return Response()


class VoteView(APIView):
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
            if vote_type == UPVOTE:
                post.likes += 1
            elif vote_type == DOWNVOTE:
                post.likes -= 1

        else:
            if vote.vote_type == UPVOTE:
                if vote_type == DOWNVOTE:
                    vote.vote_type = DOWNVOTE
                    post.likes -= 2
                elif vote_type == NOVOTE:
                    vote.vote_type = NOVOTE
                    post.likes -= 1
                elif vote.vote_type == UPVOTE:
                    vote.vote_type = NOVOTE
                    post.likes -= 1
            elif vote.vote_type == DOWNVOTE:
                if vote_type == UPVOTE:
                    vote.vote_type = UPVOTE
                    post.likes += 2
                elif vote_type == NOVOTE:
                    vote.vote_type = NOVOTE
                    post.likes += 1
                elif vote.vote_type == DOWNVOTE:
                    vote.vote_type = NOVOTE
                    post.likes += 1
            elif vote.vote_type == NOVOTE:
                if vote_type == UPVOTE:
                    vote.vote_type = UPVOTE
                    post.likes += 1
                elif vote_type == DOWNVOTE:
                    vote.vote_type = DOWNVOTE
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
        number_of_posts = int(request.GET.get("number_of_posts", 50))
        languages = [i.lower() for i in request.GET.get("languages", []).split(",")]
        names = [int(i) for i in request.GET.get("names", []).split(",") if i]
        flairs = [i.lower() for i in request.GET.get("flairs", []).split(",")]
        postData = Post.objects.filter(space_id=space_id).order_by("-date")

        if languages not in NO_FILTER_CASES:
            postData = postData.filter(language__in=languages)
        if names not in NO_FILTER_CASES:
            postData = postData.filter(user__in=names)
        if flairs not in NO_FILTER_CASES:
            postData = postData.filter(flair__in=flairs)

        serializer = PostSerializer(postData, many=True)
        # sort by serialize.data['date'] (django date field)

        return Response(serializer.data[:number_of_posts])


class UserPostView(APIView):
    def get(self, request, *args, **kwargs):
        user_id = filter_data(kwargs.get("user_id"))
        number_of_posts = int(request.GET.get("number_of_posts", 50))
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
    def get(self, request, *args, **kwargs):
        member_Id = kwargs.get("member_id")
        if member_Id is None:
            print("No Member ID Found", color="red")
            return Response("No Member ID Found")
        user = User.objects.filter(id=member_Id).first()
        spaces = Space.objects.filter(members=user)
        serializer = SpaceSerializer(spaces, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        description = request.data.get("description", "")
        name = request.data.get("name", "")
        members = request.data.get("members")
        user_id = kwargs.get("member_id")
        members = [*members, {"id": user_id}]
        members = [
            User.objects.filter(id=member.get("id")).first() for member in members
        ]
        space = Space.objects.create(description=description, name=name)
        space.members.set(members)
        space.save()

        return Response("Space Created")


class CommentsView(APIView):
    def get(self, request, *args, **kwargs):
        post_id = filter_data(kwargs.get("post_id"))
        if post_id is None:
            return Response("No Post ID Found")
        post_id = int(post_id)
        post = Post.objects.filter(id=post_id).first()
        comments = post.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        post_id = filter_data(kwargs.get("post_id", 0))
        reply_to = filter_data(request.data.get("reply_to", 0))
        if post_id:
            post = Post.objects.filter(id=post_id).first()
            reply_to = int(reply_to) if reply_to else None
            Comment.objects.create(**request.data, post=post, reply_to_id=int(reply_to))
            post.save()
            return Response("Comment Created")


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
