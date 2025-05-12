import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss'; // Make sure to import your SCSS

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="coming-soon-container d-flex flex-column justify-content-center align-items-center text-center">
      <h1 className="coming-soon-title mb-4">Coming Soon</h1>
      <p className="lead font-24 mb-4">
        We’re crafting something awesome. Stay tuned!
      </p>
      <button className="btn-primary font-24" onClick={() => navigate('/')}>
        Go to Home
      </button>
    </div>
  );
};

export default ComingSoon;
