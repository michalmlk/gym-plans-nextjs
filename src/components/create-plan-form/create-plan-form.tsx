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
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ExerciseDTO } from '@/app/common/model';
import { useUser } from '@clerk/nextjs';
import { Add, NoteAdd, Remove } from '@mui/icons-material';

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
    const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

    const { fields, append, remove } = useFieldArray({
        name: 'exercises',
        control,
    });

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 items-center"
        >
            {/* register your input into the hook by invoking the "register" function */}
            <Input type="text" placeholder="Title" {...register('title')} />
            <Input
                type="text"
                placeholder="Description"
                {...register('description')}
            />
            <ul className="flex flex-col gap-6">
                {fields.map((item, index) => (
                    <li key={item.id}>
                        <Box
                            sx={{
                                display: 'flex',
                            }}
                        >
                            <div>
                                <Input
                                    placeholder="Title"
                                    {...register(`exercises[${index}].title`)}
                                />
                                <Input
                                    placeholder="Description"
                                    {...register(
                                        `exercises[${index}].description`
                                    )}
                                />
                                <Input
                                    type="number"
                                    {...register(`exercises[${index}].reps`)}
                                />
                                <Input
                                    type="number"
                                    {...register(`exercises[${index}].series`)}
                                />
                                <FormControlLabel
                                    control={<Switch defaultChecked />}
                                    label="Own body weight"
                                />
                                <Input
                                    type="number"
                                    {...register(`exercises${[index]}.weight`)}
                                />
                            </div>
                            <div>
                                <IconButton aria-label="Add exercise">
                                    <Add
                                        onClick={() => {
                                            console.log(item);
                                            append({ ...item });
                                        }}
                                    />
                                </IconButton>
                                <IconButton
                                    aria-label="Add exercise"
                                    onClick={() => remove(index)}
                                >
                                    <Remove />
                                </IconButton>
                            </div>
                        </Box>
                    </li>
                ))}
            </ul>
            <Button variant="contained" type="submit" startIcon={<NoteAdd />}>
                Create
            </Button>
        </form>
    );
}
