import os
from os.path import isfile
# from PyInstaller.__main__ import run
from  garbage_collector import COLECTOR 
from sys import platform


import utils
_appPath = utils.UTILITIES.appPath().rsplit("\\",1)[0]

class BUILDER:
    def build(self, _appName: str, _appOutputPath: str):
        app_dir = _appOutputPath.rsplit('/', 1)[0]
        icon = app_dir + "\\icon.ico"

        

        if platform == "linux" or platform == "linux2":
            command = f'xdg-open -e {_appPath}/resources/builder/pyinstaller.exe &'
        elif platform == "win32":
            command = f'start /B /wait {_appPath}/resources/builder/pyinstaller.exe '
        else:
            print("Este sistema operacional não é suportado")

        args = [
            command + ' '+_appPath+'\\.temp\\output.py',
            '--onefile',
            '--clean',
            f'--distpath={app_dir}',
            f'--name="{_appName}"'
        ]

        

       

        if isfile(icon):
            args.append(('--icon="' + icon+'"'))
        else:
            args.append(('--icon='+"resources\\drawable\\cmd_app.ico"))
    
        os.system(" ".join(args))
        # run(args)
        COLECTOR.removeTrash(_appPath,'.spec')

