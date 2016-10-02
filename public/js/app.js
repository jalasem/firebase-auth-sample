// Initialize Firebase
var config = {
  apiKey: "AIzaSyD72wUKg6-iGuy40Z3qwY1tki9s_WpgjO0",
  authDomain: "bolbole-3a52b.firebaseapp.com",
  databaseURL: "https://bolbole-3a52b.firebaseio.com",
  storageBucket: "bolbole-3a52b.appspot.com",
  messagingSenderId: "70693161850"
};
firebase.initializeApp(config);
var auth = firebase.auth();
var database = firebase.database();
var storage = firebase.storage();
var tries = 0;

function signup() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  if (email.length < 5) {
    alert("Enter a valid email!");
    return;
  }
  if (password.length < 4) {
    alert("this password is too weak!");
    return;
  }
  auth.createUserWithEmailAndPassword(email, password).then(function () {
    alert("registration successful!");
  }).catch(function (error) {
    tries += 1;
    if (tries < 4) {
      signup();
    } else {
      alert("Oops! there was an error!!! take a look at this: \n " + error.message);
    }
  });
}

function login() {
  var email = document.getElementById('login_email').value;
  var password = document.getElementById('login_password').value;

  if (email.length < 5) {
    alert("Enter a valid email!");
    return;
  }
  if (password.length < 4) {
    alert("this password is too weak!");
    return;
  }

  auth.signInWithEmailAndPassword(email,password).then(function(){
    alert("sucessful login");
  }, function(error){
    alert('ther was an error logging you in \n Reason: ' + error.message);
  });
  return false;
}

function logout(){
  auth.signOut().then(function(){
    alert("its not bye bye but see you again!!!");
  }, function(error){
    alert("It's like we have an unfinished bussiness \n" + error.message);
  });
}

function reset_pass(){
  var email = document.getElementById('login_email').value;

  auth.sendPasswordResetEmail(email).then(function(){
    alert("password reset sent");
  }, function(error){
    alert("password reset failed! \n" + error.message);
  });
}

auth.onAuthStateChanged(function(user){
  if(user) {
    // window.location.href = "https://bolbole-3a52b.firebaseapp.com/#";
    document.getElementById('body').classList.remove('inactive');
    document.getElementById('auth_splash').classList.add('hide');
  } else {
    // window.location.href = "https://bolbole-3a52b.firebaseapp.com/#/user_auth";
    document.getElementById('body').classList.add('inactive');
    document.getElementById('auth_splash').classList.remove('hide');
  }
});