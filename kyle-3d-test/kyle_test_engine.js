import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const stage = document.getElementById('stage');
const status = document.getElementById('status');
const details = document.getElementById('details');
const slider = document.getElementById('rotation');
document.getElementById('under').addEventListener('click', () => {
  document.getElementById('click-result').textContent = '✅ Website button still works!';
});

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
} catch (error) {
  status.textContent = '❌ WebGL unavailable: ' + error.message;
  throw error;
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor(0x000000, 0);
renderer.domElement.style.pointerEvents = 'none';
stage.appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 1000);
scene.add(new THREE.HemisphereLight(0xffffff, 0x9b87a7, 2.2));
const key = new THREE.DirectionalLight(0xffffff, 2.2);
key.position.set(4, 7, 6); scene.add(key);
const fill = new THREE.DirectionalLight(0xc2d5ff, 0.8);
fill.position.set(-4, 2, -4); scene.add(fill);
let model, mixer;
const clock = new THREE.Clock();
const loader = new GLTFLoader();
loader.load('./king_kyle.glb', gltf => {
  // The blockout was authored Z-up with its face toward -Y.
  // Rotate its local geometry into Three.js Y-up; its face then points +Z toward the camera.
  const original = gltf.scene;
  original.rotation.x = -Math.PI / 2;
  original.updateMatrixWorld(true);
  // A separate pivot lets the rotation slider turn Kyle around his upright Y axis.
  model = new THREE.Group();
  model.add(original);
  scene.add(model);
  const bounds = new THREE.Box3().setFromObject(original);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  // Move the rotated asset's centre to the pivot, without changing its scale.
  original.position.sub(center);
  original.updateMatrixWorld(true);
  model.userData.auditRadius = Math.max(size.length() / 2, 0.05);
  resize();
  const bones = [], skinnedMeshes = [];
  model.traverse(object => {
    if (object.isBone) bones.push(object.name || '(unnamed bone)');
    if (object.isSkinnedMesh) skinnedMeshes.push(object.name || '(unnamed skinned mesh)');
  });
  const clips = gltf.animations.map(clip => clip.name || '(unnamed clip)');
  status.textContent = `✅ Kyle upright (Z-up corrected) • 3D geometry loaded • ${bones.length} bones • ${clips.length} animation clips`;
  details.textContent = `Bones: ${bones.length ? bones.join(', ') : 'None detected'}\nSkinned meshes: ${skinnedMeshes.length ? skinnedMeshes.join(', ') : 'None detected'}\nAnimations: ${clips.length ? clips.join(', ') : 'None detected'}`;
  // This inspection viewer deliberately does not fake a waving animation.
  if (gltf.animations.length) {
    const idle = gltf.animations.find(clip => clip.name === 'idle_breathing');
    if (idle) { mixer = new THREE.AnimationMixer(original); mixer.clipAction(idle).play(); }
  }
}, undefined, error => {
  status.textContent = '❌ Model failed to load. Open this test from GitHub Pages, not a local file.';
  details.textContent = String(error?.message || error);
});
slider.addEventListener('input', () => {
  if (model) model.rotation.y = THREE.MathUtils.degToRad(Number(slider.value));
});
document.getElementById('reset').addEventListener('click', () => {
  slider.value = '0'; if (model) model.rotation.y = 0;
});
function fitCamera() {
  if (!model) return;
  const aspect = Math.max(camera.aspect, 0.1);
  const radius = model.userData.auditRadius;
  const verticalHalfFov = THREE.MathUtils.degToRad(camera.fov) / 2;
  const horizontalHalfFov = Math.atan(Math.tan(verticalHalfFov) * aspect);
  const distance = radius / Math.sin(Math.min(verticalHalfFov, horizontalHalfFov)) * 1.15;
  camera.position.set(0, 0, distance);
  camera.lookAt(0, 0, 0);
  camera.near = Math.max(0.01, distance - radius * 2);
  camera.far = distance + radius * 3;
  camera.updateProjectionMatrix();
}
function resize() {
  const w = stage.clientWidth, h = stage.clientHeight;
  if (!w || !h) return;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
  fitCamera();
}
new ResizeObserver(resize).observe(stage);
resize();
let frame = 0;
function render() {
  frame = requestAnimationFrame(render);
  const delta = Math.min(clock.getDelta(), 0.05);
  if (mixer) mixer.update(delta);
  renderer.render(scene, camera);
}
render();
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { cancelAnimationFrame(frame); }
  else { clock.getDelta(); render(); }
});
