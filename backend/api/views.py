from ctypes import Union
from pprint import pprint
from tokenize import Comment
from rest_framework import generics
from django.shortcuts import render

from .utils import filter_data

from .models import Post, Space, User
from .serializers import (
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


class UserView(generics.CreateAPIView):
    def get(self, request, *args, **kwargs):
        user_id = int(filter_data(kwargs.get("user_id")))
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
        if space_id is None:
            return Response("No Space ID Found")
        space_id = int(space_id)
        postData = Post.objects.filter(space_id=space_id)
        serializer = PostSerializer(postData, many=True)
        return Response(serializer.data)

    def put(self, request, *args, **kwargs):
        pass


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
        user = User.objects.get(id=member_Id)
        spaces = Space.objects.filter(members=user)
        serializer = SpaceSerializer(spaces, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        description = request.data.get("description", "")
        name = request.data.get("name", "")
        members = request.data.get("members")
        user_id = kwargs.get("member_id")
        members = [*members, {"id": user_id}]
        members = [User.objects.get(id=member.get("id")) for member in members]
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
        post = Post.objects.get(id=post_id)
        comments = post.comments.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        post_id = filter_data(kwargs.get("post_id", 0))
        reply_to = filter_data(request.data.get("reply_to", 0))
        if post_id:
            post = Post.objects.get(id=post_id)
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
        user = User.objects.get(id=user_id)
        friends = user.friends.all()
        serializer = UserSerializer(friends, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        user_id = request.data.get("user_id")
        friend_id = request.data.get("friend_id")
        if user_id is None or friend_id is None:
            return Response("Invalid User IDs Provided")
        user = User.objects.get(id=user_id)
        friend = User.objects.get(id=friend_id)
        user.friends.add(friend)
        user.save()
        return Response("Friend Added")


class FollowView(APIView):
    def get(self, request, *args, **kwargs):
        user_id = kwargs.get("user_id")
        if user_id is None:
            return Response("No User ID Provided")
        user_id = int(filter_data(user_id))
        user = User.objects.get(id=user_id)
        followers = user.followers.all()
        serializer = UserSerializer(followers, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        user_id = request.data.get("user_id")
        user_to_follow_id = request.data.get("user_to_follow_id")
        if user_id is None or user_to_follow_id is None:
            return Response("Invalid User IDs Provided")
        user = User.objects.get(id=user_id)
        user_to_follow = User.objects.get(id=user_to_follow_id)
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
        user = User.objects.get(id=user_id)
        user_to_unfollow = User.objects.get(id=user_to_unfollow_id)
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
        user = User.objects.get(id=user_id)
        following = user.following.all()
        serializer = UserSerializer(following, many=True)
        return Response(serializer.data)
