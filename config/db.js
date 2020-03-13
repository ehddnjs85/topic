module.exports = function() {
    const mysql = require('mysql');

    const dbconnInfo = {
        host     : 'localhost',
        user     : 'root',
        password : '111111',
        database : 'o2',
        multipleStatements : true
    }

    const dbconnection = {
        init : function() {
            return mysql.createConnection(dbconnInfo);
        },

        dbopen : function(con) {
            con.connect(function(err) {
                if (err) {
                    console.error("mysql connection error : " + err);
                } else {
                    console.info("mysql connection successfully.");
                }
            });
        }
    }
    return dbconnection;
}