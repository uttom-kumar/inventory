

export const ListService = async (req, DataModel, SearchArray) => {
    try{
        let pageNo = Number(req.params.pageNo)
        let perPage = Number(req.params.perPage)
        let searchValue = req.params.searchKeyword
        let email = req.headers.email

        let skipRow = (pageNo - 1) * perPage

        let data ;

        if(searchValue !== "0") {
            let SearchQuery = {$or: SearchArray}

            data = await DataModel.aggregate([
                { $match : {UserEmail : email}},
                { $match : SearchQuery},
                {
                    $facet : {
                        Total : [{$count: "count"}],
                        Rows : [{$skip: skipRow},{$limit: perPage}]
                    }
                }
            ])
        }
        else {
            data = await DataModel.aggregate([
                { $match : {UserEmail : email}},
                {
                    $facet : {
                        Total : [{$count: "count"}],
                        Rows : [{$skip: skipRow},{$limit: perPage}]
                    }
                }
            ])
        }
        return {
            status : "success",
            message : "List Service Success",
            data : data
        }
    }
    catch (err) {
        return {
            status : "failed",
            message : "List Service Failed",
            error : err.toString()
        }
    }
}