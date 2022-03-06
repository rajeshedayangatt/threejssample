import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls'




const raycaster = new THREE.Raycaster();
const clock = new THREE.Clock();
const scene = new THREE.Scene()


const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000)
camera.position.set(1,1,1)


//Lighting
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
hemiLight.position.set( 0, 200, 0 );
scene.add( hemiLight );

const dirLight = new THREE.DirectionalLight( 0xffffff );
dirLight.position.set( 0, 100, 100 );
dirLight.castShadow = true;
dirLight.shadow.camera.top = 180;
dirLight.shadow.camera.bottom = - 100;
dirLight.shadow.camera.left = - 120;
dirLight.shadow.camera.right = 120;
scene.add( dirLight );





const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.outputEncoding = THREE.sRGBEncoding;
document.body.appendChild(renderer.domElement)



var fpControls = new FirstPersonControls( camera, renderer.domElement );
fpControls.movementSpeed = 4;
fpControls.lookSpeed = 0.1;
fpControls.lookVertical = true;
fpControls.mouseDragOn = true;
fpControls.minDistance = 1;




//Model Loading
const fbxLoader = new FBXLoader()
fbxLoader.load(
    '../src/Holland_FBX_V010.fbx',
    (object) => {

       object.scale.set(.01, .01, .01)
       scene.add(object)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)




document.addEventListener('click', onDocumentMouseClick, false);
window.addEventListener('resize', onWindowResize, false)


animate()


function animate() {
    
  requestAnimationFrame(animate)
  render()

}

function render() {
  
    fpControls.update(clock.getDelta())
    renderer.render(scene, camera)

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}



function onDocumentMouseClick(event) {


  fpControls.enabled = true;

  var intersects = raycaster.intersectObjects( scene.children );

  let object_point_info = "";

  for ( var i = 0; i < intersects.length; i++ ) {

      let obj_name = intersects[i].object.name;
      let obj_uuid = intersects[i].object.uuid;
      let obj_point = intersects[i].point;


      object_point_info = `Name : ${obj_name} , UUID : ${obj_uuid} , Vector Point : ${obj_point.x},${obj_point.y},${obj_point.z}`

  }

  alert(object_point_info)
  console.log(object_point_info)


}

