import { ExerciseDTO, ExerciseFormDataDTO } from '@/app/common/model';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { appendExerciseToPlan, updateExercise } from '@/utils/exercises';
import { useParams } from 'next/navigation';

export enum ExerciseFormMode {
    CREATE = 'create',
    UPDATE = 'update',
}

export const useExerciseForm = (mode: ExerciseFormMode, onClose: any, data: ExerciseDTO | null | undefined) => {

    const defaultValues = {
        name: data?.name || '',
        description: data?.description || '',
        isOwnBodyWeight: data?.isOwnBodyWeight || false,
        reps: data?.reps || 0,
        series: data?.series || 1,
        weight: data?.weight || 0,
    };

    const {
        control,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors, isValid, isLoading },
    } = useForm<ExerciseFormDataDTO>({
        defaultValues,
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const queryClient = useQueryClient();

    const isExerciseOnOwnBodyWeight = watch(
        `isOwnBodyWeight`,
    )!;

    const { id } = useParams();

    const onSubmit = async (values: ExerciseFormDataDTO): Promise<void> => {
        if (data && mode === ExerciseFormMode.UPDATE) {
            try {
                await updateExercise(data.$id, values);
                reset();
                onClose();
                await queryClient.invalidateQueries({ queryKey: ['exercises'] });
            } catch (e: any) {
                throw new Error(e.message);
            }
        } else if (id && typeof id === 'string') {
            try {
                await appendExerciseToPlan(id, values);
                reset();
                onClose();
                await queryClient.invalidateQueries({ queryKey: ['exercises'] });
            } catch (e: any) {
                throw new Error(e.message);
            }
        }
    };

    return {
        errors, isValid, isLoading,
        onSubmit,
        isExerciseOnOwnBodyWeight,
        control,
        handleSubmit,
        watch,
        reset,
        setValue,
        defaultValues,
    };
};

export default useForm;