import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';

const AddBook = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setImageFile] = useState(null);
    const [addBook, {isLoading, isError}] = useAddBookMutation()
    const [imageFileName, setImageFileName] = useState('')

    const onSubmit = async (data) => {
        const newBookData = {
            ...data,
            coverImage: imageFileName
        }
        try {
            await addBook(newBookData).unwrap();
            Swal.fire({
                title: "Book added",
                text: "Your book is uploaded successfully!",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, It's Okay!"
            });
            reset();
            setImageFileName('')
            setImageFile(null);
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Failed to add book. Please try again.",
                icon: "error",
            });
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setImageFile(file);
            setImageFileName(file.name);
        }
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Book</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <InputField
                    label="Title"
                    name="title"
                    register={register}
                    required
                    error={errors.title}
                />
                <InputField
                    label="Description"
                    name="description"
                    register={register}
                    required
                    error={errors.description}
                    textarea
                />
                <SelectField
                    label="Category"
                    name="category"
                    register={register}
                    required
                    error={errors.category}
                    options={[
                        { value: '', label: 'Choose A Category' },
                        { value: 'business', label: 'Business' },
                        { value: 'technology', label: 'Technology' },
                        { value: 'fiction', label: 'Fiction' },
                        { value: 'horror', label: 'Horror' },
                        { value: 'adventure', label: 'Adventure' },
                    ]}
                />
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="trending"
                        {...register('trending')}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="trending" className="ml-2 text-sm font-medium text-gray-700">
                        Trending
                    </label>
                </div>
                <InputField
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    register={register}
                    required
                    error={errors.oldPrice}
                />
                <InputField
                    label="New Price"
                    name="newPrice"
                    type="number"
                    register={register}
                    required
                    error={errors.newPrice}
                />
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cover Image
                    </label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100
                        "
                    />
                    {imageFileName && (
                        <p className="mt-2 text-sm text-gray-500">Selected: {imageFileName}</p>
                    )}
                </div>
                <button 
                    type="submit" 
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={isLoading}
                >
                    {isLoading ? 'Adding...' : 'Add Book'}
                </button>
            </form>
        </div>
    )
}

const InputField = ({ label, name, register, required, error, type = 'text', textarea = false }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
        </label>
        {textarea ? (
            <textarea
                id={name}
                {...register(name, { required })}
                rows={3}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
            />
        ) : (
            <input
                type={type}
                id={name}
                {...register(name, { required })}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
            />
        )}
        {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </div>
)

const SelectField = ({ label, name, register, required, error, options }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
            {label}
        </label>
        <select
            id={name}
            {...register(name, { required })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
    </div>
)

export default AddBook

