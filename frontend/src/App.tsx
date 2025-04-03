import './App.css';
import AddBookPage from './pages/AddBookPage';
import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import AdminBooksPage from './pages/AdminBooksPage';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          {/* For one of my bootstrap additions, I added a navbar to the top of the website to go between your cart and the homepage */}
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Book Store</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/books">Books</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/cart">Cart</a>
                </li>
              </ul>
            </div>
          </nav>

          <Routes>
            <Route path='/' element={<BooksPage />} />
            <Route path='books' element={<BooksPage />} />
            <Route path='/add/:bookTitle/:bookId' element={<AddBookPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/adminbooks' element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
