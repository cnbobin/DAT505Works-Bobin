  var scene = new THREE.Scene();

  var camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,.1,100000);

  camera.position.set(0,50,600);
  camera.lookAt(scene.position);
  var softlight = new THREE.AmbientLight( 0x404040 ,2);
  scene.add( softlight );
  var light = new THREE.PointLight( 0xffffff, 10, 7000 );
  light.position.set( -5000, 50, 500 );
  scene.add( light );


  var renderer = new THREE.WebGLRenderer({antialias:true});
  //scene camera renderer
  renderer.setClearColor('#000000');
  renderer.setSize(window.innerWidth *0.8 , window.innerHeight *0.8);
  renderer.render(scene,camera);
//Prepare


  document.getElementById("webgl").appendChild(renderer.domElement);

  var geometry = new THREE.SphereGeometry(4,20,20);
  var geometry2 = new THREE.SphereGeometry(14,20,20);

  var texmoon=new THREE.TextureLoader().load( "moon.jpg" );
  var texearth=new THREE.TextureLoader().load( "earth.jpg" );

  var material = new THREE.MeshLambertMaterial();
  material.map = texmoon;

  var material2 = new THREE.MeshLambertMaterial();
  material2.map = texearth;

  var mesh = new THREE.Mesh(geometry,material);
  var mesh2 =new THREE.Mesh(geometry2,material2);



  mesh.rotation.y=10;

  mesh2.position.x = -5;
  var rad = 0
  scene.add(mesh);
  scene.add(mesh2);


  var kfrm = 0;

function render(){
  renderer.render(scene,camera);
  mesh.rotateY(0.006);
  mesh2.rotateY(0.006);

  rad +=0.006;
  var x = 440*Math.sin(rad);
  var z = 440*Math.cos(rad);
  mesh.position.x= x;
  mesh.position.z= z;

  kfrm++;
  if(kfrm > 10){
    document.getElementById("showMoon").innerHTML = mesh.position.x.toFixed(2);
    kfrm = 0;
  }


  //mesh.position=(x,y,z);
  requestAnimationFrame(render);
}


render();
var controls = new THREE.OrbitControls(camera);
//controls.addEventListener('change',render);

function ZoominFunc(){
camera.position.z -= 100;
}

document.getElementById("zoomin").addEventListener("click",ZoominFunc);

 window.onload = function () {

    }
    // 窗口resize事件
    window.onresize = function () {
        // 重新初始化尺寸
        camera.aspect = dom.clientWidth / dom.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(dom.clientWidth, dom.clientHeight)
    }
