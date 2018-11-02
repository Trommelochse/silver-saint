import firebase from 'firebase/app';
import 'firebase/firestore';

var config = {
apiKey: "AIzaSyCXOjI_ZDyXcKUUfmLIQxktkZsiE5w7Iug",
authDomain: "be-livestream-admin.firebaseapp.com",
databaseURL: "https://be-livestream-admin.firebaseio.com",
projectId: "be-livestream-admin",
storageBucket: "be-livestream-admin.appspot.com",
messagingSenderId: "1060715660133"
};
export default firebase.initializeApp(config);
