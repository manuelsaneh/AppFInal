import notifee from '@notifee/react-native';

export async function onDisplayNotification() {
  await notifee.requestPermission();

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: 'User Added',
    body: 'Welcome to Hungry Mood',
    android: {
      channelId,
      pressAction: {
        id: 'default',
      },
    },
  });
}
