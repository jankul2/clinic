import Connection from '../dbconfig/connection.js';
import { userTable } from '../dbconfig/tables.js';
import createError from 'http-errors';
import { authProfile } from '../utility/validator.js'
import  fs from 'fs';
import  path, { resolve } from 'path';
import ejs from 'ejs'
import pdf from "html-pdf";
const conn = new Connection().conn;
export const responseAPI = (result) => {
    if (Object.keys(result).length > 0 && result.constructor === Object) {
        return { success: 1, response: result };
    } else {
        return { success: 0, response: result };
    }
}
export const deleteFile=(file)=>{
    let imagePath=path.join(path.resolve(),'/public/assets/images/'+file);
    console.log(imagePath,'papa')

    fs.unlinkSync(imagePath);
}
export let checkUniqueEmail = async (email) => {
    return new Promise((resolve, reject) => {
        var result = 5;
        let sql = 'select count(*) as count from ' + userTable + ' where email =?';
        conn.execute(sql, [email], (err, row) => {
            if (err) {
                return reject(err);
            }
            if (row[0].count > 0) {
                reject(createError(422, 'email already register'));
            }
            resolve(row[0].count);
        });
    })

}
export const errHandling = (err, next, message = '') => {

    if (err.isJoi == true) {
        err.status = '422';
    }
    err.status = err.status || 500;
    next(err);
}
export let insertQuery =  (tableName,infoDetails,clauseValue={}) => {
    let part1 = `insert ${tableName} SET`;
    let fields="";
    let wheres=" where ";
    for (let key in infoDetails) {
        fields += `${key} = '${infoDetails[key]}',`;
    }
    fields = fields.slice(0, -1);
    if(Object.keys(clauseValue).length > 0){
        for (let key in clauseValue) {
            wheres += `${key} = '${clauseValue[key]}' and `;
        }
        wheres = wheres.slice(0, -5);
    }else{
        wheres="";  
    }
    let query = `${part1} ${fields} ${wheres}`;
    console.log(query)
    return query;
}

export let updateQuery = (tableName,infoDetails,clauseValue) => {
    let part1 = `UPDATE ${tableName} SET`;
    let fields="";
    let wheres=" where ";
    for (let key in infoDetails) {
        fields += `${key} = '${infoDetails[key]}',`;
    }
    fields = fields.slice(0, -1);
    if(Object.keys(clauseValue).length > 0){
        for (let key in clauseValue) {
            wheres += `${key} = '${clauseValue[key]}' and `;
        }
        wheres = wheres.slice(0, -5);
    }
    
    let query = `${part1} ${fields} ${wheres}`;
    return query;
}
export let selectQuery = (tableName,clauseValue) => {
    let part1 = `select * from  ${tableName}`;
    let fields="";
    let wheres=" where ";
    if(Object.keys(clauseValue).length > 0){
        for (let key in clauseValue) {
            wheres += `${key} = '${clauseValue[key]}' and `;
        }
        wheres = wheres.slice(0, -5);
    }else{
        wheres="";  
    }
    
    let query = `${part1}  ${wheres}`;
    //console.log(query)
    return query;
}
export let deleteQuery = (tableName,clauseValue) => {
    let part1 = `delete from ${tableName} `;
    let wheres=" where ";
    if(Object.keys(clauseValue).length > 0){
        for (let key in clauseValue) {
            wheres += `${key} = '${clauseValue[key]}' and `;
        }
        wheres = wheres.slice(0, -5);
    }
    let query = `${part1} ${wheres}`;
    return query;
}
export const currentDate=()=>{
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    return  yyyy + '-' + mm + '-' + dd;

}
