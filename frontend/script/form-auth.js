import { fetchData, reloadPage } from "./functions.js";
import { customAlert } from "./alert.js"; // if you don't add .js it wil catch a syntax error   


// DOM elements
const signUpForm = document.querySelector("#signup");
const signInForm = document.querySelector("#signin");
const apiURL = "http://localhost:3000/"


signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const signUpBtn = document.querySelector("#signup button");
    const usernameSignUp = document.querySelector("#signup input[name='username']");
    const emailSignUp = document.querySelector("#signup input[name='email']");
    const pwSignup = document.querySelector("#signup input[name='password']");

    signUpBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';

    const res = await fetchData(apiURL + "signUp", "post", {
        username: usernameSignUp.value,
        email: emailSignUp.value,
        password: pwSignup.value,
    });

    signUpBtn.innerHTML = "Sign Up";

    if (res.status === 500 || res.status === 204 || res.status === 401) {
        customAlert.alert(res.message);
        return;
    } else {
        customAlert.alert(res.message, "Welcome aboard");
    }
    reloadPage();
});

signInForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const emailSignIn = document.querySelector("#signin input[name='email']");
    const pwSignIn = document.querySelector("#signin input[name='password']");
    const signInBtn = document.querySelector("#signin button");

    signInBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';

    const res = await fetchData(apiURL + "signIn", "post", {
        email: emailSignIn.value,
        password: pwSignIn.value
    });

    signInBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';
    
    if (res.status === 500 || res.status === 204 || res.status === 401) {
        customAlert.alert(res.message);
        reloadPage();
        return;
    } else {
        localStorage.setItem("login_token_key", res.token);
        location.href = "./mainpage.html";
    };

});


