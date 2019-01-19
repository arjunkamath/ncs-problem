let devices = [[0,0],[100,100],[15,10],[18,18]];
let stations = [[0, 0, 10],[20, 20, 5],[10, 0, 12]];

class CustomError extends Error {};

// power based on the given function description
function powerBetweenDeviceAndStation([dx,dy],[sx,sy,sr]){
  if(isNaN(dx) || isNaN(dy) || isNaN(sx) || isNaN(sy) || isNaN(sr)){
    throw new CustomError(`One/more invalid values: ${dx}, ${dy}, ${sx}, ${sy}, ${sr}`);
  }

  if (sr < 0) {
    throw new CustomError(`Reach is negative in station: ${sx}, ${sy}, ${sr}`);
  }

  let dist = distanceBetween([dx,dy],[sx,sy]);
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

// iterate over each given device
for (let [x,y] of devices) {
  // placeholder variables for storing power and coords of best station
  let pmax = 0;
  let bestStationCoords = null; 
  
 // iterate over each station to calculate power
 for (let [sx,sy,sr] of stations) {
   let stationPower;
  
   try {
     stationPower = powerBetweenDeviceAndStation([x,y], [sx, sy, sr]);
    } catch(e){
      if (e instanceof CustomError) {
        console.log(`SOMETHING WENT WRONG: ${e}`);
      } else {
        throw e;
      }
    }
    
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


// TESTS

try {
  testPowerBetweenDeviceAndStation();
} catch (e) {
  console.log(`powerBetweenDeviceAndStation has a problem: ${e.message}`);
}

try {
  testDistanceBetween();
} catch (e) {
  console.log(`distanceBetween has a problem: ${e.message}`);
}

function testPowerBetweenDeviceAndStation(){
  let testVars = [
    [[0,0], [0,0, 10], 100],
    [[3,4], [0,0,10], 25],
    [[3,4], [0,0,4], 0],    
    [[-8,6], [0,0,11], 1],
  ];

  testVars.forEach(([[px,py], [sx, sy,sr], power]) => {
    if(powerBetweenDeviceAndStation([px,py], [sx,sy, sr]) != power){
      throw new CustomError(`Error in calculation for ${px}, ${py}, ${sx}, ${sy}, ${sr}, ${power}`)
    }  
  });
}

function testDistanceBetween(){
  let testVars = [
    [[0,0], [0,0], 0],
    [[0,0], [10,0], 10],
    [[0,0], [0,10], 10],
    [[0,0], [0,-10], 10],
    [[0,0], [3,4], 5]
  ];

  testVars.forEach(([[x1,y1], [x2,y2], distance]) => {
    if(distanceBetween([x1,y1], [x2,y2]) != distance){
      throw new CustomError(`Error in calculation for ${x1}, ${y1}, ${x2}, ${y2}, ${distance}`);
    }
  })
}

