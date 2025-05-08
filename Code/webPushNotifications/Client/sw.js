'use strict';

self.addEventListener('install', () => {
	self.skipWaiting();
});

self.addEventListener('push', function (event) {
	// console.log('Push message received.');
	let notificationTitle = null;
	const notificationOptions = {
		body: null,
		icon: null,
		data: {
			url: "/TsrAlerts"
		},
		requireInteraction: true,
		vibrate: null,
		actions: [{ 
			action: null, 
			title: null, 
			icon: null }]
		// image: null // should be an URL
	};

	// if (event.data) {
	// 	const dataJson = JSON.parse(event.data.text());
	// 	notificationTitle = dataJson.title;
	// 	notificationOptions.body = dataJson.text;
	// 	notificationOptions.icon = dataJson.icon;
	// 	notificationOptions.data = dataJson.url;
	// 	notificationOptions.vibrate = [200, 100, 200, 100, 200, 100, 200];
	// 	notificationOptions.actions = [{
	// 		action: dataJson.action.name,
	// 		title: dataJson.action.title,
	// 		icon: dataJson.action.icon
	// 	}]
	// 	// notificationOptions.image = "https://www.topstockresearch.com/static/v21/img/tsr/TsrLogo.png";
	// }

	event.waitUntil(
		self.registration.showNotification(
			notificationTitle,
			notificationOptions
		)
	);
});

self.addEventListener('notificationclick', function (event) {
	// console.log('Notification clicked.');
	event.notification.close();

	let clickResponsePromise = Promise.resolve();
	if (event.notification.data && event.notification.data.url) {
		clickResponsePromise = clients.openWindow(event.notification.data.url);
	}

	event.waitUntil(clickResponsePromise);
});

// the push subscription can be replaced / renewed automatically by the browser
self.addEventListener('pushsubscriptionchange', function (event) {

	var key = event.subscription.getKey ? event.subscription.getKey('p256dh') : '';
	var auth = event.subscription.getKey ? event.subscription.getKey('auth') : '';

	let postEndpoint = 'http://localhost:8080/webPushTrigger/subscribe';

	event.waitUntil(
		fetch(postEndpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				oldEndpoint: event.oldSubscription ? event.oldSubscription.endpoint : null,
				newEndpoint: event.newSubscription ? event.newSubscription.endpoint : null,
				newKey: event.newSubscription ? btoa(String.fromCharCode.apply(null, new Uint8Array(key))) : '',
				newAuth: event.newSubscription ? btoa(String.fromCharCode.apply(null, new Uint8Array(auth))) : ''
			})
		})
	);
});