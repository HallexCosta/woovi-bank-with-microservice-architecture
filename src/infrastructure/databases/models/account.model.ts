import { createSyncMongoConnect } from "../connections/mongoose";
import { accountSchema } from "../schemas/account.schema";
import mongoose from "mongoose";

export const MongoAccountModel = createSyncMongoConnect().model('Account', accountSchema)

export type TMongoAccountModel = mongoose.Model<typeof accountSchema>

// export class MongoAccountModel extends AccountModel {}