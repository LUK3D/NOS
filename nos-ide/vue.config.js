module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      nodeIntegration: true
    }
  }
}
