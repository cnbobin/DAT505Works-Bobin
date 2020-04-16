
var scene,clock,mixer,point,ambient,renderer;
var camera;

function InitScene(){
  scene = new THREE.Scene();
  clock = new THREE.Clock();
  point = new THREE.PointLight(0xffffff);
  ambient = new THREE.AmbientLight(0x444444);
  renderer = new THREE.WebGLRenderer();
  mixer=null;//声明一个混合器变量

  point.position.set(400, 200, 300); //点光源位置
  scene.add(point); //点光源添加到场景中
  scene.add(ambient);
  /**
   * 相机设置
   */
  var width = window.innerWidth; //窗口宽度
  var height = window.innerHeight; //窗口高度
  var k = width / height; //窗口宽高比
  var s = 150; //三维场景显示范围控制系数，系数越大，显示的范围越大

  camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
  camera.position.set(200,0,200); //设置相机位置
  camera.lookAt(0,0,0); //设置相机方向(指向的场景对象)

  renderer.setSize(width, height); //设置渲染区域尺寸
  renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
  document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

}

function LoadFBX(){
  var loader = new THREE.FBXLoader();//创建一个FBX加载器

  loader.load("SambaDancing.fbx", function(obj) {
    // console.log(obj)
    scene.add(obj)
    obj.translateY(-80);
    // obj作为参数创建一个混合器，解析播放obj及其子对象包含的动画数据
    mixer = new THREE.AnimationMixer(obj);
    // 查看动画数据
    console.log(obj.animations)
    // obj.animations[0]：获得剪辑对象clip
    var AnimationAction=mixer.clipAction(obj.animations[0]);
    // AnimationAction.timeScale = 1; //默认1，可以调节播放速度
    // AnimationAction.loop = THREE.LoopOnce; //不循环播放
    // AnimationAction.clampWhenFinished=true;//暂停在最后一帧播放的状态
    AnimationAction.play();//播放动画
  })
}

// 渲染函数
function render() {
  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧

  if (mixer !== null) {
    //clock.getDelta()方法获得两帧的时间间隔
    // 更新混合器相关的时间
    mixer.update(clock.getDelta());
  }
}

InitScene();
LoadFBX();
render();

//创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
var controls = new THREE.OrbitControls(camera);
