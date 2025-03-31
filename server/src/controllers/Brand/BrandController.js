import {CreateService} from "../../services/common/CreateService.js";
import {ListService} from "../../services/common/ListService.js";
import {DropDownService} from "../../services/common/DropDownService.js";
import {BrandModel} from "../../models/Brands/BrandsModel.js";
import {UpdateService} from "../../services/common/UpdateService.js";


export const CreateBrand = async (req, res) => {
    let Result = await CreateService(req, BrandModel)
    res.json(Result)
}


export const UpdateBrand = async (req, res) => {
    let Result = await UpdateService(req, BrandModel)
    res.json(Result)
}

export const BrandList = async (req, res) => {
    let SearchRgx = {"$regex" : req.params.searchKeyword, "$options" : "i"}
    let SearchArray = [{Name: SearchRgx}]
    let Result = await ListService(req, BrandModel, SearchArray)
    res.json(Result)
}

export const BrandDropDown = async (req, res) => {
    let Result = await DropDownService(req, BrandModel, {_id:1, Name:1})
    res.json(Result)
}