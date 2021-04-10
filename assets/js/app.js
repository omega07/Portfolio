const msg_value = document.querySelector(".input-text");
const sender_name = document.querySelector(".name");
const sender_email = document.querySelector("#mail");
const send = document.querySelector(".contact__button");
const thank_you = document.querySelector(".thank-you-alert-box");
const invalid_email = document.querySelector(".email-alert-box");
const invalid_msg = document.querySelector(".msg-alert-box");
const invalid_name = document.querySelector(".name-alert-box");

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


function ValidateEmail(inputText) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(inputText.value?.match(mailformat)) return true;
    return false;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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

function randomString() {
    var len = Math.random()+"";
    var str = "";
    for(var i=0;i<len.length;i++) {
        if(len[i]!='.') str+=len[i];
    }
    return str;
}

send.addEventListener('click', () => {  
    var delay = 2000;
    var email_ok = validateEmail(sender_email?.value), msg_ok = ValidateMsg(msg_value?.value), name_ok = ValidateMsg(sender_name?.value);
    if(!name_ok) {
        pop(invalid_name);
        setTimeout(() => {
            rem(invalid_name);
        }, delay);
    } else if(!email_ok) {
        pop(invalid_email);
        setTimeout(() => {
            rem(invalid_email);
        }, delay);
        sender_email.value = "";
    } else if(!msg_ok) {
        pop(invalid_msg);
        setTimeout(() => {
            rem(invalid_msg);
        }, delay);
    } else {
        var path = randomString();
        console.log(path);
        firebase.database().ref(path).set({
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

