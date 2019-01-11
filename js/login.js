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

$(document).ready(function(){
  $("#loginbtn").click(login);
});

function login(){
  $("#msg").html("").attr("hidden","true");
  var email = $("#loginid").val();
  var password = $("#loginpw").val();

  firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
    var user = firebase.auth().currentUser;
    console.log(user.displayName + " logged in");
    location.href = "home.html";
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    $("#msg").removeAttr("hidden").append(errorMessage+"<br>");
  });
  
}