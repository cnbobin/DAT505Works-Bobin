//We declare our vars together here, so that they are available in the Global Scope (everywhere) in our script
var renderer, scene, camera;
//Create a new set of (empty) arrays that will store cubes, and other data related to our rotations
var cubes = [];
var randomRotation1 = [];
var randomRotation2 = [];
var randomRotation3=[];

var rot1 = [];
var rot2 = [];
var rot3=[];

function init() {
    //We use an init function to ensure that our code loads synchronously (in the correct order)
    scene = new THREE.Scene();

    //We use Javascript here to get the window height and width, as an integer, so that we can use it later in our algorithim
    var W = window.innerWidth,
        H = window.innerHeight;

    camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
    camera.position.set(0,75, 60);
    camera.lookAt(scene.position);

    var spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(0, 1000, 0);
    scene.add(spotLight);
    //spotLight.castShadow = true;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x17293a);
    renderer.setSize(W, H);



    //Create a two dimensional grid of objects, and position them accordingly
    for (var x = -45; x <= 45; x += 3) { // Start from -45 and sequentially add one every 5 pixels
        for (var y = -30; y <= 30; y += 3) {
            var boxGeometry = new THREE.BoxGeometry(1, 2 ,1);
            //The color of the material is assigned a random color
            var boxMaterial = new THREE.MeshLambertMaterial({ color:  0xFFFFFF });
            var box = new THREE.Mesh(boxGeometry, boxMaterial);


            box.position.y =Math.sin(x)*3

            box.position.x = x;
            box.position.z = y;
            box.position.y =x;
            box.scale.y = 0.5;


            //Create a random value and push it to our rot1 array
            var randomValue1 = (Math.random() * 1) - 0.5;
            randomRotation1.push(randomValue1);
            rot1.push(0);


            //Create a random value and push it to our rot2 array
            var randomValue2 = (Math.random() * 1) - 0.5;
            randomRotation2.push(randomValue2);
            rot2.push(0);

            randomRotation3.push(y/5);
            rot3.push(x/5);

            scene.add(box);
            //add them to our array
            cubes.push(box);
        }
    }

    document.body.appendChild(renderer.domElement);
}

var t;

function drawFrame() {
    requestAnimationFrame(drawFrame);

    //for each cube in the cube array, we select the corresponding entry to our rot1 and rot2 arrays,
    //because this is in our drawFrame loop, this will update every frame
    cubes.forEach(function (c, i) {
        rot1[i] += randomRotation1[i] / 10;
      rot2[i] += randomRotation2[i] / 10;

      randomRotation3[i]+=0.03;
      rot3[i]+=0.03;


    c.position.y=Math.cos(rot3[i])*5+Math.cos(randomRotation3[i])*5;

    });

    renderer.render(scene, camera);
}

//run our init and drawFrame functions in order
init();
drawFrame();
