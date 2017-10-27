

module.exports=function(io){

    io.on("connection",function(socket){
        console.log("A user connected:"+socket.id);
        socket.emit('welcome_message', 'Welcome to YIC');
    });
};