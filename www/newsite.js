'use strict';

// GLOBAL STATE
const apiOrigin = "http://localhost:3000";
const urlHashInfo = window.location.hash.replace("#", "").split("-");
const selectedCategoryId = urlHashInfo[0];
const selectedSiteId = urlHashInfo[1];

// SELECTORS
const pageTitle = document.getElementById('pageTitle');

const urlField = document.getElementById('url');
const nameField = document.getElementById('name');
const userField = document.getElementById('username');
const passwordField = document.getElementById('password');
const descriptionField = document.getElementById('description');

const autogenPwdBtn = document.getElementById('autogenPwd');
const upsertBtn = document.getElementById('upsertBtn');

autogenPwdBtn.onclick = () => {
    passwordField.value = generateSafePassword();
}

upsertBtn.onclick = () => {
    upsertSite();
}

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
    // password = password.split('').sort(() => 0.5 - Math.random()).join('');

    console.log(generateSafePassword());
    return password;
}

if (selectedSiteId) {
    fetch(`${apiOrigin}/sites/${selectedSiteId}`)
        .then(res => res.json())
        .then(data => {
            console.log("url", data.url);
            urlField.value = data.url;
            nameField.value = data.name;
            userField.value = data.user;
            passwordField.value = data.password;
            descriptionField.value = data.description;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error:', error);
        });
}

function upsertSite() {
    fetch(`${apiOrigin}/sites/${selectedSiteId ?? ""}`,
        {
            method: `${selectedSiteId ? "PUT" : "POST"}`,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: nameField.value,
                url: urlField.value,
                user: userField.value,
                password: passwordField.value,
                description: descriptionField.value
            })
        }
    )
        .then(res => {
            if (!res.ok) {
                alert(`error when ${selectedSiteId ? "modifying" : "creating"} site`);
            }
            window.location.href = "/";
        })
        .catch(error => {
            console.error('Error:', error);
            alert();
        });
}

window.onload = function () {
    pageTitle.innerText = selectedSiteId ? "Modify Site" : "New Site";
}