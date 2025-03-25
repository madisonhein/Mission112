import { useState, useEffect } from "react";
import { Book } from "./types/Book"; // Ensure you have a Book type

function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Sorting order

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(`https://localhost:5000/api/Book/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setBooks(data.books);
                setTotalItems(data.totalNumBooks);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize)); 
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, [pageSize, pageNum]);

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
            <h1>Books List</h1>

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
                    </div>
                </div>
            ))}

            {/* Pagination Controls */}
            <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>

            {[...Array(totalPages)].map((_, index) => (
                <button 
                    key={index + 1} 
                    onClick={() => setPageNum(index + 1)} 
                    disabled={pageNum === index + 1}
                >
                    {index + 1}
                </button>
            ))}

            <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

            <br />

            {/* Page Size Selector */}
            <label>
                Results per page:
                <select 
                    value={pageSize} 
                    onChange={(p) => {
                        setPageSize(Number(p.target.value));
                        setPageNum(1); // Reset to first page when changing results per page
                    }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </label>
        </>
    );
}

export default BookList;
