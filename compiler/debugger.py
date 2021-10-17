import logging
import os
from datetime import date

from pathlib import Path

path = str(Path(__file__).parent.absolute())
_appPath = path.rsplit("\\",1)[0]


os.makedirs(_appPath+'/.debug', exist_ok=True)
logging.basicConfig(
    filename=f'{_appPath}/.debug/{date.today()}.txt',
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
