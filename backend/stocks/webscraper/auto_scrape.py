import timeit
import logging

from stockscraper import create_stock_symbol_table
from stockscraper import scrape_stock_list

start = timeit.default_timer()

logging.info('Create NASDAQ100-info TABLE')
create_stock_symbol_table('nasdaq100')

logging.info('Create S&P500-info TABLE')
create_stock_symbol_table('sp500')

logging.info('Create data train using S&P500')
scrape_stock_list('S&P500-Symbols.csv')

logging.info('Create data test using NASDAQ100')
scrape_stock_list('NASDAQ100-Symbols.csv')

stop = timeit.default_timer()

logging.info('Running time: %f', stop - start)
logging.info('Automation is finished!')
