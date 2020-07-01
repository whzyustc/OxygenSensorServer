const express = require('express');
const app = express();
const port=3000;
const bodyParser=require('body-parser');
const moment= require('moment');

const mysql=require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user:'oxygensensor',
    password:'\$Ano2012',
    database:'oxygencon'
})



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
console.log(__dirname);
app.use('/',express.static(__dirname+'/dist'))
var lastid=0;

app.get('/last60s',function(req,res){
    connection.query(`select * from (select * from test2 order by date desc limit 100) as tmp order by id`,function(err,results,fields){
        if (err) throw err;
        console.log(results[results.length-1]);
        res.send(results);
    });
})

app.get('/datafromdate',function(req,res){
    console.log(req.query);
    connection.query(`select * from test2 where id>${lastid} order by id `,function(err,results,fields){
        if (err) throw err;
        res.send(results);
    });
})

app.post('/post',function(req,res){
    
    let current_time =  moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    connection.query(`insert into test2
        (date,oxygenValue)
        values
        ("${current_time}",${req.body.message})
        ;`);
    res.send("post success");
    console.log(req.body);

})

app.listen(port,function(){
    connection.connect();
    console.log(`example app listening on port ${port}`)
});


