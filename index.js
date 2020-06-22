const express = require('express');
const bodyParser=require('body-parser');
const app = express();
const moment= require('moment');
const port=3000;

var mysql=require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'oxygensensor',
    password:'\$Ano2012',
    database:'oxygencon'
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
console.log(__dirname);
app.use('/',express.static(__dirname+'/dist'))
/*app.get('/',function(req,res){
    res.send('Hello World!');

    //console.log(req);
});*/

app.get('/last60s',function(req,res){
    connection.query(`select * from test2 limit 100 `,function(err,results,fields){
        if (err) throw err;
        console.log(results[0]);
        res.send(results);
    });
})

app.get('/datafromdate',function(req,res){
    connection.query(`select * from test2 limit 100 `,function(err,results,fields){
        if (err) throw err;
        console.log(results[0]);
        res.send(results[0]);
    });
})

app.post('/post',function(req,res){
    
    let current_time =  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    connection.query(`insert into test2
        (date,oxygenValue)
        values
        ("${current_time}",${req.body.hello.substring(0,3)})
        ;`);
    res.send("post success");
    console.log(req.body);

})

app.listen(port,function(){
    connection.connect();
    console.log(`example app listening on port ${port}`)
});


// var net = require('net');
 
// var HOST = '0.0.0.0';
// var PORT = 3000;
 
// // 创建一个TCP服务器实例，调用listen函数开始监听指定端口
// // 传入net.createServer()的回调函数将作为”connection“事件的处理函数
// // 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的
// net.createServer(function(sock) {
 
//     // 我们获得一个连接 - 该连接自动关联一个socket对象
//     console.log('CONNECTED: ' +
//         sock.remoteAddress + ':' + sock.remotePort);
 
//     // 为这个socket实例添加一个"data"事件处理函数
//     sock.on('data', function(data) {
//         console.log('DATA ' + sock.remoteAddress + ': ' + data);
//         // 回发该数据，客户端将收到来自服务端的数据
//         sock.write('You said "' + data + '"');
//     });
 
//     // 为这个socket实例添加一个"close"事件处理函数
//     sock.on('close', function(data) {
//         console.log('CLOSED: ' +
//             sock.remoteAddress + ' ' + sock.remotePort);
//     });
 
// }).listen(PORT, HOST);
 
// console.log('Server listening on ' + HOST +':'+ PORT);