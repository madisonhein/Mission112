import { useState, useEffect } from "react";
import { Book } from "../types/Book"; // Ensure you have a Book type
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

function BookList({selectedCategories}: {selectedCategories: string[]}) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Sorting order
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, selectedCategories);
            

                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks/ pageSize)); 
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, [pageSize, pageNum, selectedCategories]);

    if (loading) return <p>Loading projects...</p>
    if (error) return <p className="text-red-500">Error: {error}</p>

    // Function to handle sorting
    const handleSort = () => {
        const sortedBooks = [...books].sort((a, b) => {
            if (sortOrder === "asc") {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        });

        setBooks(sortedBooks);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    return (
        <>

            {/* Sort Button */}
            <button onClick={handleSort}>
                Sort by Title ({sortOrder === "asc" ? "A-Z" : "Z-A"})
            </button>
            <br /><br />

            {books.length === 0 ? <p>Loading books...</p> : null}

            {books.map((book) => (
                <div id="bookCard" className="card" key={book.bookId}>
                    <h3 className="card-title">{book.title}</h3>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li><strong>Title: </strong>{book.title}</li>
                            <li><strong>Author: </strong>{book.author}</li>
                            <li><strong>Publisher:</strong> {book.publisher}</li>
                            <li><strong>ISBN: </strong>{book.isbn}</li>
                            <li><strong>Classification: </strong>{book.classification}</li>
                            <li><strong>Category: </strong>{book.category}</li>
                            <li><strong>Page Count: </strong>{book.pageCount}</li>
                            <li><strong>Price: </strong>{book.price}</li>
                        </ul>

                        <button className="btn btn-success" onClick={() => navigate(`/add/${book.title}/${book.bookId}`)}
                            >Add Book</button>
                    </div>
                </div>
            ))}
                <Pagination 
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1);
                }}
            
            />
        </>
    );
}

export default BookList;
