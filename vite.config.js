import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		lib: {
			entry: "./src/index.ts",
			formats: ["es"]
		},
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
			'@types': 'dist/types'
		}
	}
})
