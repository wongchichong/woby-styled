import { defineConfig } from 'vite'
import path from 'path'
// import dts from 'vite-plugin-dts'

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./src/index.tsx"],
            name: "woby-list",
            formats: [/*'cjs', '*/'es'/*, 'umd'*/],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        sourcemap: true,
        rollupOptions: {
            external: ['woby', 'woby/jsx-runtime', 'oby', 'woby/jsx-runtime', 'nanoid'],
            output: {
                globals: {
                    'nanoid': 'nanoid',
                    'woby': 'woby',
                    'woby/jsx-runtime': 'woby/jsx-runtime',
                }
            }
        }
    },
    esbuild: {
        jsx: 'automatic',
    },
    plugins: [
        // dts({ entryRoot: './src/lib', outDir: './dist/types' })
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
            // 'woby/jsx-dev-runtime': process.argv.includes('dev') ? path.resolve('../woby/src/jsx/runtime') : 'woby/jsx-dev-runtime',
            // 'woby/jsx-runtime': process.argv.includes('dev') ? path.resolve('../woby/src/jsx/runtime') : 'woby/jsx-runtime',
            // 'woby': process.argv.includes('dev') ? path.resolve('../woby/src') : 'woby'
        }
    }
})



export default config
