import Vue from 'nativescript-vue';

import Home from './components/Home';

import firebase from 'nativescript-plugin-firebase';

import store from './store';

Vue.prototype.$store = store;

import { ModalStack, overrideModalViewMethod } from 'nativescript-windowed-modal';

overrideModalViewMethod();

firebase
	.init({
		// Optionally pass in properties for database, authentication and cloud messaging,
		// see their respective docs.
	})
	.then(
		instance => {
			console.log('firebase.init done');
		},
		error => {
			console.log(`firebase.init error: ${error}`);
		}
	);
Vue.prototype.$firebase = firebase;
/*Vue.registerElement(
	'MLKitTextRecognition',
	() => require('nativescript-plugin-firebase/mlkit/textrecognition').MLKitTextRecognition
);*/
Vue.registerElement(
	'MLKitCustomModel',
	() => require('nativescript-plugin-firebase/mlkit/custommodel').MLKitCustomModel
);
Vue.registerElement('CheckBox', () => require('nativescript-checkbox').CheckBox, {
	model: {
		prop: 'checked',
		event: 'checkedChange'
	}
});
Vue.registerElement('ModalStack', () => ModalStack);

Vue.config.silent = TNS_ENV === 'production';

new Vue({
	store,
	render: h => h('frame', [h(Home)]),
}).$start();
