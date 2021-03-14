import requests
import pandas as pd
import time
import logging
import logging.handlers as handlers
import pprint
import os
import random
import numpy as np

from bs4 import BeautifulSoup
from collections import defaultdict
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from fake_useragent import UserAgent
from sys import platform
from .stockscrape_logger import Logger

Log = Logger(__name__)
logger = Log.get()

# logging.basicConfig(
#     filename='stockscraper.log', format='%(asctime)s %(levelname)-8s %(message)s', level=logging.INFO, datefmt='%Y-%m-%d %H:%M:%S')

options = webdriver.ChromeOptions()
options.headless = True
options.add_argument('--incognito')
options.add_argument('--headless')
options.add_argument("window-size=1400,1500")
options.add_argument('--disable-gpu')
options.add_argument("--no-sandbox")
options.add_argument("start-maximized")
options.add_argument("enable-automation")
options.add_argument('--ignore-certificate-errors')
options.add_argument('--ignore-ssl-errors')
options.add_argument("--disable-infobars")
options.add_argument("--disable-dev-shm-usage")
options.add_argument('--log-level=3')
options.add_experimental_option('excludeSwitches', ['enable-logging'])

curr_dir = os.path.dirname(os.path.realpath(__file__))
dataset_dir = os.path.join(curr_dir, 'dataset')

try:
    os.makedirs(dataset_dir)
except FileExistsError:
    pass

exec_path = ''
try:
    # curr_dir = os.path.dirname(os.path.realpath(__file__))
    if platform == 'win32':
        chrome_exec_file = 'chromedriver.exe'
        chrome_dir = "win32"
        exec_path = os.path.join(curr_dir, chrome_dir, chrome_exec_file)
    elif platform == 'linux':
        chrome_exec_file = 'chromedriver'
        chrome_dir = "linux"
        exec_path = os.path.join(curr_dir, chrome_dir, chrome_exec_file)
    else:
        chrome_exec_file = 'chromedriver'
        chrome_dir = "mac"
        exec_path = os.path.join(curr_dir, chrome_dir, chrome_exec_file)
    # logging.info(exec_path)
except Exception as e:
    logger.raiseExceptions(e)

# driver = webdriver.Chrome(executable_path=exec_path, options=options)
driver = webdriver.Chrome(
    executable_path=ChromeDriverManager().install(), options=options)


def get_user_input():
    return input("Enter Stock: ")


def make_path_to_dataset(file_name):
    return os.path.join(dataset_dir, file_name)


def create_stock_symbol_table(mode='sp500'):
    if mode == 'sp500':
        table = pd.read_html(
            'https://en.wikipedia.org/wiki/List_of_S%26P_500_companies')
        df = table[0]
        df.to_csv(make_path_to_dataset('S&P500-Info.csv'))
        df.to_csv(make_path_to_dataset(
            'S&P500-Symbols.csv'), columns=['Symbol'])
    elif mode == 'nasdaq100':
        table = pd.read_html(
            'https://en.wikipedia.org/wiki/NASDAQ-100#Components')
        df = table[3]
        df = df.rename(columns={'Ticker': 'Symbol'})
        df.to_csv(make_path_to_dataset('NASDAQ100-Info.csv'))
        df.to_csv(make_path_to_dataset(
            'NASDAQ100-Symbols.csv'), columns=['Symbol'])


