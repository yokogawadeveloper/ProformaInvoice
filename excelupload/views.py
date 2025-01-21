import os
import os.path
import pandas as pd
from django.conf import settings
from django.db.models import Q
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from .dataframe import data_crud
from .models import proformaItem, proformaItemMaster
from .serializer import proformaItemSerializer, proformaItemMasterSerializer, proformaMasterSerializer


class DataCrud(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, Format=None):
        if True:
            prod_list = []
            input_files_dir = os.path.join(settings.BASE_DIR, 'static', 'inputFiles')
            os.makedirs(input_files_dir, exist_ok=True)
            for file_key in request.FILES:
                file = request.FILES[file_key]
                file_path = os.path.join(input_files_dir, '{}.csv'.format(file_key))
                print(file_path)
                if os.path.exists(file_path):
                    os.remove(file_path)
                with open(file_path, 'wb+') as destination:
                    for chunk in file.chunks():
                        destination.write(chunk)

                # Process the specific file prod_line_item.csv if it was uploaded
            prod_line_item_path = os.path.join(input_files_dir, 'prod_line_item.csv')
            if os.path.exists(prod_line_item_path):
                col_names = ["col_" + str(i) for i in range(83)]
                prod_list = pd.read_csv(prod_line_item_path, sep='\t', names=col_names)

            df = pd.DataFrame(prod_list)
            df_list = df["col_0"].tolist()

            data = data_crud(df, df_list, request.user)

        return Response(data.data)


class proformaItemMasterViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = proformaItemMaster.objects.all()
    serializer_class = proformaItemMasterSerializer

    def get_queryset(self):
        query_set = self.queryset.exclude(DeleteFlag=True)
        return query_set

    def list(self, request, *args, **kwargs):
        # query_params = request.query_params.dict()
        # offset = int(query_params.pop('offset', 0))
        # end = int(query_params.pop('end', 5))
        queryset = self.get_queryset()
        # queryset = queryset[offset:end]
        serializer = self.serializer_class(queryset, many=True, context={'request': request})
        total_records = queryset.count()
        return Response({'records': serializer.data, 'totalRecords': total_records})

    def retrieve(self, request, *args, **kwargs):
        queryset = self.get_queryset().filter(ProformaID=kwargs['pk']).first()
        serializer = self.serializer_class(queryset)
        serializer = {"records": serializer.data}
        if queryset is None:
            serializer = {"records": "No data available", "status": False}
        return Response(serializer)

    @action(methods=['post'], detail=False, url_path='doc_no')
    def getProformaDocNo(self, request):
        data = request.data
        doc_no_filter = proformaItemMaster.objects.filter(DocNo=data)
        if doc_no_filter:
            return Response({"value": True})
        else:
            return Response({"value": False})


class proformaMasterViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = proformaItemMaster.objects.all()
    serializer_class = proformaMasterSerializer

    def get_queryset(self):
        query_set = self.queryset.exclude(DeleteFlag=True)
        return query_set

    def list(self, request, *args, **kwargs):
        query_set = self.get_queryset()
        query_params = request.query_params.dict()
        if query_params:
            if query_params['so_no'] != '' or query_params['startDate'] != '' or query_params['endDate'] != '':
                so_no = query_params['so_no']
                start_date = query_params['startDate']
                end_date = query_params['endDate']

                query_set = query_set.filter(Q(DocNo__exact=so_no) |
                                             Q(DocDate__range=[start_date, end_date]))
        serializer = self.serializer_class(query_set, many=True, context={'request': request})
        serializer_data = serializer.data
        return Response({'records': serializer_data})


class proformaItemViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = proformaItem.objects.all()
    serializer_class = proformaItemSerializer

    def get_queryset(self):
        query_set = self.queryset.exclude(DeleteFlag=True)
        return query_set

    def list(self, request, *args, **kwargs):
        # query_params = request.query_params.dict()
        # offset = int(query_params.pop('offset', 0))
        # end = int(query_params.pop('end', 5))
        queryset = self.get_queryset()
        # queryset = queryset[offset:end]
        serializer = self.serializer_class(queryset, many=True, context={'request': request})
        total_records = queryset.count()
        return Response({'records': serializer.data, 'totalRecords': total_records})

    @action(methods=['get'], detail=False, url_path='retrieve_item/(?P<id>[0-9]+)')
    def retrieve_item(self, request, id):
        queryset = proformaItem.objects.filter(ProformaItemid=id)
        serializer = self.serializer_class(queryset, context={'request': request})
        return Response(serializer.data)
