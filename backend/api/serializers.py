from tokenize import Comment
from rest_framework import serializers
from .models import Post, Space, User, Challenge, Answer


class UserSerializerMinimal(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "name")


class UserSerializer(serializers.ModelSerializer):
    friends = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()

    def get_friends(self, obj):
        friends = obj.friends.all()
        return UserSerializerMinimal(friends, many=True).data

    def get_followers(self, obj):
        followers = obj.followers.all()
        return UserSerializerMinimal(followers, many=True).data

    def get_following(self, obj):
        following = obj.following.all()
        return UserSerializerMinimal(following, many=True).data

    class Meta:
        model = User
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Post
        fields = "__all__"


class SpaceSerializerMinimal(serializers.ModelSerializer):
    class Meta:
        model = Space
        fields = (
            "id",
            "name",
        )


class SpaceSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True)

    class Meta:
        model = Space
        fields = "__all__"

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
        fields = "__all__"

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


class ChallengeSerializer(serializers.ModelSerializer):
    author = UserSerializerMinimal()
    users_that_succeeded = UserSerializerMinimal(many=True)
    users_that_failed = UserSerializerMinimal(many=True)
    users_that_attempted = UserSerializerMinimal(many=True)
    space = SpaceSerializerMinimal()
    author = UserSerializerMinimal()

    class Meta:
        model = Challenge
        fields = "__all__"


class AnswerSerializer(serializers.Serializer):
    challenge = ChallengeSerializer()

    class Meta:
        model = Answer
        fields = "__all__"
