from os.path import isfile
from PyInstaller.__main__ import run

os.makedirs('no-builds', exist_ok=True)


class BUILDER:
    def build(self, _appName: str, _appPath: str):
        app_dir = _appPath.rsplit('/', 1)[0]
        icon = app_dir + "/icon.ico"

        args = [
            '.temp/output.py',
            '--onefile',
            '--clean',
            f'--distpath={app_dir}',
            f'--name={_appName}'
        ]

        if isfile(icon):
            args.append(('--icon=' + icon))

        run(args)

