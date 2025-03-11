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
camera.position.set(10, 10, 10)


const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setAnimationLoop( animate );
const container = document.getElementById('scene-container')
container.appendChild( renderer.domElement );
const controls = new OrbitControls(camera, renderer.domElement)


const dirLight = new THREE.DirectionalLight()
dirLight.position.set(1, 2, 3)
scene.add(dirLight)
const ambient = new THREE.AmbientLight()
scene.add(ambient)
const terrain = new Terrain(10, 10)
scene.add(terrain)

camera.position.z = 4;
const gui = new GUI()
const terrainfolder = gui.addFolder('Terrain')
terrainfolder.add(terrain, 'width', 1, 20, 1).name('width')
terrainfolder.add(terrain, 'height', 1, 20, 1).name('height')
terrainfolder.addColor(terrain.material, 'color').name('Color')
terrainfolder.onChange(()=>{
    terrain.createGeometry();
})
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