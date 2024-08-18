import { Model, Schema, models,model } from "mongoose";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

// const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET;
// const encodedRefreshTokenKey = new TextEncoder().encode(refreshTokenSecretKey);

const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET;
const encodedAccessTokenKey = new TextEncoder().encode(accessTokenSecretKey);

interface UserModel {
  name: string;
  email: string;
  password: string;
  // refreshToken : string
}

interface InstanceMethods {
    isPasswordCorrect : (password: string) => Promise<boolean>
    generateAccessToken : () => Promise<string>,
    // generateRefreshToken :() =>  Promise<string>
}

const userSchema = new Schema<UserModel,Model<UserModel>,InstanceMethods>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      lowercase : true,
      trim : true
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    // refreshToken : {
    //     type : String,
    // }
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return await new SignJWT({ _id: this._id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(encodedAccessTokenKey);
};

// userSchema.methods.generateRefreshToken = async function () {
//     return await new SignJWT({ _id: this._id })
//       .setProtectedHeader({ alg: "HS256" })
//       .setIssuedAt()
//       .setExpirationTime('10d')
//       .sign(encodedRefreshTokenKey);
//   };

export const User = models?.User || model<UserModel>("User", userSchema);
