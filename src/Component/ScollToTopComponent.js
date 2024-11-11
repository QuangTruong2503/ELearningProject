import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility of the button based on scroll position
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
            className='btn btn-outline-primary'
          onClick={scrollToTop}
          style={styles.scrollToTopButton}
        >
          <FontAwesomeIcon icon={faAngleDoubleUp}/>
        </button>
      )}
    </>
  );
};

const styles = {
  scrollToTopButton: {
    position: 'fixed',
    bottom: '50px',
    right: '30px',
    padding: '10px 15px',
    fontSize: '18px',
    color: '#333',
    borderRadius: '100rem',
    cursor: 'pointer',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

export default ScrollToTopButton;
