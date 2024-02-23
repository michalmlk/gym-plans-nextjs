'use client';

import {
    useForm,
    SubmitHandler,
    useFieldArray,
    Controller,
} from 'react-hook-form';
import Input from '@mui/material/Input';

type Inputs = {
    example: string;
    exampleRequired: string;
};

export default function CreatePlanForm() {
    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {},
    });
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'test',
    });

    console.log(watch('example')); // watch input value by passing the name of it

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 items-center"
        >
            {/* register your input into the hook by invoking the "register" function */}
            <Input type="text" placeholder="Title" {...register('example')} />
            <Input
                type="text"
                placeholder="Description"
                {...register('example')}
            />
            <ul>
                {fields.map((item, index) => (
                    <li key={item.id}>
                        <Input {...register(`test.${index}.firstName`)} />
                        <Controller
                            render={({ field }) => <input {...field} />}
                            name={`test.${index}.lastName`}
                            control={control}
                        />
                        <button type="button" onClick={() => remove(index)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            {/* include validation with required or other standard HTML validation rules */}
            <Input {...register('exampleRequired', { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}

            <Input type="submit" />
        </form>
    );
}
