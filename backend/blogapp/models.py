from django.db import models

from django.db import models
from django.contrib.auth import get_user_model

class BlogPost(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    author = models.ForeignKey(get_user_model(), on_delete = models.CASCADE)
    date_created = models.DateTimeField(auto_now_add = True)