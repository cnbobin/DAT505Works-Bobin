var scene,camera,renderer;
var geometry,material,mesh;
var tid = -1;
init();
geometry();
render();
setInterval("ChangeTexture();",200);

function init(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,30,100000);
  renderer = new THREE.WebGLRenderer({
    antialias:true
  })
  renderer.setClearColor("#FFCC00")
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);
}

function geometry(){
  var light1 = new THREE.AmbientLight(0xffffff,0.5);//设置环境光
  scene.add(light1);//加入环境光
  var light2 = new THREE.PointLight(0xffffff,0.5);//设置点光源
  scene.add(light2);//加入点光源

  var geometry = new THREE.CubeGeometry(300,300,300);
  mesh = new THREE.Mesh(geometry,material);
  mesh.position.z = -1000;
  scene.add(mesh);
}

  function ChangeTexture(){
    tid++;
    switch(tid){
      case 0:
        var texture = new THREE.TextureLoader().load('pic/bird1.png');
        var material = new THREE.MeshBasicMaterial( { map:texture,transparent:true } );
        mesh.material = material;
      break;

      case 1:
        var texture = new THREE.TextureLoader().load('pic/bird2.png');
        var material = new THREE.MeshBasicMaterial( { map:texture,transparent:true } );
        mesh.material = material;
        console.log(tid);
        tid = 1;
      break;

      case 2:
        var texture = new THREE.TextureLoader().load('pic/bird3.png');
        var material = new THREE.MeshBasicMaterial( { map:texture,transparent:true } );
        mesh.material = material;
        console.log(tid);
        tid = -1;
      break;
    }
  }


function render(){
  //mesh.rotation.x += 0.01;
  requestAnimationFrame(render);
  renderer.render(scene,camera);
}
