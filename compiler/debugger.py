import logging
import os
from datetime import date

os.makedirs('.debug', exist_ok=True)
logging.basicConfig(
    filename=f'.debug/{date.today()}.txt',
    level=logging.DEBUG,
    format=f'{"-"*50}\n[ %(asctime)s ] - [ %(levelname)s ]\n\t - %(message)s \n'
)


class DBG:
    def debug(self, _erro: str):
        logging.debug(_erro)

    def falha(self, _erro: str):
        logging.critical(_erro)


class ErroConversao(Exception):
    pass
