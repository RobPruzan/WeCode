from rest_framework import serializers
from .models import Post, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "name", "is_admin")


class PostSerializer(serializers.ModelSerializer):
    # serialize the user foriegn key using the user serializer
    user = UserSerializer()

    class Meta:
        #   serializer for this class with these fields
        #       user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

        #    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
        # content = models.CharField(max_length=2000, default="", blank=True, null=True)
        # code = models.CharField(max_length=2000, default="", blank=True, null=True)
        # date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
        # likes = models.IntegerField(default=0, blank=True, null=True)
        # dislikes = models.IntegerField(default=0, blank=True, null=True)
        # comments = models.IntegerField(default=0, blank=True, null=True)
        # langauge = models.CharField(max_length=200, default="", blank=True, null=True)
        # classname = Post
        # fields = ("user", "content", "code", "date", "likes", "dislikes", "comments", "langauge")
        model = Post
        fields = (
            "user",
            "content",
            "code",
            "date",
            "likes",
            "dislikes",
            "comments",
            "langauge",
        )
