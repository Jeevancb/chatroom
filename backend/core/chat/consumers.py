import json
from .models import Message
from django.contrib.auth import  get_user_model
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import async_to_sync


User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.commands = {
            'fetch_messages': self.fetch_messages,
            'new_message': self.new_message
        }
    @database_sync_to_async
    def get_user(self, username):
        return User.objects.get(username=username)

    @database_sync_to_async
    def create_message(self, author, content):
        return Message.objects.create(author=author, content=content)
    
    @database_sync_to_async
    def get_last_10_messages(self):
        return Message.objects.order_by('-timestamp')[:10]
    
    
    async def fetch_messages(self):
        messages = await self.get_last_10_messages() # Await the asynchronous call
        print(messages)

        content = {
            'command': "old_message",
            'messages': self.messages_to_json(messages)
        }
        await self.send_message(content)

    async def new_message(self,data):
        author_username = data['from']
        author_user = await self.get_user(author_username)
        message = await self.create_message(author_user, data['text'])
      
        content={
            'command':"new_message",
            "message":self.message_to_json(message)
        }
        await self.send_chat_message(content)

    def messages_to_json(self,messages):
        result=[]
        for  message in messages:
            result.append(self.message_to_json(message))
        return result
    
    def message_to_json(self,message):
        return {
            'author': message.author.username,
            'message': message.content,
            'timestamp': str(message.timestamp)
        }

   


    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        
        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        await self.fetch_messages()
       
        print('connection success')

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    async def receive(self, text_data):
        print('recieved,',text_data)
        data = json.loads(text_data)
        await self.commands[data['command']](data)

    async def send_chat_message(self, message):
        
        await self.channel_layer.group_send(
            self.room_group_name,
            {"type":'chat_message', "message": message}
        )
     

    async def send_message(self,message):
        text_data=json.dumps(message)
        await self.send(text_data)
    # Receive message from room group
    async def chat_message(self, event):
        
        message = event["message"]
        text_data=json.dumps(message)
        await self.send(text_data)
        