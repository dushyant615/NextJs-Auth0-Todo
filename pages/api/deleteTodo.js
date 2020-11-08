import { table, getMinifiedRecord } from './utils/airtable';
export default async (req, res) => {
    const { id } = req.body;
    try {
        const deletedRecords = await table.destroy([id]);
        res.statusCode = 200;
        res.json(getMinifiedRecord(deletedRecords[0]));
    }catch(err){
        res.statusCode = 500;
        res.json({msg:'Something Went Wrong'});
    }
};
  /*
 since we are deleting only one record so we will get an array 
 as a result of delete query containing only one record that just got deleted that why we are using index [0].
 */ 