import { useState } from "react"
import { Book } from '../types/Book'
import { addBook } from "../api/BooksAPI";


interface NewBookFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const NewBookForm = ({onSuccess, onCancel}: NewBookFormProps) => {
    const [formData, setFormData] = useState<Book>({
        bookId: 0,
        title: '',
        author: '',
        publisher: '',
        isbn: '',
        classification: '',
        category: '',
        pageCount: 2,
        price: ''
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
};

const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    await addBook(formData);
    onSuccess();
}

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Book</h2>
            <label>Book Title:<input type='text' name='title' value={formData.title} onChange={handleChange}/></label>
            <label>Book Author:<input type='text' name='author' value={formData.author} onChange={handleChange}/></label>
            <label>Book Publisher:<input type='text' name='publisher' value={formData.publisher} onChange={handleChange}/></label>
            <label>Book ISBN:<input type='text' name='isbn' value={formData.isbn} onChange={handleChange}/></label>
            <label>Book Classification:<input type='text' name='classification' value={formData.classification} onChange={handleChange}/></label>
            <label>Book Category:<input type='text' name='category' value={formData.category} onChange={handleChange}/></label>
            <label>Book Page Count:<input type='text' name='pageCount' value={formData.pageCount} onChange={handleChange}/></label>
            <label>Book Price:<input type='number' name='price' value={formData.price} onChange={handleChange}/></label>
            <button type="submit">Add Book</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    )
};

export default NewBookForm;