import * as THREE from "./three.module.js";

let introInDom = document.querySelector("#intro-sect div.bg");

let camera, scene, renderer;
let geometry, mesh, particlesCnt, posArray;
let starGeometry, starMaterial, stars;
let light;
let mouseY = 100,
  mouseX = 100;

document.addEventListener("mousemove", mouseAnimateParticles);
//document.addEventListener("touchmove", mouseAnimateParticles);
init()
function mouseAnimateParticles(ev) {
  mouseY = ev.clientY;
  mouseX = ev.clientX;
}
const clock = new THREE.Clock();

function init() {
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerHeight / window.innerWidth,
    1,
    1000
  );

  camera.position.z = 1;
  camera.rotation.x = Math.PI / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  scene = new THREE.Scene();
  starGeometry = new THREE.Geometry();
  for (let i = 0; i < 6000; i++) {
    let star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    star.velocity = 0;
    star.acceleration = 0.02;
    star.boost = 0.6;
    starGeometry.vertices.push(star);
  }
  let sprite = new THREE.TextureLoader().load("star.png");
  starMaterial = new THREE.PointsMaterial({
    color: 0xcccccc,
    size: 0.7,
    map: sprite,
  });
  stars = new THREE.Points(starGeometry, starMaterial);
  stars.displacementY = 0;
  console.log(stars.rotation.z);
  stars.displacementZ = 0;
  stars.displacementZLimit = 0;
  scene.add(stars);
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor("#000000");
  renderer.setSize(window.innerWidth, window.innerHeight);
  introInDom.appendChild(renderer.domElement);
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}

function animate(params) {
    starGeometry.vertices.forEach((p) => {
    let boost = p.boost > 0 ? p.boost : 0;
    
    p.velocity += p.acceleration + boost;
    p.y -= p.velocity;
    p.boost -= 0.002;

    if (p.y < -300) {
      pointReset(p)
    }
  });
 stars.rotation.y += sineWave(stars);
// if (stars.rotation.x < 361) {
//   stars.rotation.x += sineWave(stars,true);
  
// }
  
  starGeometry.verticesNeedUpdate = true;

  
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

function sineWave(target, z=false, amplitude = 0.009, frequency = 360){
    if (z) {
      let y = amplitude * Math.sin(stars.displacementZ / frequency);
      stars.displacementZ += 1;
      return y
    } else {
      
    }
    
        let y = amplitude * Math.sin(stars.displacementY/frequency);
        stars.displacementY += 1;
         return y
        
    
}

function pointReset(point) {
  point.y = Math.random() * 100 + 170;
      point.velocity = 0;
      point.z = Math.random() * 600 - 300
      point.x = Math.random() * 600 - 300
}


function easeInExpo(x) {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
}
function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}
function easeInCirc(x) {
  return 1 - Math.sqrt(1 - Math.pow(x, 2));
}

export {init,animate}