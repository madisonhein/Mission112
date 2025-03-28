import { useNavigate } from "react-router-dom";
import { CartItem } from "../types/CartItem";
import { useCart } from "../context/CartContext";

function CartPage() {
    const navigate = useNavigate();
    const {cart, removeFromCart} = useCart();
    return (
        <div>
            <h2>Your cart</h2>
            <div>{cart.length === 0 ?
                (<p>Your cart is empty</p>) : (
                <ul>
                    {cart.map((item: CartItem) => (
                    <li key={item.bookId}>
                        {item.title}: ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                        <button onClick={() => removeFromCart(item.bookId)}>Remove</button>
                    </li>))}
                </ul>
                )}</div>
            <h3>Total: ${cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</h3>
            <button>Checkout</button>
            <button onClick={() => navigate('/books')}>Continue Shopping</button>
        </div>
    );
}


export default CartPage;