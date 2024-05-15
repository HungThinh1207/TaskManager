import Button from "../components/Button";
import { useState } from "react";
import { Await, useParams } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import Title from "../components/Title";
import { useGetAllProjectsQuery, useDeleteProjectMutation } from "../redux/slices/api/projectApiSlice"
import { getInitials } from "../utils";
import clsx from "clsx";
import ConfirmatioDialog from "../components/Dialogs";
import { toast } from "sonner";
import AddProject from "../components/AddProject";
import { formatDate } from "../utils/index";
import moment from "moment";



const Project = () => {
    const params = useParams();
    const [selected, setSelected] = useState(null);;
    const [open, setOpen] = useState(false);
    const status = params?.status || "";
    const [openDialog, setOpenDialog] = useState(false);

    //lay project
    const { data, isLoading, refetch } = useGetAllProjectsQuery()

    //xoa project
    const [deleteProject] = useDeleteProjectMutation()
    const deleteHandler = async () => {
        try {
            const result = await deleteProject(selected)
            console.log(result)
            console.log(selected)
            refetch();
            if (!result) {
                toast.error("Lỗi")
            } else {
                toast.success("Đã xóa thành công")
            }
            setSelected(null)
            setTimeout(() => {
                setOpenDialog(false)
            }, 50);
        } catch (err) {
            console.log(err)
            toast.error(err?.data?.message || err.error)
        }
    };
    const deleteClick = (el) => {
        setSelected(el);
        setOpenDialog(true);
    };

    const createClick = () => {
        setSelected(null);
        setOpen(true);
    };

    const editClick = (el) => {
        setSelected(el);
        setOpen(true);
    };

    const TableHeader = () => (
        <thead className='border-b border-gray-300'>
            <tr className='text-black text-left'>
                <th className='py-2'>Name Project</th>
                <th className='py-2'>Start date</th>
                <th className='py-2'>End Date</th>
            </tr>
        </thead>
    );

    const TableRow = ({ project }) => (
        <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-400/10'>
            <td className='p-2'>
                <div className='flex items-center gap-3'>
                    <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700'>
                        <span className='text-xs md:text-sm text-center'>
                            {/* {getInitials(project.name)} */}
                        </span>
                    </div>
                    {project && project.name}
                </div>
            </td>

            <td className='p-2'>{moment(project.date).format('DD/MM/YYYY')}</td>
            <td className='p-2'>{moment(project.endDate).format('DD/MM/YYYY')}</td>

            <td className='p-2 flex gap-4 justify-end'>
                <Button
                    className='text-blue-600 hover:text-blue-500 font-semibold sm:px-0'
                    label='Edit'
                    type='button'
                    onClick={() => editClick(project)}
                />

                <Button
                    className='text-red-700 hover:text-red-500 font-semibold sm:px-0'
                    label='Delete'
                    type='button'
                    onClick={() => deleteClick(project)}
                />
            </td>
        </tr>
    );

    return (
        <>
            <div className="w-full">
                <div className='flex items-center justify-between mb-4'>
                    <Title title={status ? `${status} Project` : "Project"} />
                    {!status && (
                        <Button
                            onClick={createClick}
                            label='Create Project'
                            icon={<IoMdAdd className='text-lg' />}
                            className='flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5'
                        />
                    )}
                </div>
                <div className='bg-white px-2 md:px-4 py-4 shadow-md rounded'>
                    <div className='overflow-x-auto'>
                        <table className='w-full mb-5'>
                            <TableHeader />
                            <tbody>
                                {data && data?.map((project, index) => (
                                    <TableRow key={index} project={project} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <AddProject
                open={open} setOpen={setOpen} project={selected}
            />
            <ConfirmatioDialog
                open={openDialog}
                setOpen={setOpenDialog}
                onClick={deleteHandler}
            />
        </>
    )
}

export default Project;