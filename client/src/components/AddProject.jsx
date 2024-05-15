import React from "react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import { useCreateProjectMutation, useUpdateProjectMutation } from "../redux/slices/api/projectApiSlice.js"
import ModalWrapper from "./ModalWrapper.jsx";
import { useForm } from "react-hook-form";
import { Dialog } from "@headlessui/react";
import { dateFormatter } from "../utils/index.js";
import { toast } from "sonner";

const AddProject = ({ open, setOpen, project }) => {
    let defaultValues = {
        name: project?.name || "",
        date: dateFormatter(project?.date || new Date()),
        endDate: dateFormatter(project?.endDate || new Date()),
        tasks: [],
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues });

    const [addNewProject, { isLoading }] = useCreateProjectMutation();
    const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation()

    const handleOnSubmit = async (data) => {
        try {
            const newData = {
                ...data,
            }

            let res;
            if (project && project._id) {
                // Cập nhật dự án hiện có
                res = await updateProject({ ...newData, _id: project._id }).unwrap();
            } else {
                // Tạo dự án mới
                res = await addNewProject(newData).unwrap();
            }
            toast.success(res.message);

            setTimeout(() => {
                setOpen(false)
            }, 500)

        } catch (err) {
            console.log(err)
            toast.error(err?.data?.message || err.message)
        }
    };
    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
                    <Dialog.Title
                        as='h2'
                        className='text-base font-bold leading-6 text-gray-900 mb-4'
                    >
                        {project ? "UPDATE PROJECT" : "ADD NEW PROJECT"}
                    </Dialog.Title>

                    <div className='mt-2 flex flex-col gap-6'>
                        <Textbox
                            placeholder='Full name'
                            type='text'
                            name='name'
                            label='Full Name'
                            className='w-full rounded'
                            register={register("name", {
                                required: "Full name is required!",
                            })}
                            error={errors.name ? errors.name.message : ""}
                        />
                        <div className='w-full'>
                            <Textbox
                                placeholder='Date'
                                type='date'
                                name='date'
                                label='Task Date'
                                className='w-full rounded'
                                register={register("date", {
                                    required: "Date is required!",
                                })}
                                error={errors.date ? errors.date.message : ""}
                            />
                        </div>

                        <div className='w-full'>
                            <Textbox
                                placeholder='Date'
                                type='date'
                                name='endDate'
                                label='End Date'
                                className='w-full rounded'
                                register={register("endDate", {
                                    required: "End date is required!",
                                })}
                                error={errors.endDate ? errors.endDate.message : ""}
                            />
                        </div>
                    </div>

                    {isLoading || isUpdating ? (
                        <div className='py-5'>
                            <Loading />
                        </div>
                    ) : (
                        <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
                            <Button
                                type='submit'
                                className='bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto'
                                label='Submit'
                            />

                            <Button
                                type='button'
                                className='bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto'
                                onClick={() => setOpen(false)}
                                label='Cancel'
                            />
                        </div>
                    )}
                </form>
            </ModalWrapper >
        </>
    )

}

export default AddProject;