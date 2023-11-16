song1 = "";
song2 = "";
sngstatus1 = "";
sngstatus2 ="";
leftX = 0;
leftY = 0;
rightX = 0;
rightY = 0;
leftscr = 0;
rightscr = 0;

function setup(){
    canvas = createCanvas(500,500);
    canvas.position(455,250);
    video = createCapture(VIDEO);
    video.hide();
    ml5mdl = ml5.poseNet(video , modelloaded);
    ml5mdl.on("pose",gotposes);
}
function draw(){
    image(video,0,0,500,500); 
    
    sngstatus1 = song1.isPlaying();
    sngstatus2 = song2.isPlaying();
    if(leftscr > 0.1){
        song1.stop()
        song2.stop()
        fill(255,0,0)
        stroke(255,0,0)
        circle(leftX , leftY , 25);
        song1.play();
        song1.setVolume(1);
        song1.rate(1);
        document.getElementById("sngname").innerHTML = "Song Name: song1"
    }
    if(rightscr > 0.1){
        song1.stop()
        song2.stop()
        fill(255,0,0)
        stroke(255,0,0)
        circle(rightX , rightY , 25);
        song2.play();
        song2.setVolume(1);
        song2.rate(1);
        document.getElementById("sngname").innerHTML = "Song Name: song2"
    }
}
function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function modelloaded(){
    console.log("Model is loaded");
}
function gotposes(results){
    if(results.length > 0){
        console.log(results);
        leftX = results[0].pose.leftWrist.x;
        leftY = results[0].pose.leftWrist.y;
        rightX = results[0].pose.rightWrist.x;
        rightY = results[0].pose.rightWrist.y;
        leftscr = results[0].pose.keypoints[9].score;
        rightscr = results[0].pose.keypoints[10].score;
        console.log(leftX ,leftY ,rightX ,rightY) ,"<br>" , leftscr, rightscr;
    }
}