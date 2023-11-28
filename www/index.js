'use strict';

// Global State
const apiOrigin = "http://localhost:3000"
// let selectedCategoryId = undefined
let selectedCategoryId = 1

// TODO - if category is not undefinded, redirect to /

// TODO - reset sites when rendering
function drawSites(data) {
    console.log("data from sites", data)
    const parent = document.getElementsByTagName('tbody')[0]

    // reset elements
    parent.innerHTML = null;

    data.forEach((site, index) => {
        const row = document.createElement('tr')
        row.id = site.id

        // ORDER CELL
        const orderCell = document.createElement('th')
        orderCell.innerText = index + 1
        row.appendChild(orderCell)

        // SITENAME CELL
        const siteNameCell = document.createElement('td')
        siteNameCell.innerText = site.url
        row.appendChild(siteNameCell)

        // USERNAME CELL
        const userNameCell = document.createElement('td')
        userNameCell.innerText = site.user
        row.appendChild(userNameCell)

        // DATE CELL
        const creationDateCell = document.createElement('td')
        const date = new Date(site.createdAt)
        const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });
        creationDateCell.innerText = formattedDate
        row.appendChild(creationDateCell)

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

        // Trash button
        const trashButton = document.createElement('button');
        trashButton.type = "button";
        trashButton.className = "btn";

        const iElementTrash = document.createElement('i');
        iElementTrash.className = 'bi bi-trash-fill';
        iElementTrash.onclick = () => console.log("hola desde boton trash");
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

// TODO - reset categories when rendering
function drawCategories(data) {
    console.log("data from categories", data)
    console.log("selected category", window.location.pathname.split("/")[1])

    const addSiteButton = document.getElementById('addSiteButton');
    addSiteButton.href = `newsite.html#${selectedCategoryId}`

    const parent = document.getElementsByTagName('ul')[0]
    // reset elements
    parent.innerHTML = null;

    data.forEach(category => {
        const child = document.createElement('a')
        const listElement = document.createElement('li')

        console.log("selectedCategoryId", selectedCategoryId)
        console.log("nav-item id", category.id)

        listElement.className = `nav-item`;

        child.innerText = category.name.charAt(0).toUpperCase() + category.name.slice(1);
        child.className = `nav-link ${category.id === selectedCategoryId ? "active" : ""}`;
        child.id = category.id
        child.onclick = () => {
            selectedCategoryId = category.id
            console.log("CHANGEING selectedCategoryId", selectedCategoryId)

            window.history.pushState({}, "", `/${selectedCategoryId}`);

            fetch(`${apiOrigin}/categories/${selectedCategoryId}`)
                .then(res => res.json())
                .then(data => drawSites(data))

            fetch(`${apiOrigin}/categories`)
                .then(res => res.json())
                .then(data => drawCategories(data))
        }
        // child.onclick = () => { window.location.pathname = `/${category.name}` }

        listElement.appendChild(child)
        parent.appendChild(listElement)
    })
}

// TODO - hacer que si ninguna está seleccionada no se pida ninguna
// TODO - catch errors
fetch(`${apiOrigin}/categories/${selectedCategoryId ?? 1}`)
    .then(res => res.json())
    .then(data => drawSites(data))

fetch(`${apiOrigin}/categories`)
    .then(res => res.json())
    .then(data => drawCategories(data))
