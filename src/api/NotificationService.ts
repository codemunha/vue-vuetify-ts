import { INotification } from '@/interfaces'
import db from '@/mock/db'

class NotificationService {
  getNotificationList(): Array<INotification> {
    let notiList: Array<INotification> = db.notification

    return notiList
  }
}

export const notificationService = new NotificationService()
