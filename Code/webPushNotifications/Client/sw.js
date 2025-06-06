'use strict';

self.addEventListener('install', () => {
	self.skipWaiting();
});

self.addEventListener('push', function(event) {
	// console.log('Push message received.');
	let notificationTitle = null;
	const notificationOptions = {
		body: null,
		icon: null,
		data: {
			url: "https://www.topstockresearch.com/"
		},
		requireInteraction: false,
		vibrate: null,
		image: null // should be an URL
	};

	if (event.data) {
		const dataJson = JSON.parse(event.data.text());
		// const dataJson = '';
		notificationTitle = dataJson.title;
		notificationOptions.body = dataJson.text;
		notificationOptions.icon = dataJson.icon;
		notificationOptions.data.url = "https://www.topstockresearch.com/";
		notificationOptions.requireInteraction = true;
		notificationOptions.vibrate = [200, 100, 200, 100, 200, 100, 200];
		notificationOptions.image = "https://www.topstockresearch.com/static/v21/img/tsr/TsrLogo.png";

	}

	event.waitUntil(
		self.registration.showNotification(
			notificationTitle,
			notificationOptions
		)
	);
});

// Src: https://web.dev/articles/push-notifications-notification-behaviour
self.addEventListener('notificationclick', function(event) {
	// console.log('Notification clicked.');
	event.notification.close();

	let clickResponsePromise = Promise.resolve();
	if (event.notification.data && event.notification.data.url) {
		clickResponsePromise = clients.openWindow(event.notification.data.url);
	}

	event.waitUntil(clickResponsePromise);
});

self.onclick = (event) => {
  event.preventDefault(); // prevent the browser from focusing the Notification's tab
  window.open("https://www.mozilla.org", "_blank");
};
