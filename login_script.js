var myFirebaseRef = new Firebase("https://sweltering-torch-8619.firebaseio.com/");

/*
Get user credentials and authenticate user. Or unauthenticate user if logout.
If authenticate successful, store user id in localStorage to be used for logging transactions.
*/

$(document).ready(function() {
  $('#login').click(function(event){
    var emailValue = $('#email').val();
    var passwordValue = $('#password').val();

    myFirebaseRef.authWithPassword({
      email    : emailValue,
      password : passwordValue
    }, authHandler);
  });

  $('#logout').click(function(event){
    myFirebaseRef.unauth(authHandler);
    chrome.storage.sync.clear();
  });
});

function authHandler(error, authData) {
  if (error) {
    alert(error);
  }
  else if(authData == null){
    alert("Logged out.");
  }
  else {
    chrome.storage.sync.set({'uid': authData.uid});
    location.reload();
    alert("Logged in.");
  }
}
