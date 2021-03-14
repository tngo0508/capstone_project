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
        self.__f_handler = handlers.RotatingFileHandler(
            'stockscrape.log', maxBytes=61805, backupCount=5)

        self.__formatter = logging.Formatter(
            fmt='%(asctime)s %(levelname)-8s %(message)s')
        self.__f_handler.setFormatter(self.__formatter)

        self.__c_handler = logging.StreamHandler(sys.stdout)
        self.__c_handler.setFormatter(self.__formatter)

        self.__logger.addHandler(self.__f_handler)
        self.__logger.addHandler(self.__c_handler)

    def get(self):
        return self.__logger
