import { useEffect, useRef } from 'react'

/**
 * Hook to initialize a WebGL canvas with a GLSL fragment shader
 * @param {string} fragSource - GLSL fragment shader source
 * @param {Object} uniforms - Additional uniforms to pass
 */
export function useGLSL(fragSource, uniforms = {}) {
  const canvasRef = useRef(null)
  const glRef = useRef(null)
  const programRef = useRef(null)
  const rafRef = useRef(null)
  const startTimeRef = useRef(Date.now())
  const uniformLocationsRef = useRef({})

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) {
      console.warn('WebGL not supported')
      return
    }
    glRef.current = gl

    const vertSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `

    function compileShader(type, source) {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vert = compileShader(gl.VERTEX_SHADER, vertSource)
    const frag = compileShader(gl.FRAGMENT_SHADER, fragSource)
    if (!vert || !frag) return

    const program = gl.createProgram()
    gl.attachShader(program, vert)
    gl.attachShader(program, frag)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }

    programRef.current = program
    gl.useProgram(program)

    // Fullscreen quad
    const vertices = new Float32Array([-1,-1, 1,-1, -1,1, 1,1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const posLoc = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    // Cache uniform locations
    const locs = {
      uTime: gl.getUniformLocation(program, 'uTime'),
      uResolution: gl.getUniformLocation(program, 'uResolution'),
      uScroll: gl.getUniformLocation(program, 'uScroll'),
    }
    Object.keys(uniforms).forEach(key => {
      locs[key] = gl.getUniformLocation(program, key)
    })
    uniformLocationsRef.current = locs

    function resize() {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
      if (locs.uResolution) {
        gl.uniform2f(locs.uResolution, canvas.width, canvas.height)
      }
    }
    resize()
    window.addEventListener('resize', resize)

    function render() {
      const elapsed = (Date.now() - startTimeRef.current) / 1000
      if (locs.uTime) gl.uniform1f(locs.uTime, elapsed)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      gl.deleteProgram(program)
    }
  }, [fragSource])

  // Update uniform function
  const setUniform = (name, value) => {
    const gl = glRef.current
    const program = programRef.current
    if (!gl || !program) return
    gl.useProgram(program)
    const loc = uniformLocationsRef.current[name]
    if (loc !== null && loc !== undefined) {
      if (typeof value === 'number') gl.uniform1f(loc, value)
      else if (Array.isArray(value) && value.length === 2) gl.uniform2f(loc, ...value)
      else if (Array.isArray(value) && value.length === 3) gl.uniform3f(loc, ...value)
    }
  }

  return { canvasRef, setUniform }
}
