'use strict';

// Global State
const apiOrigin = "http://localhost:3000"
// let selectedCategoryId = undefined
let selectedCategoryId = 1

// TODO - if category is not undefinded, redirect to /
// TODO - reset sites when rendering
function drawSites(data) {
    // console.log("data from sites", data)
    const parent = document.getElementsByTagName('tbody')[0]

    // reset elements
    parent.innerHTML = null;

    // CREATE ROWS
    data.forEach((site, index) => {
        const row = document.createElement('tr')
        const date = new Date(site.createdAt)
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });

        const rowHTML = `
            <tr id="${site.id}">
                <th>${index + 1}</th>
                <td>${site.url}</td>
                <td>${site.user}</td>
                <td>${formattedDate}</td>
            </tr>
        `;

        row.insertAdjacentHTML('beforeend', rowHTML);

        // ACTION CELL
        const actionsCell = document.createElement('td');

        // Button to open website
        const openButton = document.createElement('button');
        openButton.type = "button";
        openButton.className = "btn";

        const iElementOpen = document.createElement('i');
        iElementOpen.className = 'bi bi-file-earmark-code';
        iElementOpen.onclick = () => window.location.href = site.url;
        openButton.appendChild(iElementOpen);

        // Delete button
        const trashButton = document.createElement('button');
        trashButton.type = "button";
        trashButton.className = "btn";

        const iElementTrash = document.createElement('i');
        iElementTrash.className = 'bi bi-trash-fill';
        iElementTrash.onclick = () => {
            fetch(`${apiOrigin}/sites/${site.id}`,
                {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                }
            )
                .then(resp => {
                    if (resp.ok) {
                        console.log("borrado correctamente");
                    } else {
                        console.error('error al procesar peticion');
                        throw new Error('Error al procesar petición');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error:', error);
                })
                .finally(() => {
                    getSitesFromCategory();
                });
        }
        trashButton.appendChild(iElementTrash);

        // Edit button
        const editButton = document.createElement('button');
        editButton.type = "button";
        editButton.className = "btn";

        editButton.onclick = () => window.location.href = `newsite.html#${selectedCategoryId}-${site.id}`;

        const iElementEdit = document.createElement('i');
        iElementEdit.className = 'bi bi-pencil-square';
        iElementEdit.onclick = () => console.log(`edit from ${site.id}`);
        editButton.appendChild(iElementEdit);

        actionsCell.appendChild(openButton);
        actionsCell.appendChild(trashButton);
        actionsCell.appendChild(editButton);

        row.appendChild(actionsCell);

        parent.appendChild(row);
    })
}

const addCategoryBtn = document.getElementById('addCatBtn');
addCategoryBtn.onclick = () => {
    const categoryName = document.getElementById('categoryName').value;

    // TODO - check if categoryName already exists
    // console.log("category name", categoryName)
    if (!categoryName || categoryName.length > 14) {
        alert('Category name not valid');
        return
    }

    fetch(`${apiOrigin}/categories`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "name": categoryName })
        })
        .then(res => {
            console.log("RES", res)
            if (res.ok) {
                return res.json()
            } else {
                console.log('new category could not be created');
                // throw new Error('new category could not be created');
                console.log(res.json());
            }
        })
        .then(data => {
            console.log("new category", data)
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error when creating new category');
        })
        .finally(() => {
            getAllCategories();
        });
};

function drawCategories(data) {
    // console.log("data from categories", data)
    // console.log("selected category", window.location.pathname.split("/")[1])

    const addSiteButton = document.getElementById('addSiteButton');
    addSiteButton.href = `newsite.html#${selectedCategoryId}`

    const parent = document.getElementsByTagName('ul')[0]
    parent.innerHTML = null; // reset elements

    data.forEach(category => {
        const child = document.createElement('a')
        const listElement = document.createElement('li')

        listElement.className = `nav-item`;

        // TODO - if category name is null, ignore
        child.innerText = category.name?.charAt(0)?.toUpperCase() + category.name?.slice(1);

        child.className = `nav-link ${category.id === selectedCategoryId ? "active" : ""}`;
        // child.id = category.id
        child.onclick = () => {
            selectedCategoryId = category.id
            window.history.pushState({}, "", `/${selectedCategoryId}`);

            getAllCategories();
            getSitesFromCategory();

        }
        // child.onclick = () => { window.location.pathname = `/${category.name}` }

        listElement.appendChild(child)
        parent.appendChild(listElement)
    })
}

// TODO - hacer que si ninguna está seleccionada no se pida ninguna
function getSitesFromCategory() {
    fetch(`${apiOrigin}/categories/${selectedCategoryId ?? 1}`,
        {
            headers: { 'Content-Type': 'application/json' },
        }
    )
        .then(res => res.json())
        .then(data => drawSites(data))
        .catch(error => {
            console.error('Error:', error);
            alert('alert when calling sites from category');
            drawSites([])
        });
    // TODO - el finally aqui
}

function getAllCategories() {
    fetch(`${apiOrigin}/categories`,
        {
            headers: { 'Content-Type': 'application/json' },
        }
    )
        .then(res => res.json())
        .then(data => drawCategories(data))
        .catch(error => {
            console.error('Error:', error);
            alert('alert when calling categories');
        });
    // TODO - el finally aqui
}

window.onload = function () {
    getSitesFromCategory();
    getAllCategories();
}

const apiCaller = {
    host: "http://localhost:3000",

    get: async function (uri, obj = {}) {

        // Creates query : String
        const query =
            Object.keys(obj)
                .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
                .join('&');

        const url = this.host + uri + "?" + query;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.json();
    },

    post: async function (uri, obj = {}, method = "POST") {
        const url = this.host + uri;
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        });

        return response.json();
    },

    put: async function (uri, obj = {}) {
        return this.post(uri, obj, "PUT");
    },

    del: async function (uri, obj = {}) {
        return this.post(uri, obj, "DELETE");
    },
};
