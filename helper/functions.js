 import Connection from'../dbconfig/connection.js';
 import {userTable} from'../dbconfig/tables.js';
 import createError from 'http-errors';
 const conn=new Connection().conn;
 export const responseAPI = (result)=>{
    if(Object.keys(result).length > 0 && result.constructor === Object){
    return {success:1,response:result};
    }else{
        return {success:0,response:result};
    }
}
export let checkUniqueEmail = async(email)=>{
   return new Promise((resolve,reject)=>{
        var result=5;
        let sql='select count(*) as count from '+userTable+' where email =?';
        conn.execute(sql,[email],(err,row)=>{
            if (err) {
                return reject(err);
            }
            if(row[0].count > 0){
                reject(createError(422,'email already register'));
            }
            resolve(row[0].count);
        });
    })
    
}
export const errHandling=(err,next)=>{
    if(err.isJoi==true){
        err.status='422';
    }
    err.status = err.status || 500;
    next(err);
}
export let insertQuery=(data, tableName)=>{
    let part1 = `INSERT INTO ${tableName} (`;
    let part2 = ")",
        part3 = "VALUES (",
        part4 = ")";
    let tableKeys = "",
        tableValues = "";
    for (let key in data) {
        tableKeys += `${key},`;
        tableValues += `'${data[key]}',`
    }
    tableKeys = tableKeys.slice(0, -1);
    tableValues = tableValues.slice(0, -1);
    let query = `${part1}${tableKeys}${part2} ${part3}${tableValues}${part4}`;
    return query;
}
export let updateQuery=(data, tableName, clauseKey, clauseValue)=>{
    let part1 = `UPDATE ${tableName} SET`;
    let part2 = `WHERE ${clauseKey} = ${clauseValue};`; 
    let updateString = "";
    for (let key in data) {
        updateString += `${key} = '${data[key]}',`;
    }
    updateString = updateString.slice(0, -1);
    let query = `${part1} ${updateString} ${part2}`;
    return query;
    //updateQuery({name: "Tanjiro",tel: 77777777,email: "tanjiro@demonslayer.com"}, "Person", "ID", 111);
}
