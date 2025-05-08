
const publicKey = new Uint8Array([0x04, 0xf0, 0xf6, 0x3f, 0x0c, 0xd4, 0x7d, 0x93, 0xf0, 0x94, 0xf2, 0x22, 0xaf, 0x50, 0x49, 0x12, 0x14, 0x6f, 0xfa, 0x02, 0x70, 0x00, 0x65, 0xb3, 0xc7, 0x8e, 0x3d, 0x11, 0xda, 0x44, 0xe6, 0x07, 0xd2, 0x47, 0x7e, 0xc4, 0x39, 0xb4, 0x4e, 0xb0, 0xa3, 0x0d, 0xad, 0x8a, 0xe3, 0xdc, 0xa1, 0xf6, 0xe7, 0xf2, 0xca, 0x4e, 0x7c, 0x88, 0xea, 0x07, 0xdf, 0xb6, 0x1b, 0x41, 0xfa, 0x6e, 0x06, 0x02, 0x49]);

// console.log(publicKey);

// const hex = `04:0c:33:7f:ea:be:ef:35:42:52:21:c4:5a:aa:f0:
// b2:0f:56:ef:81:58:17:00:a2:22:66:7c:a6:dc:c9:
// a2:47:e2:43:c5:4f:0c:99:c6:d0:7f:d1:fc:1b:02:
// c2:7b:87:7f:44:6f:a7:e2:18:7c:0b:77:08:f8:ad:
// 21:b3:6d:7d:68`;

// const hexArray = hex
//   .replace(/\s+/g, '')  // Remove newlines and spaces
//   .split(':')           // Split by colon
//   .map(byte => parseInt(byte, 16)); // Convert hex to decimal numbers

// const publicKey = new Uint8Array(hexArray);

// console.log(publicKey);

function checkNotificationPermission() {

    if ('serviceWorker' in navigator) {
        if (Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted')
                    navigator.serviceWorker.register('./sw.js', { scope: "./"}).then(initialiseState);
            });
        }
        else if (Notification.permission === 'denied') {
            alert("Notifications are blocked, please reset permissions");
            console.warn("Permission to show notifications is denied");
        }
        else {
            navigator.serviceWorker.register('./sw.js', { scope: "./"}).then(initialiseState);
        }
    }
    else {
        console.warn('Service workers are not supported in this browser.');
    }
}

/**
 * Step two: The serviceworker is registered (started) in the browser. Now we
 * need to check if push messages and notifications are supported in the browser
 */
function initialiseState() {

    // Check if desktop notifications are supported
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        console.warn('Notifications aren\'t supported.');
        return;
    }

    // Check if push API is supported
    if (!('PushManager' in window)) {
        console.warn('Push messaging isn\'t supported.');
        return;
    }

    navigator.serviceWorker.ready.then(function (swr) {

        // Get the push notification subscription object
        swr.pushManager.getSubscription().then(function (subscription) {

            subscribe();

            /*
            // If this is the user's first visit we need to set up
            // a subscription to push notifications
            if (!subscription) {
                subscribe();

                return;
            }

            // Update the server state with the new subscription
            sendSubscriptionToServer(subscription);
            */
        }).catch(function (err) {
                // Handle the error - show a notification in the GUI
                console.warn('Error during getSubscription()', err);
            });
    });
}

/**
 * Step three: Create a subscription. Contact the third party push server (for
 * example mozilla's push server) and generate a unique subscription for the
 * current browser.
 */
function subscribe() {
    navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {

        // Contact the third party push server. Which one is contacted by
        // pushManager is  configured internally in the browser, so we don't
        // need to worry about browser differences here.
        //
        // When .subscribe() is invoked, a notification will be shown in the
        // user's browser, asking the user to accept push notifications from
        // <yoursite.com>. This is why it is async and requires a catch.
        serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicKey
        }).then(function (subscription) {
            // Update the server state with the new subscription
            return sendSubscriptionToServer(subscription);

        }).catch(function (e) {
                console.error('Unable to subscribe to push.', e);
            });
    });
}

/**
 * Step four: Send the generated subscription object to our server.
 */
function sendSubscriptionToServer(subscription) {

    // Get public key and user auth from the subscription object
    var key = subscription.getKey ? subscription.getKey('p256dh') : '';
    var auth = subscription.getKey ? subscription.getKey('auth') : '';
    console.log(btoa(String.fromCharCode.apply(null, new Uint8Array(key))));
    console.log(btoa(String.fromCharCode.apply(null, new Uint8Array(auth))));
    console.log(subscription.endpoint);
    // This example uses the new fetch API. This is not supported in all
    // browsers yet.
    // let postEndpoint = 'https://topstockresearch.com/webPushTrigger/subscribe';
    let postEndpoint = 'http://localhost:8080/webPushTrigger/subscribe';

    return fetch(postEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            endpoint: subscription.endpoint,
            // Take byte[] and turn it into a base64 encoded string suitable for
            // POSTing to a server over HTTP
            key: key ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : '',
            auth: auth ? btoa(String.fromCharCode.apply(null, new Uint8Array(auth))) : '',
            notificationCount: document.getElementById("notificationCount").value
        })
    });
}

// console.log(navigator.serviceWorker.controller.state == 'activated')

