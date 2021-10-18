from PyQt5.QtWidgets import QApplication, QMainWindow
import sys
 
class Window(QMainWindow):
   def __init__(self):
       super().__init__()
 
       self.setGeometry(300, 300, 600, 400)
       self.setWindowTitle("Windows form com NOS")
       self.show()
 
app = QApplication(sys.argv)
window = Window()
sys.exit(app.exec_())