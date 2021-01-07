from django.db import models


class Stock(models.Model):
    symbol = models.CharField(max_length=4)
    open = models.FloatField(null=True)
    fifty_two_lo = models.FloatField(null=True)
    fifty_two_hi = models.FloatField(null=True)
    volume = models.FloatField(null=True)
    avg_volume = models.FloatField(null=True)
    market_cap = models.FloatField(null=True)
    pe_ratio = models.FloatField(null=True)
    eps_ratio = models.FloatField(null=True)

    def _str_(self):
        return self.symbol
