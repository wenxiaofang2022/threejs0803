import * as THREE from "three";
//导入轨道控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
//导入动画库
import gsap from "gsap";
//导入 dat.gui
import * as dat from "dat.gui";
import {color} from "dat.gui";
import { PlaneGeometry, Texture } from "three";

//目标 环境遮挡贴图(AO)

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
const doorAlphaTexture = textureLoader.load("./textures/alpha_1.jpg");//黑-透明 灰-半透明 白-不透明
const doorAoTexture = textureLoader.load('./textures/ambientOcclusion_1.jpg');
//添加物体
const cubeGeometry = new THREE.BoxBufferGeometry(2,2,2);
//材质
const basicMaterial = new THREE.MeshBasicMaterial({
  color:"#ffff00",
  map:doorTexture,
  alphaMap:doorAlphaTexture,//
  transparent:true,//是否透明
  aoMap:doorAoTexture,//环境遮挡贴图
  // aoMapIntensity:0.8,//遮挡强度
  aoMapIntensity:1,//遮挡强度
  // opacity:0.5,//透明度
  // side:THREE.DoubleSide,//渲染两面
});
basicMaterial.side = THREE.DoubleSide;
const cube = new THREE.Mesh(cubeGeometry,basicMaterial);
scene.add(cube);

//给cube添加第二组uv
cubeGeometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(cubeGeometry.attributes.uv.array,2)
);

//添加平面
const planeGeometry = new THREE.PlaneBufferGeometry(2,2);
const plane = new THREE.Mesh(
  planeGeometry,
  basicMaterial
);
plane.position.set(6,0,0);
scene.add(plane);

//给平面设置第二组 UV
planeGeometry.setAttribute(
  'uv2',
  new THREE.BufferAttribute(planeGeometry.attributes.uv.array,2)
);

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