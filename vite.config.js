import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'

export default defineConfig(async () => {
  // vite-plugin-glsl v1.6 uses Vite-6 rolldown API which Vite 5 doesn't
  // honour for transform filters — it calls the handler for every module
  // including virtual ones like /@react-refresh.  We resolve the plugin
  // first (it's async) then wrap its transform so it bails early for any
  // non-asset id (no extension, or starts with \0 / @).
  const glslPlugin = await glsl()

  const GLSL_EXTENSIONS = /\.(glsl|wgsl|vert|frag|vs|fs)(\?.*)?$/
  const originalTransform =
    glslPlugin.transform && typeof glslPlugin.transform === 'object'
      ? glslPlugin.transform.handler
      : glslPlugin.transform

  if (originalTransform) {
    const safeHandler = function (code, id, options) {
      // Skip virtual modules, bare specifiers and non-shader files
      if (!GLSL_EXTENSIONS.test(id)) return null
      return originalTransform.call(this, code, id, options)
    }

    if (typeof glslPlugin.transform === 'object') {
      glslPlugin.transform.handler = safeHandler
    } else {
      glslPlugin.transform = safeHandler
    }
  }

  return {
    plugins: [react(), glslPlugin],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  }
})
