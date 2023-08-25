import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts'

const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./src/lib/index.tsx"],
            name: "voby-list",
            formats: ['cjs', 'es', 'umd'],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        sourcemap: true,
        rollupOptions: {
            external: ['voby', 'oby', 'voby/jsx-runtime'],
            output: {
                globals: {
                    'voby': 'voby',
                    'voby/jsx-runtime': 'voby/jsx-runtime',
                }
            }
        }
    },
    esbuild: {
        jsx: 'automatic',
    },
    plugins: [
        dts({ entryRoot: './src/lib', outputDir: './dist/types' })
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
        },
    },
})



export default config
