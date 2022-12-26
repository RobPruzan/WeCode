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
