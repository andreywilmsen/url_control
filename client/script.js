document.addEventListener('DOMContentLoaded', atualizarUrl)

function atualizarUrl() {
    let divUrl = document.getElementById('urls')
    divUrl.innerHTML = "";
    fetch("https://url-control.onrender.com/get").then(res => {
        return res.json();
    }).then(json => {
        for (url of json) {
            divUrl.insertAdjacentHTML('beforeend', `<div class="itemUrl">
            <div class="commandBox">
                <h1 class="title_url">${url.title.charAt(0).toUpperCase() + url.title.slice(1)}</h1>
                <div class="buttonsArea">
                    <button onclick="editPost(this)"class="buttonEdit" type="button">Editar</button>
                    <button onclick="deletePost(this)" class="buttonDelete" type="button">Excluir</button>
                </div>
            </div>
            <div class="descBox">
                <span>${url.description}</span>
                <div>
                    <a href="${url.url}" target="_blank" onclick="addClick(this)">Acesse aqui</a>
                </div>
            </div>
            <div class="urlArea">
                <span class="url">${url.url}</span>
                <span class="clicks">Clicks:${url.click}</span>
            </div>
            </div>`)
        }
    })
}

function postUrl() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let url = document.getElementById('url').value;

    fetch("https://url-control.onrender.com/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, url })
    }).then(res => {
        console.log(res);
        document.getElementById('title').value = "";
        document.getElementById('description').value = "";
        document.getElementById('url').value = "";
        atualizarUrl();
    }).catch(err => {
        console.log(err);
    })
}

function addClick(el) {
    const elemento = el.parentElement.parentElement.parentElement.children[0].children[0].innerText;
    let title = elemento.toLowerCase();
    console.log(title)
    fetch(`https://url-control.onrender.com/addClick/${title}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    }).then(res => {
        atualizarUrl();
        return res.json();
    }).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    })
}

function editPost(el) {
    const elemento = el.parentElement.parentElement;
    let title = (elemento.children[0].innerText).toLowerCase();
    let description = (elemento.parentElement.children[1].children[0]).innerText
    let url = (elemento.parentElement.children[2].children[0]).innerText
    document.getElementById("postButton").innerHTML = ''


    document.getElementById('title').value = title;
    document.getElementById('title').setAttribute('style', 'border: 1px solid rgb(0, 132, 255);');

    document.getElementById('description').value = description;
    document.getElementById('description').setAttribute('style', 'border: 1px solid rgb(0, 132, 255);');

    document.getElementById('url').value = url;
    document.getElementById('url').setAttribute('style', 'border: 1px solid rgb(0, 132, 255);');

    document.getElementById("postButton").innerHTML = `<button style="background-color: rgb(0, 132, 255);" id="postButton" onclick="updateValues()" type="button">Editar Postagem</button>`
}

function deletePost(el) {
    const elemento = el.parentElement.parentElement;
    let title = (elemento.children[0].innerText).toLowerCase();


    fetch(`https://url-control.onrender.com/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title })
    }).then(res => {
        atualizarUrl();
        return res.json();
    })
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
}
function updateValues() {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let url = document.getElementById('url').value;

    fetch("https://url-control.onrender.com/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, url })
    }).then(res => {
        console.log(res);
        document.getElementById('title').value = "";
        document.getElementById('description').value = "";
        document.getElementById('url').value = "";
        document.getElementById("postButton").innerHTML = `<button type="button" onclick="postUrl()">Enviar</button>`
        
        document.getElementById('title').setAttribute('style', 'border: 1px solid rgb(190, 190, 190);')
        document.getElementById('description').setAttribute('style', 'border: 1px solid rgb(190, 190, 190);');
        document.getElementById('url').setAttribute('style', 'border: 1px solid rgb(190, 190, 190);');
        atualizarUrl();
    }).catch(err => {
        console.log(err);
    })
}
