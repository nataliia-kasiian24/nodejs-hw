import express from 'express';
import { celebrate, Segments } from 'celebrate';
import * as notesController from '../controllers/notesController.js';
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.use(authenticate);

router.get(
  '/notes',
  celebrate({ [Segments.QUERY]: getAllNotesSchema }),
  notesController.getAllNotes,
);

router.get(
  '/notes/:noteId',
  celebrate({ [Segments.PARAMS]: noteIdSchema }),
  notesController.getNoteById,
);

router.post(
  '/notes',
  celebrate({ [Segments.BODY]: createNoteSchema }),
  notesController.createNote,
);

router.patch(
  '/notes/:noteId',
  celebrate({
    [Segments.PARAMS]: noteIdSchema,
    [Segments.BODY]: updateNoteSchema,
  }),
  notesController.updateNote,
);

router.delete(
  '/notes/:noteId',
  celebrate({ [Segments.PARAMS]: noteIdSchema }),
  notesController.deleteNote,
);

export default router;
