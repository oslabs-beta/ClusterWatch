import React, { useState } from 'react';
import Particle from './Particle';

function CustomAlerts() {
  const [selectedAlertOption, setSelectedAlertOption] = useState('');
  const [submittedAlertOption, setSubmittedAlertOption] = useState('');
  const [selectedMemory, setSelectedMemory] = useState('');
  const [submittedMemory, setsubmittedMemory] = useState('');
  const [selectedCPU, setSelectedCPU] = useState('');
  const [submittedCPU, setSubmittedCPU] = useState('');

  const [alertName, setAlertName] = useState('');

  const handleTypeSubmit = (event: any) => {
    event.preventDefault();
    setSubmittedAlertOption(selectedAlertOption);
  };

  const handleRadioChange = (event: any) => {
    setSelectedAlertOption(event.target.value);
  };

  const handleMemoryChange = (event: any) => {
    setSelectedMemory(event.target.value);
  };

  const handleMemorySubmit = (event: any) => {
    event.preventDefault();
    setsubmittedMemory(selectedMemory);
  };

  const handleCPUChange = (event: any) => {
    setSelectedCPU(event.target.value);
  };

  const handleCPUSubmit = (event: any) => {
    event.preventDefault();
    setSubmittedCPU(selectedCPU);
  };

  const handleNameChange = (event: any) => {
    setAlertName(event.target.value);
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    event.preventDefault();
    setSubmittedAlertOption(selectedAlertOption);
    const threshold =
      submittedAlertOption === 'Memory' ? submittedMemory : submittedCPU;
    const result = { name: alertName, type: submittedAlertOption, threshold };
    setsubmittedMemory('');
    setSelectedMemory('');
    setSubmittedCPU('');
    setSelectedCPU('');
    setAlertName('');
    setSelectedAlertOption('');
    setSubmittedAlertOption('');
    fetch('http://localhost:3000/alerts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="alert-container">
      <Particle
      />
      {submittedAlertOption === '' && (
        <div className="add-alert">
          <h3>Select Alert Type</h3>
          <form onSubmit={handleTypeSubmit} className="form">
            <div className="input-div">
              {' '}
              <input
                type="radio"
                id="memory"
                name="alertType"
                value="Memory"
                onChange={handleRadioChange}
              />
              <label htmlFor="memory">Memory Usage</label>
            </div>

            <div className="input-div">
              <input
                type="radio"
                id="cpu"
                name="alertType"
                value="CPU"
                onChange={handleRadioChange}
              />
              <label htmlFor="cpu">CPU Usage</label>
            </div>

            <div className="input-div">
              <input
                type="radio"
                id="kube"
                name="alertType"
                value="Kube"
                onChange={handleRadioChange}
              />
              <label htmlFor="kube">Kube Node Down</label>
            </div>

            <input type="submit" value="Next" className="setup-btn"></input>
          </form>
        </div>
      )}
      {submittedAlertOption === 'Memory' && submittedMemory === '' && (
        <div className="add-alert">
          <h3>Memory Threshold</h3>
          <form onSubmit={handleMemorySubmit} className="form">
            <label htmlFor="memorythreshold">
              Alert after memory usage exceeds (in Gigabytes)
            </label>
            <input
              type="number"
              id="memorythreshold"
              name="memorythreshold"
              onChange={handleMemoryChange}
            />

            <input type="submit" value="Next" className="setup-btn"></input>
          </form>
        </div>
      )}

      {(submittedMemory !== '' ||
        submittedCPU !== '' ||
        submittedAlertOption === 'Kube') && (
        <div className="add-alert">
          <h3>Create Alert Name</h3>
          <form onSubmit={handleFormSubmit} className="form">
            <label htmlFor="memorythreshold">Enter alert name</label>
            <input
              type="input"
              id="alertname"
              name="alertname"
              onChange={handleNameChange}
            />

            <br />
            <input
              type="submit"
              value="Create Alert"
              className="setup-btn"
            ></input>
          </form>
        </div>
      )}

      {submittedAlertOption === 'CPU' && submittedCPU === '' && (
        <div className="add-alert">
          <h3>CPU Threshold</h3>
          <form onSubmit={handleCPUSubmit} className="form">
            <label htmlFor="cputhreshold">
              Alert after total CPU usage exceeds
            </label>
            <input
              type="number"
              id="cputhreshold"
              name="cputhreshold"
              step="0.1"
              onChange={handleCPUChange}
            />
            <br />
            <input type="submit" value="Next" className="setup-btn"></input>
          </form>
        </div>
      )}
    </div>
  );
}

export default CustomAlerts;
