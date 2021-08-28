module.exports = {
  // mode: 'jit',
  purge: {
    content: ['./{components,pages,hooks,container,utils}/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: [
        'my-3',
        'my-2',
        'mr-2',
        'bottom-6',
        'bottom-14',
        'right-10',
        'right-6',
        'text-green-400',
        'bg-gray-800',
        'text-green-600',
        'h-screen',
        'm-6',
        'px-8',
        'py-14',
        'rounded-2xl',
        'inline',
        'bg-gray-700',
        'bg-opacity-50',
        'text-red-600',
        'text-green-500',
        'text-blue-400',
        'text-blue-600',
        'text-green-600',
        'text-red-700'
      ],
    },
    css: [['./{components,pages,hooks,container,utils}/**/*.css']]
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: (theme) => ({
        ...theme('spacing'),
      }),
      minWidth: (theme) => ({
        ...theme('spacing'),
      }),
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
