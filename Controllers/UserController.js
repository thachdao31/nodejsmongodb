const {MongoClient, ObjectId} = require('mongodb');
const db = require('../InitDB');
const checkDataUserInput = require('../checkUserInput');

module.exports = {
    getAllUser: async (req, res) => {
        res.send(await db.getDb().collection('users').find({}).toArray());
    },
    getUserById:  async (req, res) => {
        try {
            const id = req.params.id;
            const data = await getDb().collection('users').find({_id: ObjectId(id)}).toArray();
            console.log(data)
            res.json(data);
        } catch (err) {
            console.log(err);
        }
    },
    createNewUser: async (req, res) => {
        if(checkDataUserInput(req) == 0) {
            await getDb().collection('users').insertOne(req.body);
            var data = await getDb().collection('users').find({}).toArray();
            res.json({
                message: "add new data",
                data: data
            })
        } else {
            res.json({
                message: `check ${checkDataUserInput(req)} input`
            })
        }
    },
    updateUser: async (req, res) => {
        try {
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            await getDb().collection('users').updateOne(
                query, 
                {$set: req.body})
            const data = await getDb().collection('users').find({_id: ObjectId(id)}).toArray();
            res.json({
                message: `user ${id} updated`,
                data : data
            })
        } catch (err) {
            console.log(err);
        }
    },
    deleteUser: async (req, res) => {
        const id = req.params.id;
        let result = await getDb().collection('users').deleteOne({_id : ObjectId(id)});
        const data = await getDb().collection('users').find({}).toArray();
        if(result.deletedCount == 1) {
            res.json({
                message :  `delete user ${id}`,
                data : data
            })
        } else {
            res.json({
                message: `delete user ${id} fail`
            })
        }
    }
}