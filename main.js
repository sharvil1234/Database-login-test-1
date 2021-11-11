// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxtIB825ySm5QuSNE_nvQTWm99X302V4Q",
    authDomain: "fir-javascript-ba4ca.firebaseapp.com",
    databaseURL: "https://fir-javascript-ba4ca-default-rtdb.firebaseio.com",
    projectId: "fir-javascript-ba4ca",
    storageBucket: "fir-javascript-ba4ca.appspot.com",
    messagingSenderId: "187745831998",
    appId: "1:187745831998:web:af3225ead4cce36e8b156f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
    getDatabase,
    ref,
    get,
    set,
    child,
    update,
    remove
}
from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

//--------------------------------------------------------------------------------------------//

const db = getDatabase();

var username = document.getElementById("username");
var password = document.getElementById("password");

var btn_login = document.getElementById("login");
var btn_signup = document.getElementById("signup");
var btn_delete = document.getElementById("delete");

var pa;

function login() {
    const dbref = ref(db);
    var un = username.value;
    var ps = password.value;

    get(child(dbref, un + "/" + "details")).then((snapshot) => {
        if (snapshot.exists()) {
            pa = snapshot.val().pass;
            if (ps == pa) {
                alert("Login Successful")
            } else {
                alert("Password Incorrect!")
            }
        } else {
            alert("USER NOT FOUND!");
        }
    }).catch((error) => {
        alert("unsuccessful, error " + error);
    })
}

function signup() {
    var un = username.value;
    var ps = password.value;

    set(ref(db, un + "/" + "details"), {
            pass: ps
        })
        .then(() => {
            alert("ACCOUNT CREATED SUCCESSFULLY");
        })
        .catch((error) => {
            alert("unsuccesssful, error " + error);
        });
}

function deleteuser() {
    const dbref = ref(db);
    var un = username.value;
    var ps = password.value;

    get(child(dbref, un + "/" + "details")).then((snapshot) => {
        if (snapshot.exists()) {
            pa = snapshot.val().pass;
            if (ps == pa) {
                remove(ref(db, un))
                    .then(() => {
                        alert("USER DELETED SUCCESSFULY");
                    })
                    .catch((error) => {
                        alert("unsuccesssful, error " + error);
                    });
            } else {
                alert("Password Incorrect!")
            }
        } else {
            alert("USER NOT FOUND!");
        }
    }).catch((error) => {
        alert("unsuccessful, error " + error);
    })

}

btn_login.addEventListener('click', login);
btn_signup.addEventListener('click', signup);
btn_delete.addEventListener('click', deleteuser);