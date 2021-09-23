var distance = require('google-distance');
const recorridoCtrl = {};

distance.apiKey = "";

function recorrido(origen,destino) {
      return new Promise((resolve, reject) => {
        distance.get(
            {
              origin: origen,
              destination: destino
            },
            function(err, data) {
              if (err) reject(err);
            resolve(data);
          })
      })
}

recorridoCtrl.getRecorrido = (req,res) => {
    const { origen, destino } = req.query;

    recorrido(origen,destino).then(result => {
        console.log(result)
        res.json({distance: result.distanceValue})
    }).catch(errResult => {
        console.log(errResult)
    });
}


module.exports = recorridoCtrl;