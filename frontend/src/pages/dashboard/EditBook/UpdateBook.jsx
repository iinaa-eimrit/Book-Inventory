import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchBookByIdQuery, useUpdateBookMutation } from '../../../redux/features/books/booksApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseURL';

const UpdateBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, isError, refetch } = useFetchBookByIdQuery(id);
  const [updateBook] = useUpdateBookMutation();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (bookData) {
      setValue('title', bookData.title);
      setValue('description', bookData.description);
      setValue('category', bookData.category);
      setValue('trending', bookData.trending);
      setValue('oldPrice', bookData.oldPrice);
      setValue('newPrice', bookData.newPrice);
      setValue('coverImage', bookData.coverImage)
    }
  }, [bookData, setValue])

  const onSubmit = async (data) => {
    const updateBookData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage || bookData.coverImage,
    };
    try {
      await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      Swal.fire({
        title: "Book Updated",
        text: "Your book is updated successfully!",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      await refetch()
    } catch (error) {
      console.error("Failed to update book:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update book. Please try again.",
        icon: "error",
      });
    }
  }

  if (isLoading) return <Loading />
  if (isError) return <div className="text-center text-red-600">Error fetching book data</div>

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Update Book</h2>
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
        <InputField
          label="Cover Image URL"
          name="coverImage"
          register={register}
          required
          error={errors.coverImage}
        />
        <button 
          type="submit" 
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Update Book
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

export default UpdateBook

