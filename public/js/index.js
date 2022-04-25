const notes = document.querySelectorAll('.nota');
const dialog = document.querySelector('#note-modal');


const createNoteBtn = document.querySelector('#btn-create');
const createNoteDialog = document.querySelector('#create-note-modal');

//Function to see modal
function openModal(e){
    const {target} = e;
    //console.log(target.tagName);
    //console.log(e.target.parentNode);
    let parent;
    if(target.tagName === "H2" || target.tagName === "P"){
        console.log('You clicked a', target.tagName);

        parent = target.parentNode;
    }else{
        console.log('You clicked a: ', target.tagName)
        parent = target;
    }

    //console.log('Parent source of truth:', parent);

    const id = parent.id;
    const title = parent.children[0].textContent;
    const body = parent.children[1].textContent;
    const dateTime = parent.children[2].textContent;

    const currentNote = {
        id,
        title,
        body,
        dateTime
    };

    dialog.innerHTML = `
    <div class="note-container-inside-modal">
    <h2>${title}</h2>
    <p>${body}</p>
    <p>Updated: ${dateTime}</p>
    <div class="btns-container">
    <button class="update-btns" id="update-btn">Update</button>
    <button class="delete-btns" id="delete-btn">Delete</button>
    </div>
    </div>
    `;

    const updateBtn = document.querySelector('#update-btn');
    updateBtn.addEventListener('click', () => showUpdateForm(dialog,currentNote));

    const deleteBtn = document.querySelector('#delete-btn');
    deleteBtn.addEventListener('click', () => handleNoteDelete(id));

    dialog.showModal();
}

function showUpdateForm(currentDialog,currentNote){
    //console.log(currentNote.id, currentNote.title)
    const {id,title,body} = currentNote;

    currentDialog.innerHTML = `
    <div class="form-in-modal-container">
    <h2>Edit note</h2>
    <form action="/notes/${id}" method="POST">
    <div>
     <label for="title" class="label-input">Title:</label>
     <input type="text" name="title" class="input-note" value="${title}">
    </div>
    <div> 
     <label for="body" class="label-input">Body:</label>
     <textarea name="body" cols="30" rows="10" class="body-input">${body}</textarea>
    </div>
    <div>
     <button class="update-btns">Update</button>
    </div>
    <input type="hidden" id="postId" name="id" value="${id}">
   </form>
</div>
    `
}

async function handleNoteDelete(noteId){
    if(window.confirm("Do you want to delete this note? This action can't be undone")){
        const res = await fetch(`https://notas.kdela.repl.co/notes/${noteId}`, {
            method: 'DELETE', 
            mode:'same-origin',
            credentials: 'same-origin',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id:noteId})
        }
        
        
        );
        const data = await res.json();
        
        location.reload();
    }
    
}

function openCreateNoteModal(e){
    console.log('you clicked the create note btn');
    createNoteDialog.showModal();
}
notes.forEach(
    (note) => {
        note.addEventListener('click', openModal);
    }
);


window.addEventListener('click', (e) => {
    if(e.target === dialog){
        dialog.close();
    }else if(e.target === createNoteDialog){
        createNoteDialog.close();
    }
});


createNoteBtn.addEventListener('click', openCreateNoteModal)
