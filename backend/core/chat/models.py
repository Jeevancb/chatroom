from django.contrib.auth  import get_user_model
from django.db import models

User=get_user_model()

class Message(models.Model):
    author=models.ForeignKey(User, related_name='autor_messages' ,on_delete=models.CASCADE)
    content= models.TextField()
    timestamp=models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.author.username
    
    def last_10_messages(self):
        return Message.objects.order_by( '-timestamp' ).all()[:10]

