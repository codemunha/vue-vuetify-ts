import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'th',
  messages: {
    en: {
      message: {
        hello: 'hello world',
        greeting: 'good morning'
      }
    },
    th: {
      message: {
        hello: 'hello world',
        greeting: 'good morning',
        search: 'ค้นหา',
        detail: 'รายละเอียด',
        save: 'บันทึก',
        clear: 'ล้าง',
        choice: 'ตัวเลือก'
      }
    }
  }
})
