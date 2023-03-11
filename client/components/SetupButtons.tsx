import React, {useState ,useEffect} from 'react';
// import cluster from '../styles/cluster.gif';
import { Watch } from 'react-loader-spinner'
import {
  Link, useNavigate,
} from 'react-router-dom';
function Setup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

// this is how democracy ends with the splah of a bnana
  return (
    // loading ? <div id='loading-component' className='d-flex flex-column vh-100 justify-content-center align-items-center text-center'> <h1>Sorry for the wait, hope it doesn't drive you KuberNutties!</h1> <Watch/> </div>  : 
    
    <div className="d-flex justify-self-center w-100">
      {loading && <div id='loading-component' className='d-flex flex-column vh-100 vw-100 justify-content-center align-items-center text-center'> <h1>Sorry for the wait, hope it doesn't drive you KuberNutties!</h1> <Watch/> </div>}
      <div className="d-grid gap-2 col-3 mx-auto w-75 justify-contents-center">  
        {/* <img src={cluster} alt="image"/> */}
        <div className="text-center">
        <h2>ClusterWatch</h2>
        </div>
        <div className="d-flex justify-content-between">
          <span>Need to setup prometheus in your cluster?</span>
          <button
            className="btn btn-outline-success w-25"
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
        <div className="d-flex justify-content-between">
          <p>Need to setup grafana in your cluster?</p>
          <button
            className="btn btn-outline-success w-25"
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

        <div className="d-flex justify-content-between">
          <span>Need to forward ports to make metrics available?</span>
          <button
            className="btn btn-outline-success w-25"
            onClick={() => {
              setLoading(true);
              fetch('http://localhost:3000/setup/forwardGraf').then(() =>
                setLoading(false)
              );
            }}
            type="button"
          >
            Start Port Forwarding
          </button>
        </div>
        <button onClick={()=>{navigate('/Dashboard')}} className="btn btn-outline-success" type="button">
          Go to dashboard
        </button>
         <div className="text-center">
         </div>
      </div>
    </div>
  );
}

export default Setup;
