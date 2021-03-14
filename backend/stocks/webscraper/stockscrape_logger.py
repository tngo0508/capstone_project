import logging
import logging.handlers as handlers
import os
import sys


class Logger():
    def __init__(self, log_name=None):
        if log_name is None:
            raise Exception("log name is required")

        self.__logger = logging.getLogger(log_name)
        self.__logger.setLevel(logging.INFO)
        self.__logger_dir = self.make_log_dir()
        self.__logger_path = os.path.join(self.__logger_dir, 'stockscrape.log')
        self.__f_handler = handlers.TimedRotatingFileHandler(
            self.__logger_path, when='H', backupCount=10)

        self.__formatter = logging.Formatter(
            fmt='%(asctime)s %(levelname)-8s %(message)s')
        self.__f_handler.setFormatter(self.__formatter)

        self.__c_handler = logging.StreamHandler(sys.stdout)
        self.__c_handler.setFormatter(self.__formatter)

        self.__logger.addHandler(self.__f_handler)
        self.__logger.addHandler(self.__c_handler)

    def get(self):
        return self.__logger

    def make_log_dir(self):
        curr_dir = os.path.dirname(os.path.realpath(__file__))
        log_dir = os.path.join(curr_dir, 'stockscrape_log')

        try:
            os.makedirs(log_dir)
        except FileExistsError:
            pass

        return log_dir
