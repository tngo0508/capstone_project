import timeit

from .stockscraper import create_stock_symbol_table
from .stockscraper import scrape_stock_list
from .stockscrape_logger import Logger

Log = Logger(__name__)
logger = Log.get()

start = timeit.default_timer()

logger.info('Create NASDAQ100-info TABLE')
create_stock_symbol_table('nasdaq100')

logger.info('Create S&P500-info TABLE')
create_stock_symbol_table('sp500')

logger.info('Create TRAINING SET using NASDAQ100')
scrape_stock_list('NASDAQ100-Symbols.csv')

logger.info('Create TEST SET using S&P500')
scrape_stock_list('S&P500-Symbols.csv')

stop = timeit.default_timer()

logger.info('Running time: %f', stop - start)
logger.info('Automation is finished!')
