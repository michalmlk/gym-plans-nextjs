'use client';

import { Outfit } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const outfit = Outfit({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    typography: {
        fontFamily: outfit.style.fontFamily,
    },
    palette: {
        mode: 'dark',
    },
});

export default theme;
