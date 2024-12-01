import './Dashboard.css';
import { FaShoppingCart } from "react-icons/fa";
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [wishlist, setWishlist] = useState([]);
  const location = useLocation(); // Get current route

  const toggleWishlist = (item) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(item)
        ? prevWishlist.filter((i) => i !== item)
        : [...prevWishlist, item]
    );
  };

  const products = [
    { name: 'Coffee tray', type: 'plant', image: 'https://brownliving.in/cdn/shop/files/sustainable-eco-friendly-coffee-table-round-tray-by-divina-flos-at-brownliving-257718_700x.jpg?v=1731985922' },
    { name: 'Candle', type: 'plant', image: 'https://brownliving.in/cdn/shop/files/coconut-shell-dhoop-stickbatti-stand-wooden-incense-stick-holder-set-of-1-thenga-sustainable-candles-fragrances-brown-living-tgadhbstnd-485958_700x.jpg?v=1723850976' },
    { name: 'shell cups', type: 'stone', image: 'https://brownliving.in/cdn/shop/products/coconut-shell-cup-brown-200ml-pack-of-2-173-05695-coconut-cup-natural-handmade-tea-200-ml-set-o-cups-saucers-brown-living-109584_700x.jpg?v=1682961444' },
    { name: 'Yoga Bolster', type: 'stone', image: 'https://brownliving.in/cdn/shop/products/yoga-bolster-made-from-organic-cotton-yo-br-r-gy-yoga-pillow-brown-living-158088_700x.jpg?v=1682970058' },
  ];

  const users = [
    { name: 'Vijay', profileImage: 'https://thumbnail.imgbin.com/8/9/12/imgbin-female-avatar-business-man-xsRi9WPkc1u13P4mQ9BTRM69B_t.jpg', orders: 4},
    { name: 'Revansh', profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTziDETQGQxTuvMXFbXaNohXRV6541LTrNNDuAFc11ugZ-pAelZf7HP4pFFIMfAILPz2eI&usqp=CAU', orders: 12 },
    { name: 'Suchitra', profileImage: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/10.png', orders: 8 },
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.embeddedChatbotConfig = {
        chatbotId: "u527PTfE_0VIZq7RbeiXt",
        domain: "www.chatbase.co",
      };
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const isLoginPage = location.pathname === '/login';
  const isLogoutPage = location.pathname === '/register';

  return (
    <div className="app">
      <div className="sidebar">
        <h2>
          <img
            src="https://e7.pngegg.com/pngimages/310/172/png-clipart-perris-qs-nurses-no-computer-icons-physician-logo-plant-leaf-logo.png"
            width="200px"
            height="100px"
            alt="Logo"
          />
        </h2>
        <ul>
          <li id="p"><strong>Menu</strong></li>
          <Link to={`/cart`}><li>My Orders</li></Link>
          <a href="https://www.onyalife.com/a/blog/post/eco-friendly-products"><li>Explore</li></a>
          <Link to={`/grid`}><li>Products</li></Link>
          <li id="p"><strong>Settings</strong></li>
          <a href="https://www.vistaprint.com/hub/eco-friendly-brands"><li>Charts</li></a>
          <Link to={`/cart`}><li>Billing</li></Link>
          <Link to={`/login`}><li>Log out</li></Link>
        </ul>
      </div>

      <div className="main-content">
        <header className="header">
          <div>
            <h1>Welcome, User!</h1>
            <p>Welcome to natoshop, one way shop for plants</p>
          </div>
          <div className="header-icons">
            {/* User profile */}
            <div className="user-profile">
              <Link to={`/login`}>
              <span className="icon">👤</span></Link>
            </div>

            <Link to={`/cart`}>
              <span className="icon"><FaShoppingCart /></span>
            </Link>
          </div>
        </header>

        <div className="video-section">
          <video autoPlay loop muted className="background-video">
            <source src="./public/video.mp4" />
          </video>
          <div className="video-overlay">
            <div className="overlay-content">
              <h1>Discover Nature’s Beauty</h1>
              <p>Explore our wide range of plants and stones.</p>
              <div className="bt">
                <button className="small-btn"><a href="https://www.wix.com/blog/eco-friendly-products" target="_blank" rel="noopener noreferrer">Explore More</a></button>
                <button className="small-btn"><a href="https://www.vistaprint.com/hub/eco-friendly-brands" target="_blank" rel="noopener noreferrer">Top Sellers</a></button>
              </div>
            </div>
          </div>
        </div>

        <div className="product-list">
          <div className="poco">
            <h2>Products</h2>
            <Link to="/grid" className="seek" style={{ color: 'blue', textDecoration: 'none' }}>See more ➤</Link>
          </div>
          <div className="products">
            {products.map((product, index) => (
              <div key={index} className="product">
                <button className="hearts" onClick={() => toggleWishlist(product.name)}>
                  {wishlist.includes(product.name) ? '❤️' : '🤍'}
                </button>
                <img src={product.image} alt={product.name} className="product-image" />
                <span>{product.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="top-sellers-section">
          <div className="top-sellers">
            <a href="https://upcycleluxe.com/blogs/our-readers-digest/top-30-sustainable-clothing-brands-in-india">
              <h2>Top Sellers ➤</h2>
            </a>
            <img src="https://cdn.icon-icons.com/icons2/212/PNG/256/Users256_25013.png" width="80px" alt="Top Sellers" />
          </div>
          <div className="feature-sellers">
            <a href="https://upcycleluxe.com/blogs/our-readers-digest/top-30-sustainable-clothing-brands-in-india">
              <h2>Feature Sellers ➤</h2>
            </a>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrQnx4A_Fyq9hXq6-oLrSCcoT-q2rZnXl_jqYPzUedUPgO0V7pLf9lOhJtZTzvV0FDP0xqwpb8IkZ9aT8vfNBGJgBlBYzCpdMoyADLnTLy7wBqgWlPcnpqbwBbyl9QZNelzq9Dh5YqPrq9quqWZJ8c5qozkXbWwXjh7gJXYQ4j9XtbEguFqKw4jvNKLtkmMLeO7_x1gR9X7KzkCe6O5tG46-rJW9HbmJ3m1vQnUqQF7fkhBddzi9eMvF9q3_7dgaPt5bskTgSYP9w4gAlMc9I68izlgd_YlHY8pvV_lEoCWRHgqWWq9MdzqALgfVtWweQ82kqEBMjtHk2tu-4Fqg5srlNLRqBFTuBgrV2KSe59gWFGnqgMv5baq03u5egRzzqi4RDS8tBhGyjmXkBY7Yg9VoYkq9_q9rglNLs1dkQL2sBGLi39wqs5WdYbnOWZ4SkVZ0Rp87nWv3rnx8&usqp=CAU" width="80px" alt="Feature Sellers" />
          </div>
        </div>
      </div>

      <div className="alex">
        <div className="top-stats">
          <h2>Top Stats</h2>
          <div className="orders-summary">
            <p>Today’s Orders: <strong>5</strong></p>
            <p>Total Orders (120 days): <strong>120</strong></p>
          </div>
        </div>

        <div className="stats-users">
          {users.map((user, index) => (
            <div key={index} className="user">
              <img src={user.profileImage} alt={user.name} className="user-image" />
              <div className="user-info">
                <p>{user.name}</p>
                <p>Orders: {user.orders}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
