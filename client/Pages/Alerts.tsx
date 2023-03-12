import React from 'react';


function Alerts() {
  return (

    <div className='iframe'>
     <iframe
      src="http://localhost:9093"
      className = 'frame'
      width="100%"
      height="100%"
      title='alert embed'
    ></iframe>
    </div>

  );
}

export default Alerts;