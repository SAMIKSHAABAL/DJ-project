song="";
rightx =0;
righty =0;
leftx =0;
lefty =0;
function preload(){
song=loadSound("music.mp3")
}

function setup(){
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();

posenet=ml5.poseNet(video,modelLoaded);
posenet.on("pose",gotResults);
}

function modelLoaded(){
    console.log("modelLoaded");
}


function gotResults(results){
if(results.length>0){
    console.log(results);
    rightx=results[0].pose.rightWrist.x;
    righty=results[0].pose.rightWrist.y;
    console.log("RIGHT X = "+ rightx);
    console.log("RIGHT Y = "+ righty);
    leftx=results[0].pose.leftWrist.x;
    lefty=results[0].pose.leftWrist.y;
    console.log("LEFT X = "+ leftx);
    console.log("LEFT Y = "+ lefty);
}
}

function draw(){
    image(video,0,0,600,500);
if(righty>0 && righty<=100){
    document.getElementById("speed").innerHTML="Speed= 0.5"
    song.rate(0.5);
}
else if(righty>100 && righty<=200){
    document.getElementById("speed").innerHTML="Speed= 1"
    song.rate(1);
}
else if(righty>200 && righty<=300){
    document.getElementById("speed").innerHTML="Speed= 1.5"
    song.rate(1.5);
}
else if(righty>300 && righty<=400){
    document.getElementById("speed").innerHTML="Speed= 2"
    song.rate(2);
}
else if(righty>400){
    document.getElementById("speed").innerHTML="Speed= 2.5"
    song.rate(2.5);
}
divide=floor(lefty/500);
song.setVolume(divide);
document.getElementById("volume").innerHTML= "Volume- "+divide;
}

function play(){
song.play();
song.setVolume(1);
song.rate(1);
}