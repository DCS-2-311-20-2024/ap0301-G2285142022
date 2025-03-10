//
// 応用プログラミング (robot)
// G284002023 拓殖太郎
//
"use strict"; // 厳格モード

import * as THREE from "three"

const seg = 12; // 円や円柱の分割数
const gap = 0.01; // 胸のマークなどを浮かせる高さ

export function makeMetalRobot() {
  // メタルロボットの設定
  const metalRobot = new THREE.Group
  const metalMaterial = new THREE.MeshPhongMaterial(
    {color: 0x707777, shininess: 500, specular: 0x808080 });
  const redMaterial = new THREE.MeshBasicMaterial({color: 0xc00000});
  const legRad = 0.5; // 脚の円柱の半径
  const legLen = 3; // 脚の円柱の長さ
  const legSep = 1.2; // 脚の間隔
  const bodyW = 3; // 胴体の幅
  const bodyH = 3; // 胴体の高さ
  const bodyD = 2; // 胴体の奥行
  const armRad = 0.4; // 腕の円柱の半径
  const armLen = 3.8; // 腕の円柱の長さ
  const headRad = 1.2; // 頭の半径
  const eyeRad = 0.2; // 目の半径
  const eyeSep = 0.8; // 目の間隔
  //  脚の作成
const legGeometry = new THREE.CylinderGeometry(legRad, legRad, legLen, seg, seg);

// 右脚の作成
const legR = new THREE.Mesh(legGeometry, metalMaterial);
legR.position.set(-legSep / 2, legLen / 2, 0); 
metalRobot.add(legR);

// 左脚の作成
const legL = new THREE.Mesh(legGeometry, metalMaterial);
legL.position.set(legSep / 2, legLen / 2, 0); 
metalRobot.add(legL);
  //  胴体の作成
const bodyGeometry = new THREE.BoxGeometry(bodyW - bodyD, bodyH, bodyD);
const body = new THREE.Group();
body.add(new THREE.Mesh(bodyGeometry, metalMaterial));

const bodyL = new THREE.Mesh(
    new THREE.CylinderGeometry(bodyD / 2, bodyD / 2, bodyH, seg, 1, false, 0, Math.PI),
    metalMaterial
);
bodyL.position.x = (bodyW - bodyD) / 2;
body.add(bodyL);

const bodyR = new THREE.Mesh(
    new THREE.CylinderGeometry(bodyD / 2, bodyD / 2, bodyH, seg, 1, false, Math.PI, Math.PI),
    metalMaterial
);
bodyR.position.x = -(bodyW - bodyD) / 2;
body.add(bodyR);
body.position.y = legLen + bodyH / 2;
body.children.forEach((child) => {
  child.castShadow = true; 
  child.receiveShadow = true; 
});
metalRobot.add(body);
  //  腕の作成
const armGeometry = new THREE.CylinderGeometry(armRad, armRad, armLen, seg, 1);

// 左腕の作成
const armL = new THREE.Mesh(armGeometry, metalMaterial);
armL.position.set(bodyW / 2 + armRad, legLen + bodyH - armLen / 2, 0);
metalRobot.add(armL);

// 右腕の作成
const armR = new THREE.Mesh(armGeometry, metalMaterial);
armR.position.set(-(bodyW / 2 + armRad), legLen + bodyH - armLen / 2, 0);
metalRobot.add(armR);
  //  頭の作成
const head = new THREE.Group(); 
const headGeometry = new THREE.SphereGeometry(headRad, seg, seg);
head.add(new THREE.Mesh(headGeometry, metalMaterial));
head.children.forEach((child) => {
  child.castShadow = true; 
  child.receiveShadow = true; 
});
head.position.y = legLen + bodyH + headRad;
metalRobot.add(head);
// 目の作成
const circleGeometry = new THREE.CircleGeometry(eyeRad, seg);

// 左目の作成
const eyeL = new THREE.Mesh(circleGeometry, redMaterial);
eyeL.position.set(eyeSep / 2, headRad / 3, headRad - 0.04);
head.add(eyeL);

// 右目の作成
const eyeR = new THREE.Mesh(circleGeometry, redMaterial);
eyeR.position.set(-eyeSep / 2, headRad / 3, headRad - 0.04); 
head.add(eyeR);
const triangleGeometry = new THREE.BufferGeometry();
const triangleVertices = new Float32Array([
    0, 0, bodyD / 2 + gap, 
    (bodyW - bodyD) / 2, bodyH / 2, bodyD / 2 + gap, 
    -(bodyW - bodyD) / 2, bodyH / 2, bodyD / 2 + gap 
]);

triangleGeometry.setAttribute('position', new THREE.BufferAttribute(triangleVertices, 3));

// 三角形を胴体に追加
body.add(new THREE.Mesh(triangleGeometry, redMaterial));
  // 影についての設定
metalRobot.children.forEach((child)=> {
  child.castShadow = true; 
  child.receiveShadow = true; 
});
  // 作成結果を戻
  return metalRobot;
}

