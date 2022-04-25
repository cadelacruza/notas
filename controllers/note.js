const {createNote, getNoteById, getUserNotes, getNotesBySearch, updateNote ,deleteNote} = require('../models/note');

module.exports.getNotes = async (req,res) => {
    const user = req.session.user;
    const userId = Number(user.id);

    const {search} = req.query;

    if(search){
        console.log('search trigger this', search);
        const searchResults = await getNotesBySearch(search, userId);
        console.log('results', searchResults)
        res.render('index', {user:user, notes:searchResults, search:true});
    }else{
        const userNotes = await getUserNotes(userId);
        
        res.render('index', {user:user, notes:userNotes, search:false});
    } 
}

module.exports.createNote= async (req,res) => {
    const author = req.session.user['id'];
    const {title, body} = req.body;
    
    const newNote = await createNote(title, body, author); 

    res.redirect(`/notes`);
}

module.exports.getSingleNote = async (req,res) => {
    console.log('get single note ran')
    const {id} = req.params;
    const numberId = Number(id);
    const {id: userId} = req.session.user;
    console.log(numberId)
    const note = await getNoteById(numberId);
    console.log( note)
    if(note == null) res.redirect('/notes'); //Send flash message not found

    if(note.author == userId){
        res.render('singleNote', {note:note});
    }else{
        res.redirect('/notes');
    }

    

    
}

module.exports.getNotesNew = (req,res) => {
    console.log('note new rand')
    res.render('newNote');
}


module.exports.updateNote = async (req,res) => {
    const {id, title, body} = req.body; 
    const {id: userId} = req.session.user;
    const numberId = Number(id);
    const updatedNote = await updateNote(numberId, title, body,userId); 

    if(updatedNote === "Not authorized" || updatedNote === "Not found"){
        res.send('Something went wrong');
    }

    res.redirect('/notes')
}

module.exports.deleteNote = async (req,res) => {
    const {id} = req.body;
    const {id: userId} = req.session.user;

    console.log('note id from body', id);

    const numberId = Number(id);
    const savedNote = await getNoteById(numberId);

    console.log(savedNote)

    if(!savedNote) res.send("Could not find note");

    if(savedNote.author != userId) res.send('no autorizado');
    
    const response = await deleteNote(numberId);

    res.json(response);
}