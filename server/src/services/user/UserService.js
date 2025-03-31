import {UserModel} from "../../models/User/UserModel.js";
import {EncodedToken} from "../../utility/TokenUtility.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import bcrypt from 'bcryptjs';
import {EmailSend} from "../../utility/EmailUtility.js";
import {UserPasswordModel} from "../../models/User/UserPasswordModel.js";
import {UserOTPModel} from "../../models/User/UserOTPModel.js";





export const RegisterService = async (req) => {
    try{
        let reqBody = req.body
        let user = await UserModel.findOne({email : reqBody.email})

        if(user){
            return {
                status : "failed",
                message : "Email already exists"
            }
        }

        const newUser = await UserModel.create(reqBody)
        await UserPasswordModel.create({
            userID : newUser._id,
            email: newUser.email,
            password:reqBody.password
        })
        return {
            status : "success",
            message : "User registration successfully!",
        }
      
    }
    catch (err) {
        return {
            status : "failed",
            message : "some thing went wrong" ,
            error : err.toString()
        }
    }
}


export const LoginService = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await UserModel.findOne({
            $or: [{ email: email }, { phone: email }]
        });

        if (!user) {
            return {
                status: "failed",
                message: "User not found",
            };
        }

        const userPassword = await UserPasswordModel.findOne({ userID: user._id });

        const isMatch = await bcrypt.compare(password, userPassword.password);
        if (!isMatch) {
            return {
                status: "failed",
                message: "Incorrect password",
            };
        }

        let token = EncodedToken(user.email, user._id);


        let options = {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "None",
            secure: true,
        };

        res.cookie("token", token, options);

        return {
            status: "success",
            message: "Login Successfully",
            token: token,
            data: user
        };

    } catch (err) {
        return {
            status: "failed",
            message: "Service login failed",
            error: err.toString()
        };
    }
};



export const UpdateProfileService = async (req) => {
    try{
        let user_id = req.headers.user_id
        let reqBody = req.body

        // if (reqBody.password) {
        //     const salt = await bcrypt.genSalt(10);
        //     reqBody.password = await bcrypt.hash(reqBody.password, salt);
        // }

        await UserModel.updateOne(
          {_id: user_id},
          {$set: reqBody}
        )

        return {
            status: "success",
            message: "Profile updated successfully.",
        }
    }
    catch (err){
        return {
            status : "failed",
            message : "Profile Update Failed",
            error : err.toString()
        }
    }
}


export const UpdateUserPasswordService = async (req) => {
    try{
        let user_id = req.headers.user_id
        let reqBody = req.body

        if (reqBody.password) {
            const salt = await bcrypt.genSalt(10);
            reqBody.password = await bcrypt.hash(reqBody.password, salt);
        }

        await UserPasswordModel.updateOne(
            {userID: user_id},
            {$set: reqBody}
        )


        return {
            status : "success",
            message : "Password Update Successfully",
        }
    }
    catch (err){
        return {
            status : "failed",
            message : "Password Update Failed",
            error : err.toString()
        }
    }
}



export const ReadProfileService = async (req) => {
    try{
        let user_id = new ObjectId(req.headers.user_id)

        let MatchStage = {
            $match : {
                _id : user_id
            }
        }

        let data = await UserModel.aggregate([
            MatchStage,
        ])

        if (data.length === 0) {
            return {
                status: "failed",
                message: "Unauthorized: User Not Found"
            };
        }

        return{
            status : "success",
            message : "Profile Read Successfully",
            data : data
        }
    }
    catch (err){
        return {
            status : "failed",
            message : "Profile Update Failed",
            error : err.toString()
        }
    }
}



export const LogOutProfileService = async (req, res) => {
    try{
        res.clearCookie("token")
        return {
            status : "success",
            message : "Logged Out Successfully",
        }
    }
    catch (err){
        return {
            status : "failed",
            message : "Failed to Logout",
            error : err.toString()
        }
    }
}


export const DeleteProfileService = async (req) => {
    try{
        let userID = req.headers.user_id

        if (!userID) {
            return {
                status: "failed",
                message: "User ID is required"
            };
        }

        const user = await UserModel.findById(userID);
        if (!user) {
            return {
                status: "failed",
                message: "User not found"
            };
        }

        await Promise.all([
            UserModel.deleteOne({ _id : userID }),
            UserPasswordModel.deleteOne({ userID : userID }),
            UserOTPModel.deleteOne({ email : user['email'] })
        ]);

        return {
            status : "success",
            message : "Profile Deleted Successfully"
        }
    }
    catch (err){
        return {
            status : "failed",
            message : "Profile Delete Failed",
            error : err.toString()
        }
    }
}


export const RecoverEmailVerifyService = async (req) => {
    try{
        let email = req.params.email;
        let user = await UserModel.aggregate([
            {$match :  {email : email}},
            {$count : "total"}
        ])


        let code = Math.floor(100000+Math.random()*900000)
        let EmailTo = email
        let EmailText = `${code}`
        let EmailSubject = "Email Verification Code"


        if(user[0]?.total === 1) {
            await EmailSend (EmailTo, EmailText, EmailSubject)
            await UserOTPModel.updateOne(
                {email:email},
                {$set:{email:email, otp: code}},
                {upsert:true}
            )
            return {
                status : "success",
                message : "6 digits Code Send Successfully"
            }
        }
        else{
            return {
                status : "failed",
                message : "User Not Found",
            }
        }
    }
    catch(err) {
        return {
            status : "failed",
            message : "Email Verification Failed",
            error : err.toString()
        }
    }
}


export const RecoverVerifyOtpService = async (req) => {
    try {
        let { email, otp } = req.body;
        otp = parseInt(otp);

        let user = await UserModel.findOne({
            email: email,
        })

        if(!user) return (
            {
                status: "failed",
                message: "User not found"
            }
        )

        let OtpCount = await UserOTPModel.findOne({
            email: email,
            otp: otp
        });

        if (OtpCount) {
            let OtpUpdate = await UserModel.updateOne(
              { email: email },
              { otp: otp }
            );

            return {
                status: "success",
                message: "OTP verification successful",
                data: OtpUpdate
            };
        } else {
            return {
                status: "failed",
                message: "Invalid OTP Code"
            };
        }
    } catch (err) {
        return {
            status: "failed",
            message: "Invalid OTP Code. Please Try again",
            error: err.toString()
        };
    }
}


export const ResetPasswordService = async (req) => {
    try{
        let reqBody = req.body
        let {email ,otp, password} = reqBody

        let user = await UserModel.findOne({
            email: email,
        })

        if(!user) {
            return {
                status : "failed",
                message : "User not found"
            }
        }

        let otpRecord = await UserOTPModel.findOne(
            { email:email, otp:otp }
        )

        if (!otpRecord) {
            return {
                status: "failed",
                message: "Invalid or expired OTP"
            }
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        let passUpdate = await UserPasswordModel.updateOne(
            { userID: user._id },
            { password: hashedPassword }
        );

        await UserOTPModel.deleteOne({ email, otp });

        return {
            status: "success",
            message: "Password changed successfully",
            data: passUpdate
        };
    }
    catch (err){
        return {
            status : "failed",
            message : "Something went wrong",
            error : err.toString()
        }
    }
}



