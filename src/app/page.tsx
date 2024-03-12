import React from 'react';
import PageHeader from '@/components/shared/page-header/page-header';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import BannerItem from '@/components/shared/banner-item/banner-item';
import Button from '@mui/material/Button';

export default async function Home() {
    return (
        <Container maxWidth="lg" className="p-24 bg-transparent">
            <main>
                <section>
                    <PageHeader title="Start working." />
                    <Box
                        sx={{
                            gap: '6rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            minHeight: '70vh',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                color: 'inherit',
                                textDecoration: 'none',
                                width: '100%',
                            }}
                        >
                            <Card className="flex flex-col justify-between p-6">
                                <CardHeader title="Perfect plans for everybody" />
                                <CardContent className="h-full">
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        component="p"
                                        className="text-justify"
                                    >
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Reiciendis, sequi,
                                        recusandae ab minima, molestiae unde
                                        labore corporis et tempora alias officia
                                        perspiciatis reprehenderit qui sapiente
                                        tempore veritatis. Rerum, aliquam
                                        consequatur.
                                    </Typography>
                                </CardContent>
                                <CardActions className="flex justify-end">
                                    <Link href="/plans" passHref>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Browse plans
                                        </Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Box>
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                justifyContent: 'center',
                                color: 'inherit',
                                textDecoration: 'none',
                                width: '100%',
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
                    </Box>
                </section>
                <section>
                    <PageHeader title="Simple steps" />
                    <Box
                        sx={{
                            display: 'flex',
                            minHeight: '70vh',
                            flexDirection: { xs: 'column', md: 'row' },
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '2.5rem',
                            flexGrow: { xs: 1, md: 0 },
                        }}
                    >
                        <BannerItem
                            title="Create plan"
                            subtitle="Be fertile"
                            image="/create.svg"
                            imageAlt="Create"
                        />
                        <BannerItem
                            title="Share it!"
                            subtitle="Link it to your friends"
                            image="/share.svg"
                            imageAlt="Share"
                        />
                        <BannerItem
                            title="Rate"
                            subtitle="Leave feedback"
                            image="/feedback.svg"
                            imageAlt="feedback"
                        />
                    </Box>
                </section>
                <section>
                    <PageHeader
                        title="Let's get started"
                    />
                    <Box
                        sx={{
                            gap: '6rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '50vh',
                        }}
                    >
                        <Typography variant="body1" color="text.secondary" className="max-w-screen-lg text-justify">Lorem
                            ipsum dolor sit amet, consectetur
                            adipisicing elit. Accusamus explicabo laudantium repellat vitae voluptas? Aliquid at atque
                            impedit nesciunt numquam saepe voluptates! Accusamus illo, impedit molestiae nobis quibusdam
                            quod saepe!</Typography>
                        <Link href="/plans/create" passHref>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                            >
                                Create your own plan
                            </Button>
                        </Link>
                    </Box>
                </section>
            </main>
        </Container>
    );
}
