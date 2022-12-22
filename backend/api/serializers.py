from rest_framework import serializers
from .models import Post, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("name", "is_admin")


class PostSerializer(serializers.ModelSerializer):
    # serialize the user foriegn key using the user serializer
    user = UserSerializer()

    class Meta:
        model = Post
        fields = (
            "user",
            "content",
            "date",
            "likes",
            "dislikes",
            "comments",
            "language",
            "hasCode",
        )
