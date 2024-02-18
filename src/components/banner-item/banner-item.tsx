import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

type BannerItemProps = {
    title: string;
    subtitle: string;
    image: StaticImport | string;
    imageAlt: string;
};

export default function BannerItem({
    title,
    subtitle,
    image,
    imageAlt = 'image',
}: BannerItemProps) {
    return (
        <Card className="p-4">
            <CardHeader title={title} />
            <CardContent>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {subtitle}
                </Typography>
                <Image src={image} alt={imageAlt} width={200} height={200} />
            </CardContent>
        </Card>
    );
}
