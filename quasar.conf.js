// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js
// Configuration for your app
const path = require('path')
const ProvidePlugin = require('webpack/lib/ProvidePlugin')
function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'i18n',
      'vuelidate',
      'vueclipboard2',
      'ly-tab'
    ],
    // app plugins (/src/plugins)
    plugins: [
      'permission'
    ],
    supportTS: true,
    css: [
      'app.styl'
    ],

    extras: [
      'ionicons-v4',
      'mdi-v3',
      'fontawesome-v5',
      'eva-icons',
      'themify',
      'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    framework: {
      config: {
        dark: 'auto' // or Boolean true/false
      },
      iconSet: 'ionicons-v4',
      lang: 'zh-hans', // Quasar language

      importStrategy: 'all', //all: true, // --- includes everything; for dev only!

      components: [
      ],

      // directives: [
      //   'Ripple'
      // ],

      // Quasar plugins
      plugins: [
        'Notify',
        new ProvidePlugin({
          videojs: 'video.js/dist/video.cjs.js',
          RecordRTC: 'recordrtc',
          Record: 'record'
        })
      ]
    },
    vendor: {
      add: [],
      remove: []
    },
    build: {
      //设置请求服务的前导地址和域名的常量，axios在发出请求前自动加上baseurl
      /*env: ctx.dev ?
        { // so on dev we'll have
          API: 'http://localhost:8081/'
          //API: JSON.stringify('http://localhost:8088')
        } :
        { // and on build (production):
          API: 'http://localhost:8081/'
          //API: JSON.stringify('http://localhost:8088')
        },*/
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack(cfg) {
        // cfg.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /node_modules/,
        //   options: {
        //     formatter: require('eslint').CLIEngine.getFormatter('stylish')
        //   }
        // })
        cfg.module.rules.push({
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        })
        cfg.module.rules.push({
          test: /\.md$/,
          loader: 'text-loader'
        })
        cfg.module.rules.push({
          test: /\.worker\.js$/,
          //exclude: /node_modules/,
          //loader: 'raw-loader'
          //loader: 'worker-loader',
          use: { loader: 'worker-loader' }
          //options: { inline: true, fallback: false }
          //loader: 'worker!babel?presets[]=es2015'
        })
        cfg.module.rules.push({
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        })
        cfg.resolve.alias = {
          ...cfg.resolve.alias, // This adds the existing alias
          // Add you own alias like this
          '@': resolve('src'),
          videojs: 'video.js',
          WaveSurfer: 'wavesurfer.js',
          RecordRTC: 'recordrtc'
        }
      }
    },

    /*devServer: {
      port: 8088,
      open: true, // opens browser window automatically
      host: "localhost",
      https: false,
      hotOnly: false,
      //proxy: {
      //  '/receive': {
      //    target: 'http://127.0.0.1:8080', //API服务器的地址
      //    //target:window.targetUrl,
      //    //target: 'http://120.79.254.124:8080',
      //   changeOrigin: true,
      //  },
      },
    },*/
    devServer: {
      port: 8088,
      open: true, // opens browser window automatically
      host: "localhost",
      https: true,
      hotOnly: false
    },
    animations: 'all', // --- includes all animations
    // animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'colla-admin',
        // short_name: 'colla-admin',
        // description: 'colla-admin',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [{
          'src': 'icons/icon-128x128.png',
          'sizes': '128x128',
          'type': 'image/png'
        },
        {
          'src': 'icons/icon-192x192.png',
          'sizes': '192x192',
          'type': 'image/png'
        },
        {
          'src': 'icons/icon-256x256.png',
          'sizes': '256x256',
          'type': 'image/png'
        },
        {
          'src': 'icons/icon-384x384.png',
          'sizes': '384x384',
          'type': 'image/png'
        },
        {
          'src': 'icons/icon-512x512.png',
          'sizes': '512x512',
          'type': 'image/png'
        }
        ]
      }
    },

    cordova: {
      // id: 'com.castalia.camsi.biz.client',
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    bin: {
      windowsAndroidStudio: 'D:\\Android\\Android Studio\\bin\\studio64.exe'
    },

    electron: {
      // bundler: 'builder', // or 'packager'
      // nodeIntegration: false
      extendWebpack(cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        appBundleId: 'com.castalia.colla.chat',
        appCategoryType: '',
        osxSign: '',
        protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // quasar build -m pwa

        // appId: 'colla-admin'
      }
    }
  }
}
