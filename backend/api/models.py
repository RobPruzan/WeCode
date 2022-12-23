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
    room = models.CharField(max_length=200, default="", blank=True, null=True)
    flair = models.CharField(max_length=200, default="", blank=True, null=True)

    def str(self):
        return f"user: {self.user}, content: {self.content}, code: {self.code}, date: {self.date}, likes: {self.likes}, dislikes: {self.dislikes}, comments: {self.comments}, langauge: {self.langauge}, room: {self.room}"
