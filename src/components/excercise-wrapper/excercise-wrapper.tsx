import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { ReactElement } from 'react';
import { ExcerciseDTO } from '@/app/common/model';

export default function ExcerciseWrapper({
    name,
    description,
    isOwnBodyWeight,
    reps,
    series,
}: Omit<ExcerciseDTO, 'id'>): ReactElement {
    return (
        <Card>
            <CardHeader title={name} />
            <CardContent>
                <h1></h1>
                {description}
            </CardContent>
        </Card>
    );
}
