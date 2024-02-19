import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

export type PlanItemProps = {
    title: string;
    tags: string[];
    description: string;
    id: number;
    author: string;
};

export default function PlanItem({
    title,
    description,
    id,
    tags,
    author,
}: PlanItemProps) {
    return (
        <Box
            sx={{
                width: { xs: '100%' },
                height: '320px',
            }}
        >
            <Card className="p-4 h-full flex flex-col justify-between">
                <CardHeader title={title} style={{ paddingBottom: 0 }} />
                <CardContent className="grow">
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {author}
                    </Typography>
                    <Typography
                        variant="body1"
                        component="p"
                        className="text-lg"
                    >
                        {description}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '0.5rem',
                            marginTop: '1rem',
                        }}
                    >
                        {tags.map((tag, idx) => (
                            <Chip key={idx} label={tag} variant="outlined" />
                        ))}
                    </Box>
                </CardContent>
                <CardActions className="flex justify-end">
                    <Link href={`/plans/${id}`} passHref>
                        <Button variant="outlined" color="primary">
                            Details
                        </Button>
                    </Link>
                </CardActions>
            </Card>
        </Box>
    );
}
