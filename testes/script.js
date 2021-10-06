
const dialog = require('electron').remote.dialog ;

dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
    

  }).catch(err => {
    console.log(err)
  })