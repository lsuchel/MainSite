import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render( scene, camera);

const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial( {color: 0x00ff00});
const torus = new THREE.Mesh(geometry, material);

scene.add( torus )

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight,ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry =  new THREE.SphereGeometry(0.3,24,24);
  const material = new THREE.MeshStandardMaterial({color: 0xebfc53})
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
}

Array(115).fill().forEach(addStar);

const bgLoader = new THREE.TextureLoader().load('./Images/space.jpg');
scene.background = bgLoader;

const Texture = new THREE.TextureLoader().load('./Images/hand.jpg');

const T = new THREE.Mesh(
  new THREE.BoxGeometry(2.7,2.7,2.7),
  new THREE.MeshBasicMaterial({ map:Texture })
);

scene.add(T);

const MoonTexture = new THREE.TextureLoader().load('./Images/Moon.jpg');

const MT = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({ map:MoonTexture, normalMap:MoonTexture })
);

scene.add(MT);

MT.position.z = 15;
MT.position.setX(-10);


function moveCamera(){
  
  const t = document.body.getBoundingClientRect().top;
  MT.rotation.x += 0.05;
  MT.rotation.y += 0.075;
  MT.rotation.z += 0.05;

  T.rotation.y += 0.02;
  T.rotation.z += 0.02;

  camera.position.x = t * -0.002;
  camera.position.y= t * -0.002;
  camera.position.z = t * -0.01;

}

document.body.onscroll = moveCamera

function animate(){
  requestAnimationFrame(animate);

  torus.rotation.x +=0.01;
  torus.rotation.y +=0.005;
  torus.rotation.z +=0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate()