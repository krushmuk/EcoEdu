from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from datetime import datetime
from rest_framework.permissions import IsAuthenticated
from DB.premission import OrganizerOnlyPermission
from DB.Serializers import EventSerializer, UserSerializer
from DB.models import Event, User


@api_view(['POST'])
def test(request):
    data = Event.objects.all()
    ser = EventSerializer(data, many=True)
    print(ser)
    date = datetime.fromisoformat('20240915T1530')
    return Response(data=ser.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def register(request):
    """
    :param request:
        {
            "first_name": string,
            "last_name": string,
            "password": string,
            "email": string,
        }
    :return:
        {
            id: int
            status: "200",
        } | { // или
            status: "404",
            error_message: 'user_not_found',
        }
    """
    data = request.data
    if len(User.objects.filter(email=data['email'])) != 0:
        return Response({'message': 'email not unique'}, status=status.HTTP_409_CONFLICT)
    user = {
        'first_name': data['first_name'],
        'last_name': data['last_name'],
        'password': "1",
        'email': data['email'],
        'ac_type': data['ac_type']
    }
    user_ser = UserSerializer(data=user)
    if user_ser.is_valid():
        user_ser.save()
        user = User.objects.all().last()
        user.set_password(data['password'])
        user.save()
        return Response({"id": user.id}, status=status.HTTP_201_CREATED)
    return Response(user_ser.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    """
    :param request:
        {
            "email": string,
            "password": string,
        }
    :return:
        {
            id: int
            status: "200"
        } | { // или
            status: "404",
            detail: 'Now found'
        }
    """
    user = get_object_or_404(User, username=request.data['login'])
    if user.check_password(request.data['password']):
        return Response({"id": user.id}, status=status.HTTP_200_OK)
    return Response({'detail': 'Now found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def logout(request):
    """
    :param request:
        {
            "login": string,
            "password": string,
        }
    :return:
        {
            status: "200"
        } | { // или
            status: "409",
        }
    """
    data = request.data
    user = get_object_or_404(User, username=data['login'])
    if user.check_password(data['password']):
        user.delete()
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    if not User.objects.filter(username=request.data['login']).exists():
        return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_409_CONFLICT)



'''
data = {
    "title": str,
    "description": str,
    "categories": [],
    "start_time": str (ISO 8601),
    "end_time": str (ISO 8601)
}
{
"categories": ["Environment"],
"title": "title",
"description": "DECSRIPTIPON",
"start_time": "20240915T1530",
"end_time": "20240915T1030"
}
'''

@api_view(['POST'])
@permission_classes([OrganizerOnlyPermission])
def create_event(request):
    data = request.data
    event = {
        'title': data['title'],
        'description': data['description'],
        'categories': data['categories'],
        'start_time': datetime.fromisoformat(data['start_time']),
        'end_time': datetime.fromisoformat(data['end_time']),
        # 'picture': data['picture']
    }
    event_ser = EventSerializer(data=event)
    if not event_ser.is_valid():
        return Response(event_ser.errors, status=status.HTTP_400_BAD_REQUEST)
    event_ser.save()
    return Response(event_ser.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_event(request):
    event = Event.objects.get(id=request.GET.get('id'))
    event_ser = EventSerializer(event)
    return Response(event_ser.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def filter_event(request):
    data = request.data
    print(data)
    matching_events = Event.objects.all()
    if data['categories']:
        matching_events = matching_events.filter(categories__contains=data['categories'][0])
        for i in data['categories']:
            matching_events = matching_events.filter(categories__contains=i)
    # other filtration
    event_ser = EventSerializer(matching_events, many=True)
    print(event_ser.data)
    return Response(event_ser.data, status=status.HTTP_200_OK)
