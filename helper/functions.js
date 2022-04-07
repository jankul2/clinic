 const responseAPI = (result)=>{
    if(Object.keys(result).length > 0 && result.constructor === Object){
    return {success:1,response:result};
    }else{
        return {success:0,response:result};
    }

}
export {responseAPI}