export function makeCBRobot() {
  // 段ボールロボットの設定
  const cardboardRobot = new THREE.Group();
  const cardboardMaterial = new THREE.MeshLambertMaterial({ color: 0xccaa77 });
  const blackMaterial = new THREE.MeshBasicMaterial({ color: "black" });

  const legW = 0.8; // 脚の幅
  const legD = 0.8; // 脚の奥行
  const legLen = 3; // 脚の長さ
  const legSep = 1.2; // 脚の間隔
  const bodyW = 2.2; // 胴体の幅
  const bodyH = 3; // 胴体の高さ
  const bodyD = 2; // 胴体の奥行
  const armW = 0.8; // 腕の幅
  const armD = 0.8; // 腕の奥行
  const armLen = 3.8; // 腕の長さ
  const headW = 4; // 頭の幅
  const headH = 2.4; // 頭の高さ
  const headD = 2.4; // 頭の奥行
  const eyeRad = 0.2; // 目の半径
  const eyeSep = 1.6; // 目の間隔
  const eyePos = 0.2; // 目の位置(顔の中心基準の高さ)
  const mouthW = 0.6; // 口の幅
  const mouthH = 0.5; // 口の高さ
  const mouthT = 0.2; // 口の頂点の位置(顔の中心基準の高さ)

  //  脚の作成
  const legGeometry = new THREE.BoxGeometry(legW, legLen, legD);
  const legL = new THREE.Mesh(legGeometry, cardboardMaterial);
  legL.position.set(-legSep / 2, legLen / 2, 0); // 左脚
  cardboardRobot.add(legL);

  const legR = new THREE.Mesh(legGeometry, cardboardMaterial);
  legR.position.set(legSep / 2, legLen / 2, 0); // 右脚
  cardboardRobot.add(legR);

  //  胴体の作成
  const bodyGeometry = new THREE.BoxGeometry(bodyW, bodyH, bodyD);
  const body = new THREE.Mesh(bodyGeometry, cardboardMaterial);
  body.position.set(0, legLen + bodyH / 2, 0); // 胴体の位置
  cardboardRobot.add(body);

  //  腕の設定
  const armGeometry = new THREE.BoxGeometry(armW, armLen, armD);
  const armL = new THREE.Mesh(armGeometry, cardboardMaterial);
  armL.position.set(-(bodyW / 2 + armW / 2), legLen + bodyH - armLen / 2, 0); // 左腕
  cardboardRobot.add(armL);

  const armR = new THREE.Mesh(armGeometry, cardboardMaterial);
  armR.position.set(bodyW / 2 + armW / 2, legLen + bodyH - armLen / 2, 0); // 右腕
  cardboardRobot.add(armR);

  //  頭の設定
  const headGeometry = new THREE.BoxGeometry(headW, headH, headD);
  const head = new THREE.Mesh(headGeometry, cardboardMaterial);
  head.position.set(0, legLen + bodyH + headH / 2, 0); // 頭の位置
  cardboardRobot.add(head);

  // 目の作成
  const eyeGeometry = new THREE.CircleGeometry(eyeRad, 32);
  const eyeL = new THREE.Mesh(eyeGeometry, blackMaterial);
  eyeL.position.set(-eyeSep / 2, eyePos, headD / 2 + 0.01); // 左目の位置
  head.add(eyeL);

  const eyeR = new THREE.Mesh(eyeGeometry, blackMaterial);
  eyeR.position.set(eyeSep / 2, eyePos, headD / 2 + 0.01); // 右目の位置
  head.add(eyeR);

  // 口の作成
const triangleGeometry = new THREE.BufferGeometry();
const triangleVertices = new Float32Array([
  0, -mouthT, headD / 2 + gap, 
  -mouthW / 2, -(mouthT + mouthH), headD / 2 + gap, 
  mouthW / 2, -(mouthT + mouthH), headD / 2 + gap 
]);
cardboardRobot.children.forEach((child)=> {
  child.castShadow = true; 
  child.receiveShadow = true; 
});
triangleGeometry.setAttribute('position', new THREE.BufferAttribute(triangleVertices, 3));

const mouth = new THREE.Mesh(triangleGeometry, blackMaterial);
head.add(mouth); 
  return cardboardRobot; // 作成したロボットを返す
  
}