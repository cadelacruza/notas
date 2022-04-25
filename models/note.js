const db = require('../config/db');

const createNote = async  (title,body,author) => {
    const newNote = await db.note.create({
        data:{
            title,
            body,
            author
        }
    });

    return newNote;
}

const getNoteById = async (id) => {
    const note = await db.note.findUnique({
        where:{
            id,
        }
    }); 

    return note;
}

const getUserNotes = async (author) => {
    const notes = await db.note.findMany({
        where:{
            author
        },
        orderBy:{
            edited_at: 'desc'
        }
    });

    return notes;
}

const getNotesBySearch = async (search, author) =>{
    const searchArr = search.split(" ");
    let finalSearch = search;

    if(searchArr.length > 1){
        finalSearch = searchArr.join(' | ');
    }

    const notes = await db.note.findMany({
        where: {
            title:{
                search: finalSearch
            },
            body:{
                search: finalSearch
            },
            author
        }
    });

    return notes;
}

const updateNote = async (id, title, body, author) => {
    console.log('update note model');
    const savedNote = await db.note.findUnique({
        where:{
            id
        }
    });

    if(!savedNote) return "Not found";

    if(savedNote.author !== author) return "Not authorized";

    return await db.note.update({
        where:{
            id
        },
        data:{
            title,
            body,
            edited_at: new Date()
        }
    })
}

const deleteNote = async (id) => {
    return await db.note.delete({
        where:{
            id
        }
    });
}
 
module.exports = {createNote, getNoteById, getUserNotes,getNotesBySearch, updateNote, deleteNote}