import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import th from 'vuetify/src/locale/th'
import en from 'vuetify/src/locale/en'
import '@/themes/style.scss'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#1867c0',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  },
  lang: {
    locales: { th, en },
    current: 'th'
  }
})
