import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGLSL } from '../../hooks/useGLSL'

gsap.registerPlugin(ScrollTrigger)

// Inline shader to avoid build issues
const HERO_FRAG = `
precision mediump float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uScroll;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p) {
  float v=0.0,a=0.5,fr=1.0;
  for(int i=0;i<5;i++){v+=a*noise(p*fr);fr*=2.0;a*=0.5;}
  return v;
}
void main(){
  vec2 uv=gl_FragCoord.xy/uResolution; uv.y=1.0-uv.y;
  float t=uTime*0.15;
  vec2 p=uv*3.0+vec2(t*0.1,uScroll*0.3);
  float n1=fbm(p),n2=fbm(p+vec2(3.7,1.2)+t*0.05),n3=fbm(p*2.0+n1*0.5);
  vec2 grid=fract(uv*14.0);
  float gl2=min(grid.x,grid.y);
  gl2=smoothstep(0.0,0.03,gl2);
  float inv=(1.0-gl2)*0.05;
  float pulse=sin(uTime*0.5)*0.5+0.5;
  vec3 nd=vec3(0.024,0.051,0.098),navy=vec3(0.039,0.086,0.157),gold=vec3(0.831,0.525,0.102),conc=vec3(0.769,0.722,0.659);
  vec3 col=mix(nd,navy,n1*0.6);
  col=mix(col,navy*1.2,n2*0.3);
  col=mix(col,conc*0.08,n3*0.5);
  float dist=length(uv-vec2(0.5,0.5));
  float rip=sin(dist*20.0-uTime*1.5)*0.5+0.5;
  rip*=smoothstep(0.9,0.0,dist)*pulse*0.3;
  col=mix(col,gold,rip*0.07);
  col+=conc*inv;
  col*=1.0-dist*1.2;
  col*=(1.0-uScroll*0.6);
  gl_FragColor=vec4(col,1.0);
}
`

export default function HeroShader() {
  const { canvasRef, setUniform } = useGLSL(HERO_FRAG)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setUniform('uScroll', self.progress)
      },
    })
    return () => trigger.kill()
  }, [setUniform])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  )
}
