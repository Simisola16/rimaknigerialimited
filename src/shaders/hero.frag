precision mediump float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uScroll;

// Noise function
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1,0)), u.x),
    mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float val = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (int i = 0; i < 5; i++) {
    val += amp * noise(p * freq);
    freq *= 2.0;
    amp *= 0.5;
  }
  return val;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  uv.y = 1.0 - uv.y;
  
  // Concrete-like base texture
  float t = uTime * 0.15;
  vec2 p = uv * 3.0 + vec2(t * 0.1, uScroll * 0.3);
  
  float n1 = fbm(p);
  float n2 = fbm(p + vec2(3.7, 1.2) + t * 0.05);
  float n3 = fbm(p * 2.0 + n1 * 0.5);
  
  // Structural grid lines
  vec2 grid = fract(uv * 12.0);
  float gridLine = min(grid.x, grid.y);
  gridLine = smoothstep(0.0, 0.04, gridLine);
  float invGrid = 1.0 - gridLine;
  invGrid *= 0.06;
  
  // Pulse effect
  float pulse = sin(uTime * 0.5) * 0.5 + 0.5;
  
  // Color composition
  vec3 navyDeep = vec3(0.024, 0.051, 0.098);   // #060D1A
  vec3 navy = vec3(0.039, 0.086, 0.157);         // #0A1628
  vec3 gold = vec3(0.831, 0.525, 0.102);         // #D4861A
  vec3 concrete = vec3(0.769, 0.722, 0.659);     // #C4B8A8
  
  // Base: layered noise creating concrete texture
  vec3 col = mix(navyDeep, navy, n1 * 0.6);
  col = mix(col, navy * 1.2, n2 * 0.3);
  col = mix(col, concrete * 0.08, n3 * 0.5);
  
  // Gold accent ripple from center
  float dist = length(uv - vec2(0.5, 0.5));
  float ripple = sin(dist * 20.0 - uTime * 1.5) * 0.5 + 0.5;
  ripple *= smoothstep(0.8, 0.0, dist);
  ripple *= pulse * 0.3;
  col = mix(col, gold, ripple * 0.06);
  
  // Grid overlay
  col += concrete * invGrid;
  
  // Vignette
  float vignette = 1.0 - dist * 1.2;
  vignette = clamp(vignette, 0.0, 1.0);
  col *= vignette;
  
  // Scroll-driven fade
  col *= (1.0 - uScroll * 0.5);
  
  gl_FragColor = vec4(col, 1.0);
}
