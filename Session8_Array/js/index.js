var renderer,scene,camera;
var obj1;
var canRote = false;
var mesh1;
var mydata;
var k = 0;
var raycaster;
var mouseVector = new THREE.Vector3();
var group;

function Init(){
  raycaster = new THREE.Raycaster();
  scene = new THREE.Scene();
  group = new THREE.Group();
  scene.add( group );

  camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,1,1000);
  camera.lookAt(scene.position);
  camera.position.set( 0, 0, 0 );

  var light = new THREE.PointLight( 0xffffff, 5, 6990 );
  light.position.set( -5000, 50, 500 );
  scene.add( light );
  scene.background = new THREE.Color( 0xf0f0f0 );

  renderer = new THREE.WebGLRenderer({antialias:true});
  //scene camera renderer
  renderer.setClearColor('#000000');
  renderer.setSize(window.innerWidth , window.innerHeight);
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.render(scene,camera);

  document.getElementById('webgl').appendChild( renderer.domElement);

  var pos = new THREE.Vector3();
  var quat = new THREE.Quaternion();

  InitData();
}

//数据的抽样和量化               原始的收集、整理     >>   清洗    >>  抽样与量化
//NJ 300  SZ 420              :  NJ 1  SZ 1.4
//OriginData NJ 450  SZ 600   :  NJ 0.67  SZ  0.7
function InitData(){
  mydata=new Array(1.1, 0.8,  0.7,  1.2,  1.6,  1.0,  0.9,  1.1,  1.8,  1.6);
  window.addEventListener('keydown',function(e){
    if(e.keyCode == 83){
      canRote = true;
      setInterval(ChangeSharp,500);
    }
  });
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function CreateBox(){
  geometry1 = new THREE.SphereGeometry(100, 100, 100);
  material = new THREE.MeshBasicMaterial({color:"#FFEA6D"} );
  mesh1 = new THREE.Mesh( geometry1, material );
  mesh1.position.z = -500;
  mesh1.scale.set( 1, 1, 1 );
  group.add( mesh1 );
}

function ChangeSharp(){
  if(k < 9){
    k ++;
    mesh1.scale.set(mydata[k],mydata[k],mydata[k]);
    AppendSphere(Math.random() * 600 - 300,Math.random() * 600 - 300,Math.random()*300 - 600)
  }
  else{
    k = -1;
  }
}

function AppendSphere(x,y,z){
  var geometry1 = new THREE.SphereGeometry(100, 100, 100);
  var material = new THREE.MeshBasicMaterial({color:Math.random() *0xffffff} );
  var mesh1 = new THREE.Mesh( geometry1, material );
  mesh1.position.set(x,y,z);
  mesh1.scale.set( 1, 1, 1 );
  group.add( mesh1 );
}

function render(){
 renderer.render(scene,camera);
 requestAnimationFrame(render);
}

Init();
CreateBox();
render();
