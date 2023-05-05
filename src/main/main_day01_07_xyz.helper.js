import * as THREE from "three";
//导入轨道控制器
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
//导入动画库
import gsap from "gsap";
//导入 dat.gui
import * as dat from "dat.gui";
import {color} from "dat.gui";

console.log("THREE",THREE);

//目标1 创建坐标辅助系
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

//初始化渲染器
const renderer = new THREE.WebGLRenderer();
//设置渲染的尺寸大小
renderer.setSize(window.innerWidth,window.innerHeight);
console.log("renderer",renderer);

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
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}
render();