import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import fragmentShaderSnorlax from "./shaders/snorlax/fragment.glsl";
// import vertexShaderSnorlax from "./shaders/snorlax/vertex.glsl";
import fragmentShaderSnorlax from "./shaders/snorlax/fragment.js";
import vertexShaderSnorlax from "./shaders/snorlax/vertex.js";

// import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
// import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

export default class Snorlax {
  constructor() {
    this.gltfLoader = new GLTFLoader();
    this.textureLoader = new THREE.TextureLoader();
    this.backgroundColor =
      "linear-gradient(0deg, rgb(68 99 49) 0%, rgb(163 174 255) 100%)";

    this.setMaterial();
    this.setShape();
  }

  setMaterial() {
    const map = this.textureLoader.load("./assets/sk-uv-new.png");
    map.flipY = false;

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertexShaderSnorlax,
      fragmentShader: fragmentShaderSnorlax,
      uniforms: {
        uTime: { value: 0 },
        uDragStart: { value: new THREE.Vector3() },
        uDragTarget: { value: new THREE.Vector3() },
        uDragReleaseTime: { value: 0 },
        uDragRelease: { value: 1 },
        uReleaseDecay: { value: 10 },
        uReleaseFrequency: { value: 55 },
        uMap: { value: map },
      },
      transparent: true,
    });
  }

  setShape() {
    // console.log("gltfLoader",this.gltfLoader);
    let loader = new GLTFLoader();
    // console.log("loader",loader);

    // const ktx2Loader = new KTX2Loader()
		// 			.setTranscoderPath( '/libs/basis/' )
		// 			.detectSupport( this.renderer );
    // let loader = new GLTFLoader().setCrossOrigin('anonymous')
    //   .setKTX2Loader( ktx2Loader )
    //   .setMeshoptDecoder( MeshoptDecoder );

    loader.load("./assets/snorlax_222.glb", (gltf) => {
      this.shape = gltf.scene.children[0];
      console.log("this.shape",this.shape);
      this.shape.scale.set(0.6,0.6,0.6);
      this.shape.material = this.material;
    });
  }

  onMouseDown(position) {
    this.material.uniforms.uDragStart.value.copy(position);
    this.material.uniforms.uDragTarget.value.copy(position);
    this.material.uniforms.uDragRelease.value = false;
  }

  onMouseMove(position) {
    this.material.uniforms.uDragTarget.value.copy(position);
  }

  onMouseUp(time) {
    this.material.uniforms.uDragReleaseTime.value = time;
    this.material.uniforms.uDragRelease.value = true;
  }

  update(time) {
    this.material.uniforms.uTime.value = time;
  }

  setConfig(folder) {
    folder.addInput(this.material.uniforms.uReleaseDecay, "value", {
      min: 0.5,
      max: 30,
      label: "releaseDecay",
    });
    folder.addInput(this.material.uniforms.uReleaseFrequency, "value", {
      min: 1,
      max: 100,
      label: "releaseFrequency",
    });
  }
}
