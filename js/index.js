'use strict';

(function(){
  var remote = require('electron').remote;
  var wifiScanner = require('wifiscanner');
  var setup = require('./js/setup');
  var app = remote.app;
  var scanner = wifiScanner();
  var setupButton = document.querySelector('#setup');
  var quitButton = document.querySelector('#quit');

  scanner.scan(function(error, networks) {
    if (error) {
      console.error(error);
    } else {
      var wifiSsid = document.querySelector('#wifi-ssid');
      var firstOption = wifiSsid.querySelector('option');
      firstOption.innerText = 'Wi-Fi SSID';
      wifiSsid.disabled = false;
      networks.forEach(function(network) {
        var option = document.createElement('option');
        var text = document.createTextNode(network.ssid);
        option.appendChild(text);
        option.setAttribute('value', network.ssid);
        wifiSsid.appendChild(option);
      });
    }
  });

  setupButton.addEventListener('click', function() {
    var sensorId = document.querySelector('#sensor-id').value;
    var apiKey = document.querySelector('#api-key').value;
    setup.flash({
      sensorId: sensorId,
      apiKey: apiKey
    });
  });

  quitButton.addEventListener('click', function() {
    app.quit();
  });
}());
