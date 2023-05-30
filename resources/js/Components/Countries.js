import React, {useState} from 'react';
import {useForm, usePage} from '@inertiajs/inertia-react';
import {Inertia} from "@inertiajs/inertia";
import CountriesTable from "@/Components/CountriesTable";
import Modal from "@/Components/Modal";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import useHandleCountryInput from "@/Hooks/useHandleCountryInput";

export default function Countries() {
    const {countries} = usePage().props;
    const {data, setData, patch, processing, errors, reset} = useForm({
        id: '',
        name: '',
        iso: '',
    });

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const {onHandleChange} = useHandleCountryInput(setData);

    const openDeleteModal = (id) => {
        setDeleteModalOpen(true);
        setDeleteId(id);
    }

    const deleteCountry = () => {
        Inertia.delete(`/countries/${deleteId}`);
        setDeleteModalOpen(false);
        setDeleteId(null);
    }

    const openEditModal = (country) => {
        setEditModalOpen(true);
        setData({
            id: country.id,
            name: country.name,
            iso: country.iso,
        });
    }

    const editCountry = (e) => {
        e.preventDefault();
        patch(route('countries.update', data.id), {
            onSuccess: () => {
                setEditModalOpen(false);
                reset();
            }
        });
    }

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <Modal modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen} title='Delete Country'>
                <p>Are you sure you want to delete country {deleteId} ?</p>
                <div className="flex justify-end mt-4">
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                        onClick={() => {
                            setDeleteModalOpen(false);
                            setDeleteId(null);
                        }
                        }
                    >Close
                    </button>
                    <button
                        className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                        onClick={() => deleteCountry()}
                    >Delete
                    </button>
                </div>
            </Modal>

            <Modal modalOpen={editModalOpen} setModalOpen={setEditModalOpen} title='Edit Country'>
                <form onSubmit={editCountry}>
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

                    <div className="flex justify-end mt-4">
                        <button
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                            onClick={(e) => {
                                e.preventDefault();
                                setEditModalOpen(false);
                                reset();
                            }
                            }
                        >Close
                        </button>
                        <Button className="ml-4" processing={processing}>
                            Save
                        </Button>
                    </div>
                </form>
            </Modal>

            <div className="p-6 bg-gray-200 border-b border-gray-200 font-bold ">List of Countries</div>
            <CountriesTable headers={['ID', 'NAME', 'ISO']}
                            paginatedData={countries}
                            actions={true}
                            onEdit={openEditModal}
                            onDelete={openDeleteModal}
            />
        </div>
    );
}
