import mongoose from "mongoose";


export const CreateParentChildService = async (req, ParentModel, ChildModel, JoinPropertyName) => {
    // create Transaction
    let session = await mongoose.startSession()

    try{
        // Begin Transaction
        await session.startTransaction()

        // First Database Process
        let Parent = req.body['Parent']
        Parent.UserEmail = req.headers.email
        let ParentCreation = await ParentModel.create([Parent],{session})

        // Second Database Process
        let Childs = req.body['Childs']
        await Childs.forEach((element) => {
            element[JoinPropertyName] = ParentCreation[0]['_id']
            element['UserEmail'] = req.headers.email
        })

        let ChildCreation = await ChildModel.insertMany(Childs, {session})

        // Transaction success
        await session.commitTransaction()
        await session.endSession()
        return {
            status: 'success',
            Parent: ParentCreation,
            Childs: ChildCreation,
        }
    }
    catch(err){
        // role base transaction if fail
        await session.abortTransaction()
        await session.endSession()
        return {
            status: 'failed',
            message: 'Something went wrong',
            error: err.toString()
        }
    }
}