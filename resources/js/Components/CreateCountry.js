import React from 'react';
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import {useForm} from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import useHandleCountryInput from "@/Hooks/useHandleCountryInput";

export default function CreateCountry(props) {
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        iso: '',
    });
    const {onHandleChange} = useHandleCountryInput(setData);

    const submit = (e) => {
        e.preventDefault();
        post(route('countries.store'), {
            onSuccess: () => {
                reset();
            }
        });
    }

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-gray-200 border-b border-gray-200 font-bold">Create Country</div>
            <form onSubmit={submit}>
                <div className='p-4'>
                    <Label forInput="name" value="Country"/>
                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                    {errors.name && (<div className="text-red-500 text-sm">{errors.name}</div>)}
                </div>
                <div className="p-4">
                    <Label forInput="iso" value="Iso"/>
                    <Input
                        type="text"
                        name="iso"
                        value={data.iso}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />
                    {errors.iso && (<div className="text-red-500 text-sm">{errors.iso}</div>)}

                </div>
                <div className="p-2 bg-gray-200 border-b border-gray-200 ">
                    <div className="flex items-center justify-end mt-4">
                        <Button className="ml-4" processing={processing}>
                            Create
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
