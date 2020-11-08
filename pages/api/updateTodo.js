import { table, getMinifiedRecord } from './utils/airtable';
export default async (req, res) => {
    const { id, fields} = req.body;
    try {
        const updatedRecords = await table.update([{id, fields}]);
        res.statusCode = 200;
        res.json(getMinifiedRecord(updatedRecords[0]));
    }catch(err){
        res.statusCode = 500;
        res.json({msg:'Something Went Wrong'});
    }
};
 /*
 since we are updating only one record so we will get an array 
 as a result of update query containing only one record that just got updated that why we are using index [0].
 */ 