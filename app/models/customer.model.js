const sql = require("./db.js")();

// constructor
const Customer = function(customer) {
  this.email = customer.email;
  this.name = customer.name;
  this.active = customer.active;
};

// 커스터머 생성
Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      console.log("created customer: ", { id: res.insertId, ...newCustomer });
      result(null, { id: res.insertId, ...newCustomer });
    }
  });
};

// 한 아이디 찾기
Customer.findById = (customerId, result) => {
  sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    } else {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    }
  });
};

// 모두보기
Customer.getAll = result => {
  sql.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    } else {
      result(null, res);
    }
  });
};

// 업데이트
Customer.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
    [customer.email, customer.name, customer.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      } else if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      } else {
        console.log("updated customer: ", { id: id, ...customer });
        result(null, { id: id, ...customer });
      }
    }
  );
};

// 조건부 삭제
Customer.remove = (id, result) => {
  sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    } else if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    } else {
      console.log("deleted customer with id: ", id);
      result(null, res);
    }
  });
};

// 전체 삭제
Customer.removeAll = result => {
  sql.query("DELETE FROM customers", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    } else {
      console.log(`deleted ${res.affectedRows} customers`);
      result(null, res);
    }
  });
};

module.exports = Customer;