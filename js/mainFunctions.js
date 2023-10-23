$(document).ready(() => {
    console.log('ready');
    $('.navbar_wraper').load('components/navbar.html');
    $('.footer_wraper').load('components/footer.html');

});

// "Public" functions //

// Connect button press
function Connect() {
    console.log("connect");
    var cleanSession = true;
    var useSSL = true;
    var endpoint = 'test.mosquitto.org:8081';
    var username = "";
    var password = "";
    var clientid = "";

    uri = endpoint.split(/:/g);
    console.log("connecting to " + uri[0] + ":" + parseInt(uri[1]) + " using a " + (cleanSession ? "clean" : "persistant") + " session " + (username ? "with" : "without") + " authentication as " + clientid);

    $('#connection-status').removeClass('badge-disabled badge-success badge-danger badge-warning badge-primary badge-info badge-dark').addClass('badge-info');
    mqtt = new Paho.MQTT.Client(uri[0], parseInt(uri[1]), clientid);
    var options = {
        useSSL: useSSL,
        cleanSession: cleanSession
    };
    if (username != "")
        options.userName = username;
    if (password != "")
        options.password = password;
        
    mqtt.connect(options);
}


// Connect button press
function ConnectMessage(Topic, Message) {
    console.log("connect");
    var cleanSession = true;
    var useSSL = true;
    var endpoint = 'test.mosquitto.org:8081';
    var username = "";
    var password = "";
    var clientid = "";

    uri = endpoint.split(/:/g);
    console.log("connecting to " + uri[0] + ":" + parseInt(uri[1]) + " using a " + (cleanSession ? "clean" : "persistant") + " session " + (username ? "with" : "without") + " authentication as " + clientid);

    $('#connection-status').removeClass('badge-disabled badge-success badge-danger badge-warning badge-primary badge-info badge-dark').addClass('badge-info');
    mqtt = new Paho.MQTT.Client(uri[0], parseInt(uri[1]), clientid);
    var options = {
        useSSL: useSSL,
        cleanSession: cleanSession
    };
    if (username != "")
        options.userName = username;
    if (password != "")
        options.password = password;
        
    mqtt.connect(options);

    console.log(Topic);

   // setTimeout(() => {PublishMessage(Message, Topic);}, 1500);

}

// Disconnect button press
function Disconnect() {
    mqtt.disconnect();
}

// Publish button press
function Publish() {

    message = new Paho.MQTT.Message($('#publish-message').val());
    message.destinationName = $('#publish-topic').val();
    message.qos = parseInt($('#publish-qos').val());
    message.retained = $('#publish-retain').is(':checked');
    mqtt.send(message);
}

// Publish button press
function PublishMessage(newMessage, newTopic) {
    message = new Paho.MQTT.Message(newMessage);
    message.destinationName = newTopic;
    message.qos = 0;
    message.retained = $('#publish-retain').is(':checked');
    mqtt.send(message);

    console.log(newMessage);

}

// Subscribe button press
function Subscribe() {
    mqtt.subscribe($('#subscribe-topic').val(), { qos: parseInt($('#subscribe-qos').val()), onSuccess: onSubscribeSuccess, onFailure: onSubscribeFailure });
}