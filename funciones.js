const httpToMqtt = async (req, res) => {
  if(req.body != "null"){
    console.log(req.body);
    try {
      const obj = JSON.parse(req.body);
      
      sendMqtt(obj);
      res.send({status: true, msg: "ok"});
  } catch (e) {
      console.log("json invalid");
      res.send({status: false, msg: "json invalid"});
  }
  } else{
    res.send({status: false, msg: "fail"});
  }
}

const mqtt = require('mqtt');

const client = mqtt.connect(process.env.MQTT_URL, {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
    clientId: process.env.MQTT_CLIENT_ID + Math.random().toString(16).substr(2, 8)
});

client.on('connect', function () {
  console.log('Conectado al broker MQTT');
  // client.subscribe('mi/tema', function (err) {
  //     if (!err) {
  //         console.log('Suscrito a "mi/tema"');
  //     }
  // });
});

client.on('message', function (topic, message) {
  console.log(`Mensaje recibido en ${topic}: ${message.toString()}`);
});

client.on('error', function (err) {
  console.log('Error de conexión:', err);
});

function sendMqtt(obj){
  client.publish("chi.wildlife/", JSON.stringify(obj));
}

module.exports = {
  httpToMqtt
};