import requests
import pandas as pd
import time
import logging
import pprint
import os

from bs4 import BeautifulSoup
from collections import defaultdict
from selenium import webdriver


logging.basicConfig(format='%(levelname)s:%(message)s', level=logging.INFO)
driver = webdriver.Chrome()
options = webdriver.ChromeOptions()
options.add_argument('incognito')
options.add_argument('headless')


def get_user_input():
    return input("Enter Stock: ")


def create_stock_symbol_table():
    # try:
    #     file = 'constituents-financials_csv.csv'
    #     df = pd.read_csv(file)
    #     df['Symbol'].to_csv(r'stock_symbol.csv', index=False)
    # except FileNotFoundError as e:
    #     print(e)

    table = pd.read_html(
        'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies')
    df = table[0]
    df.to_csv('S&P500-Info.csv')
    df.to_csv("S&P500-Symbols.csv", columns=['Symbol'])


def scrape_stock_info(stock):
    # try:
    driver = webdriver.Chrome(chrome_options=options)
    re = defaultdict()
    # re['Symbol'] = stock
    url = 'https://finance.yahoo.com/quote/' + stock + '?'

    # response = requests.get(url)
    driver.get(url)

    # time.sleep(3)
    headers = ({'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
                })
    r = requests.get(url, headers=headers)
    # soup = BeautifulSoup(r.text, 'lxml')
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    logging.info('status code ' + str(r.status_code))

    re['open_price'] = soup.find(
        attrs={'data-test': 'OPEN-value'}).find_next('span').text

    fifty_two_wk = soup.find(
        attrs={'data-test': 'FIFTY_TWO_WK_RANGE-value'}).text
    fifty_two_wk_low, fifty_two_wk_hi = fifty_two_wk.split('-')
    re['fifty_two_wk_low'] = fifty_two_wk_low
    re['fifty_two_wk_hi'] = fifty_two_wk_hi

    re['volume'] = soup.find(
        attrs={'data-test': 'TD_VOLUME-value'}).find_next('span').text

    re['avg_volume'] = soup.find(
        attrs={'data-test': 'AVERAGE_VOLUME_3MONTH-value'}).find_next('span').text

    re['market_cap'] = soup.find(
        attrs={'data-test': 'MARKET_CAP-value'}).find_next('span').text

    re['PE_ratio'] = soup.find(
        attrs={'data-test': 'PE_RATIO-value'}).find_next('span').text

    re['EPS_ratio'] = soup.find(
        attrs={'data-test': 'EPS_RATIO-value'}).find_next('span').text

    # time.sleep(1)
    re['target'] = soup.find(
        'div', class_='Fw(b) Fl(end)--m Fz(s) C($primaryColor').text

    driver.quit()
    # pprint.pprint(re)
    return re
    # except Exception as e:
    #     logging.error(e)


def scrape_stock_list(file):
    data = defaultdict(list)
    letter = {'T': 1000000000000, 'K': 1000, 'M': 1000000, 'B': 1000000000}
    df = pd.read_csv(file)
    for symbol in df['Symbol'].tolist()[:2]:
        # print(symbol)
        scraped_data = scrape_stock_info(symbol)
        # open = float(scraped_data['open'].replace(',', ''))
        # fifty_two_wk_low = float(
        #     scraped_data['fifty_two_wk_low'].replace(',', ''))
        # fifty_two_wk_hi = float(
        #     scraped_data['fifty_two_wk_hi'].replace(',', ''))
        # volume = float(scraped_data['volume'].replace(',', ''))
        # avg_volume = float(scraped_data['avg_volume'].replace(',', ''))
        # market_cap = float(
        #     scraped_data['market_cap'][-1].replace(',', '')) * letter[scraped_data['market_cap'][-1]]
        # PE_ratio = float(scraped_data['PE_ratio'].replace(',', ''))
        # EPS_ratio = float(scraped_data['EPS_ratio'].replace(',', ''))
        for k, v in scraped_data.items():
            data['Symbol'] = symbol
            if k == 'market_cap':
                # print(letter[v[-1]])
                # print(float(v[-1].replace(',', '')))
                data[symbol].append(
                    float(v[:-1].replace(',', '')) * letter[v[-1]])
            elif k == 'target':
                data[symbol].append(v)
            else:
                data[symbol].append(float(v.replace(',', '')))

    # pprint.pprint(data)

    stock_df = pd.DataFrame.from_dict(data, orient='index', columns=[
        'Symbol', 'open', 'fifty_two_wk_low', 'fifty_two_wk_hi', 'volume', 'avg_volume', 'market_cap', 'PE_ratio', 'EPS_ratio', 'target'])
    file_name = 'dataset.csv'
    # print(stock_df)
    stock_df.to_csv(file_name, index=False)


# create_stock_symbol_table()
# stock = get_user_input()
# scrape_stock_info(stock)
# scrape_stock_info('amzn')
scrape_stock_list('S&P500-Symbols.csv')
