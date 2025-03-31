import {CreateService} from "../../services/common/CreateService.js";
import {UpdateService} from "../../services/common/UpdateService.js";
import {ProductsModel} from  "../../models/Products/ProductsModel.js"
import {ListTwoJoinService} from "../../services/common/ListTwoJoinService.js";


export const CreateProduct = async (req, res) => {
    let Result = await CreateService(req,ProductsModel)
    res.json(Result)
}


export const UpdateProduct = async (req, res) => {
    let Result = await UpdateService(req, ProductsModel)
    res.json(Result)
}


export const ListProduct = async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, $options: "i"}

    let JoinBrandStage = {
        $lookup: {
            from: "brands",
            localField: "BrandID",
            foreignField: "_id",
            as: "brands"
        }
    }

    let JoinCategoryStage = {
        $lookup: {
            from: "categories",
            localField: "CategoryID",
            foreignField: "_id",
            as: "categories"
        }
    }

    let SearchArray = [{Name: SearchRgx},{Unit: SearchRgx}, {Details: SearchRgx}, {"brands.Name": SearchRgx}, {"categories.Name": SearchRgx}]


    let Result = await ListTwoJoinService(req, ProductsModel, SearchArray, JoinBrandStage, JoinCategoryStage)
    res.json(Result)
}