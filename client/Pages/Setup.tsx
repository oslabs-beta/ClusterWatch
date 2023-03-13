import React from 'react';
import SetupButtons from '../components/SetupButtons';
import Particle from './Particle';

function SetupPage() {
  return (
    <div className="setup-bg" id="particles-js">
      <Particle />
      <SetupButtons />
    </div>
  );
}

export default SetupPage;
