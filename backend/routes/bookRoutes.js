import express from 'express';
import {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
} from '../controllers/bookController.js';

const router = express.Router();

// Create a new book
router.post('/', createBook);

// Get all books
router.get('/', getAllBooks);

// Get single book by ID
router.get('/:id', getBookById);

// Update book
router.put('/:id', updateBook);

// Delete book
router.delete('/:id', deleteBook);

export default router; 