from pprint import pprint
from rest_framework import generics
from django.shortcuts import render
from .models import Post, Space, User
from .serializers import PostSerializer, SpaceSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from print_color import print

# Create your views here.
class UserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class PostContentView(APIView):
    def post(self, request, *args, **kwargs):
        space_id = kwargs.get("space_id")
        space_id = int(space_id.replace("}", ""))
        post = Post.objects.create(**request.data, space_id=space_id)
        return Response("Post Created")

    def get(self, request, *args, **kwargs):
        space_id = kwargs.get("space_id", 1)
        space_id = int(space_id.replace("}", ""))
        postData = Post.objects.filter(space_id=space_id)
        serializer = PostSerializer(postData, many=True)
        return Response(serializer.data)


class UserView(APIView):
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
        spaces = Space.objects.all()
        serializer = SpaceSerializer(spaces, many=True)
        print(len(Space.objects.all()), color="green")
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        description = request.data.get("description", "")
        name = request.data.get("name", "")
        members = request.data.get("members", "")
        members = [User.objects.get(id=member.get("id")) for member in members]
        space = Space.objects.create(description=description, name=name)
        space.members.set(members)
        space.save()
        print(len(Space.objects.all()), color="blue")

        return Response("Space Created")
