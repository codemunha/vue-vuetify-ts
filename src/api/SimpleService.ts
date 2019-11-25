import http from '@/utils/http'

class SimpleService {
  getDataTable(): Promise<any> {
    return http.get('http://localhost:3000/dessert')
  }
}

export const simpleService = new SimpleService()