
function requestNotificationPermission() {
    return Notification.requestPermission();
}



window.addEventListener("load", () => {
    if(Notification.permission == "granted")
        setTimeout(createNotification, 2000);

});

function createNotification() {
    let title = "RSI Alert";
    let text = `RSI Above 50 on ADANI ENERGY`;
    let icon = 'https://www.topstockresearch.com/static/v21/img/tsr/TsrLogo.png';

    return new Notification(title, { body: text,  icon: icon, vibrate: [200, 100, 200]});
    
}