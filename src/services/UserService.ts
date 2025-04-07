import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse } from "../models/IResponse";
import { baseUrl, isJsonContentType, processError, processResponse } from "../utils/requestutils";
import { QrCodeRequest, User } from "../models/IUser";
import { EmailAddress, IRegisterRequest, IUserRequest, UpdateNewPassword } from "../models/ICredentials";
import { Http } from "../enum/http.method";


export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl, credentials: 'include', isJsonContentType }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        fetchUser: builder.query<IResponse<User>, void>({
            query: () => ({
                url: '/profile',
                method: Http.GET
            }),
            keepUnusedDataFor: 120,
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
            providesTags: (result, error) => ['User']
        }),
        loginUser: builder.mutation<IResponse<User>, IUserRequest>({
            query: (credentials) => ({
                url: '/login',
                method: Http.POST,
                body: credentials
            }),
            transformResponse: processResponse<User>,
            transformErrorResponse: processError
        }),
        registerUser: builder.mutation<IResponse<void>, IRegisterRequest>({
            query: (registerRequest) => ({
                url: '/register',
                method: Http.POST,
                body: registerRequest
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
        }),
        verifyAccount: builder.mutation<IResponse<void>, string>({
            query: (key) => ({
                url: `/verify/account?key=${key}`,
                method: Http.GET,
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError
        }),
        verifyPassword: builder.mutation<IResponse<User>, string>({
            query: (key) => ({
                url: `/verify/password?key=${key}`,
                method: Http.GET,
            }),
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['User']
        }),
        verifyQrCode: builder.mutation<IResponse<User>, QrCodeRequest>({
            query: (QrCodeRequest) => ({
                url: '/verify/qrcode',
                method: Http.POST,
                body: QrCodeRequest
            }),
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['User']
        }),
        resetPassword: builder.mutation<IResponse<void>, EmailAddress>({
            query: (email) => ({
                url: '/resetpassword',
                method: Http.POST,
                body: email
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['User']
        }),
        doResetPassword: builder.mutation<IResponse<void>, UpdateNewPassword>({
            query: (passwordrequest) => ({
                url: `//resetpassword/reset`,
                method: Http.POST,
                body: passwordrequest
            }),
            transformResponse: processResponse<void>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ['User']
        }),

    })
});