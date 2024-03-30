import { apiSlice } from "../apiSlice"

const TASK_URL = "/task"
export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query({
            query: () => ({
                url: `${TASK_URL}/dashboard`,
                method: "GET",
                credentials: "include",
            }),
        }),
    })
})

export const {useGetDashboardStatsQuery} = taskApiSlice