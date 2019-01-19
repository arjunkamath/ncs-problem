let devices = [[0,0],[100,100],[15,10],[18,18]];
let stations = [[0, 0, 10],[20, 20, 5],[10, 0, 12]];

// iterate over each given device
for (let [x,y] of devices) {
 // placeholder variables for storing power and coords of best station
 let pmax = 0;
 let bestStationCoords = null; 
 
 // iterate over each station to calculate power
 for (let [sx,sy,sr] of stations) {
  let stationPower = powerBetweenDeviceAndStation([x,y], [sx, sy, sr]);

  // store only station with highest power
  if (stationPower > pmax) {
    pmax = stationPower;
    bestStationCoords = [sx, sy];
  }
 }

 if (pmax == 0) {
   console.log(`No link station within reach for point ${x},${y}`);
 } else {
  console.log(`Best link station for point ${x},${y} is ${bestStationCoords} with power ${pmax}`);
 }
}

// power based on the given function description
function powerBetweenDeviceAndStation([px,py],[sx,sy,sr]){
  if (sr < 0) {
    throw new Error("Reach cannot be negative");
  }

  let dist = distanceBetween([px,py],[sx,sy]);
  if (dist > sr){
    return 0;
  } else {
    return powerFromDistance(dist, sr);
  }
}

function distanceBetween([x1, y1],[x2, y2]){
  return Math.sqrt(Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2))
}

function powerFromDistance(distance, reach){
  return Math.pow((reach - distance), 2);
} 



// TESTS
function testPowerBetweenDeviceAndStation(){
  if(powerBetweenDeviceAndStation([0,0], [0,0, 10]) != 100){
    console.log("error");
  }
  if(powerBetweenDeviceAndStation([3,4], [0,0,10]) != 25){
    console.log("error");
  }
  if(powerBetweenDeviceAndStation([3,4], [0,0,4]) != 0){
    console.log("error");
  }
  if(powerBetweenDeviceAndStation([-8,6], [0,0, 11]) != 1){
    console.log("error");
  }
  if(powerBetweenDeviceAndStation([-1,1], [0,0, -11]) != 1){
    console.log("error");
  }
}

try {
  testPowerBetweenDeviceAndStation();
} catch (e) {
  console.log(`powerBetweenDeviceAndStation has a problem: ${e.message}`);
}

function testDistanceBetween(){
  if(distanceBetween([0,0], [0,0]) != 0){
    console.log("error")
  }
  if(distanceBetween([0,0], [10,0]) != 10){
    console.log("error")
  }
  if(distanceBetween([0,0], [0,10]) != 10){
    console.log("error")
  }
  if(distanceBetween([0,0], [0,-10]) != 10){
    console.log("error")
  }
  if(distanceBetween([0,0], [3,4]) != 5){
    console.log("error")
  }
}

testDistanceBetween();