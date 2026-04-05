import express from 'express';
import { celebrate, Segments } from 'celebrate';
import * as notesController from '../controllers/notesController.js';
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
  objectIdSchema,
} from '../validations/notesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();


router.use(authenticate);


router.get('/notes', celebrate({ [Segments.QUERY]: getAllNotesSchema }), notesController.getAllNotes);


router.get('/notes/:noteId', celebrate({ [Segments.PARAMS]: noteIdSchema }), notesController.getNoteById);


router.post('/notes', celebrate({ [Segments.BODY]: createNoteSchema }), notesController.createNote);


router.patch('/notes/:noteId', celebrate({ 
  [Segments.PARAMS]: objectIdSchema, 
  [Segments.BODY]: updateNoteSchema 
}), notesController.updateNote);


router.delete('/notes/:noteId', celebrate({ [Segments.PARAMS]: objectIdSchema }), notesController.deleteNote);

export default router;
