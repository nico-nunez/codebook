import * as esbuild from 'esbuild-wasm';
import { EditorLanguages } from '../components/Code-Editor/code-editor';
import { fetchPlugin } from './plugins/fetch-plugin';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';

let service: esbuild.Service;

type BuildOptions = {
	[key: string]: {
		entryPoints: string[];
		plugins: any[];
	};
};

const bundler = async (rawCode: string, lang: EditorLanguages) => {
	if (lang === 'html') return { code: rawCode, error: '' };
	const options: BuildOptions = {
		javascript: {
			entryPoints: ['index.js'],
			plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
		},

		css: { entryPoints: ['index.html', 'index.css'], plugins: [] },
	};

	if (!service) {
		service = await esbuild.startService({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
		});
	}
	try {
		const result = await service.build({
			entryPoints: options[lang].entryPoints,
			bundle: true,
			write: false,
			plugins: options[lang].plugins,
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
			// uncomment with useCumulativeCode
			// jsxFactory: '_React.createElement',
			// jsxFragment: '_React.Fragment',
		});
		return {
			code: result.outputFiles[0].text,
			error: '',
		};
	} catch (err: any) {
		return { code: '', error: err.message };
	}
};

export default bundler;
