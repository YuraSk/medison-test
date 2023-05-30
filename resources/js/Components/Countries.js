import React, {useState} from 'react';
import DataTable from "@/Components/DataTable";
import {useForm, usePage} from '@inertiajs/inertia-react';
import {Inertia} from "@inertiajs/inertia";
import Modal from "./Modal";
import Label from "@/Components/Label";
import Input from "@/Components/Input";
import Button from "@/Components/Button";

export default function Countries() {
    const { countries } = usePage().props;
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const { data, setData, patch, processing, errors, reset } = useForm({
        id: '',
        name: '',
        iso: '',
    });

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
        patch(route('countries.update', data.id));
        setEditModalOpen(false);
        reset();
    }
    //create a hook to handle the change of the input
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
            <Modal modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen}>
                <h2 className="text-xl font-bold mb-4">Delete Country</h2>
                <p>Are you sure you want to delete country {deleteId} ?</p>
                <div className="flex justify-end mt-4">
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                        onClick={() => {
                            setDeleteModalOpen(false);
                            setDeleteId(null);
                        }
                        }
                    >Close </button>
                    <button
                        className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700"
                        onClick={() => deleteCountry() }
                    >Delete </button>
                </div>
            </Modal>

            <Modal modalOpen={editModalOpen} setModalOpen={setEditModalOpen} >
                <h2 className="text-xl font-bold mb-4">Edit Country</h2>

                <form onSubmit={editCountry}>
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
                    <div className="flex justify-end mt-4">
                        <button
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
                            onClick={(e) => {
                                e.preventDefault();
                                setEditModalOpen(false);
                                reset();
                            }
                            }
                        >Close </button>
                        <Button className="ml-4" processing={processing}>
                            Save
                        </Button>
                    </div>
                </form>
            </Modal>

            <div className="p-6 bg-white border-b border-gray-200">Countries</div>
            <DataTable headers={['ID', 'NAME', 'ISO']}
                       paginatedData={countries}
                       actions={true}
                       onEdit={openEditModal}
                       onDelete={openDeleteModal}
            />
        </div>
    );
}
