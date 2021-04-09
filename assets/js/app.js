const msg_value = document.querySelector(".input-text");
const sender_name = document.querySelector(".name");
const sender_email = document.querySelector("#mail");
const send = document.querySelector(".contact__button");
const thank_you = document.querySelector(".thank-you-alert-box");
const invalid_email = document.querySelector(".email-alert-box");
const invalid_msg = document.querySelector(".msg-alert-box");

var firebaseConfig = {
    apiKey: "AIzaSyARrvQP8Hjrx4Wp6GtTWYQBlhrDeCtONMU",
    authDomain: "portfolio-d65ab.firebaseapp.com",
    projectId: "portfolio-d65ab",
    storageBucket: "portfolio-d65ab.appspot.com",
    messagingSenderId: "821104162156",
    appId: "1:821104162156:web:2ab05a31bd49cdfe976f49",
    measurementId: "G-MMNPPH016G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


function ValidateEmail(mail) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  {
    return (true)
  }
    return (false)
}

function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}
var getOpacity = function(el) {
  return el.style.opacity;
}

function pop(ele) {
    ele.style.display = "flex";
}

function rem(ele) {
    ele.style.display = "none";
}

function ValidateMsg(msg) {
    if(msg.length) return true;
    return false;
}

send.addEventListener('click', () => {  
    var delay = 2000;
    var email_ok = ValidateEmail(sender_email?.value), msg_ok = ValidateMsg(msg_value?.value);
    if(!email_ok) {
        pop(invalid_email);
        setTimeout(() => {
            rem(invalid_email);
        }, delay);
    } else if(!msg_ok) {
        pop(invalid_msg);
        setTimeout(() => {
            rem(invalid_msg);
        }, delay);
    } else {
        firebase.database().ref("User").set({
            name: sender_name?.value,
            email: sender_email?.value, 
            message: msg_value?.value
        });
        pop(thank_you);
        setTimeout(() => {
            rem(thank_you);
        }, delay);
        sender_name.value = "";
        sender_email.value = "";
        msg_value.value = "";
    }
});

