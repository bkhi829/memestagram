// Initialize Firebase
var config = {
  apiKey: "AIzaSyBt5C23Yyc5Uvppj8GIE1u0FK7PlExWI20",
  authDomain: "memetagram.firebaseapp.com",
  databaseURL: "https://memetagram.firebaseio.com",
  projectId: "memetagram",
  storageBucket: "memetagram.appspot.com",
  messagingSenderId: "174599932043"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function(){
  $("#logoutbtn").click(logout);
})

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    $("#welcome").append(user.displayName);
  } else {
    // No user is signed in.
    location.href = "login.html";
  }
});

function logout() {
  firebase.auth().signOut().then(function(){
    alert("You have signed out");
  }).catch(function(error){
    console.log(error);
  });
}