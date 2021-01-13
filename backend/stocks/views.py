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
import joblib
import numpy as np
import os


class StockView(viewsets.ModelViewSet):
    serializer_class = StockSerializer
    queryset = Stock.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]


@api_view(["GET"])
def get_stock_info(request, symbol):
    try:
        # scraped_data = defaultdict()
        # # serializer = SymbolSerializer(data=request.data)
        # serializer = SymbolSerializer(symbol)
        # # print(serializer.is_valid())
        # if serializer.is_valid():
        #     stock_symbol = serializer.validated_data['symbol']
        #     scraped_data = scrape_stock_info(stock_symbol)
        #     # print(scraped_data)
        #     res = json.dumps(scraped_data)
        #     return Response(res)
        #     # return JsonResponse(res, safe=False)

        data = scrape_stock_info(symbol)
        res = json.dumps(data)
        return Response(res)
        # return Response({'message': 'hello, world'})

    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def predict_stock(request):
    # return Response({'message': 'hello, world'})
    try:
        curr_dir = os.path.dirname(os.path.realpath(__file__))
        model_file_path = os.path.join(
            curr_dir, 'webscraper', 'stock_prediction_model_knn.pkl')
        model = joblib.load(model_file_path)
        stock_info = np.array(list(request.data.values())).reshape(1, -1)
        scaler_file_path = os.path.join(
            curr_dir, 'webscraper', 'train_scaler.pkl')
        scalers = joblib.load(scaler_file_path)
        X = scalers.transform(stock_info)
        y_pred = model.predict(X)
        res = json.dumps({'fair_value': y_pred[0]})
        return Response(res)

    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)
