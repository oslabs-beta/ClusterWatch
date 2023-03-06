import React from 'react';


function PromQuery() {
  return (

    <div className='iframe'>
     <iframe
      src="http://localhost:9090/graph?&hideGraph=1"
      
      width="100%"
      height="100%"
     
    ></iframe>
    </div>

  );
}

export default PromQuery;