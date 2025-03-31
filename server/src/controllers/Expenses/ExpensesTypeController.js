import {CreateService} from "../../services/common/CreateService.js";
import {ListService} from "../../services/common/ListService.js";
import {DropDownService} from "../../services/common/DropDownService.js";
import {UpdateService} from "../../services/common/UpdateService.js";
import {ExpenseTypeModel} from "../../models/Expenses/ExpenseTypesModel.js";


export const CreateExpenseType = async (req, res) => {
    let Result = await CreateService(req, ExpenseTypeModel)
    res.json(Result)
}


export const UpdateExpenseType = async (req, res) => {
    let Result = await UpdateService(req, ExpenseTypeModel)
    res.json(Result)
}

export const ExpenseTypeList = async (req, res) => {
    let SearchRgx = {"$regex" : req.params.searchKeyword, "$options" : "i"}
    let SearchArray = [{Name: SearchRgx}]
    let Result = await ListService(req, ExpenseTypeModel, SearchArray)
    res.json(Result)
}

export const ExpenseTypeDropDown = async (req, res) => {
    let Result = await DropDownService(req, ExpenseTypeModel, {_id:1, Name:1})
    res.json(Result)
}