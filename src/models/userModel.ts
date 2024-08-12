import mongoose from "mongoose";

interface Iuser {
  username: string;
  email: string;
  password: string;
  isVerified?: boolean;
  isAdmin?: boolean;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken: string;
  verifyTokenExpiry?: Date;
}

const userSchema = new mongoose.Schema<Iuser>({
  username: {
    type: String,
    unique: true,
    required: [true, "Please add a username"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please add an email"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
