import {CreateService} from "../../services/common/CreateService.js";
import {UpdateService} from "../../services/common/UpdateService.js";
import {ListService} from "../../services/common/ListService.js";
import {DropDownService} from "../../services/common/DropDownService.js";
import {CategoryModel} from "../../models/Categories/CategoryModel.js";



export const CreateCategory = async (req, res) => {
    let Result = await CreateService(req, CategoryModel)
    res.json(Result)
}

export const UpdateCategory = async (req, res) => {
    let Result = await UpdateService(req, CategoryModel)
    res.json(Result)
}

export const CategoryList = async (req, res) => {
    let SearchRgx = {"$regex" : req.params.searchKeyword, "$options" : "i"}
    let SearchArray = [{Name: SearchRgx}]
    let Result = await ListService(req, CategoryModel, SearchArray)
    res.json(Result)
}

export const CategoryDropDown = async (req, res) => {
    let Result = await DropDownService(req, CategoryModel, {_id:1, Name:1})
    res.json(Result)
}