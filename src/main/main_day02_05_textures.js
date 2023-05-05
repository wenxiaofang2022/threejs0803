import * as THREE from "three";
//导入轨道控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
//导入动画库
import gsap from "gsap";
//导入 dat.gui
import * as dat from "dat.gui";
import {color} from "dat.gui";

//目标 熟悉材质与纹理

// quick link
//1，创建场景
const scene = new THREE.Scene();
//2，创建相机
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
//设置相机位置
camera.position.set(0,0,10);
scene.add(camera);

//导入纹理
const textureLoader = new THREE.TextureLoader();
const doorTexture = textureLoader.load("./textures/texture_1.jpg");

//设置纹理偏移
doorTexture.offset.x = 0.5;
doorTexture.offset.y = 0.5;
//doorTexture.offset.set(0.5,0.5);

//纹理旋转
//旋转45度
doorTexture.rotation = Math.PI / 4;
//设置纹理旋转原点
doorTexture.center.set(0.5,0.5);

//设置纹理的重复
doorTexture.repeat.set(2,3);//水平重复2次 竖直重复3次
//设置纹理重复的模式
// doorTexture.wrapS = THREE.RepeatWrapping;
// doorTexture.wrapT = THREE.RepeatWrapping;
// doorTexture.wrapS = THREE.MirroredRepeatWrapping;
// doorTexture.wrapT = THREE.MirroredRepeatWrapping;
doorTexture.wrapS = THREE.RepeatWrapping;
doorTexture.wrapT = THREE.MirroredRepeatWrapping;

//添加物体
const cubeGeometry = new THREE.BoxBufferGeometry(2,2,2);
//材质
const basicMaterial = new THREE.MeshBasicMaterial({
  color:"#ffff00",
  map:doorTexture
});
const cube = new THREE.Mesh(cubeGeometry,basicMaterial);
scene.add(cube);
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