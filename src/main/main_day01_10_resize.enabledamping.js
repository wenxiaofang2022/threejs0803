import * as THREE from "three";
//导入轨道控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
//导入动画库
import gsap from "gsap";
//导入 dat.gui
import * as dat from "dat.gui";
import {color} from "dat.gui";

//目标 阻尼效果+根据尺寸变化实现自适应画面
// https://greensock.com/docs/
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
//设置控制器的阻尼,效果更真实，必须在动画循环里调用update()
controls.enableDamping = true;

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

function render(){
  controls.update();
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