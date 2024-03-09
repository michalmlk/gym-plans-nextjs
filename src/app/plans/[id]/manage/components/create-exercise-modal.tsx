import { useUser } from '@clerk/nextjs';
import { Controller, useForm } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { ErrorMessage } from '@hookform/error-message';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ModalWrapper, { ModalWrapperProps } from '@/components/shared/modal-wrapper/modal-wrapper';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Add } from '@mui/icons-material';
import { appendExerciseToPlan } from '@/utils/exercises';
import { useQueryClient } from '@tanstack/react-query';

type FormValues = {
    name: string,
    description: string,
    isOwnBodyWeight: boolean,
    reps: number,
    series: number,
    weight: number,
}

const customStyles = {};

const inputStyle = {
    width: '100%',
};

function CreateExerciseForm({ onClose, id }: { onClose: () => void, id: string }) {

    const defaultExerciseValues = {
        name: '',
        description: '',
        isOwnBodyWeight: false,
        reps: 0,
        series: 1,
        weight: 0,
    };

    const { user } = useUser();
    const {
        control,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors, isValid, isLoading },
    } = useForm<FormValues>({
        reValidateMode: 'onChange',
        mode: 'onChange',
        defaultValues: defaultExerciseValues,
    });

    const isExerciseOnOwnBodyWeight = watch(
        `isOwnBodyWeight`,
    )!;

    const queryClient = useQueryClient();

    const onSubmit = async (values: FormValues): Promise<void> => {
        try {
            await appendExerciseToPlan(id, values);
            reset();
            onClose();
            await queryClient.invalidateQueries({ queryKey: ['exercises'] });
        } catch (e: any) {
            throw new Error(e.message);
        }
    };


    return (
        <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
             onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="name"
                rules={{
                    required: 'Exercise name is required.',
                }}
                render={({
                             field: {
                                 onChange,
                                 onBlur,
                                 value,
                             },
                         }) => (
                    <div>
                        <InputLabel>
                            Title
                        </InputLabel>
                        <OutlinedInput
                            placeholder="Title"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            error={errors.name!}
                            style={inputStyle}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="name"
                            render={({ message }) => (
                                <p className="text-red-500">
                                    {message}
                                </p>
                            )}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="description"
                rules={{
                    required: 'Description is required.',
                }}
                render={({
                             field: {
                                 onChange,
                                 onBlur,
                                 value,
                             },
                         }) => (
                    <div>
                        <InputLabel>
                            Description
                        </InputLabel>
                        <OutlinedInput
                            placeholder="Description"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            error={
                                errors.description!
                            }
                            style={inputStyle}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="description"
                            render={({ message }) => (
                                <p className="text-red-500">
                                    {message}
                                </p>
                            )}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="reps"
                rules={{
                    required: 'Field is required',
                }}
                render={({
                             field: {
                                 onChange,
                                 onBlur,
                                 value,
                             },
                         }) => (
                    <div>
                        <InputLabel>
                            Reps
                        </InputLabel>
                        <OutlinedInput
                            placeholder="Reps"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            type="number"
                            style={inputStyle}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="reps"
                            render={({ message }) => (
                                <p className="text-red-500">
                                    {message}
                                </p>
                            )}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="series"
                rules={{
                    required: 'Field is required',
                }}
                render={({
                             field: {
                                 onChange,
                                 onBlur,
                                 value,
                             },
                         }) => (
                    <div>
                        <InputLabel>
                            Series
                        </InputLabel>
                        <OutlinedInput
                            placeholder="Series"
                            onBlur={onBlur}
                            onChange={onChange}
                            value={value}
                            type="number"
                            style={inputStyle}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="series"
                            render={({ message }) => (
                                <p className="text-red-500">
                                    {message}
                                </p>
                            )}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="isOwnBodyWeight"
                render={({
                             field: { onChange, value },
                         }) => (
                    <FormControlLabel
                        control={
                            <Switch
                                onChange={(e) => {
                                    setValue('weight', defaultExerciseValues.weight);
                                    onChange(e);
                                }}
                                value={value}
                            />
                        }
                        label="Own body weight"
                    />
                )}
            />
            <Controller
                control={control}
                name="weight"
                rules={{
                    required:
                        !isExerciseOnOwnBodyWeight ? 'Field is required.' : false,
                }}
                render={({
                             field: {
                                 onChange,
                                 onBlur,
                                 value,
                             },
                         }) => (
                    <div>
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
                            style={inputStyle}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="weight"
                            render={({ message }) => (
                                <p className="text-red-500">
                                    {message}
                                </p>
                            )}
                        />
                    </div>
                )}
            />
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" color="primary" onClick={onClose}>Cancel</Button>
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
            </CardActions>
        </Box>
    );
}

export default function CreateExerciseModal({ onClose, isOpen, id }: ModalWrapperProps & { id: string }) {
    return <ModalWrapper onClose={onClose} isOpen={isOpen} title="Add new exercise"
                         customStyles={customStyles}><CreateExerciseForm onClose={onClose} id={id} /></ModalWrapper>;
}
        