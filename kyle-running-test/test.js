import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
const stage=document.getElementById('stage'),status=document.getElementById('status'),details=document.getElementById('details');
let renderer;try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});}catch(e){status.textContent='WebGL unavailable: '+e.message;throw e;}
renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.setSize(stage.clientWidth,stage.clientHeight);stage.appendChild(renderer.domElement);
const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(40,1,.01,100000);
scene.add(new THREE.HemisphereLight(0xffffff,0x887799,2.2));const light=new THREE.DirectionalLight(0xffffff,2);light.position.set(2,5,8);scene.add(light);
let model,mixer,action;const clock=new THREE.Clock();
new FBXLoader().load('./kyle_running.fbx',fbx=>{
 model=fbx;scene.add(model);
 const bones=[],meshes=[];fbx.traverse(o=>{if(o.isBone)bones.push(o.name);if(o.isMesh)meshes.push(o.name)});
 const box=new THREE.Box3().setFromObject(model),size=box.getSize(new THREE.Vector3()),center=box.getCenter(new THREE.Vector3());
 model.position.sub(center);
 const clips=fbx.animations||[];
 details.textContent=`Bones (${bones.length}): ${bones.join(', ')||'None'}\nMeshes (${meshes.length}): ${meshes.join(', ')||'None'}\nAnimations (${clips.length}): ${clips.map(c=>`${c.name||'(unnamed)'} (${c.duration.toFixed(2)}s, ${c.tracks.length} tracks)`).join(', ')||'None'}\nOriginal dimensions: ${size.x.toFixed(2)} × ${size.y.toFixed(2)} × ${size.z.toFixed(2)}`;
 status.textContent=`Loaded: ${bones.length} bones, ${clips.length} clips`;
 if(clips.length){mixer=new THREE.AnimationMixer(model);action=mixer.clipAction(clips[0]);action.play();status.textContent+=' — playing first clip';}
 fit();
},p=>{if(p.total)status.textContent=`Loading ${Math.round(p.loaded/p.total*100)}%`;},e=>{status.textContent='Failed to load model';details.textContent=String(e.message||e)});
function fit(){if(!model)return;const box=new THREE.Box3().setFromObject(model),s=box.getSize(new THREE.Vector3());const radius=Math.max(s.length()/2,1);const fov=THREE.MathUtils.degToRad(camera.fov)/2;const h=Math.atan(Math.tan(fov)*camera.aspect);const distance=radius/Math.sin(Math.min(fov,h))*1.3;camera.position.set(0,0,distance);camera.lookAt(0,0,0);camera.near=Math.max(.01,distance-radius*3);camera.far=distance+radius*4;camera.updateProjectionMatrix()}
function resize(){const w=stage.clientWidth,h=stage.clientHeight;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h);fit()}new ResizeObserver(resize).observe(stage);
document.getElementById('play').onclick=()=>{if(action){action.paused=false;action.play()}};
document.getElementById('pause').onclick=()=>{if(action)action.paused=true};
document.getElementById('front').onclick=()=>{document.getElementById('rotation').value=0;if(model)model.rotation.y=0};
document.getElementById('rotation').oninput=e=>{if(model)model.rotation.y=THREE.MathUtils.degToRad(+e.target.value)};
function tick(){requestAnimationFrame(tick);const dt=Math.min(clock.getDelta(),.05);if(mixer)mixer.update(dt);renderer.render(scene,camera)}tick();
