const poweredUP = new PoweredUP.PoweredUP();

const STOPPING_SPEED = 4 * 1000;       // Decceleration time (ms)
const STARTING_SPEED = 4 * 1000;       // Acceleration time (ms)
const TRAIN_MOTOR = "A";               // Port connected to motor
const STATION_WAIT_TIME = 5 * 1000;    // Wait time at station
const NORMAL_SPEED = 45                // Normal speed

poweredUP.on("discover", async (hub) => { // Wait to discover a Hub
    log(`Discovered ${hub.name}!`);
    await hub.connect(); // Connect to the Hub
    log("Connected to " + hub.name + " with UUID '" + hub.uuid + "'");
    renderHub(hub);
    await hub.sleep(1,5 * 1000); // Sleep for 1,5 seconds before starting

    await hub.rampMotorSpeed(TRAIN_MOTOR, 0, NORMAL_SPEED, STARTING_SPEED)
    var doing = false;
    hub.on("colorAndDistance", async (port, color, distance) => {
        if (color === 9 && !doing) {  // Look for color red and not already in station  GREEN = 5; RED = 9
            doing = true;
            log(hub.name + " is slowing down at station")
            document.getElementById(`status-${encodeURIComponent(hub.uuid)}`).innerHTML = "Entering Station";
            hub.rampMotorSpeed(TRAIN_MOTOR, NORMAL_SPEED, 1, STOPPING_SPEED) // Stop
            await hub.sleep(STOPPING_SPEED);
            document.getElementById(`status-${encodeURIComponent(hub.uuid)}`).innerHTML = "Waiting At Station";
            await hub.sleep(STATION_WAIT_TIME)
            log(hub.name + " is leaving station")
            document.getElementById(`status-${encodeURIComponent(hub.uuid)}`).innerHTML = "Leaving Station";
            hub.rampMotorSpeed(TRAIN_MOTOR, 1, NORMAL_SPEED, STARTING_SPEED)
            await hub.sleep(STARTING_SPEED)
            document.getElementById(`status-${encodeURIComponent(hub.uuid)}`).innerHTML = "Running Normally";
            doing = false;
        }
    })
});


const log = function (str) {
    const element = document.getElementById("console");
    element.innerHTML += `${str}<br />`;
    element.scrollTop = element.scrollHeight;
}

const renderHub = function (hub) {
    const element = document.createElement("tr");
    element.setAttribute("id", `hub-${encodeURIComponent(hub.uuid)}`);
    element.innerHTML = `<td>${hub.name}</td><td>${PoweredUP.Consts.HubTypeNames[hub.type]}</td><td class="disconnect_btn"><a href="#" onclick="disconnect('${encodeURIComponent(hub.uuid)}');">Disconnect</a></td>`;
    document.getElementById("hubs").appendChild(element);                   // ADD TO THE TABLE

    var elem = document.createElement("div");                           // CREATE A COLUMN
    elem.setAttribute("class", "column");
    elem.setAttribute("id", `id-${encodeURIComponent(hub.uuid)}`);
    document.getElementById("trains").appendChild(elem);

    elem = document.createElement("div");                              // CREATE THE CARD
    elem.setAttribute("class", "card");
    elem.setAttribute("id", `${encodeURIComponent(hub.uuid)}`);         // CREATE THE INNER OF THE CARD
    elem.innerHTML = `<h3 id="name-${encodeURIComponent(hub.uuid)}">${hub.name}</h3>
                      <p id="status-${encodeURIComponent(hub.uuid)}">Running Normally</p>`
    document.getElementById(`id-${encodeURIComponent(hub.uuid)}`).appendChild(elem);    // ADD IT TO 

}

const scan = function () {
    if (PoweredUP.isWebBluetooth) {
        log("Scanning...")
        poweredUP.scan(); // Start scanning for hubs
    } else {
        alert("Your browser does not support the Web Bluetooth specification.");
    }
}

const disconnect = function (uuid) {
    poweredUP.getConnectedHubByUUID(decodeURIComponent(uuid)).disconnect();
    document.getElementById(`hub-${uuid}`).remove();
    document.getElementById(`id-${uuid}`).remove();
}



