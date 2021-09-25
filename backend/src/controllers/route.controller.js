var distance = require('google-distance');
const routeCtrl = {};

distance.apiKey = "";

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
    }).catch(function (error)  {
      res.status(503).json({ message: 'Location invalid' });
    });
}

module.exports = routeCtrl;