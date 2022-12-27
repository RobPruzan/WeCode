from tokenize import Comment
from rest_framework import serializers
from .models import Post, Space, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "name", "is_admin")


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Post
        fields = (
            "id",
            "user",
            "content",
            "code",
            "date",
            "likes",
            "dislikes",
            "comments",
            "langauge",
        )


class SpaceSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True)

    class Meta:
        model = Space
        fields = ("id", "name", "description", "date", "members")

    # This function is called when we call the serializer to serialize the data
    # We can override this function to add extra data to the serialized data
    # In this case we are adding the number of members to the serialized data
    def to_representation(self, instance):
        # Call the parent class to get the serialized data
        representation = super().to_representation(instance)
        # Add the number of members to the serialized data
        representation["num_members"] = instance.members.count()
        return representation


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    post = PostSerializer()
    reply_to = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ("id", "user", "post", "content", "date", "reply_to", "up_votes")

    def get_reply_to(self, obj):
        if obj.reply_to:
            return CommentSerializer(obj.reply_to).data
        return None

    def to_representation(self, instance):
        # Call the parent class to get the serialized data
        representation = super().to_representation(instance)
        # Add the number of members to the serialized data
        representation["num_replies"] = instance.replies.count()
        return representation
