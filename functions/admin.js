var admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();
const rtdb = admin.database();

export { db, rtdb }