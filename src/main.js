import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TextureLoader } from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js'
import { Terrain } from './terrain';


const stats = new Stats()
document.body.appendChild(stats.dom)
const loader = new TextureLoader()

const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue')
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setAnimationLoop( animate );
const container = document.getElementById('scene-container')
container.appendChild( renderer.domElement );
const controls = new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const texture = loader.load("assets/textures/pexels-steve-1585325.jpg")
const material = new THREE.MeshStandardMaterial( { 
    map: texture
 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
const dirLight = new THREE.DirectionalLight()
dirLight.position.set(1, 2, 3)
scene.add(dirLight)
const ambient = new THREE.AmbientLight()
scene.add(ambient)
const terrain = new Terrain(10, 10)
scene.add(terrain)

camera.position.z = 4;
const gui = new GUI()
const folder = gui.addFolder('Cube')
folder.add(cube.position, 'x', -2, 2, 1).name('X position')
folder.add(cube.position, 'y', -2, 2, 1).name('Y position')
folder.add(cube.position, 'z', -2, 2, 1).name('Z position')
controls.update()
animate()
function animate() {
    requestAnimationFrame(animate)

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );
    controls.update()

}

window.addEventListener("resize", ()=>{
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
})