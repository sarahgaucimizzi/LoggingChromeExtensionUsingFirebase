var myFirebaseRef = new Firebase("https://sweltering-torch-8619.firebaseio.com/android/chrome_transactions/");

// Get user id from localStorage
var uid = localStorage.getItem('uid');
var transactionRef = 'uid';

chrome.storage.sync.get('uid', function(items) {
  transactionRef = myFirebaseRef.child(items.uid);
});

var lastEvent;
var lastURL;

/*
For each type of interaction on the DOM, log transaction on Firebase.
Each transaction has the timestamp, url, type of interaction and on which element in the DOM.
If the last interaction is of type scroll, reduce redundancy and log once.
*/

$(document).click(function(event){
  lastEvent = "click";
  lastURL = document.URL;
  var newTransactionRef = transactionRef.push();
  var timestampNow = new Date;
  var timestampString = timestampNow.toString();
  var url = document.URL;
  var eventElement = event.target.nodeName;
  newTransactionRef.set({
    page: url,
    timestamp: timestampString,
    interaction: "click",
    element: eventElement
  });
});

$(document).keypress(function(event){
  lastEvent = "keypress";
  lastURL = document.URL;
  var newTransactionRef = transactionRef.push();
  var timestampNow = new Date;
  var timestampString = timestampNow.toString();
  var url = document.URL;
  var eventElement = event.target.nodeName;
  newTransactionRef.set({
    page: url,
    timestamp: timestampString,
    interaction: "keypress",
    element: eventElement
  });
});

$(document).scroll(function(event){
  if((lastEvent != "scroll") || (lastURL != document.URL)){
    lastEvent = "scroll";
    lastURL = document.URL;
    var newTransactionRef = transactionRef.push();
    var timestampNow = new Date;
    var timestampString = timestampNow.toString();
    var url = document.URL;
    var eventElement = event.target.nodeName;
    newTransactionRef.set({
      page: url,
      timestamp: timestampString,
      interaction: "scroll",
      element: eventElement
    });
  }
});

$(document).submit(function(event){
  lastEvent = "submit";
  lastURL = document.URL;
  var newTransactionRef = transactionRef.push();
  var timestampNow = new Date;
  var timestampString = timestampNow.toString();
  var url = document.URL;
  var eventElement = event.target.nodeName;
  newTransactionRef.set({
    page: url,
    timestamp: timestampString,
    interaction: "submit",
    element: eventElement
  });
});
