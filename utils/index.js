const category=(data)=>{
    let categoryArray=[]
    data.forEach(item=>{
        if(categoryArray.length==0){
            categoryArray.push(item.category)
        }else{
            if(!categoryArray.includes(item.category)){
                categoryArray.push(item.category)
            }
        }
        

    })
    return categoryArray
}
const filterByCategory=(data,categoryItem)=>{
    if(categoryItem=='all'){
        return data
    }else{
        return data.filter(item=>item.category==categoryItem)
    }
}
export {category,filterByCategory}