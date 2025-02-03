import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Details.css';
import { MdDelete } from "react-icons/md";
import { products } from './productData';

const Details = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((prod) => prod.id === parseInt(id));

  if (!product) {
    return <p>Product not found!</p>;
  }

  const [rating, setRating] = useState(0);
  const handleRating = (star) => setRating(star);

  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    const item = {
      ...product,
      quantity,
      totalPrice: parseInt(product.price.replace('₹', '')) * quantity,
    };

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    addToCart(item);
  };

  // State to hold the comments
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  // Load comments from localStorage on component mount
  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    setComments(savedComments);
  }, []); 

  // Add a new comment
  const handleAddComment = () => {
    if (comment.trim() !== '') {
      const newComment = {
        id: Date.now(), // Unique ID for each comment
        text: comment,
      };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setComment('');
      // Save comments to localStorage
      localStorage.setItem('comments', JSON.stringify(updatedComments));
    }
  };

  // Delete a comment
  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);
    // Save updated comments to localStorage
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  return (
    <div className="product-detail">
      <div className="detail-container">
        <img src={product.image} alt={product.name} className="detail-image" />
        <div className="detail-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="paras">{product.description}</p>
          <p className="product-price">{product.price}</p>

          <div className="botto">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <div className="quantity-container">
              <button className="quantity-btn" onClick={decreaseQuantity}>
                -
              </button>
              <div className="quantity">{quantity}</div>
              <button className="quantity-btn" onClick={increaseQuantity}>
                +
              </button>
            </div>
          </div>

          <div className="rating-system">
            <span>Rate this product:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? 'star-filled' : 'star-empty'}
                onClick={() => handleRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          <div className="comment-section">
            <h3>Comments</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add your comment here..."
            ></textarea>
            <button onClick={handleAddComment}>Add Comment</button>

            <div className="comments-list">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="comment">
                    <p>{comment.text}</p>
                    <MdDelete className="deltee" onClick={() => handleDeleteComment(comment.id)} />
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
