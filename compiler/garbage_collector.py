
from os import listdir, path, remove
class COLECTOR:
    def removeTrash(directory, file_extention):

        
        files_in_directory = listdir(directory)
        filtered_files = [file for file in files_in_directory if file.endswith(file_extention)]
        for file in filtered_files:
            path_to_file = path.join(directory, file)
            remove(path_to_file)
