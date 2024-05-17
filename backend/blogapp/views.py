from rest_framework import generics, permissions
from .models import BlogPost
from .serializers import BlogPostSerializer
from .permssions import IsOwnerOrReadOnly


class BlogCreateAPIView(generics.CreateAPIView):
    serializer_class = BlogPostSerializer
    queryset = BlogPost.objects.all()
    # permission_classes = [permissions.IsAuthenticated]


class BlogListAPIView(generics.ListAPIView):
    serializer_class = BlogPostSerializer
    queryset = BlogPost.objects.all()
    # permission_classes = [permissions.IsAuthenticated]


class BlogDetailAPIView(generics.RetrieveAPIView):
    serializer_class = BlogPostSerializer
    queryset = BlogPost.objects.all()
    lookup_field = "id"
    permission_classes = [permissions.IsAuthenticated]

class BlogUpdateAPIView(generics.UpdateAPIView):
    serializer_class = BlogPostSerializer
    queryset = BlogPost.objects.all()
    lookup_field = "id"
    # permission_classes = (IsOwnerOrReadOnly,)
    
class BlogDeletionAPIView(generics.DestroyAPIView):
    serializer_class = BlogPostSerializer
    queryset = BlogPost.objects.all()
    lookup_field = "id"
    # permission_classes = (IsOwnerOrReadOnly,)