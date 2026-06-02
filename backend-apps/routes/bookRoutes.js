const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { verifyToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

// console.log('Book Controller Methods:', Object.keys(bookController));


// Apply verifyToken middleware to all routes
router.use(verifyToken);

// Get statistics
router.get('/statistics', bookController.getStatistics);

// Get explorer book cluster
router.get('/explorers', bookController.getExploringBooks);

// Get all books
router.get('/', bookController.getAllBooks);

// Get single book by ID
router.get('/:id', bookController.getBookById);

// Create new book
router.post('/', upload.single('coverImage'), bookController.createBook);

// Update book (full update)
router.put('/:id', upload.single('coverImage'), bookController.updateBook);

// Patch book (partial update)
router.patch('/:id', upload.single('coverImage'), bookController.patchBook);

// Delete book
router.delete('/:id', bookController.deleteBook);


module.exports = router;