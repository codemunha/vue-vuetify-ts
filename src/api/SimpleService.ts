import http from '@/utils/http'

class SimpleService {
  getDessertList(): Promise<any> {
    return http.get('http://localhost:3000/dessert')
  }

  getDessert(id: number): Promise<any> {
    return http.get('http://localhost:3000/dessert/' + id)
  }

  saveDessert(data: any): Promise<any> {
    return http.post('http://localhost:3000/dessert', data)
  }

  deleteDessert(id: number): Promise<any> {
    return http.delete('http://localhost:3000/dessert/' + id)
  }
}

export const simpleService = new SimpleService()