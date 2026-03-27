import nextVitals from 'eslint-config-next/core-web-vitals';
import tailwindcss from 'eslint-plugin-tailwindcss';

const config = [
	...nextVitals,
	{
		plugins: {
			tailwindcss,
		},
		rules: {
			...tailwindcss.configs.recommended.rules,
		},
	},
];

export default config;
