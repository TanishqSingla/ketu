import * as esbuild from 'esbuild';

const build = async () => {
	try {
		await esbuild.build({
			entryPoints: ["./src/index.ts"],
			outdir: "dist",
			bundle: true,
			jsx: "automatic",
			treeShaking: true,
			jsxDev: true,
			format: "esm",
			tsconfig: "./tsconfig.json",
			minify: true,
		})
	} catch (err) {
		return 1;
	}
}

build();
