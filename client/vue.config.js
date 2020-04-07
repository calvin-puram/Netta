module.exports = {
  outputDir:
    'C:\\Users\\user\\Desktop\\personal projects\\deployed apps\\devCoach\\public',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000/'
      }
    }
  },
  transpileDependencies: ['vuetify']
};
