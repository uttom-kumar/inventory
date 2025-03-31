

export const CreateService = async (req,DataModel) => {
    try{
        let email = req.headers.email
        let postBody = req.body
        postBody.UserEmail = email

        let data = await DataModel.create(postBody)

        return {
            status : "success",
            message : "Create Service Success",
            data : data
        }
    }
    catch (err) {
        return {
            status : "failed",
            message : "Create Service Failed",
            error : err.toString()
        }
    }
}