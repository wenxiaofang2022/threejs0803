import * as THREE from "three";
//导入轨道控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
//导入动画库
import gsap from "gsap";
//导入 dat.gui
import * as dat from "dat.gui";
import {color} from "dat.gui";

//目标1 控制3d物体缩放与旋转
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
console.log("cube",cube);

//位置
cube.position.set(5,0,0);
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

//添加坐标轴辅助系
//x-红 y-绿 z-蓝
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function render(){
  cube.rotation.x+=0.01;//从坐标轴看是逆时针，从原点看是顺时针
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}
render();