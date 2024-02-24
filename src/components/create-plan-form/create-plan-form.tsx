'use client';

import {
    useForm,
    SubmitHandler,
    useFieldArray,
    Controller,
} from 'react-hook-form';
import Input from '@mui/material/Input';
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

type FormValues = {
    title: string;
    description?: string;
    tags: string[];
    userId: string;
    exercises: Omit<ExerciseDTO, 'id'>[];
};

export default function CreatePlanForm() {
    const { user } = useUser();

    console.log('data:', user?.id);
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
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 items-center"
        >
            <Controller
                control={control}
                name="title"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        type="text"
                        placeholder="Title"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                    />
                )}
            />
            <Controller
                control={control}
                name="description"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        type="text"
                        placeholder="Description"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                    />
                )}
            />
            <ul className="flex gap-6 w-full flex-wrap justify-center">
                {fields.map((item, index) => {
                    const isExerciseOnOwnBodyWeight = watch(
                        `exercises[${index}].isOwnBodyweight`
                    )!;
                    return (
                        <li key={item.id}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Card
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1rem',
                                        width: '100%',
                                        minWidth: '540px',
                                        flexGrow: '1',
                                        padding: '2rem',
                                    }}
                                >
                                    <Controller
                                        control={control}
                                        name={`exercises[${index}].title`}
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
                                                <Input
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
                                        name={`exercises[${index}].description`}
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
                                                <Input
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
                                        name={`exercises[${index}].reps`}
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
                                                <Input
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
                                        name={`exercises[${index}].series`}
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
                                                <Input
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
                                        name={`exercises[${index}].isOwnBodyweight`}
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
                                        name={`exercises[${index}].weight`}
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
                                                <Input
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
                                                console.log(item);
                                                append({ ...item });
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
                            </Box>
                        </li>
                    );
                })}
            </ul>
            <Button variant="contained" type="submit" startIcon={<NoteAdd />}>
                Create
            </Button>
        </form>
    );
}
