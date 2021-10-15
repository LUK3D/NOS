
import os
import PyInstaller.__main__


os.makedirs('no-builds', exist_ok=True)


class BUILDER:
    def build(self, _appName: str,_appPath:str):
        #os.system('pyinstaller --onefile "./output.py"')
        app_dir = _appPath.rsplit('/', 1)[0]
        icon = app_dir+"/icon.ico"

        args = [
                './output.py',
                '--onefile',
                '--clean',
                '--distpath=' + app_dir,
                '--name='+_appName
                #'--windowed'
                ]

        if(os.path.isfile(icon)):
            args.append(('--icon='+icon))


        PyInstaller.__main__.run(args)
        
        # old_app = app_dir+"/"+_appName+".exe"
        # if os.name == 'nt' and os.path.isfile(old_app):
        #     os.rename(old_app, app_dir+"/"+_appName+".exe")


