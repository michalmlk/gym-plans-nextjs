'use client';

import { Controller } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { ErrorMessage } from '@hookform/error-message';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Add, Check } from '@mui/icons-material';
import { ExerciseFormMode, useExerciseForm } from '@/hooks/useExerciseForm';
import { ExerciseDTO } from '@/app/common/model';
import { ModalWrapper, ModalWrapperProps } from '@/components/shared/modal-wrapper/modal-wrapper';

const customStyles = {};

const inputStyle = {
    width: '100%',
};

function ExerciseForm({ onClose, data, mode }: {
    onClose: () => void,
    mode: ExerciseFormMode;
    data?: ExerciseDTO;
}) {

    const {
        control,
        handleSubmit,
        isExerciseOnOwnBodyWeight,
        defaultValues,
        setValue,
        errors, isValid, isLoading,
        onSubmit,
    } = useExerciseForm(mode, onClose, data);


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
                             field,
                             fieldState,
                         }) => (
                    <div>
                        <InputLabel>
                            Title
                        </InputLabel>
                        <OutlinedInput
                            placeholder="Title"
                            name="name"
                            onBlur={field.onBlur}
                            value={field.value}
                            onChange={field.onChange}
                            error={!!fieldState.error}
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
                             field,
                             fieldState,
                         }) => (
                    <div>
                        <InputLabel>
                            Description
                        </InputLabel>
                        <OutlinedInput
                            placeholder="Description"
                            name="description"
                            onBlur={field.onBlur}
                            value={field.value}
                            onChange={field.onChange}
                            error={!!fieldState.error}
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
                             field,
                             fieldState,
                         }) => (
                    <div>
                        <InputLabel>
                            Reps
                        </InputLabel>
                        <OutlinedInput
                            placeholder="Reps"
                            name="reps"
                            onBlur={field.onBlur}
                            value={field.value}
                            onChange={field.onChange}
                            error={!!fieldState.error}
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
                             field,
                             fieldState,
                         }) => (
                    <div>
                        <InputLabel>
                            Series
                        </InputLabel>
                        <OutlinedInput
                            placeholder="Series"
                            name="series"
                            onBlur={field.onBlur}
                            value={field.value}
                            onChange={field.onChange}
                            error={!!fieldState.error}
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
                                value={defaultValues.isOwnBodyWeight || false}
                                onChange={(e) => {
                                    setValue('weight', defaultValues.weight);
                                    onChange(e);
                                }}
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
                             field, fieldState,
                         }) => (
                    <div>
                        <InputLabel>
                            Weight
                        </InputLabel>
                        <OutlinedInput
                            placeholder="Weight"
                            onBlur={field.onBlur}
                            value={field.value || 0}
                            onChange={field.onChange}
                            type="number"
                            disabled={
                                isExerciseOnOwnBodyWeight!
                            }
                            error={!!fieldState.error}
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
                            mode === ExerciseFormMode.CREATE ? <Add /> : <Check />
                        )
                    }
                >
                    {mode === ExerciseFormMode.CREATE ? 'Create' : 'Update'}
                </Button>
            </CardActions>
        </Box>
    );
}

// @ts-ignore
export default function ExerciseModal({ onClose, isOpen, data, mode }: ModalWrapperProps & {
    mode: ExerciseFormMode
    data?: ExerciseDTO;
}) {
    return <ModalWrapper onClose={onClose} isOpen={isOpen}
                         title={mode === ExerciseFormMode.CREATE ? 'Add new exercise' : 'Edit exercise'}
                         customStyles={customStyles}><ExerciseForm onClose={onClose} data={data}
                                                                   mode={mode} /></ModalWrapper>;
}
