



export const UpdateService = async (req, DataModel) => {
    try{
        let email = req.headers.email
        let id = req.params.id
        let postBody = req.body


        let data = await DataModel.updateOne(
            {_id: id, UserEmail : email},
            {$set: postBody}
        )

        return {
            status : "success",
            message : "Update Service Success",
            data : data
        }
    }
    catch (err) {
        return {
            status : "failed",
            message : "update Service Failed",
            error : err.toString()
        }
    }
}