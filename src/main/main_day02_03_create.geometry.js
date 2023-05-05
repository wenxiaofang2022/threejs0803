import * as THREE from "three";
//导入轨道控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
//导入动画库
import gsap from "gsap";
//导入 dat.gui
import * as dat from "dat.gui";
import {color} from "dat.gui";

//目标 打造酷炫三角形 巩固顶点创造几何体的知识

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
for (let i=0;i<50;i++){
  //每个三角形需要三个顶点，每个顶点需要三个值
  const Geometry = new THREE.BufferGeometry();
  const positionArray = new Float32Array(9);
  for(let j=0;j<9;j++){
    positionArray[j] = Math.random()*10 - 5;
  }
  Geometry.setAttribute("position",new THREE.BufferAttribute(positionArray,3));
  let color = new THREE.Color(Math.random(),Math.random(),Math.random());
  const Material = new THREE.MeshBasicMaterial({
    color:color,
    transparent:true,
    opacity:0.5
  });

  const mesh = new THREE.Mesh(Geometry,Material);
  scene.add(mesh);
}

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