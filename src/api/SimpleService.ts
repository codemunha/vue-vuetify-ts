import http from '@/utils/http'
import { BaseService } from './BaseService'

class Simple extends BaseService {
  getMenuList(): Promise<any> {
    return http.get('http://localhost:3000/menu').then(this.handleSuccess)
  }
  getDessertList(): Promise<any> {
    return http.get('http://localhost:3000/dessert').then(this.handleSuccess)
  }

  getDessert(id: number): Promise<any> {
    return http.get('http://localhost:3000/dessert/' + id).then(this.handleSuccess)
  }

  saveDessert(data: any): Promise<any> {
    return http.post('http://localhost:3000/dessert', data).then(this.handleSuccess)
  }

  deleteDessert(id: number): Promise<any> {
    return http.delete('http://localhost:3000/dessert/' + id).then(this.handleSuccess)
  }
}

export const SimpleService = new Simple()