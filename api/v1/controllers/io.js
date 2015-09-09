'use strict';
var config = require(__base+'/api/config/config'),
  	M = require(__base+'/api/models/'),
    thinky = require(__base+'/api/config/thinky.js'),
    r = thinky.r;


module.exports.activity = function (io) {

  io.on('connection', function(socket){

    console.log('connected')

    socket.on('activity:changes:start', function(data){

      let limit = data.limit || 100,
          filter = data.filter || {};

      r.db('test').table('activities')
        .orderBy({index: r.desc('createdAt')})
        .filter(filter)
        .limit(limit)
        .changes()
        .run({cursor: true}, handleChange);

      function handleChange(err, cursor){

        if(err){
          
          console.log(err); 
        
        } else{

          if(cursor){
            cursor.each(function(err, record){
              if(err){
                console.log(err);
              }
              else{
                console.log(record)
                socket.emit('activity:changes', record);
              }
            });
          }

        }
        socket.on('activity:changes:stop', stopCursor);

        socket.on('disconnect', stopCursor);

        function stopCursor () {
          if(cursor){
            cursor.close();
          }
          socket.removeListener('activity:changes:stop', stopCursor);
          socket.removeListener('disconnect', stopCursor);
        }

      }

    });
    



    socket.on('activity:findById', function(id, cb){
      r.table('activities')
        .get(id)
        .run(cb);
    });

    socket.on('activity:add', function(record, cb){
      
      record = _.pick(record, 'name', 'activities');
      record.createdAt = new Date();
      
      r.table('activities')
        .insert(record)
        .run(function(err, result){

          if(err){
            cb(err);
          }
          else{
            record.id = result.generated_keys[0];
            cb(null, record);
          }

        });

    });
    socket.on('activity:update', function(record, cb){

      record = _.pick(record, 'id', 'name', 'activities');
      r.table('activities')
        .get(record.id)
        .update(record)
        .run(cb);
      
    });

    socket.on('activity:delete', function(id, cb){

      r.table('activities')
        .get(id)
        .delete()
        .run(cb);

    });
    
  });

}
