from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=200, default="")
    is_admin = models.BooleanField(null=False, default=False)


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    content = models.CharField(max_length=2000, default="", blank=True, null=True)
    code = models.CharField(max_length=2000, default="", blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    likes = models.IntegerField(default=0, blank=True, null=True)
    dislikes = models.IntegerField(default=0, blank=True, null=True)
    comments = models.IntegerField(default=0, blank=True, null=True)
    langauge = models.CharField(max_length=200, default="", blank=True, null=True)
    space = models.ForeignKey("Space", on_delete=models.CASCADE, blank=True, null=True)
    flair = models.CharField(max_length=200, default="", blank=True, null=True)

    def str(self):
        return f"user: {self.user}, content: {self.content}, code: {self.code}, date: {self.date}, likes: {self.likes}, dislikes: {self.dislikes}, comments: {self.comments}, langauge: {self.langauge}, room: {self.room}"


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
