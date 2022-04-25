const noteRouter = require('express').Router();
const note = require('../controllers/note');
const {loginRequired} = require('../middleware/authorization');

noteRouter.use(loginRequired);
noteRouter.get('/', note.getNotes); 
noteRouter.post('/', note.createNote);
noteRouter.post('/:id', note.updateNote);
noteRouter.delete('/:id', note.deleteNote)


module.exports = noteRouter; 