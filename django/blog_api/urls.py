from .views import PostList, PostDetail, PostSearch, PostListDetailfilter, CreatePost, DeletePost, EditPost
#from rest_framework.routers import DefaultRouter
from django.urls import path

app_name = 'blog_api'

# router = DefaultRouter()
# router.register('', PostList, basename='post')
# urlpatterns = router.urls

urlpatterns = [
    path('post/<str:pk>', PostDetail.as_view(), name='detailcreate'),
    path('search/', PostListDetailfilter.as_view(), name='postsearch'),
    path('', PostList.as_view(), name='listcreate'),
    path('create/', CreatePost.as_view(), name='createpost'),
    path('delete/<int:pk>', DeletePost.as_view(), name='deletepost'),
    path('edit/<int:pk>', EditPost.as_view(), name='editpost')
]
