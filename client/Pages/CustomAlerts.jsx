import React, { useState } from 'react';

function CustomAlerts() {
  const [selectedAlertOption, setSelectedAlertOption] = useState('');
  const [submittedAlertOption, setSubmittedAlertOption] = useState('');
  const [selectedMemory, setSelectedMemory] = useState('');
  const [submittedMemory, setsubmittedMemory] = useState('');

  const handleTypeSubmit = (event) => {
    event.preventDefault();
    setSubmittedAlertOption(selectedAlertOption);
  };

  const handleRadioChange = (event) => {
    setSelectedAlertOption(event.target.value);
  };

  const handleMemoryChange = (event) => {
    setSelectedMemory(event.target.value);
  };

  const handleMemorySubmit = (event) => {
    event.preventDefault();
    setsubmittedMemory(selectedMemory);
  };
  return (
    <div>
      {submittedAlertOption === '' && (
        <div className="add-alert">
          <h3>type of alerts</h3>
          <form onSubmit={handleTypeSubmit}>
            <input
              type="radio"
              id="memory"
              name="alertType"
              value="Memory"
              onChange={handleRadioChange}
            />
            <label htmlFor="memory">Memory Usage</label>
            <br />
            <input
              type="radio"
              id="cpu"
              name="alertType"
              value="CPU"
              onChange={handleRadioChange}
            />
            <label htmlFor="cpu">CPU Usage</label>
            <br />
            <input
              type="radio"
              id="kube"
              name="alertType"
              value="Kube"
              onChange={handleRadioChange}
            />
            <label htmlFor="kube">Kube Node Down</label>
            <br />
            <input type="submit" value="Next"></input>
          </form>
        </div>
      )}
      {submittedAlertOption === 'Memory' && (
        <div className="add-alert">
          <h3>Memory Threshold</h3>
          <form onSubmit={handleMemorySubmit}>
            <label htmlFor="memorythreshold">
              Alert after memory usage exceeds (in Gigabytes)
            </label>
            <input
              type="input"
              id="memorythreshold"
              name="memorythreshold"
              value="2"
              onChange={handleMemoryChange}
            />
            <br />
            <input type="submit" value="Next"></input>
          </form>
        </div>
      )}
    </div>
  );
}

export default CustomAlerts;
