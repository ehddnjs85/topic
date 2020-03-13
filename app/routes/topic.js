module.exports = function () {
    const express = require('express');
    const router = express.Router();
    const dbConObj = require('../../config/db')();
    const dbconn = dbConObj.init();
        
    // list
    router.get('/', function (req, res) {
        let sql = 'SELECT * FROM program';
        dbconn.query(sql, function (err, rows) {
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {

                for (let index = 0; index < rows.length; index++) {
                    rows[index].date = setDate(rows[index].date);
                    // console.log( setDate(rows[index].date));
                }

                res.render('list', { rows });
                // console.log(rows);
            }
        });
    });

    // Add
    router.get('/add', function (req, res) {
        res.render("topic/detail", { rows : "" } );
    })

    router.post('/add', function (req, res) {
        let title = req.body.title;
        let description = req.body.description;
        let author = req.body.author;

        let sql = "INSERT INTO program SET title = ?, description = ?, author = ?, date = sysdate()";
        dbconn.query(sql, [title, description, author], function (err, results) {
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                res.redirect('/');
            }
        });
    })

    // edit
    router.get('/edit_view/:id', function (req, res) {
        let userId = req.params.id;
        let sql = 'SELECT * FROM program WHERE id = ?';
        dbconn.query(sql, userId, function (err, data) {
            let rows = data[0];
            res.render("topic/detail", { rows });
        });
    })

    router.post('/edit/:id', function (req, res) {
        let userId = req.params.id;
        // let url = "edit_view/" + userId;
        let data = {
            title : req.body.title,
            description : req.body.description,
            author : req.body.author
        };
        console.log("userId : " + userId + "data : ", data);
        let sql = 'UPDATE program SET ? WHERE id = ?';
        dbconn.query(sql, [data, userId], function (err, rows) {
            if (err) {
                res.status(500).send('Internal Server Error');
            } else {
                res.redirect('/');
            }
        });
    });

    // delete
        router.get('/delete/:id', function (req, res) {
        let userId = req.params.id;

        let sql = 'DELETE FROM program WHERE id = ?';
        dbconn.query(sql, userId, function (err, data) {
            res.redirect("/");
        });
    });

    return router;
}

function setDate (date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth());
    month = month >= 10 ? month : '0' + month;
    let day = date.getDate();
    day = day >= 10 ? day : '0' + day;
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
  
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}