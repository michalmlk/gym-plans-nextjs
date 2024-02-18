import React from 'react';
import PageHeader from '@/components/page-header/page-header';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function Home() {
    return (
        <Container maxWidth="lg" className="px-24 py-10">
            <PageHeader title="Start working." classNames="uppercase" />
            <main className="flex justify-between items-center h-50vh">
                <Box
                    sx={{
                        flexGrow: { xs: 1, md: 0 },
                        width: { xs: '50vw' },
                    }}
                >
                    <Card className="h-96 flex flex-col justify-between p-6">
                        <CardHeader title="Perfect plans for everybody" />
                        <CardContent className="h-full">
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                component="p"
                                className="text-justify"
                            >
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Reiciendis, sequi, recusandae
                                ab minima, molestiae unde labore corporis et
                                tempora alias officia perspiciatis reprehenderit
                                qui sapiente tempore veritatis. Rerum, aliquam
                                consequatur.
                            </Typography>
                        </CardContent>
                        <CardActions className="flex justify-end">
                            <Link href="/plans">Browse plans</Link>
                        </CardActions>
                    </Card>
                </Box>
                <Box
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    <Image
                        src="/man-lifting.svg"
                        alt="Man lifting"
                        width={420}
                        height={320}
                        priority
                    />
                </Box>
            </main>
        </Container>
    );
}
