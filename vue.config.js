// const target = process.env.VUE_APP_BASE_API;

module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#7447CC",
          "link-color": "#7447CC",
          "border-radius-base": "2px"
        },
        javascriptEnabled: true
      }
    }
  }
  // devServer: {
  //   proxy: {
  //     "/": {
  //       target: target,
  //       changeOrigin: true,
  //       ws: true
  //     }
  //   }
  // }
};
