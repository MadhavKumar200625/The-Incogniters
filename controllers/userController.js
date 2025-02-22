import User from "../models/User.js";
import Twilio from "twilio/lib/rest/Twilio.js";
import Dotenv from "dotenv"

Dotenv.config()

const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const checkPhoneNumber = async(req,res)=>{
  
  try{
    const {phoneNumber} = req.query
    
    const user = await User.findOne({phoneNumber:phoneNumber})

    if(user){
      return res.json({
        success:true,
        message:"login"
      })
    }

    return res.json({
      success:true,
      message:"register"
    })

  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}


const sendOtp = async(req,res)=>{
   
        // extract data from the query
        const {phoneNumber} = req.query


        await client.verify.v2.services(process.env.TWILIO_SERVICE_ID)
          .verifications
          .create({to: ("+91"+phoneNumber), channel: 'sms'})
          .then(verifiaction=>{
            res.status(200).json({success:true,message:"Sent"})
          } 
          ).catch(err=>{
            res.status(500).json({success:false,message:"not Sent"})
          })

}


const verifyOtp = async(phoneNumber,otp)=>{

  try{

    

    const verification_check = await client.verify.v2.services(process.env.TWILIO_SERVICE_SID)
        .verificationChecks
        .create({ to: ("+91"+phoneNumber), code: otp });


      return verification_check.status === 'approved'

  }

  catch(error){
    return false
  }
}


const checkOtp = async(req,res)=>{
  try{
    const {phoneNumber,otp,name,pincode} = req.body;

    if(!verifyOtp(phoneNumber,otp)){
      return res.json({success:false,message:"Wrong Otp"})
    }

    const exUser = await User.findOne({phoneNumber:phoneNumber})

    if(exUser){
      return res.status(200).json({success:true,message:"logged"})
    }
    


    const user = new User({name:name,phoneNumber,pincode})

    await user.save()

    return res.status(201).json({success:true,message:"registered"})


  }
  catch(error){
    return res.status(500).json({success:false , message:error.message})
  }


}





export{sendOtp, checkOtp , checkPhoneNumber}