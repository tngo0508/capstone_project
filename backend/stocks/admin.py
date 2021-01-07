from django.contrib import admin
from .models import Stock


class StockAdmin(admin.ModelAdmin):
    fields = ('symbol', 'open', 'fifty_two_lo', 'fifty_two_hi',
              'volume', 'avg_volume', 'market_cap', 'pe_ratio', 'eps_ratio')


admin.site.register(Stock, StockAdmin)
