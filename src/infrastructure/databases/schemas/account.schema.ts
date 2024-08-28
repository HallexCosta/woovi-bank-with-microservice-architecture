import mongoose from "mongoose";
import { AccountStatusEnum } from "../../../application/repositories/account.repository";

export const accountSchema = new mongoose.Schema({
    balance: Number,
    status: {
        type: String,
        values: [
            AccountStatusEnum.ACTIVED,
            AccountStatusEnum.INACTIVED,
            AccountStatusEnum.BANNED,
            AccountStatusEnum.SUSPENDED
        ]
    },
    created_at: Date,
    updated_at: Date
})