'use client';

import {
    useForm,
    SubmitHandler,
    useFieldArray,
    Controller,
} from 'react-hook-form';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ExerciseDTO } from '@/app/common/model';
import { useUser } from '@clerk/nextjs';
import { Add, NoteAdd, Remove } from '@mui/icons-material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PageHeader from '../page-header/page-header';

type FormValues = {
    title: string;
    description?: string;
    tags: string[];
    userId: string;
    exercises: Omit<ExerciseDTO, 'id'>[];
};

export const defaultExerciseValues = {
    name: '',
    description: '',
    isOwnBodyWeight: false,
    reps: 0,
    series: 1,
    weight: 0,
};

export default function CreatePlanForm() {
    const { user } = useUser();
    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            title: 'Examplary plan',
            description: '',
            tags: [],
            userId: user?.id,
            exercises: [
                {
                    name: '',
                    description: '',
                    isOwnBodyWeight: false,
                    reps: 0,
                    series: 1,
                    weight: 0,
                },
            ],
        },
    });

    const onSubmit: SubmitHandler<FormValues> = (data) =>
        console.log('abc', data, errors);

    const { fields, append, remove } = useFieldArray({
        name: 'exercises',
        control,
    });

    return (
        <>
            <PageHeader title="Create plan" />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6 items-center"
            >
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        gap: '2rem;',
                    }}
                >
                    <Controller
                        control={control}
                        name="title"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Box sx={{ width: '50%' }}>
                                <InputLabel>Plan title</InputLabel>
                                <OutlinedInput
                                    type="text"
                                    placeholder="Title"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    className="w-full"
                                />
                            </Box>
                        )}
                    />
                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Box sx={{ width: '50%' }}>
                                <InputLabel>Description</InputLabel>
                                <OutlinedInput
                                    type="text"
                                    placeholder="Description"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    className="w-full"
                                />
                            </Box>
                        )}
                    />
                </Box>
                <Box
                    sx={{
                        width: '100%',
                    }}
                >
                    <Typography variant="h3" component="h3">
                        Exercises
                    </Typography>
                    <Divider />
                </Box>
                <ul className="flex w-full gap-6 flex-wrap justify-start">
                    {fields.map((item, index) => {
                        const isExerciseOnOwnBodyWeight = watch(
                            `exercises.${index}.isOwnBodyweight`
                        )!;
                        return (
                            <li key={item.id}>
                                <Card
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '100%',
                                        flexGrow: '1',
                                        padding: '2rem',
                                    }}
                                >
                                    <Controller
                                        control={control}
                                        name={`exercises.${index}.title`}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
                                            <>
                                                <InputLabel>Title</InputLabel>
                                                <OutlinedInput
                                                    placeholder="Title"
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            </>
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name={`exercises.${index}.description`}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
                                            <>
                                                <InputLabel>
                                                    Description
                                                </InputLabel>
                                                <OutlinedInput
                                                    placeholder="Description"
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            </>
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name={`exercises.${index}.reps`}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
                                            <>
                                                <InputLabel>Reps</InputLabel>
                                                <OutlinedInput
                                                    placeholder="Reps"
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    value={value}
                                                    type="number"
                                                />
                                            </>
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name={`exercises.${index}.series`}
                                        rules={{
                                            required: true,
                                        }}
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
                                            <>
                                                <InputLabel>Series</InputLabel>
                                                <OutlinedInput
                                                    placeholder="Title"
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            </>
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name={`exercises.${index}.isOwnBodyweight`}
                                        render={({
                                            field: { onChange, onBlur, value },
                                        }) => (
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        defaultChecked
                                                        onChange={onChange}
                                                        value={value}
                                                    />
                                                }
                                                label="Own body weight"
                                            />
                                        )}
                                    />
                                    <Controller
                                        control={control}
                                        name={`exercises.${index}.weight`}
                                        rules={{
                                            required:
                                                !isExerciseOnOwnBodyWeight,
                                        }}
                                        render={({
                                            field: {
                                                onChange,
                                                onBlur,
                                                value,
                                                ref,
                                            },
                                        }) => (
                                            <>
                                                <InputLabel>Weight</InputLabel>
                                                <OutlinedInput
                                                    placeholder="Weight"
                                                    onBlur={onBlur}
                                                    onChange={onChange}
                                                    value={value}
                                                    type="number"
                                                    disabled={
                                                        isExerciseOnOwnBodyWeight!
                                                    }
                                                />
                                            </>
                                        )}
                                    />
                                    <div>
                                        <IconButton
                                            aria-label="Add exercise"
                                            onClick={() => {
                                                append({
                                                    ...defaultExerciseValues,
                                                });
                                            }}
                                        >
                                            <Add />
                                        </IconButton>
                                        {index !== 0 && (
                                            <IconButton
                                                aria-label="Add exercise"
                                                onClick={() => remove(index)}
                                            >
                                                <Remove />
                                            </IconButton>
                                        )}
                                    </div>
                                </Card>
                            </li>
                        );
                    })}
                </ul>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
