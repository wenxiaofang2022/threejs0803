import * as THREE from "three";
//导入轨道控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
//导入动画库
import gsap from "gsap";
//导入 dat.gui
import * as dat from "dat.gui";
import {color} from "dat.gui";

//目标 掌握几何体顶点_UV_法向属性
//normal法相 当前面的朝向 uv 几何体展开图
//position 顶点 例如正方体 6个面 每个面 4 个点 共24个点 每个点 xyz三个坐标 共 72个坐标
//增加顶点，可以增加面，进而对某个面进行凹陷或者突出处理，满足视觉效果
// quick link
//1，创建场景
const scene = new THREE.Scene();
//2，创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
//设置相机位置
camera.position.set(0,0,10);
scene.add(camera);
//添加物体
//创建几何体
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({color:0xffff00});
//根据几何体和材质创建物体
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
//将几何体添加到场景当中
scene.add(cube);
console.log("cubeGeometry.attributes",cubeGeometry.attributes);

//位置
//cube.position.set(5,0,0);
//cube.position.x = 5;
//缩放
// cube.scale.set(3,2,1);
//cube.scale.x = 5;
//旋转
// cube.rotation.set(0,1,0,'XYZ');
// 2*Math.PI = 360 deg
// cube.rotation.set(Math.PI / 4,0,0,'XYZ');

const gui = new dat.GUI();
//修改物体位置
gui.add(cube.position,"x").min(0).max(5).step(0.1).name("移动x轴")
// .onChange((value)=>{
//   console.log("值被修改了",value);
// })
.onFinishChange((value)=>{
  console.log("停下来了",value);
});
//修改物体颜色
const params = {
  color:"#ffff00",
  fn:()=>{
    //让立方体运动起来
    gsap.to(cube.position,{y:5,duration:2,yoyo:true,repeat:-1})
  }
};
const data = {
  width: 15,
  height: 15,
  depth: 15,
  widthSegments: 1,
  heightSegments: 1,
  depthSegments: 1
};
function generateGeometry() {

  // updateGroupGeometry( mesh,
  //   new BoxGeometry(
  //     data.width, data.height, data.depth, data.widthSegments, data.heightSegments, data.depthSegments
  //   )
  // );

}
gui.addColor(params,'color').name("颜色").onChange((value)=>{
  cube.material.color.set(value);
})
//设置是否显示 选项框
gui.add(cube,'visible').name("是否显示");
//设置按钮点击触发某个事件
gui.add(params,"fn").name("立方体运动");
// 设置文件夹
var folder = gui.addFolder("设置立方体");
folder.add(cube.material,"wireframe");
folder.add( data, 'width', 1, 30 ).onChange( generateGeometry );
folder.add( data, 'height', 1, 30 ).onChange( generateGeometry );
folder.add( data, 'depth', 1, 30 ).onChange( generateGeometry );
folder.add( data, 'widthSegments', 1, 10 ).step( 1 ).onChange( generateGeometry );
folder.add( data, 'heightSegments', 1, 10 ).step( 1 ).onChange( generateGeometry );
folder.add( data, 'depthSegments', 1, 10 ).step( 1 ).onChange( generateGeometry );

//初始化渲染器
const renderer = new THREE.WebGLRenderer();
//设置渲染的尺寸大小
renderer.setSize(window.innerWidth,window.innerHeight);

//将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

//使用渲染器，通过相机将场景渲染进来
// renderer.render(scene,camera);

//创建轨道控制器
const controls = new OrbitControls(camera,renderer.domElement);

//添加坐标轴辅助系
//x-红 y-绿 z-蓝
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//设置时钟
const clock = new THREE.Clock();

//设置动画
var animate1 = gsap.to(cube.position,{
  x:5,
  duration:5,
  ease:"power1.inOut",
  //设置重复的次数
  // repeat:2,
  //无限循环
  repeat:-1,
  //往返运动
  yoyo:true,
  //延迟时间
  delay:2,
  onStart:()=>{
    console.log("动画开始");
  },
  onComplete:()=>{
    console.log("动画完成");
  }
});
gsap.to(cube.rotation,{x:2*Math.PI,duration: 5,ease:'bounce.out'});

//dbclick 不生效？ ==> dblclick
window.addEventListener("click",()=>{
  //暂停和恢复
  if(animate1.isActive()){
    animate1.pause();
  }
  else{
    animate1.resume();
  }
});
window.addEventListener("dblclick",()=>{
  //双击控制屏幕进入全屏，退出全屏
  const fullScreenElement = document.fullscreenElement;
  if(!fullScreenElement){
    //画布元素对象上请求全屏
    renderer.domElement.requestFullscreen();
  }
  else{
    //renderer.domElement.exitFullScreen();
    //文档上退出全屏
    document.exitFullscreen();
  }
});

function render(){
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}
render();

//监听画面变化，更新渲染画面
window.addEventListener("resize",()=>{
  //更新摄像头
  camera.aspect = window.innerWidth/window.innerHeight;
  //更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  //更新渲染器
  renderer.setSize(window.innerWidth,window.innerHeight);
  //更新渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
})