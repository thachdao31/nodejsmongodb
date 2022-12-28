const {MongoClient, ObjectId} = require('mongodb');
const {getDb} = require('../InitDB');
const {getTime, getDateNow} = require('../GetDayTimeCheckin/GetDayTime');

module.exports = {
    userCheckin: async(req, res) => {
        var id = req.params.id;
        var idLength = id.length;
        if(idLength !== 24) {
            res.json({
                message : "check id input"
            })
        } else {
            try {
                var user = await getDb().collection('users').findOne({_id : ObjectId(id)});
                console.log(user);
                if(user == null) {
                    res.json({
                        message: "user invalid"
                    })
                } else {
                    await getDb().collection('histories').insertOne({
                        userId: id,
                        name: user.name,
                        dayCheckin: getDateNow(),
                        timeCheckin: getTime()
                    })
                    res.json({
                        message: `user ${id} checkin`
                    })
                }
            } catch (err) {
                res.json(err)
            }
        }
    },
    reportUserLate: async(req, res) => {
        const query = [
          {
            '$sort': {
              'dayCheckin': 1, 
              'timeCheckin': 1
            }
          }, {
            '$group': {
              '_id': {
                'userId': '$userId', 
                'name': '$name', 
                'dayCheckin': '$dayCheckin'
              }, 
              'timeCheckin': {
                '$first': '$timeCheckin'
              }
            }
          }, {
            '$match': {
              '$or': [
                {
                  'timeCheckin.hour': {
                    '$gt': 15
                  }
                }, {
                  '$and': [
                    {
                      'timeCheckin.hour': {
                        '$gte': 15
                      }
                    }, {
                      'timeCheckin.minutes': {
                        '$gt': 0
                      }
                    }
                  ]
                }
              ]
            }
          }
        ]
    
        let listUserLate = await getDb().collection('histories').aggregate(query).toArray();
        console.log(listUserLate);
        res.json(listUserLate);
    }
}
