let divElements = document.getElementById("divElements");

function message(){
    /* Checks the text displayed when there are no notes */

    const message = document.getElementById("message");
    message.innerText = divElements.children.length <= 0 ? "Add a new note" : "";
}

function createText(){
    /* Gets from the storage all the texts and creates notes for each one*/

    note_list = getFromStorage();
    note_list.forEach(note => createNote(note.title, note.text, note.id, note.priority, note.size));
}

function actionNote(btn, button, id){
    /* It handles the actions performed on the notes */

    const note = button.closest(".note");
    const title = note.querySelector(".title").textContent;
    const text = note.querySelector(".text").textContent;
    let options = [["low", "med", "high"], ["normal", "medium", "large"]]
    let priority = getClass(options[0], note);
    let size = getClass(options[1], note);
    deteleNote(note, id);
    if(btn != "del"){
        saveInStorage(title, text, options[0].includes(btn) ? btn : priority, options[1].includes(button.value) ? button.value : size);
        location.reload();
    }
}

function getClass(listClass, note){
    /* It checks if a note has any of the class passed as an argument. */

    let cls
    for(let i = 0; i < listClass.length; i++){
        if(note.classList.contains(listClass[i])){
            cls = listClass[i]
        }
    }
    return cls
}

function createNote(title, text, id, priority="low", size="normal", display="none"){
    /* Creates a note */

    divElements.innerHTML += `
    <div class="note ${priority} ${size}">
        <div class="buttonContainer">
            <div class="divPriorities">
                ${["low", "med", "high"].map(pr => `<button class="priorities ${pr}" onclick="actionNote('${pr}', this, '${id}')" value="${id}"></button>`).join('')}
            </div>
            <select name="size" id="divSizes" onchange="actionNote('size', this, '${id}')">
                ${["Normal", "Medium", "Large"].map(si => `<option value="${si.toLowerCase()}" ${size === `${si.toLowerCase()}` ? 'selected' : ''}>${si}</option>`).join('')}
            </select>
            <button class="del" onclick="actionNote('del', this, '${id}')">✖</button>
        </div>
        <div class="divTitle placeholder-container" oninput="checkPlaceholder(this)">
            <p class="placeholder">Title</p>
            <h4 id="title" class="title text-box" contenteditable>${title}</h4>
        </div>
        <div class="divText placeholder-container" oninput="checkPlaceholder(this)">
            <p class="placeholder">New note</p>
            <p class="text text-box" contenteditable>${text}</p>
        </div>
        <button class="save" onclick="actionNote('save', this, '${id}')" style="display: ${display}">Save</button>
    </div>`;
    message();
    saveChange();
}

function saveChange(){
    /* Changes the visibility of the save button if the user changes the content of a note */

    document.querySelectorAll(".note").forEach(note => {
        let saveBtn = note.querySelector(".save");
        note.querySelectorAll(".text-box").forEach(box => {
            box.addEventListener("input", () => saveBtn.style.display = "block");
        });
    });
}

function saveInStorage(title, text, priority, size){
    /* Saves in the localstorage the title, text, priority and size of a note*/

    let id = `note${localStorage.length}${Date.now()}`;
    let note = { id, title, text, priority, size }
    localStorage.setItem(id, JSON.stringify(note));
}

function deteleNote(note, id){
    /* Deletes a note and remove the text from the local storage */

    note.remove();
    localStorage.removeItem(id)
    message();
}

function getFromStorage(){
    /* Gets from storage all the notes */

    let items = []
    for(var i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        items.push(JSON.parse(localStorage.getItem(key)));
    }
    return items
}

function checkPlaceholder(div){
    /* Changes the visibility of the placeholders of the notes if the field contains text */
    
    const placeholder = div.querySelector(".placeholder");
    const textBox = div.querySelector(".text-box");
    placeholder.style.display = textBox.textContent.trim() ? "none" : "block";
}

document.addEventListener("DOMContentLoaded", () => {
    const divs = document.querySelectorAll(".placeholder-container");
    divs.forEach(div => checkPlaceholder(div));
});

createText();