import axios from 'axios';

const API_URL = 'http://localhost:5000/api/books';

// Get all books
export const getAllBooks = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Get a single book
export const getBook = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Create a new book
export const createBook = async (bookData) => {
    try {
        const response = await axios.post(API_URL, bookData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Update a book
export const updateBook = async (id, bookData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, bookData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Delete a book
export const deleteBook = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}; 