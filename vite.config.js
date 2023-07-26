import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    // global: {},
    global: 'globalThis',
  },
  // build: {
  //   rollupOptions: {
  //     external: ['./jss-plugin-globalThis'],
  //   },
  // },
});

// export default defineConfig({
//   plugins: [
//     react(),
//     babel({
//       presets: [
//         '@babel/preset-env',
//         '@babel/preset-react'
//       ],
//       targets: {
//         ie: '11'
//       }
//     })
//   ],
//   build: {
//     minify: true,
//     outDir: 'dist'
//   },
//   server: {
//     port: 3000,
//   },
//   define: {
//     global: 'globalThis',
//   },
// });
