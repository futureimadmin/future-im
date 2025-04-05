import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryApi, productApi } from '../apis/api';
import './Landing.css';
import microphoneIcon from '../../images/microphone.png';

const Landing = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [user, setUser] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [products, setProducts] = useState([]);
  const [recordingStatus, setRecordingStatus] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [categoryPath, setCategoryPath] = useState([]);
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const audioRef = useRef(null);
  let pauseTimeout = null;

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');
    
    if (!userStr || !accessToken) {
      navigate('/login');
      return;
    }

    try {
      const userData = JSON.parse(userStr);
      setUser(userData);
      loadCategories();
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (selectedCategory) {
      loadProducts();
      loadCategoryPath();
    } else {
      loadProducts();
    }
  }, [selectedCategory, page]);

  const startRecording = async () => {
    try {
      setRecordingStatus('Requesting microphone access...');
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];
      setRecordingStatus('Recording started... Click the microphone again to stop.');

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
    setRecordingStatus('Recording stopped. You can play it back below.');
  };

  const loadCategories = async () => {
    try {
      const response = await categoryApi.getCategoryTree();
      setCategories(response.data.data);
    } catch (err) {
      setError('Failed to load categories');
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      let response;
      if (selectedCategory) {
        response = await productApi.getProductsByCategory(
          selectedCategory.id,
          true,
          page,
          20
        );
      } else {
        response = await productApi.getAllProducts(page, 20);
      }
      
      const { content, last } = response.data.data;
      setProducts(page === 0 ? content : [...products, ...content]);
      setHasMore(!last);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryPath = async () => {
    if (!selectedCategory) return;
    try {
      const response = await categoryApi.getCategoryPath(selectedCategory.id);
      setCategoryPath(response.data.data);
    } catch (err) {
      setError('Failed to load category path');
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setPage(0);
    setProducts([]);
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(page + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    productApi.searchProducts(searchText)
      .then(response => {
        setProducts(response.data.data.content);
      })
      .catch(error => {
        console.error('Error searching products:', error);
      });
  };

  const sendAudioToServer = async () => {
    if (!audioUrl) return;

    try {
      const response = await fetch(audioUrl);
      const audioBlob = await response.blob();
      const formData = new FormData();
      formData.append('audio', audioBlob);

      const serverResponse = await fetch('http://localhost:8080/vcom/api/v1/products/audio', {
        method: 'POST',
        body: formData,
      });
      const data = await serverResponse.json();
      setSearchText(data.text || '');
      setProducts(data.products || []);
      setAudioUrl(null); // Clear the audio URL after sending
    } catch (error) {
      console.error('Error processing audio:', error);
    }
  };

  const renderCategories = (categories) => {
    return (
      <ul className="category-list">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              className={`category-button ${selectedCategory?.id === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
              {category.productCount > 0 && (
                <span className="product-count">({category.productCount})</span>
              )}
            </button>
            {category.subcategories?.length > 0 && (
              <div className="subcategories">
                {renderCategories(category.subcategories)}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const renderProducts = () => {
    if (!products.length) return null;

    return (
      <div className="products-container">
        {products.map((product, index) => (
          <div key={product.id || index} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className="price">₹{product.price}</p>
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} className="product-image" />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="landing-container">
      <div className="category-sidebar">
        <h2>Categories</h2>
        {renderCategories(categories)}
      </div>

      <div className="main-content">
        <div className="top-section">
          <div className="search-box">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search products..."
              />
              <button type="submit">Search</button>
              <button
                type="button"
                className={`record-button ${isRecording ? 'recording' : ''}`}
                onClick={isRecording ? stopRecording : startRecording}
                title={isRecording ? 'Stop Recording' : 'Start Recording'}
              >
                <img src={microphoneIcon} alt="Microphone" />
              </button>
            </form>
          </div>

          {recordingStatus && (
            <div className="recording-status">
              {recordingStatus}
            </div>
          )}

          {audioUrl && (
            <div className="audio-controls">
              <audio ref={audioRef} src={audioUrl} controls className="audio-player" />
              <button onClick={sendAudioToServer} className="send-button">
                Send Search Record
              </button>
            </div>
          )}
        </div>

        {categoryPath.length > 0 && (
          <div className="breadcrumb">
            <button onClick={() => handleCategoryClick(null)}>All Products</button>
            {categoryPath.map((cat, index) => (
              <React.Fragment key={cat.id}>
                <span className="separator">/</span>
                <button
                  onClick={() => handleCategoryClick(cat)}
                  className={index === categoryPath.length - 1 ? 'active' : ''}
                >
                  {cat.name}
                </button>
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />
              )}
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-price">
                  {product.discountPrice ? (
                    <>
                      <span className="original-price">₹{product.price}</span>
                      <span className="discount-price">₹{product.discountPrice}</span>
                    </>
                  ) : (
                    <span>₹{product.price}</span>
                  )}
                </div>
                {product.stockQuantity > 0 ? (
                  <button className="add-to-cart">Add to Cart</button>
                ) : (
                  <span className="out-of-stock">Out of Stock</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        {!loading && hasMore && (
          <button className="load-more" onClick={loadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Landing;
