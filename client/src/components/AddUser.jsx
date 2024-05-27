import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import SelectList from "./SelectList";

import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { app } from "../utils/firebase";
import { BiImages } from "react-icons/bi";

const ROLE = ["ADMIN", "Project Manager", "Developer", "Tester", "DevOps"];
const GENDER = ["male", "female"]
const uploadedFileURLs = [];

const AddUser = ({ open, setOpen, userData }) => {
  const defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);

  const [role, setRole] = useState(userData?.role?.toUpperCase() || ROLE[2]);
  const [gender, setGender] = useState(userData?.gender?.toUpperCase() || GENDER[0]);

  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);
  const URLS = userData?.profilePic ? [...userData.profilePic] : []

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const dispatch = useDispatch()
  const [addNewUser, { isLoading }] = useRegisterMutation()
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation()

  const handleOnSubmit = async (data) => {
    for (const file of assets) {
      setUploading(true)
      try {
        await upLoadFile(file)
      } catch (error) {
        console.error("Lỗi update file", error.message)
        return
      } finally {
        setUploading(false)
      }
    }

    try {
      const newData = {
        ...data,
        gender,
        role,
        profilePic: uploadedFileURLs,
      }
      if (userData) {
        const result = await updateUser(newData).unwrap();
        toast.success("Hồ sơ được cập nhật thành công")

        if (userData?._id === user > _id) {
          dispatch(setCredentials({ ...result.user }))
        }

      } else {
        // await addNewUser({ ...data, password: data?.password }).unwrap();
        await addNewUser({ ...newData, password: data?.password }).unwrap();
        toast.success("Người dùng mới được thêm thành công")
      }
      setTimeout(() => {
        setOpen(false)
      }, 500)
    } catch (error) {
      // toast.error("Đã xảy ra lỗi")
    }
  };

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };
  const upLoadFile = async (file) => {
    const storage = getStorage(app)
    const name = new Date().getTime() + file.name
    const storageRef = ref(storage, name)
    const upLoadTask = uploadBytesResumable(storageRef, file)

    return new Promise((resolve, reject) => {
      upLoadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("Đang tải")
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(upLoadTask.snapshot.ref)
            .then((downLoadURL) => {
              uploadedFileURLs.push(downLoadURL);
              resolve()
            })
            .catch((error) => {
              reject(error);
            });
        }
      )
    })
  }

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
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
            {/* <Textbox
              placeholder='Profile Picture URL'
              type='text'
              name='profilePic'
              label='Profile Picture'
              className='w-full rounded'
              register={register("profilePic")}
              error={errors.profilePic ? errors.profilePic.message : ""}
            /> */}
            {/* <Textbox
              placeholder='Title'
              type='text'
              name='title'
              label='Title'
              className='w-full rounded'
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            /> */}
            <div className='mt-2 flex flex-col gap-6 '>
              <label
                className='flex items-center gap-1 text-ascent-2 hover:text-ascent-1 cursor-pointer my-4 bg-transparent px-3 py-1 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300 '
                htmlFor='imgUpload'
              >
                <input
                  type='file'
                  className='hidden'
                  id='imgUpload'
                  onChange={(e) => handleSelect(e)}
                  accept='.jpg, .png, .jpeg'
                  multiple={true}
                />
                <BiImages />
                <span>Add Picture</span>
              </label>
            </div>

            <SelectList
              label='Gender'
              lists={GENDER}
              selected={gender}
              setSelected={setGender}
            />

            <SelectList
              label='Role'
              lists={ROLE}
              selected={role}
              setSelected={setRole}
            />

            <Textbox
              placeholder='Email Address'
              type='email'
              name='email'
              label='Email Address'
              className='w-full rounded'
              register={register("email", {
                required: "Email Address is required!",
              })}
              error={errors.email ? errors.email.message : ""}
            />

            <Textbox
              placeholder='password'
              type='text'
              name='password'
              label='Password'
              className='w-full rounded'
              register={register("password", {
                required: "User password is required!",
              })}
              error={errors.password ? errors.password.message : ""}
            />

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
      </ModalWrapper>
    </>
  );
};

export default AddUser;
