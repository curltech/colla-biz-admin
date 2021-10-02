import { required } from 'vuelidate/lib/validators'
import authService from '@/service/auth'
import { config, httpClientPool, AppParams, myself, myselfPeerService, p2pPeer, peerClientService, PeerMode, iceServer, Language, connectPeerId, connectAddress } from 'libcolla'
import { colors } from 'quasar'
import * as cookie from 'tiny-cookie'
export default {
  data() {
    return {
      subKind: 'default',
      loginData: {
        connectAddress: '',
        credential_: '13609619603',
        password_: '123456'
      },
      registData: {
        name: 'hujs',
        nickName: '胡劲松',
        password: '123456',
        confirmPassword: '123456',
        email: 'hujs@colla.cc',
        mobile: '13609619603'
      },
      language: config.appParams.language,
      languageOptions: Language.LanguageOptions,
      rules: {
        credential_: [{
          required: true,
          message: '[(#{credential})]',
          trigger: 'blur'
        }],
        password_: [{
          required: true,
          message: '[(#{password})]',
          trigger: 'blur'
        },
        {
          min: 6,
          message: '[(#{password length})]',
          trigger: 'blur'
        }
        ]
      },
      bgNo: 1
    }
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    changeBackground() {
      let count = 12
      if (this.bgNo === count) {
        this.bgNo = 1
      } else {
        this.bgNo++
      }
    },
    async register() {
      let success = await this.$refs['frmRegister'].validate()
      if (success === false) {
        console.error('validate fail')
        return
      }
      if (config.appParams.mode === PeerMode.P2pPeer) {
        await myselfPeerService.register(this.registData)
        if (!myself.myselfPeer) {
          console.error('regist fail')
        }
      } else if (config.appParams.mode === PeerMode.Client) {
        this.registData.userName = this.registData.name
        let response = await httpClientPool.httpClient.send('/user/Regist', this.registData)
        const user = response.data
        if (!user) {
          console.error('regist fail')
        }
      }
    },
    setting: function () {
      console.info(PeerMode.ModeOptions)
      config.appParams.language = this.loginData.language
      config.appParams.connectAddress = this.loginData.connectAddress
      config.setAppParams()
      httpClientPool.get(config.appParams.connectAddress)
    },
    async login() {
      let router = this.$router
      let _that = this
      let success = await this.$refs['frmLogin'].validate()
      if (success === false) {
        console.error('validate fail')
        return
      }
      this.setting()
      let response = await authService.login(this.loginData)
      const user = response.data.user
      const token = response.data.token
      if (user && token) {
        router.push('/workspace')
      } else {
        console.error('login fail')
      }
    }
  },
  computed: {
    layoutStyle() {
      let name = (this.$q.dark.isActive ? 'wd-' : 'wl-') + this.bgNo
      return 'background:url("/login-bg-' + name + '.jpg") no-repeat center; background-size: cover;'
    }
  }
}
