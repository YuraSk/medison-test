import React from 'react';
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Checkbox from "@/Components/Checkbox";
import {Link, useForm} from "@inertiajs/inertia-react";
import Button from "@/Components/Button";

export default function CreateCountry(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        iso: '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('countries.store'));
        reset();
    }
    const onHandleChange = (event) => {
        const { name, value } = event.target;
        if (name === 'iso' && value.length > 2) {
            return;
        }
        if (name === 'iso'){
            setData((prevData) => ({
                ...prevData,
                [name]: value.toUpperCase(),
            }));
            return;
        }
        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
        setData((prevData) => ({
            ...prevData,
            [name]: capitalizedValue,
        }));
    }
    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">Create Country</div>
            <form onSubmit={submit}>
                <div>
                    <Label forInput="name" value="Country" />
                    <Input
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        isFocused={true}
                        handleChange={onHandleChange}
                    />
                </div>
                <div className="mt-4">
                    <Label forInput="iso" value="Iso" />
                    <Input
                        type="text"
                        name="iso"
                        value={data.iso}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        handleChange={onHandleChange}
                    />
                </div>
                <div className="flex items-center justify-end mt-4">
                    <Button className="ml-4" processing={processing}>
                        Create
                    </Button>
                </div>
            </form>
        </div>
    );
}
