from rest_framework import serializers
from .models import Images, Post, Space, User, Challenge, Answer, Vote, Comment
from print_color import print


class UserSerializerMinimal(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "name")


class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = "__all__"


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


class VoteSerializer(serializers.ModelSerializer):
    user = UserSerializerMinimal()

    class Meta:
        model = Vote
        fields = ("user", "vote_type")


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    liked_by = VoteSerializer(source="vote_set", many=True)

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

    # def to_representation(self, instance):
    #     # Call the parent class to get the serialized data
    #     representation = super().to_representation(instance)
    #     # Add the number of members to the serialized data
    #     representation["num_replies"] = instance.replies.count()
    #     return representation


class ChallengeSerializerMinimal(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = (
            "id",
            "title",
        )


class ChallengeSerializer(serializers.ModelSerializer):
    author = UserSerializerMinimal()
    users_that_succeeded = UserSerializerMinimal(many=True)
    users_that_failed = UserSerializerMinimal(many=True)
    users_that_attempted = UserSerializerMinimal(many=True)
    space = SpaceSerializerMinimal()
    author = UserSerializerMinimal()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["answers"] = AnswerSerializer(
            instance.answer.all(), many=True
        ).data
        return representation

    class Meta:
        model = Challenge
        fields = "__all__"


class AnswerSerializer(serializers.ModelSerializer):

    challenge = ChallengeSerializerMinimal()

    class Meta:
        model = Answer
        fields = "__all__"
