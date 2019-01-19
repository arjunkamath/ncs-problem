let points = [[0,0],[100,100],[15,10],[18,18]];
let stations = [[0, 0, 10],[20, 20, 5],[10, 0, 12]];

for (let [x,y] of points) {
 let pmax = 0;
 let bestStationCoords = null; 
 
 for (let [sx,sy,sr] of stations) {
  console.log(`Distance between ${x},${y} & ${sx},${sy} with reach ${sr} is: ${distanceBetween([x,y],[sx,sy])}`);
  let dist = distanceBetween([x,y],[sx,sy]);
  
  // only if distance is less than range, continue further calculation for this station
  if (dist <= sr) {
    let stationPower = calcPower(dist, sr);
  
    if (stationPower > pmax) {
      pmax = stationPower;
      bestStationCoords = [sx, sy];
    }
  }

 }

 if (pmax == 0) {
   console.log(`No link station within reach for point ${x},${y}`);
 } else {
  console.log(`Best link station for point ${x},${y} is ${bestStationCoords} with power ${pmax}`);
 }
 console.log();

}

function distanceBetween([x1, y1],[x2, y2]){
  return Math.sqrt(Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2))
}

function calcPower(distance, reach){
  return Math.pow((reach - distance), 2);
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