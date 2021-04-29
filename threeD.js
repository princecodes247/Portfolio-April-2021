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

function mouseAnimateParticles(ev) {
  mouseY = ev.clientY;
  mouseX = ev.clientX;
}
const clock = new THREE.Clock();
init();
setTimeout(animate(), 13000);
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
    star.boost = 1;
    starGeometry.vertices.push(star);
  }
  let sprite = new THREE.TextureLoader().load("star.png");
  starMaterial = new THREE.PointsMaterial({
    color: 0xcccccc,
    size: 0.7,
    map: sprite,
  });
  stars = new THREE.Points(starGeometry, starMaterial);
  // geometry = new THREE.BufferGeometry();
  // particlesCnt = 2000;
  // posArray = new Float32Array(particlesCnt * 3);

  // for (let i = 0; i < particlesCnt * 3; i++) {
  //   posArray[i] = (Math.random() - 0.5) * (Math.random() * 40);
  // }
  // geometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

  // const material = new THREE.PointsMaterial({
  //   size: 0.009,
  //   blending: THREE.AdditiveBlending,
  // });

  //mesh = new THREE.Points(geometry, material);
  // mesh.position.x = 0;
  // mesh.position.y = 0;
  scene.add(stars);
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor("#000000");
  //renderer.setClearAlpha(1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  introInDom.appendChild(renderer.domElement);
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}

function animate(params) {
  // const elaspedTime = clock.getElapsedTime();
  // stars.rotation.y = mouseX * (elaspedTime * 0.00009);
  // stars.rotation.x = mouseY * (elaspedTime * 0.00009);
  //stars.rotation.z += 0.007;
  starGeometry.vertices.forEach((p) => {
    let boost = p.boost > 0 ? p.boost : 0;
    p.velocity += p.acceleration + boost;
    p.y -= p.velocity;
    p.boost -= 0.008;

    if (p.y < -200) {
      p.y = 200;
      p.velocity = 0;
    }
  });
  stars.rotation.y += 0.004;
  starGeometry.verticesNeedUpdate = true;

  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
