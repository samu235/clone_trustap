import { createAsyncThunk } from "@reduxjs/toolkit"

const { default: getTokenService } = require("@/services/chat/getTokenService")


const loadUserThunk = createAsyncThunk(
    'users/load',
    async ({userId}) => {
        try {
            const response = await getTokenService(userId)
            return { userId, token: response }
        } catch (error) {
            return { userId }
        }

    },
)

export { loadUserThunk }