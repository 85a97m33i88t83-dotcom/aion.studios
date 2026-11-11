// Run once, on your own computer, to create the Super Admin. Never ship this file to the website.
// 1) npm i firebase-admin   2) download a service-account key from Firebase console
// 3) node set-admin.js ./serviceAccount.json you@example.com super
// Roles: super | product | order | viewer. The user must already exist in Firebase Auth.
const admin = require('firebase-admin');
const [, , key, email, role = 'viewer'] = process.argv;
if (!['super', 'product', 'order', 'viewer'].includes(role)) throw new Error('Invalid role');
admin.initializeApp({ credential: admin.credential.cert(require(require('path').resolve(key))) });
admin.auth().getUserByEmail(email)
  .then(u => admin.auth().setCustomUserClaims(u.uid, { admin: true, role }))
  .then(() => console.log(`${email} is now ${role}. They must log out and back in.`))
  .catch(e => { console.error(e.message); process.exit(1); });