import { ID_ADMIN } from "@/utils/constans"
import { createAsyncThunk } from "@reduxjs/toolkit"

const { default: getTokenService } = require("@/services/chat/getTokenService")


const loadUserThunk = createAsyncThunk(
    'users/load',
    async ({ userId }) => {
        const admin = userId === ID_ADMIN;
        try {
            const response = await getTokenService(userId)
            return { userId, admin, token: response }
        } catch (error) {
            return { userId, admin }
        }

    },
)

export { loadUserThunk }