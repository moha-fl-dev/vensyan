import {
    SimplePaletteColorOptions
} from '@mui/material/styles/createPalette';


declare module '@mui/material/styles' {
    interface SimplePaletteColorOptions {
        lighter?: string
        darker?: string
    }

    interface PaletteColor {
        lighter?: string
        darker?: string
    }
}