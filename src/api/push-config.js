import PushNotification from 'react-native-push-notification';

export function * authenticate(api , { accessToken }) {
  const response = yield call([api, api.authenticate], accessToken);

  yield call([Keychain, Keychain.setGenericPassword], 'api_token', response.access_token);

  PushNotification.requestPermission();

  
}
