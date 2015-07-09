'use strict';
var config = require('../../../config/config'),
	M = require('../../../models/');


module.exports.activity = function (io) {

  io.on('connection', function(socket){

    socket.on('activity:changes:start', function(data){

      let limit, filter;
      limit = data.limit || 100; 
      filter = data.filter || {};
      r.table('activity')
        .orderBy({index: r.desc('createdAt')})
        .filter(filter)
        .limit(limit)
        .changes()
        .run({cursor: true}, handleChange);

      function handleChange(err, cursor){

        if(err){
          
          console.log(err); 
        
        }
        else{

          if(cursor){
            cursor.each(function(err, record){
              if(err){
                console.log(err);
              }
              else{
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
    



    // socket.on('activity:findById', function(id, cb){
    //   r.table('question')
    //     .get(id)
    //     .run(cb);
    // });

    // socket.on('activity:add', function(record, cb){
      
    //   record = _.pick(record, 'name', 'question');
    //   record.createdAt = new Date();
      
    //   r.table('question')
    //     .insert(record)
    //     .run(function(err, result){

    //       if(err){
    //         cb(err);
    //       }
    //       else{
    //         record.id = result.generated_keys[0];
    //         cb(null, record);
    //       }

    //     });

    // });
    // socket.on('activity:update', function(record, cb){

    //   record = _.pick(record, 'id', 'name', 'question');
    //   r.table('question')
    //     .get(record.id)
    //     .update(record)
    //     .run(cb);
      
    // });

    // socket.on('activity:delete', function(id, cb){

    //   r.table('question')
    //     .get(id)
    //     .delete()
    //     .run(cb);

    // });
    
  });

}
