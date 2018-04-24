from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from student.models import Student, PersonalTimetable
from student.utils import get_student, get_student_tts
from rest_framework.views import APIView
from rest_framework.response import Response
from comments.models import Comment
from helpers.mixins import ValidateSubdomainMixin, RedirectToSignupMixin
from helpers.decorators import validate_subdomain
from comments.serializers import CommentSerializer


class CommentView(APIView):
    def get(self, request, tt_id):
        """ Get all the comments for a timetable """
        try:
            timetable = PersonalTimetable.objects.get(school=request.subdomain, pk=tt_id)
            return Response({'comments': CommentSerializer(list(timetable.comments.all()), many=True).data}, status=200)
        except KeyError:
            return Response({'reason': 'Error finding timetable', 'comments': []}, status=404)

    def post(self, request):
        """ Add comment to a timetable as a user """
        try:
            tt_id = request.data['tt_id']
            comment_str = request.data['comment_str']

            owner = get_student(request)
            # REMEBER YOU WILL NEED TO CHANGE student=owner FOR WHEN ADVISORS CAN COMMENT ON TT's!!
            tt = PersonalTimetable.objects.get(pk=tt_id, school=request.subdomain)
            comment = Comment.create(message=comment_str, owner=owner.user)
            comment.save()
            tt.comments.add(comment)
            return Response({'comment_added': CommentSerializer(comment).data}, status=200)

        except KeyError:
            return Response({'reason': 'unknown tbh', 'comment_added': [] }, status=404)

"""
    def put(self, request):

    def delete(self, request):"""