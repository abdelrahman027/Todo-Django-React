from django.db import models

# Create your models here.

class TODO(models.Model):
    body = models.CharField(max_length=300)
    isCompleted = models.BooleanField(default=False)
    updated = models.DateTimeField(auto_now=True) 
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body