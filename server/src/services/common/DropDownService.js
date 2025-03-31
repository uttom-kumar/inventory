
export const DropDownService = async (req, DataModel, Projection) => {
    try{
        let email = req.headers.email
        let data = await DataModel.aggregate([
            {$match : {UserEmail : email}},
            {$project : Projection}
        ])
        return {
            status : "success",
            message : "get drop down list success",
            data : data
        }
    }
    catch (err) {
        return {
            status : "failed",
            message : "failed to get drop down list",
            error : err.toString()
        }
    }
}