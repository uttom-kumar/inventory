import {CreateService} from "../../services/common/CreateService.js";
import {UpdateService} from "../../services/common/UpdateService.js";
import {ExpenseModel} from "../../models/Expenses/ExpensesModel.js";
import {ListOneJoinService} from "../../services/common/ListOneJoinService.js";


export const CreateExpense = async (req, res) => {
    let Result = await CreateService(req, ExpenseModel)
    res.json(Result)
}


export const UpdateExpense = async (req, res) => {
    let Result = await UpdateService(req, ExpenseModel)
    res.json(Result)
}

export const ExpensesList = async (req, res) => {
    let SearchRex = {$regex: req.params.searchKeyword, $options: "i"}
    let SearchArray = [{Note: SearchRex},{Amount: SearchRex},{"Type.Name": SearchRex}]
    let JoinStage = {$lookup: {
            from: "expensetypes",
            localField: "TypeID",
            foreignField: "_id",
            as: "Type"
        }
    }
    let Result = await ListOneJoinService(req, ExpenseModel, SearchArray,JoinStage)
    res.json(Result)

}