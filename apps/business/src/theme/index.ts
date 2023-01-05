import { createTheme } from '@mui/material/styles';

import { Epilogue } from '@next/font/google';


export const epilogue = Epilogue({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    display: 'swap',
    fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const customTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#fda92d',
            light: '#FED680',
            lighter: '#FEF4D4',
            dark: '#B66816',
            darker: '#793908'
        },
        secondary: {
            main: '#3366FF',
            light: '#84A9FF',
            lighter: '#D6E4FF',
            dark: '#1939B7',
            darker: '#091A7A',
            contrastText: '#ffffff',
        },
        grey: {
            100: '#F9FAFB',
            200: '#F4F6F8',
            300: '#DFE3E8',
            400: '#C4CDD5',
            500: '#919EAB',
            600: '#637381',
            700: '#454F5B',
            800: '#212B36',
            900: '#161C24',
        },

        error: {
            main: '#FF5630',
            light: '#FFAC82',
            lighter: '#FFE9D5',
            dark: '#B71D18',
            darker: '#7A0916'
        },
        warning: {
            main: '#FFAB00',
            light: '#FFD666',
            lighter: '#FFF5CC',
            dark: '#B76E00',
            darker: '#7A4100'

        },
        success: {
            main: '#36B37E',
            light: '#86E8AB',
            lighter: '#D8FBDE',
            dark: '#1B806A',
            darker: '#0A5554'
        },

        text: {
            primary: '#292f36',
        },

        contrastThreshold: 3,
        tonalOffset: 0.2,
    },



    components: {
        MuiButtonBase: {
            defaultProps: {
                // disableRipple: true,
            }
        },

        MuiPaper: {
            defaultProps: {
                elevation: 0,

            },

            styleOverrides: {
                root: {
                    borderRadius: 0,
                }
            }
        },

        MuiButton: {

            defaultProps: {
                disableRipple: true,
                disableElevation: true,
            },

            styleOverrides: {
                root: ({ ownerState }) => ({
                    borderRadius: 5,
                    minWidth: 100,
                    textTransform: 'none',
                    '&:hover': {
                        textDecoration: 'none',
                    },

                    ...(ownerState.color === 'primary' && ownerState.variant === 'contained' && {
                        '&:hover': {
                            backgroundColor: '#B66816',
                        }
                    }),

                    ...(ownerState.color === 'secondary' && ownerState.variant === 'contained' && {
                        '&:hover': {
                            backgroundColor: '#1939B7',
                        }
                    })
                })
            }
        },

    },
    typography: {
        fontFamily: epilogue.style.fontFamily,
        h1: {
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: 0,
        },
        h2: {
            fontSize: 48,
            lineHeight: 1.064,
            fontWeight: 800,
            letterSpacing: 0,
        },
        h3: {
            fontSize: 32,
            lineHeight: 1.048,
            fontWeight: 700,
            letterSpacing: 0,
        },
        h4: {
            fontSize: 24,
            lineHeight: 1.036,
            fontWeight: 700,
            letterSpacing: 0,
        },
        h5: {
            fontSize: 20,
            lineHeight: 1.030,
            fontWeight: 700,
            letterSpacing: 0,
        },
        h6: {
            fontSize: 18,
            lineHeight: 1.028,
            fontWeight: 700,
            letterSpacing: 0,
        },
        subtitle1: {
            fontSize: 16,
            lineHeight: 1.024,
            fontWeight: 600,
            letterSpacing: 0,
        },
        subtitle2: {
            fontSize: 14,
            lineHeight: 1.022,
            fontWeight: 600,
            letterSpacing: 0,
        },
        body1: {
            fontSize: 16,
            lineHeight: 1.024,
            fontWeight: 400,
            letterSpacing: 0,
        },
        body2: {
            fontSize: 14,
            lineHeight: 1.022,
            fontWeight: 400,
            letterSpacing: 0,
        },
        caption: {
            fontSize: 14,
            lineHeight: 1.022,
            fontWeight: 400,
            letterSpacing: 0,
        },
        overline: {
            fontSize: 12,
            lineHeight: 1.018,
            fontWeight: 700,
            letterSpacing: 0,
        },
        button: {
            fontSize: 14,
            lineHeight: 1.030,
            fontWeight: 700,
            letterSpacing: 0,
            transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
        },
    },

});
