import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'th',
  messages: {
    en: {
      message: {
        title: 'System Management',
        home: 'Home',
        user: 'User',
        about: 'About',
        hello: 'hello world',
        greeting: 'good morning',
        search: 'Search',
        detail: 'Detail',
        save: 'Save',
        clear: 'Clear',
        choice: 'Choice',
        language: 'Language',
        newItem: 'New Item'
      }
    },
    th: {
      message: {
        title: 'การจัดการระบบ',
        home: 'หน้าแรก',
        user: 'สมาชิก',
        about: 'เกี่ยวกับเรา',

        hello: 'hello world',
        greeting: 'good morning',
        search: 'ค้นหา',
        detail: 'รายละเอียด',
        save: 'บันทึก',
        clear: 'ล้าง',
        choice: 'ตัวเลือก',
        language: 'ภาษา',
        newItem: 'รายการใหม่'
      }
    }
  }
})
