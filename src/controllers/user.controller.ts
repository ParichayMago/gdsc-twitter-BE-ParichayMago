import { Request, Response } from "express"
import { User } from "../models/data/User"
import { withUser } from "../types/withAuth"
import { HttpStatusCode, UserUpdateModel } from "../types/types"

// Featching and updating the personal info about the user
export const findAndUpdateUser = async (
  req: Request<{}, {}, withUser<UserUpdateModel>>,
  res: Response 
) => {
  try {
    const data = req.body;

    const UpdateUser =  User.findByIdAndUpdate({_id: data.user._id}, 
       data,
      { new:true }
    ); 

    if(!UpdateUser) {
      return res.status(HttpStatusCode.NotFound)
      .json({
        "message": "The User cannot be found", 
        "success": false
      })
    }

    return res.status(HttpStatusCode.Accepted)
    .json({
      "message": "User has been updated",
      "succcess": true
    })

  } catch(e) {
    console.log("Some error in user.controllers.ts", e);
    return res.status(HttpStatusCode.InternalServerError).json({"message": "Server side error", "success": false})
  }
}