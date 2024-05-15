import { apiSlice } from "../apiSlice";
const PROJECT_URL = "/project"

export const projectApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProjects: builder.query({
            query: () => ({
                url: `${PROJECT_URL}`,
                method: "GET",
                credentials: "include",
            }),
        }),
        createProject: builder.mutation({
            query: (data) => ({
                url: `${PROJECT_URL}/create-project`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
        updateProject: builder.mutation({
            query: (data) => ({
                url: `${PROJECT_URL}/update-project/${data._id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),
        deleteProject: builder.mutation({
            query: ({ _id }) => ({
                url: `${PROJECT_URL}/delete-project/${_id}`,
                method: "DELETE",
                credentials: "include",
            }),
        }),
    })
})

export const {
    useGetAllProjectsQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation
} = projectApiSlice