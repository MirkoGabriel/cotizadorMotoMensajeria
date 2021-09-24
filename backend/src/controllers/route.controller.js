var distance = require('google-distance');
const routeCtrl = {};

distance.apiKey = "AIzaSyBQLBwlf4h9gDvu_eU0v1vO0gj8PtC7lSI";

function route(origin,destination) {
      return new Promise((resolve, reject) => {
        distance.get(
            {
              origin: origin,
              destination: destination
            },
            function(err, data) {
              if (err) reject(err);
            resolve(data);
          })
      })
}

routeCtrl.postRoute = (req,res) => {
    const { origin,destination } = req.body;
    console.log(origin, destination)
    route(origin,destination).then(result => {
        console.log(result)
        res.json({distance: result.distanceValue})
    }).catch(errResult => {
        console.log(errResult)
    });
}

module.exports = routeCtrl;