from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=200, default="")
    friends = models.ManyToManyField("self", blank=True)
    is_admin = models.BooleanField(default=False, blank=True)
    following = models.ManyToManyField(
        "self", symmetrical=False, related_name="followers", blank=True
    )


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    content = models.CharField(max_length=2000, default="", blank=True, null=True)
    code = models.CharField(max_length=2000, default="", blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    likes = models.IntegerField(default=0, blank=True, null=True)
    comments = models.IntegerField(default=0, blank=True, null=True)
    language = models.CharField(max_length=200, default="", blank=True, null=True)
    space = models.ForeignKey("Space", on_delete=models.CASCADE, blank=True, null=True)
    flair = models.CharField(max_length=200, default="", blank=True, null=True)

    def str(self):
        return f"user: {self.user}, content: {self.content}, code: {self.code}, date: {self.date}, likes: {self.likes}, comments: {self.comments}, langauge: {self.language}, room: {self.room}"


class Test(models.Model):
    test = models.CharField(max_length=200, default="", blank=True, null=True)


# Think of the foreign key relationship as each post points to one space
# Multiple posts can point to the same space (Many to one relationship)
# The object with the foreign key has on available pointer
# If the space had that one pointer, only one post could map to a space
# This would be wrong, we have it so only one post can map to a space, and only one space can be mapped to a post
class Space(models.Model):
    name = models.CharField(max_length=200, default="")
    description = models.CharField(max_length=2000, default="", blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    # Many to many relationship creates a new table which holds the relationship between all the spaces al users
    # This table is called space_user
    # The space_user table has two columns, one for the space Primary Keys (PKs) and one for the user PKs
    # The django ORM will create this table for us and when we query a space for its members (Space.members.all()) we will get all the members associated with that space
    # to get all the spaces for a user we can query the User.spaces_set.all() which will return all the spaces the user is a member of
    # We don't have to specifically query the space_user table, the ORM will do that for us
    members = models.ManyToManyField(User, blank=True)


class Comment(models.Model):
    content = models.CharField(max_length=2000, default="", blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, blank=True, null=True)
    reply_to = models.ForeignKey(
        "self", on_delete=models.CASCADE, blank=True, null=True
    )
    comments = models.ManyToManyField("self", blank=True)
    up_votes = models.IntegerField(default=0, blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True, blank=True, null=True)


class Technology(models.Model):
    name = models.CharField(max_length=200, default="", blank=True, null=True)
    description = models.CharField(max_length=2000, default="", blank=True, null=True)


class Challenge(models.Model):
    title = models.CharField(max_length=200, default="", blank=True, null=True)
    description = models.CharField(max_length=2000, default="", blank=True, null=True)
    question = models.CharField(max_length=2000, default="", blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    space = models.ForeignKey(Space, on_delete=models.CASCADE, blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    difficulty = models.IntegerField(default=1, blank=True, null=True)
    # technologies =
    # Answer is in string because the model is defined below (not in scope)
    correct_answer = models.OneToOneField(
        "Answer",
        related_name="question",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
    users_that_succeeded = models.ManyToManyField(
        User, blank=True, related_name="succeeded"
    )
    users_that_failed = models.ManyToManyField(User, blank=True, related_name="failed")
    users_that_attempted = models.ManyToManyField(
        User, blank=True, related_name="attempted"
    )

    # def __str__(self):
    #     return f"Title:{self.title}, Description:{self.description}, Date:{self.date}, Space:{self.space}, Author:{self.author}, Difficulty:{self.difficulty}, Correct Answer:{self.correct_answer}, Users that succeeded:{self.users_that_succeeded}, Users that failed:{self.users_that_failed}, Users that attempted:{self.users_that_attempted}"


class Answer(models.Model):
    text = models.CharField(max_length=2000, default="", blank=True, null=True)
    challenge = models.ForeignKey(
        Challenge,
        related_name="answer",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
    )
