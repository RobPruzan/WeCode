from pprint import pprint
from rest_framework import generics
from django.shortcuts import render
from .models import Post, User
from .serializers import PostSerializer, UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from print_color import print

# Create your views here.
class UserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ReactView(APIView):
    def get(self, request):
        # output = [{"name": "John", "age": 27}, {"name": "Mary", "age": 25}]
        return Response("THIS IS A TEST")

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)


class PostContentView(APIView):
    def post(self, request, *args, **kwargs):
        # content = request.data.get("content")
        # code = request.data.get("code")
        room = kwargs.get("room")
        print(request.data, color="red")

        # post = Post(content=content, code=code, room=room)
        # post.save()

        post = Post.objects.create(**request.data, room=room)

        print(post, color="red")
        return Response("Post Created")

    def get(self, request, *args, **kwargs):

        room = kwargs.get("room")

        room = room.replace("}", "")

        postData = Post.objects.filter(room=room)

        serializer = PostSerializer(postData, many=True)
        return Response(serializer.data)


class UserView(APIView):
    def get(self, request, *args, **kwargs):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)

        # for user in serializer.data:
        #     print(user["name"], color="blue")
        user_names = [
            {"label": user.get("name", "No Username Found"), "id": user.get("id", 0)}
            for user in serializer.data
        ]

        return Response(user_names)
