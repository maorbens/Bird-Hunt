// Run with: node generate-icons.js
// Requires: npm install canvas
const { createCanvas } = require('canvas');
const fs = require('fs');

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const s = size / 32; // scale factor (base grid = 32)

  // Sky background
  ctx.fillStyle = '#4EC0CA';
  ctx.fillRect(0, 0, size, size);

  // Ground strip at bottom
  ctx.fillStyle = '#78B800';
  ctx.fillRect(0, size * 0.82, size, size * 0.07);
  ctx.fillStyle = '#5A9000';
  ctx.fillRect(0, size * 0.82, size, size * 0.025);
  ctx.fillStyle = '#DED895';
  ctx.fillRect(0, size * 0.847, size, size * 0.153);

  // Pixel bird — centered, scaled
  const pp = Math.max(1, Math.round(size / 14));
  const birdW = 10 * pp, birdH = 7 * pp;
  const bx = Math.round((size - birdW) / 2);
  const by = Math.round(size * 0.28);

  const BIRD_PAL = ['#F5D800','#886600','#FFFFFF','#111111','#FF8800'];
  const BIRD = [
    [0,0,2,2,2,2,2,0,0,0],
    [0,2,1,1,1,1,1,2,0,0],
    [2,1,1,1,1,3,1,5,5,0],
    [2,1,1,1,4,3,1,5,5,0],
    [2,1,1,1,1,1,1,2,0,0],
    [0,2,2,1,1,2,2,0,0,0],
    [0,0,2,2,2,2,0,0,0,0],
  ];

  for (let r = 0; r < BIRD.length; r++) {
    for (let c = 0; c < BIRD[r].length; c++) {
      const code = BIRD[r][c];
      if (!code) continue;
      ctx.fillStyle = BIRD_PAL[code - 1];
      ctx.fillRect(bx + c * pp, by + r * pp, pp, pp);
    }
  }

  return canvas.toBuffer('image/png');
}

fs.writeFileSync('icon-192.png', drawIcon(192));
fs.writeFileSync('icon-512.png', drawIcon(512));
console.log('Icons generated: icon-192.png, icon-512.png');
