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

  AppendDog();
  InitData();
}

//数据的抽样和量化               原始的收集、整理     >>   清洗    >>  抽样与量化
//NJ 300  SZ 420              :  NJ 1  SZ 1.4
//OriginData NJ 450  SZ 600   :  NJ 0.67  SZ  0.7
function InitData(){
  mydata=new Array(1.1, 0.8,  0.7,  1.2,  1.6,  1.0,  0.9,  1.1,  1.8,  1.6);
}

function AppendDog(){
  var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load("dog1.mtl", function(materials){

  	materials.preload();
    var loader = new THREE.OBJLoader();
    loader.load('dog1.obj', function(obj) {
        obj.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                child.material.side = THREE.DoubleSide;
            }
        });
        obj.scale.set(5,5,5);
        obj.position.z = -300;
        obj.children[0].geometry.center();
        obj1 = obj;
        group.add( obj );
    });
  });

  window.addEventListener( "mousedown", onDocumentMouseDown, false );
}

function onDocumentMouseDown( event ) {

  var intersects = getIntersects( event.layerX, event.layerY );
  if ( intersects.length > 0 ) {
    var res = intersects.filter( function ( res ) {
      return res && res.object;
    } )[ 0 ];
    if ( res && res.object ) {
      res.object.material.color.set(Math.random() *0xffffff);
      //selectedObject.scale.set(Math.random()*5, Math.random()*4,Math.random()*6)
      console.log(res.object.name);
    }
  }
}

function getIntersects( x, y ) {
  x = ( x / window.innerWidth ) * 2 - 1;
  y = - ( y / window.innerHeight ) * 2 + 1;
  mouseVector.set( x, y, 0.5 );
  raycaster.setFromCamera( mouseVector, camera );
  return raycaster.intersectObject( group, true );
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

function render(){
 renderer.render(scene,camera);
 requestAnimationFrame(render);
 if(canRote){
   var axis = new THREE.Vector3(0,1,0);
   obj1.rotateOnAxis(axis,0.005);
 }
}

Init();
CreateBox();
render();
