import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import { useState, useEffect } from "react";

// Assuming books data is fetched or statically available
const books = [
    { bookId: 1, title: "Les Miserables", price: 20.0 },
    { bookId: 2, title: "1984", price: 15.0 },
  // Add all other books here
];

function AddBookPage() {
    const navigate = useNavigate();
    const { bookTitle, bookId } = useParams(); // Book title and bookId from the URL
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState<number>(1); // Default quantity is 1
    const [price, setPrice] = useState<number>(0);


    // This will run whenever bookId changes
    useEffect(() => {
        // Find the book based on the bookId from the URL
        const book = books.find((b) => b.bookId === Number(bookId));

        if (book) {
            setPrice(book.price); // Set the price from the book data
        } else {
            console.error("Book not found!");
        }
    }, [bookId]); // Dependency array ensures this runs when the bookId changes

    const handleAddToCart = () => {
        const newItem: CartItem = {
            title: String(bookTitle), // Book title from the URL
            quantity,
            price,
            bookId: Number(bookId),
        };
        addToCart(newItem); // Add the item to the cart
        navigate('/cart'); // Navigate to the cart page
    };

    return (
        <>
            <WelcomeBand />
            <h2>Add Book "{bookTitle}"</h2>

            <div>
                <input
                    type="number"
                    placeholder="Enter how many you want to buy"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))} // Update quantity
                />
                <button // THIS IS THE SECOND BOOTSTRAP ELEMENT! added a tooltip attribute so that when you hover over it it says that the book will be added to your cart
                    onClick={handleAddToCart}
                    className="btn btn-primary"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="This book will be added to your cart"
                    >
                    Add to Cart
                </button>

            </div>

            <button onClick={() => navigate('/books')}>Go Back</button>
        </>
    );
}

export default AddBookPage;