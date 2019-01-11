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
  $("#signupbtn").click(signup);
  $("#signupid").change(function(){$("#signupid").attr("class","normal");});
  $("#username").change(function(){$("#username").attr("class","normal");});
  $("#signuppw").change(function(){$("#signuppw").attr("class","normal");$("#signuppw2").attr("class","normal");});
  $("#signuppw2").change(function(){$("#signuppw").attr("class","normal");$("#signuppw2").attr("class","normal");});  
});

function signup() {
  $("#msg").html("").attr("hidden","true");
  var valid = true;
  var email = $("#signupid").val();
  var username = $("#username").val();
  var password = $("#signuppw").val();

  database.ref("users/"+username).on("value",function(snapshot){
    if(snapshot.exists()){
      $("#username").addClass("wronginput");
      $("#msg").removeAttr("hidden").append("Username has been taken <br>");
      valid = false;
    } 
  });

  if($("#signuppw").val() != $("#signuppw2").val()){
    valid = false;
    $("#signuppw").addClass("wronginput");
    $("#signuppw2").addClass("wronginput");
    $("#msg").removeAttr("hidden").append("Passwords do not match <br>");
  }

  if(valid){
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
      var user = firebase.auth().currentUser;
      if(user != null){
        database.ref("users").child(username).set(email);
        user.updateProfile({displayName:username}).then(function(){
          console.log("Created User " + user.displayName);
          location.href = "home.html";
        });
      }
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      $("#msg").removeAttr("hidden").append(errorMessage+"<br>");
    });    
  }
}