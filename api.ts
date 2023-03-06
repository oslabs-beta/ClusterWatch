const createAPIkey = async () => {

  try {
    let respObj;
    let response = await fetch('http://localhost:3001/api/auth/keys', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        Authorization:
          'Basic ' + Buffer.from('admin:prom-operator').toString('base64'),
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: Math.random().toString(36).substring(7),
        role: 'Admin',
        secondsToLive: 86400,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        respObj = data;
        console.log(respObj);
      });
    return respObj.key;
  } catch {
    console.log('Error occured creating API key');
  }
};

createAPIkey();

// const APIKey =
//   'eyJrIjoiNUhWME9pUmhTbTRVMTNNR3piTjVyTVFxaTU3OXhIb1QiLCJuIjoibmV3dXNlciIsImlkIjoxfQ==';
// const dashboardName = 'Prometheus / Overview';
// const getUid = async () => {
//   try {
//     let response = await fetch(
//       `http://localhost:3001/api/search?query=${encodeURIComponent(dashboardName)}`,
//       {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${APIKey}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         // Get the uid of the first dashboard in the list
//         const uid = data[0].uid;
//         console.log(uid);
//       });
//   } catch {
//     console.log('Error occured creating API key');
//   }
// };

// getUid();

// const getDashboards = async () => {
//     try {
//       let response = await fetch('http://localhost:3001/api/search?type=dash-db', {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${APIKey}`,
//           'Content-Type': 'application/json',
//         },
//       })
//       let data = await response.json();
//       data.forEach((dashboard) => {
//         console.log(dashboard.title);
//       });
//     } catch {
//       console.log('Error occurred getting dashboards');
//     }
//   };

//   getDashboards();

// /api/dashboards/uid/

// try {
//     let response = await fetch("http://localhost:3001/api/dashboards/db", {
//       method: "POS",
//       mode: "no-cors",
//       headers: {
//         Accept: "*/*",
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${APIKey}`,
//       },
//       body: {
//   "dashboard": {
//     "id": null,
//     "uid": null,
//     "title": "Prometheus / Overview",
//     "tags": [ "templated" ],
//     "timezone": "browser",
//     "schemaVersion": 16,
//     "version": 0,
//     "refresh": "25s"
//   },
//   "folderId": 0,
//   "folderUid": "l3KqBxCMz",
//   "message": "Made changes to xyz",
//   "overwrite": false
// }
//     });
//   } catch {
//     console.log("Error occured posting dashboard to grafana");
//   }
