import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Book from '../models/Book.js';

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    await Book.deleteMany({});
});

describe('Book Model Test', () => {
    const validBook = {
        title: 'Test Book',
        author: 'Test Author',
        isbn: '1234567890',
        description: 'Test Description',
        price: 29.99,
        quantity: 10
    };

    test('should create & save book successfully', async () => {
        const savedBook = await Book.create(validBook);
        expect(savedBook._id).toBeDefined();
        expect(savedBook.title).toBe(validBook.title);
        expect(savedBook.author).toBe(validBook.author);
        expect(savedBook.isbn).toBe(validBook.isbn);
        expect(savedBook.price).toBe(validBook.price);
        expect(savedBook.quantity).toBe(validBook.quantity);
    });

    test('should fail to save book without required fields', async () => {
        const bookWithoutRequiredField = new Book({ title: 'Test Book' });
        let err;
        
        try {
            await bookWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }
        
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    });

    test('should fail to save book with invalid price', async () => {
        const bookWithInvalidPrice = new Book({
            ...validBook,
            price: -10 // Invalid negative price
        });
        
        let err;
        try {
            await bookWithInvalidPrice.save();
        } catch (error) {
            err = error;
        }
        
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    });

    test('should fail to save book with invalid quantity', async () => {
        const bookWithInvalidQuantity = new Book({
            ...validBook,
            quantity: -5 // Invalid negative quantity
        });
        
        let err;
        try {
            await bookWithInvalidQuantity.save();
        } catch (error) {
            err = error;
        }
        
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    });

    test('should fail to save book with duplicate ISBN', async () => {
        // First save a book
        await Book.create(validBook);
        
        // Try to save another book with same ISBN
        const bookWithDuplicateISBN = new Book({
            ...validBook,
            title: 'Different Title'
        });
        
        let err;
        try {
            await bookWithDuplicateISBN.save();
        } catch (error) {
            err = error;
        }
        
        expect(err).toBeDefined();
        expect(err.code).toBe(11000); // MongoDB duplicate key error code
    });

    test('should update book successfully', async () => {
        const savedBook = await Book.create(validBook);
        const updatedTitle = 'Updated Title';
        
        savedBook.title = updatedTitle;
        await savedBook.save();
        
        const updatedBook = await Book.findById(savedBook._id);
        expect(updatedBook.title).toBe(updatedTitle);
    });

    test('should delete book successfully', async () => {
        const savedBook = await Book.create(validBook);
        await Book.findByIdAndDelete(savedBook._id);
        
        const deletedBook = await Book.findById(savedBook._id);
        expect(deletedBook).toBeNull();
    });
}); 