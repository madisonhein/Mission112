
import { Book } from '../types/Book'

interface fetchBooksResponse {
    books: Book[];
    totalNumBooks: number,
}

const API_URL = 'https://mission12-madison-backend.azurewebsites.net/api/Book/AllBooks';

export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[]
): Promise<fetchBooksResponse> => {
    try{
        const categoryParams = selectedCategories
        .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
        .join('&');

            const response = await fetch(`${API_URL}/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`);

if (!response.ok) {
    throw new Error('Failed to fetch projects');
}

            return await response.json();
    }  catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};


export const addBook = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/AddBook`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newBook)
        });

        if (!response.ok) {
            throw new Error('Failed to add project');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding project', error);
        throw error;
    }
};


export const updateBook = async (bookId: number, updatedBook: Book) : Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/UpdateBook/${bookId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(updatedBook)
        });

        return await response.json();
    } catch (error) {
        console.error('Error updating project:', error);
        throw error;
    }
};


export const deleteBook = async (bookId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/DeleteBook/${bookId}`, 
            {
                method: 'DELETE'
            }
        );

        if (!response.ok) {
            throw new Error('Failed to delete project');
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        throw error;
    }
}