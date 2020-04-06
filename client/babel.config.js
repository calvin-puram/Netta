module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@views': './src/views',
          '@store': './src/store',
          '@bootcampsUtils': './src/components/BootcampsUtils',
          '@layouts': './src/components/Layouts',
          '@homeUtils': './src/components/HomeUtils',
          '@mixins': './src/Mixins'
        }
      }
    ]
  ]
};
