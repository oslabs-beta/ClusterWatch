import React from 'react';

function CustomAlerts() {
  return (
    <div className="iframe">
      <h3>type of alerts</h3>
      <form>
        <input type="radio" id="html" name="fav_language" value="HTML" />
        <label htmlFor="html">HTML</label>
        <br />
        <input type="radio" id="css" name="fav_language" value="CSS" />
        <label htmlFor="css">CSS</label>
        <br />
        <input
          type="radio"
          id="javascript"
          name="fav_language"
          value="JavaScript"
        />
        <label htmlFor="javascript">JavaScript</label>
      </form>
    </div>
  );
}

export default CustomAlerts;
