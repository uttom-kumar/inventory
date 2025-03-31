import {CreateService} from "../../services/common/CreateService.js";
import {UpdateService} from "../../services/common/UpdateService.js";
import {ListService} from "../../services/common/ListService.js";
import {DropDownService} from "../../services/common/DropDownService.js";
import {SuppliersModel} from "../../models/Suppliers/SuppliersModel.js";


export const CreateSuppliers = async (req, res) => {
    let Result = await CreateService(req, SuppliersModel)
    res.json(Result)
}

export const UpdateSuppliers = async (req, res) => {
    let Result = await UpdateService(req, SuppliersModel)
    res.json(Result)
}

export const SuppliersList = async (req, res) => {
    let SearchRgx = {"$regex" : req.params.searchKeyword, "$options" : "i"}
    let SearchArray = [{Name: SearchRgx}, {Email: SearchRgx}, {Phone: SearchRgx}, {Address: SearchRgx}, ]
    let Result = await ListService(req, SuppliersModel, SearchArray)
    res.json(Result)
}

export const SuppliersDropDown = async (req, res) => {
    let Result = await DropDownService(req, SuppliersModel, {_id:1, Name:1})
    res.json(Result)
}