// TODO @TW:
// Node path should be committed, but it makes preset dev impossible.
// Local path is the only way to develop "tailwind.preset.js".
const venia = require('@magento/pwa-theme-venia');
const plugin = require('tailwindcss/plugin');
// const venia = require('../pwa-theme-venia');

const config = {
    mode: 'jit',
    // Include your custom theme here.
    presets: [venia],
    // Configure how Tailwind statically analyzes your code here.
    // Note that the Tailwind's `jit` mode doesn't actually use PurgeCSS.
    purge: {
        // Include paths to every file that may refer to Tailwind classnames.
        // Classnames not found in these files will be excluded at build time.
        content: [
            './node_modules/@magento/venia-ui/lib/**/*.module.css',
            '../venia-ui/lib/**/*.module.css',
            './src/**/*.module.css',
            './template.html'
        ],
        // Extract Tailwind classnames from source files.
        // Our default matcher only matches targets of CSS Modules' `composes`,
        // not classnames included directly in HTML or JS!
        extractors: [
            {
                extensions: ['css'],
                extractor: content => content.match(matcher) || []
            }
        ]
    },
    // Set the character Tailwind uses when prefixing classnames with variants.
    // CSS Modules doesn't like Tailwind's default `:`, so we use `_`.
    separator: '_',
    theme: {
        colors: {
            colorDefault: 'var(--color-default, #121034)'
        },
        extend: {
            colors: {
                brand: {
                    base: 'rgb(var(--color-default, 61 132 255))',
                    dark: 'rgb(var(--color-primary, 41 84 255))',
                    darkest: 'rgb(var(--color-primary-hover, 23 43 196))',
                    light: '194 200 255',
                    100: '194 200 255',
                    400: '61 132 255',
                    // 500: '51 109 255',
                    600: '41 84 255',
                    700: '31 57 255',
                    800: '23 43 196'
                },
                colorDefault: 'rgb(var(--color-default, 61 132 255))',
                colorPrimary: 'rgb(var(--color-primary, 41 84 255))',
                colorGray: 'var(--color-gray, #eee)',
                colorGrayBack: 'var(--color-gray, #fafafa)',
                colorBlack: 'var(--color-black, #222)',
                colorModal: 'var(--color-modal, rgba(0,0,0,0.8))',
                colorWhite: 'rgb(var(--color-white, 255 255 255))',
                colorParent: 'var(--parent-color, #121034)'
            },
            fontSize: {
                'xs': [ /* font-size */ 'var(--text-xs, 10px)', {
                    letterSpacing: 'var(--letter-space-xs, -0.04px)',
                    lineHeight: 'var(--line-height-xs, 14px)',
                }],
                'sm': [ /* font-size */ 'var(--text-sm, 12px)', {
                    letterSpacing: 'var(--letter-space-sm, -0.06px)',
                    lineHeight: 'var(--line-height-sm, 16px)',
                }],
                'base': [ /* font-size */ 'var(--text-base, 14px)', {
                    letterSpacing: 'var(--letter-space-base, -0.08px)',
                    lineHeight: 'var(--line-height-base, 20px)',
                }],
                'lg': [ /* font-size */ 'var(--text-lg, 16px)', {
                    letterSpacing: 'var(--letter-space-lg, -0.1px)',
                    lineHeight: 'var(--line-height-lg, 22px)',
                }],
                'xl': [ /* font-size */ 'var(--text-xl, 18px)', {
                    letterSpacing: 'var(--letter-space-xl, -0.12px)',
                    lineHeight: 'var(--line-height-xl, 24px)',
                }],
                '2xl': [ /* font-size */ 'var(--text-2xl, 20px)', {
                    letterSpacing: 'var(--letter-space-2xl, -0.14px)',
                    lineHeight: 'var(--line-height-2xl, 26px)',
                }],
                '3xl': [ /* font-size */ 'var(--text-3xl, 22px)', {
                    letterSpacing: 'var(--letter-space-3xl, -0.16px)',
                    lineHeight: 'var(--line-height-3xl, 28px)',
                }],
                '4xl': [ /* font-size */ 'var(--text-4xl, 24px)', {
                    letterSpacing: 'var(--letter-space-4xl, -0.18px)',
                    lineHeight: 'var(--line-height-4xl, 30px)',
                }],
                '5xl': [ /* font-size */ 'var(--text-5xl, 26px)', {
                    letterSpacing: 'var(--letter-space-5xl, -0.20px)',
                    lineHeight: 'var(--line-height-5xl, 32px)',
                }],
                'p': [ /* font-size */ '14px', {
                    letterSpacing: '-0.04em',
                    lineHeight: '30px',
                }],
                'h1': [ /* font-size */ '44px', {
                    letterSpacing: '0.1em',
                    lineHeight: '60px',
                }],
                'h2': [ /* font-size */ '28px', {
                    letterSpacing: '0.1em',
                    lineHeight: '38px',
                }]
            },
            screens: {
              'mOnly': {'max': '1023px'},
              'dOnly': {'min': '1024px'},
            },
        },
        marginInlineStart: {},
        marginInlineEnd: {},
        paddingInlineStart: {},
        paddingInlineEnd: {},
        borderInlineStartWidth: {},
        borderInlineEndWidth: {},
        insetInlineStart: {},
        insetInlineEnd: {},
        borderStartStartRadius: {},
        borderStartEndRadius: {},
        borderEndStartRadius: {},
        borderEndEndRadius: {},
    },
    plugins: [
        plugin(function({ matchUtilities, theme }) {
            matchUtilities(
                {
                    ms: (value) => ({
                        marginInlineStart: value
                    }),
                    me: (value) => ({
                        marginInlineEnd: value
                    }),
                    ps: (value) => ({
                        paddingInlineStart: value
                    }),
                    pe: (value) => ({
                        paddingInlineEnd: value
                    }),
                    bs: (value) => ({
                        borderInlineStartWidth: value
                    }),
                    be: (value) => ({
                        borderInlineEndWidth: value
                    }),
                    is: (value) => ({
                        insetInlineStart: value
                    }),
                    ie: (value) => ({
                        insetInlineEnd: value
                    }),
                    'rounded-ts': (value) => ({
                        borderStartStartRadius: value
                    }),
                    'rounded-te': (value) => ({
                        borderStartEndRadius : value
                    }),
                    'rounded-bs': (value) => ({
                        borderEndStartRadius: value
                    }),
                    'rounded-be': (value) => ({
                        borderEndEndRadius : value
                    }),
                },
                { 
                    values: theme('marginInlineStart') 
                }
            )
        }),
        plugin(function({ addUtilities }) {
            addUtilities({
                '.text-start': {
                    'text-align': 'start',
                },
                '.text-end': {
                    'text-align': 'end',
                },
                '.primary-border': {
                    'border': '1px solid rgba(0,0,0,0.11)',
                },
                '.primary-anime': {
                    'transition': 'all 0.25s ease',
                },
                '.primary-anime': {
                    'transition': 'all 0.25s ease',
                },
                '.pUnset': {
                    'position': 'unset',
                },
            })
        })
    ]
};

module.exports = config;

/**
 * Matches declarations that contain tailwind classnames.
 * Only classnames matched by this expression will be included in the build.
 *
 * @example
 * .foo {
 *   composes: mx-auto from global;
 * }
 */
const matcher = /(?<=composes:.*)(\b\S+\b)(?=.*from global;)/g;
