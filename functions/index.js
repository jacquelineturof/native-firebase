/* eslint-disable */
const functions = require('firebase-functions');
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

admin.initializeApp();
const firestore = admin.firestore()

// objs with current user assigned and a countdown 
let court1
let court2
let court3

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.assignUsersToCourt = functions.https.onRequest((request, response) => {
    return cors(req, res, async () => {
        // get list of players in queue
        const snap = await firestore.collection('users').get()
        // find users with the lowest number
        res.send({ snap })
        // assign to a court -- add hr long timer
    })
})

exports.addUserToQueue = functions.https.onRequest((req, res) => {
    return cors(req, res, async () => {
        if(req.method !== 'POST') {
         return res.status(401).json({
          message: 'Not allowed'
         })
        }

        const user = req.body.user
        
        const snap = await firestore.collection('users').get()
        const size = snap.size

        const writeResult = await firestore.collection('users').add({
            name: user,
            number: size + 1
        })
        
        res.json({ writeResult});
    })
})