import { Schema, model } from "../../lib.ts";

interface iUsers {
  username: string,
  firstName: string,
  lastName: string,
  jobTitle: string,
  address: string,
}

const userSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
})

const users = model<iUsers>("users", userSchema)

export default users