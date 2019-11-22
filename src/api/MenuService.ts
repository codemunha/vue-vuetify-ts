import db from '@/mock/db'
import { IMenu } from '@/interfaces'

class MenuService {
  getMenuList(): Array<IMenu> {
    let menuList: Array<IMenu> = db.menu

    return menuList
  }
}

export const menuService = new MenuService()
