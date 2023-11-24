'use strict';

let drawCategories = (data) => {
    console.log("data from categories", data)
    data.forEach(category => {
        let parent = document.getElementsByTagName('nav')[0]
        let child = document.createElement('a')
        // child.innerText = JSON.stringify(category)
        child.innerText = category.name
        child.className = "nav-link"
        child.href = "#myCategory"
        child.id = category.id
        parent.appendChild(child)
    })
}

let drawSites = (data) => {
    console.log("data from sites", data)
    const parent = document.getElementsByTagName('tbody')[0]
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

        // Button to open
        const openButton = document.createElement('button');
        openButton.type = "button";
        openButton.className = "btn";

        const iElementOpen = document.createElement('i');
        iElementOpen.className = 'bi bi-file-earmark-code';
        iElementOpen.onclick = () => console.log("hola desde boton open");
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

        const iElementEdit = document.createElement('i');
        iElementEdit.className = 'bi bi-pencil-square';
        iElementEdit.onclick = () => console.log("hola desde boton edit");
        editButton.appendChild(iElementEdit);

        actionsCell.appendChild(openButton);
        actionsCell.appendChild(trashButton);
        actionsCell.appendChild(editButton);

        row.appendChild(actionsCell);

        parent.appendChild(row);
    })
}

const apiOrigin = "http://localhost:3000"
const categoryId = "1"

fetch(`${apiOrigin}/categories/${categoryId}`)
    .then(res => res.json())
    .then(data => drawSites(data))

fetch("http://localhost:3000/categories")
    .then(res => res.json())
    .then(data => drawCategories(data))
