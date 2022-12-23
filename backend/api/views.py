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


class PostContent(APIView):
    def post(self, request):
        content = request.data.get("content")
        code = request.data.get("code")
        room = request.data.get("room")
        # save request data to Post model
        post = Post(content=content, code=code, room=room)
        post.save()
        print(Post.objects.all(), color="green")
        return Response("Post Created")

    def get(self, request):
        room = request.data.get("room")
        postData = Post.objects.filter(room=room)
        serializer = PostSerializer(postData, many=True)
        return Response(serializer.data)
