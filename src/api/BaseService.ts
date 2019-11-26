import { AxiosResponse } from 'axios'

export class BaseService {
  public handleSuccess (response: AxiosResponse<any>) {
    return response.data
  }
}