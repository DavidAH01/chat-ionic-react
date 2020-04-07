const notificationOpenedCallback = (jsonData, pushView) => {
  const chatId = window.location.href.split('/')
  if(chatId[3] && chatId[4] && chatId[3] === 'chat' && chatId[4] == jsonData.notification.payload.additionalData.id) return;
  pushView(`/main/chat/${jsonData.notification.payload.additionalData.id}`);
};

const oneSignalInit = (pushView) => {
  if(window["plugins"]){
    window["plugins"].OneSignal.inFocusDisplaying(window["plugins"].OneSignal.OSInFocusDisplayOption.Notification);
    window["plugins"].OneSignal
    .startInit(process.env.REACT_APP_ONESIGNAL_APPID, process.env.REACT_APP_FIREBASE_APPID)
    .handleNotificationOpened((data) => notificationOpenedCallback(data, pushView))
    .endInit();
  }
}

const getUserId = () => {
  if(window["plugins"]){
    return new Promise ((resolve) => {
      window["plugins"].OneSignal.getIds((ids) => {
        resolve(ids.userId);
      });
    })
  }

  return;
}

const sendNotification = (message, receiverOnesignalId, additionalData) => {
  if(!receiverOnesignalId) return;

  var notificationObj = { 
    headings: { en: `${additionalData.name} dice:` },
    contents: {en: message},
    include_player_ids: [receiverOnesignalId],
    data: additionalData
  };

  window.plugins.OneSignal.postNotification(notificationObj);
}

export {
  oneSignalInit,
  getUserId,
  sendNotification
}