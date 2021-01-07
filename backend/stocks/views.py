from collections import defaultdict
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import StockSerializer, SymbolSerializer
from .models import Stock
from .webscraper.stockscraper import scrape_stock_info
import json


class StockView(viewsets.ModelViewSet):
    serializer_class = StockSerializer
    queryset = Stock.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]


@api_view(["POST"])
def get_stock_info(request):
    try:
        scraped_data = defaultdict()
        serializer = SymbolSerializer(data=request.data)
        # print(serializer.is_valid())
        if serializer.is_valid():
            stock_symbol = serializer.validated_data['symbol']
            scraped_data = scrape_stock_info(stock_symbol)
            print(scraped_data)
            res = json.dumps(scraped_data)
        # return Response({'message': 'hello, world'})
            return Response(res)
            # return JsonResponse(res, safe=False)

    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)