def scrape_stock_info(stock, mode='single'):
    mode_val = {'single', 'list'}
    if mode not in mode_val:
        raise ValueError("Must provide mode for scraping stock info")
    # print(stock)
    if not stock:
        return None
    if stock.find('.'):
        stock = stock.replace('.', '-')
    logger.info('Scraping stock symbol - %s', stock)
    # while True:
    #     try:
    re = defaultdict()
    url = 'https://finance.yahoo.com/quote/' + \
        stock + '?p=' + stock + '&.tsrc=fin-srch'

    # response = requests.get(url)
    ua = UserAgent()
    userAgent = ua.random
    options.add_argument(f'user-agent={userAgent}')
    driver = webdriver.Chrome(executable_path=exec_path, options=options)
    driver.get(url)
    if mode == 'list':
        time.sleep(random.randint(10, 30))
    try:
        target_elem = WebDriverWait(driver, 3).until(
            EC.presence_of_element_located((By.ID, 'fr-val-mod')))
    except TimeoutException:
        logger.debug("Timed out waiting for page to load")
        driver.get(url)
        time.sleep(random.randint(10, 30))
    finally:
        logger.info('page is ready!')

    # time.sleep(3)
    # headers = ({'User-Agent':
    #             'Mozilla/5.0 (Windows NT 10.0 Win64 x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    #             })
    # r = requests.get(url, headers=headers)
    # soup = BeautifulSoup(r.text, 'lxml')
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    # logger.info('status code ' + str(r.status_code))

    try:
        re['open_price'] = soup.find(
            attrs={'data-test': 'OPEN-value'}).find_next('span').text
    except AttributeError as e:
        logger.error('open')
        logger.error(e)
        re['open_price'] = 'N/A'

    try:
        fifty_two_wk = soup.find(
            attrs={'data-test': 'FIFTY_TWO_WK_RANGE-value'}).text
        fifty_two_wk_low, fifty_two_wk_hi = fifty_two_wk.split('-')
        re['fifty_two_wk_low'] = fifty_two_wk_low
        re['fifty_two_wk_hi'] = fifty_two_wk_hi
    except AttributeError as e:
        logger.error('52 week')
        logger.error(e)
        re['fifty_two_wk_low'] = re['fifty_two_wk_hi'] = 'N/A'

    try:
        re['volume'] = soup.find(
            attrs={'data-test': 'TD_VOLUME-value'}).find_next('span').text
    except AttributeError as e:
        logger.error('volume')
        logger.error(e)
        re['volume'] = 'N/A'

    try:
        re['avg_volume'] = soup.find(
            attrs={'data-test': 'AVERAGE_VOLUME_3MONTH-value'}).find_next('span').text
    except AttributeError as e:
        logger.error(e)
        logger.error('avg_volume')
        re['avg_volume'] = 'N/A'

    try:
        re['market_cap'] = soup.find(
            attrs={'data-test': 'MARKET_CAP-value'}).find_next('span').text
    except AttributeError as e:
        logger.error('market_cap')
        logger.error(e)
        re['market_cap'] = 'N/A'

    try:
        re['PE_ratio'] = soup.find(
            attrs={'data-test': 'PE_RATIO-value'}).find_next('span').text
    except AttributeError as e:
        logger.error('PE_ratio')
        logger.error(e)
        re['PE_ratio'] = 'N/A'

    try:
        re['EPS_ratio'] = soup.find(
            attrs={'data-test': 'EPS_RATIO-value'}).find_next('span').text
    except AttributeError as e:
        logger.error('EPS_ratio')
        logger.error(e)
        re['EPS_ratio'] = 'N/A'

    # time.sleep(1)
    try:
        target = soup.find(
            'div', class_='Fw(b) Fl(end)--m Fz(s) C($primaryColor').text
        if target == 'Near Fair Value':
            target = 'Undervalued'
        re['target'] = target
    except AttributeError as e:
        logger.error('target')
        logger.error(e)
        re['target'] = 'N/A'

    # logger.info(re)

    driver.close()
    # pprint.pprint(re)

    return re

# except AttributeError as e:
#     logger.error(e)
#     continue
# finally:
#     time.sleep(3)
#     return re
#     break


def scrape_stock_list(file):
    curr_dir = os.path.dirname(os.path.realpath(__file__))
    dataset_dir = os.path.join(curr_dir, 'dataset')

    try:
        os.makedirs(dataset_dir)
    except FileExistsError:
        pass
    data = defaultdict(list)
    letter = {'T': 1000000000000, 'K': 1000, 'M': 1000000, 'B': 1000000000}
    f_path = os.path.join(dataset_dir, file)
    df = pd.read_csv(f_path)
    for symbol in df['Symbol'].tolist():
        scraped_data = scrape_stock_info(symbol)
        # time.sleep(random.randint(5, 30))
        if scraped_data:
            data[symbol].append(symbol)
            for k, v in scraped_data.items():
                if k == 'market_cap':
                    try:
                        data[symbol].append(
                            float(v[:-1].replace(',', '')) * letter[v[-1]])
                    except:
                        data[symbol].append(np.nan)

                elif k == 'target':
                    data[symbol].append(v)
                elif v != 'N/A':
                    try:
                        data[symbol].append(float(v.replace(',', '')))
                    except:
                        data[symbol].append(np.nan)

                else:
                    data[symbol].append(np.nan)

    # pprint.pprint(data)

    stock_df = pd.DataFrame.from_dict(data, orient='index', columns=[
        'Symbol', 'open', '52_wk_low', '52_wk_hi', 'volume', 'avg_volume', 'market_cap', 'PE_ratio', 'EPS_ratio', 'target'])
    # stock_df = pd.DataFrame.from_dict(data, orient='index', columns=[
    #     'Symbol', 'open', '52_wk_low', '52_wk_hi', 'volume', 'avg_volume', 'market_cap', 'PE_ratio', 'EPS_ratio'])

    # print(stock_df)

    log_time = time.strftime('%y_%m_%d-%H%M%S')
    file_name = file[:-4] + log_time + '.csv'
    # path = os.path.join(curr_dir, file_name)
    path = os.path.join(dataset_dir, file_name)
    stock_df.to_csv(path, index=False)


if __name__ == "__main__":
    # create_stock_symbol_table('nasdaq100')
    # create_stock_symbol_table('sp500')
    # stock = get_user_input()
    # scrape_stock_info(stock)
    # scrape_stock_info('amzn')
    # scrape_stock_info('goog')
    # scrape_stock_info('bf.b')
    # scrape_stock_list('S&P500-Symbols.csv')
    # scrape_stock_list('NASDAQ100-Symbols.csv')
    driver.quit()
