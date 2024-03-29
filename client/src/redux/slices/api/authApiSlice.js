import { apiSlice } from "../apiSlice"

const AUTH_API = "/user"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        login: builder.mutation({
            query: (data) => ({
                url: `${AUTH_API}/login`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${AUTH_API}/register`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
        logout: builder.mutation({
            query: (data) => ({
                url: `${AUTH_API}/logout`,
                method: "POST",
                credentials: "include",
            }),
        }),
    }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApiSlice;