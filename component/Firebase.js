import firebase from 'firebase';

const config={
    apiKey: "AIzaSyD5dfgWu_dsgFIqdDpTjLf07IxoliBxCas",
    authDomain: "futsal-information-syste-6cb2e.firebaseapp.com",
    databaseURL: "https://futsal-information-syste-6cb2e.firebaseio.com",
    projectId: "futsal-information-syste-6cb2e",    
    storageBucket: "futsal-information-syste-6cb2e.appspot.com",
    messagingSenderId: "1074107942380",
    appId: "1:1074107942380:web:1624a72bcc317c60"
};

firebase.initializeApp(config);

const db=firebase.firestore();
const auth=firebase.auth();

function logIn(email,password){
    var returner=0;
    var promise=auth.signInWithEmailAndPassword(email,password);
    promise.catch(error=>{
      var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);         
          }
          console.log(error);
    });
    
      
    returner = auth.currentUser; // user is undefined if no user signed in


    return returner;

}


function logOut(email,password){
  var returner=0;
  var promise=auth.signOut();
  promise.catch(error=>{
    var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(errorMessage);         
        }
        console.log(error);
  });
  returner = auth.currentUser; // user is undefined if no user signed in


  return returner;

}


function signUp(givenEmail,password,givenName,phoneNo){
    var returner=0;
    auth.createUserWithEmailAndPassword(givenEmail,password).then(function(){
        db.collection("extraUserInfo").add({
            email:givenEmail,
            name:givenName,
            phone:phoneNo
        }).then(function(){
            console.log("Sign Up Succesful")
        })
        returner=1;
    }).catch(function(error) {
        var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode === 'auth/wrong-password') {
              alert('Wrong password.');
            } else {
              alert(errorMessage);         
            }

            console.log(error);

      });
    returner = auth.currentUser; // user is undefined if no user signed in

    return returner;

}



export default db;
export {logIn,signUp,logOut};
export {auth};