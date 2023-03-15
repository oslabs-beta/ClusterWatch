import React, { useState } from 'react';
import { Watch } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import logo from '../styles/logo-color-transformed.png';

function Setup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="setup-container">
      {loading && (
        <div className="loading">
          <p>Sorry for the wait, hope it doesn't drive you KuberNutties!</p>
          <Watch />
        </div>
      )}
      {!loading && (
        <>
          <img
            src={logo}
            alt="My Logo"
            style={{ height: '180px', zIndex: '1000', objectFit: 'fill' }}
          />

          <div className="buttonContainer">
            <p>Need to setup prometheus in your cluster?</p>
            <button
              className="setup-btn"
              onClick={() => {
                setLoading(true);
                fetch('http://localhost:3000/setup/promSetup').then(() =>
                  setLoading(false)
                );
              }}
              type="button"
            >
              Setup Prometheus
            </button>
          </div>
          <div className="buttonContainer">
            <p>Need to setup grafana in your cluster?</p>
            <button
              className="setup-btn"
              onClick={() => {
                setLoading(true);
                fetch('http://localhost:3000/setup/grafSetup').then(() =>
                  setLoading(false)
                );
              }}
              type="button"
            >
              Setup Grafana
            </button>
          </div>

          <div className="buttonContainer">
            <p>Need to forward ports to make metrics available?</p>
            <button
              className="setup-btn"
              onClick={() => {
                setLoading(true);
                fetch('http://localhost:3000/setup/forwardPorts').then(() =>
                  setLoading(false)
                );
              }}
              type="button"
            >
              Start Port Forwarding
            </button>
          </div>
          <div className="buttonContainer">
            <button
              className="setup-btn"
              id="dashboard-btn"
              onClick={() => {
                navigate('/Dashboard');
              }}
              type="button"
            >
              Go to dashboard
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Setup;
