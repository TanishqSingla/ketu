import { resolve } from 'path';
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
	plugins: [preact()],
	build: {
		lib: {
			entry: "./src/index.ts",
			formats: ["es"]
		},
		outDir: "dist",
		rollupOptions: {
			external: ['preact'],
			output: {
				globals: {
					preact: 'Preact'
				},
			}
		}
	},
	resolve: {
		alias: {
			"@src": resolve(__dirname, "/src")
		}
	}
})
