'use strict';

// Global State
const apiOrigin = "http://localhost:3000";
const urlHashInfo = window.location.hash.replace("#", "").split("-");
const selectedCategoryId = urlHashInfo[0];
const selectedSiteId = urlHashInfo[1];

const urlField = document.getElementById('url');
const userField = document.getElementById('username');
const passwordField = document.getElementById('password');
const descriptionField = document.getElementById('description');

function generateSafePassword() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const passwordLength = 10;
    let password = '';

    // Ensure at least one number and one uppercase letter
    password += '0123456789'[Math.floor(Math.random() * 10)];
    password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];

    // Generate the rest of the password
    for (let i = 2; i < passwordLength; i++) {
        password += characters[Math.floor(Math.random() * characters.length)];
    }

    // Shuffle the password
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    console.log(generateSafePassword());
    return password;
}

if (selectedSiteId) {
    // TODO - catch errors
    fetch(`${apiOrigin}/sites/${selectedSiteId}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            console.log("url", data.url);
            urlField.value = data.url;
            urlField.value = "hola";
            userField.value = data.user;
            passwordField.value = data.password;
            descriptionField.value = data.description;
        })
}
