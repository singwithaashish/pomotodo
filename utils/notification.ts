const showNotification = (message: string) => {
  if (Notification.permission === "granted") {
    new Notification("Pomodoro Timer", {
      body: message,
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Pomodoro Timer", {
          body: message,
        });
      }
    });
  }
};

export default showNotification;
