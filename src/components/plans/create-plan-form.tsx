'use client';

import { useState } from 'react';
import {
    useForm,
    SubmitHandler,
    useFieldArray,
    Controller,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ExerciseDTO } from '@/app/common/model';
import { useUser } from '@clerk/nextjs';
import { Add, Remove } from '@mui/icons-material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PageHeader from '../shared/page-header/page-header';
import { createPlan } from '@/utils/plans';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { v1 as uuidv1 } from 'uuid';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import Router from 'next/router';

type FormValues = {
    $id: string;
    title: string;
    description?: string;
    tags: string[];
    userId: string;
    exercises: ExerciseDTO[];
};

const defaultExerciseValues = {
    name: '',
    description: '',
    isOwnBodyWeight: false,
    reps: 0,
    series: 1,
    weight: 0,
};

const defaultSnackbarState = {
    isOpen: false,
    message: '',
};

export default function CreatePlanForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [snackbarState, setSnackbarState] = useState(defaultSnackbarState);

    const handleSnackbarOpen = (message: string) => setSnackbarState((prev) => ({
        isOpen: !prev.isOpen,
        message,
    }));

    const { user } = useUser();
    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isValid },
    } = useForm<FormValues>({
        reValidateMode: 'onChange',
        mode: 'onChange',
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

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setIsLoading(true);
        const id = uuidv1();
        try {
            await createPlan({
                ...data,
                id,
                userId: user?.id!,
                exercises: data.exercises,
            });
            handleSnackbarOpen('Plan successfully created.');
            reset();
            Router.reload();
        } catch (e: any) {
            handleSnackbarOpen('Plan creation failed.');
            console.log('Error occurred.', e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const { fields, append, remove } = useFieldArray({
        name: 'exercises',
        control,
    });

    return (
        <>
            <Snackbar
                open={snackbarState.isOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarState(defaultSnackbarState)}
                message={snackbarState.message}
            />
            <PageHeader title="Create plan">
                <Link href="/plans" passHref>
                    <IconButton>
                        <ArrowBack />
                    </IconButton>
                </Link>
            </PageHeader>
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
                        rules={{
                            required: 'Plan title is required',
                        }}
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
                                    error={!!errors.title}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="title"
                                    render={({ message }) => (
                                        <p className="text-red-500">
                                            {message}
                                        </p>
                                    )}
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
                    <Box
                        sx={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h3" component="h3">
                            Exercises
                        </Typography>
                        <Button
                            onClick={() => append({ ...defaultExerciseValues })}
                            variant="contained"
                            startIcon={<Add />}
                        >
                            Add Exercise
                        </Button>
                    </Box>
                    <Divider />
                </Box>
                <Box
                    component="ul"
                    sx={{
                        display: 'grid',
                        gridGap: '2rem',
                        width: '100%',
                        gridTemplateColumns: {
                            xs: 'repeat(1, minmax(0,1fr))',
                            md: 'repeat(2, minmax(0,1fr))',
                            lg: 'repeat(3, minmax(0,1fr))',
                        },
                    }}
                >
                    {fields.length ? (
                        fields.map((item, index) => {
                            const isExerciseOnOwnBodyWeight = watch(
                                `exercises.${index}.isOwnBodyWeight`,
                            )!;
                            return (
                                <li key={item.id}>
                                    <Card
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            width: '100%',
                                            flexGrow: '1',
                                            gap: '0.5rem',
                                            padding: '2rem',
                                        }}
                                    >
                                        <Controller
                                            control={control}
                                            name={`exercises.${index}.name`}
                                            rules={{
                                                required: true,
                                            }}
                                            render={({
                                                         field: {
                                                             onChange,
                                                             onBlur,
                                                             value,
                                                         },
                                                     }) => (
                                                <>
                                                    <InputLabel>
                                                        Title
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        placeholder="Title"
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        value={value}
                                                        error={
                                                            errors.exercises &&
                                                            Object.values(
                                                                errors.exercises,
                                                            )[index]?.title
                                                        }
                                                    />
                                                    <ErrorMessage
                                                        errors={errors}
                                                        name={`exercises.${index}.title`}
                                                        render={() => (
                                                            <p className="text-red-500">
                                                                Title for the
                                                                exercise is
                                                                required
                                                            </p>
                                                        )}
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
                                                        error={
                                                            errors.exercises &&
                                                            Object.values(
                                                                errors.exercises,
                                                            )[index]
                                                                ?.description
                                                        }
                                                    />
                                                    <ErrorMessage
                                                        errors={errors}
                                                        name={`exercises.${index}.description`}
                                                        render={() => (
                                                            <p className="text-red-500">
                                                                Description is
                                                                required
                                                            </p>
                                                        )}
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
                                                         },
                                                     }) => (
                                                <>
                                                    <InputLabel>
                                                        Reps
                                                    </InputLabel>
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
                                                         },
                                                     }) => (
                                                <>
                                                    <InputLabel>
                                                        Series
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        placeholder="Title"
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
                                            name={`exercises.${index}.isOwnBodyWeight`}
                                            render={({
                                                         field: { onChange, value },
                                                     }) => (
                                                <FormControlLabel
                                                    control={
                                                        <Switch
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
                                                         },
                                                     }) => (
                                                <>
                                                    <InputLabel>
                                                        Weight
                                                    </InputLabel>
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
                                            {(index === fields.length - 1 ||
                                                (index === 0 &&
                                                    fields.length === 1)) && (
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
                                            )}

                                            <IconButton
                                                aria-label="Add exercise"
                                                onClick={() => remove(index)}
                                            >
                                                <Remove />
                                            </IconButton>
                                        </div>
                                    </Card>
                                </li>
                            );
                        })
                    ) : (
                        <Box>
                            <Typography variant="h4" component="h4">
                                No exercises.
                            </Typography>
                        </Box>
                    )}
                </Box>
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!isValid}
                    startIcon={
                        isLoading ? (
                            <CircularProgress size={20} color="info" />
                        ) : (
                            <Add />
                        )
                    }
                >
                    Create
                </Button>
            </form>
        </>
    );
}
