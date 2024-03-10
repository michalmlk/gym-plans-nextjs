import { ExerciseFormDataDTO } from '@/app/common/model';
import { useForm as useHookForm } from 'react-hook-form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { appendExerciseToPlan, getExercise, updateExercise } from '@/utils/exercises';

enum ExerciseFormMode {
    CREATE = 'create',
    UPDATE = 'update',
}

export const useForm = (mode: ExerciseFormMode, onClose: any, exerciseId: string) => {
    const { data } = useQuery({
        queryFn: async () => await getExercise(exerciseId),
        queryKey: [`exerciseData-${exerciseId}`],
    });
    const defaultValues = {
        name: data?.name ?? '',
        description: data?.description ?? '',
        isOwnBodyWeight: data?.isOwnBodyWeight ?? false,
        reps: data?.reps ?? 0,
        series: data?.series ?? 1,
        weight: data?.weight ?? 0,
    };

    const {
        control,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors, isValid, isLoading },
    } = useHookForm<ExerciseFormDataDTO>({
        reValidateMode: 'onChange',
        mode: 'onChange',
        defaultValues,
    });

    const queryClient = useQueryClient();

    const isExerciseOnOwnBodyWeight = watch(
        `isOwnBodyWeight`,
    )!;

    const onSubmit = async (values: ExerciseFormDataDTO): Promise<void> => {
        if (values && mode === ExerciseFormMode.UPDATE) {
            try {
                await updateExercise(exerciseId, values);
                reset();
                onClose();
                await queryClient.invalidateQueries({ queryKey: ['exercises'] });
            } catch (e: any) {
                throw new Error(e.message);
            }
        } else {
            try {
                await appendExerciseToPlan(exerciseId, values);
                reset();
                onClose();
                await queryClient.invalidateQueries({ queryKey: ['exercises'] });
            } catch (e: any) {
                throw new Error(e.message);
            }
        }
    };

    return {
        errors,
        isValid,
        isLoading,
        onSubmit,
        isExerciseOnOwnBodyWeight,
        control,
        handleSubmit,
        watch,
        reset,
        setValue,
    };
};

export default useForm;