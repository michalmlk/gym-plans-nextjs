import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Topbar from '@/components/top-bar/top-bar';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
const outfit = Outfit({ subsets: ['latin'] });
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
    title: 'Gym plans',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={outfit.className}>
                    <AppRouterCacheProvider options={{ key: 'css' }}>
                        <ThemeProvider theme={theme}>
                            <Topbar />
                            {children}
                        </ThemeProvider>
                    </AppRouterCacheProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
