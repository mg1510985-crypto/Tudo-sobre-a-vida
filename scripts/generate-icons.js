import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write high-quality SVG icon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3B0764" />
      <stop offset="50%" stop-color="#4A154B" />
      <stop offset="100%" stop-color="#2E0854" />
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE68A" />
      <stop offset="50%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="100" fill="url(#bgGrad)" />
  <circle cx="256" cy="256" r="210" fill="none" stroke="url(#goldGrad)" stroke-width="4" stroke-opacity="0.4" />
  
  <!-- Crown & Hair Flora Symbol -->
  <g transform="translate(136, 120)">
    <path d="M120 20 C100 0, 70 0, 50 30 C30 60, 40 100, 70 120 C40 125, 20 150, 20 180 C20 220, 60 250, 120 250 C180 250, 220 220, 220 180 C220 150, 200 125, 170 120 C200 100, 210 60, 190 30 C170 0, 140 0, 120 20 Z" fill="none" stroke="url(#goldGrad)" stroke-width="6" />
    <!-- Comb teeth styling inside -->
    <path d="M75 160 L75 220 M100 155 L100 225 M120 155 L120 228 M140 155 L140 225 M165 160 L165 220" stroke="url(#goldGrad)" stroke-width="5" stroke-linecap="round" />
    <!-- Crown Points -->
    <polygon points="120,45 145,95 185,75 165,120 75,120 55,75 95,95" fill="url(#goldGrad)" />
  </g>
  
  <!-- Brand text -->
  <text x="256" y="420" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="34" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="4">BELEZA CAPILAR</text>
  <text x="256" y="455" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="20" font-weight="700" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="8">ANGOLA</text>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent, 'utf-8');

// Function to create minimal uncompressed PNG with given width and height and color
function createPNG(width, height, r, g, b, hasPadding = false) {
  // Simple CRC32 table
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    crcTable[n] = c >>> 0;
  }
  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  function writeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(8 + len + 4);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const crc = crc32(buf.subarray(4, 8 + len));
    buf.writeUInt32BE(crc, 8 + len);
    return buf;
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8-bit depth
  ihdrData[9] = 2; // RGB color type
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdrChunk = writeChunk('IHDR', ihdrData);

  // Raw image scanlines
  const rowSize = 1 + width * 3;
  const rawData = Buffer.alloc(rowSize * height);

  const cx = width / 2;
  const cy = height / 2;
  const radius = width * (hasPadding ? 0.35 : 0.42);

  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // filter: none
    for (let x = 0; x < width; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Gold ring
      const isRing = Math.abs(dist - radius) < (width * 0.02);
      // Gold crown center symbol
      const isCenter = dist < (radius * 0.5) && Math.sin((x / width) * 20) > 0.1 && (y / height) > 0.4 && (y / height) < 0.65;

      if (isRing || isCenter) {
        rawData[offset++] = 245; // Gold R
        rawData[offset++] = 158; // Gold G
        rawData[offset++] = 11;  // Gold B
      } else if (dist < radius) {
        // Deep Violet / Plum
        rawData[offset++] = r;
        rawData[offset++] = g;
        rawData[offset++] = b;
      } else {
        // Outer background
        rawData[offset++] = 59;  // #3B
        rawData[offset++] = 7;   // #07
        rawData[offset++] = 100; // #64
      }
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = writeChunk('IDAT', compressed);
  const iendChunk = writeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPNG(192, 192, 74, 21, 75));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPNG(512, 512, 74, 21, 75));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPNG(512, 512, 74, 21, 75, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPNG(180, 180, 74, 21, 75));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), createPNG(64, 64, 74, 21, 75));

console.log('Icons generated successfully!');
