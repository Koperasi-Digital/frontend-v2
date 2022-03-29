import { messaging } from './firebaseInit';
import { addMessagingToken } from 'redux/slices/notification';

export const requestFirebaseNotificationPermission: () => Promise<string> = () =>
  new Promise((resolve, reject) => {
    Notification.requestPermission()
      .then(() => messaging.getToken())
      .then(async (firebaseToken) => {
        try {
          await addMessagingToken(firebaseToken);
        } catch (err) {
          reject(err);
        }
        resolve(firebaseToken);
      })
      .catch((err) => {
        reject(err);
      });
  });

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
