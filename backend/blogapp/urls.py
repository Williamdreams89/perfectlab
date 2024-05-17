from django.urls import path
from .views import BlogListAPIView, BlogCreateAPIView, BlogDetailAPIView, BlogUpdateAPIView, BlogDeletionAPIView

urlpatterns = [
    path('', BlogListAPIView.as_view(), name='blog-list'),
    path('create/', BlogCreateAPIView.as_view(), name='blog-create'),
    path('detail/<int:id>/', BlogDetailAPIView.as_view(), name='blog-detail'),
    path('update/<int:id>/', BlogUpdateAPIView.as_view(), name='blog-update'),
    path('delete/<int:id>/', BlogDeletionAPIView.as_view(), name='blog-delete'),
]