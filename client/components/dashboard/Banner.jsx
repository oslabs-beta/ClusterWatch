import React from 'react';
import { Link } from 'react-router-dom';


function Banner() {
  return (

    <div id="Banner">
      <Link
        id="BannerHome"
        to="/"
      >
        <h2>ClusterWatch</h2>
      </Link>

      <div className="buttonContainer">
        <Link className="navbutton" to="/">
          <button type='button'>Login</button>
        </Link>
      </div>

    </div>

  );
}

export default Banner;
