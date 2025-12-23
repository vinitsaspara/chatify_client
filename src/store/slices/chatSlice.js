import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { axiosInstance } from "../../lib/axios"


export const getUsers = createAsyncThunk("chat/getUsers", async (_, thunkAPI) => {
    try {
        const res = await axiosInstance.get("/message/users")

        return res.data.data
    } catch (error) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response?.data.message)
    }
})

export const getMessages = createAsyncThunk("chat/getMessages", async (userId, thunkAPI) => {
    try {
        const res = await axiosInstance.get(`/message/${userId}`)

        return res.data.data
    } catch (error) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response?.data.message)
    }
})

export const sendMessage = createAsyncThunk("chat/sendMessage", async (messageData, thunkAPI) => {
    try {
        const { chat } = thunkAPI.getState();
        // console.log(messageData)
        const res = await axiosInstance.post(
            `/message/send/${chat.selectedUser?._id}`,
            messageData,
        );
        return res.data.message
        // return null
    } catch (error) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response?.data.message)
    }
})



const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        users: [],
        selectedUser: null,
        isUserLoading: false,
        isMessagesLoading: false
    },
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        },
        pushNewMessage: (state, action) => {
            if (!Array.isArray(state.messages)) {
                state.messages = [];
            }
            state.messages.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.isUserLoading = true
        }).addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload
            state.isUserLoading = false
        }).addCase(getUsers.rejected, (state) => {
            state.isUserLoading = false;
        }).addCase(getMessages.pending, (state) => {
            state.isMessagesLoading = true
        }).addCase(getMessages.fulfilled, (state, action) => {
            state.messages = action.payload,
                state.isMessagesLoading = false
        }).addCase(getMessages.rejected, (state) => {
            state.isMessagesLoading = false
        }).addCase(sendMessage.fulfilled, (state, action) => {
            if (!Array.isArray(state.messages)) {
                state.messages = [];
            }
            state.messages.push(action.payload)
        })
    }
})

export const { setSelectedUser, pushNewMessage } = chatSlice.actions

export default chatSlice.reducer