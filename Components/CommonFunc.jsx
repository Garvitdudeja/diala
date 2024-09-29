const formatData = (data)=>{
    const newData = JSON.parse(JSON.stringify(data))
    delete newData.Added_Date
    delete newData.Added_Time
    delete newData.Batch_ID
    delete newData.Blend_Approved
    delete newData.ID
    delete newData.Total
    delete newData.Total_Qty_of_P_Sacks_in_Pcs1
    const Subform = data?.Subform?.map(item=>{
       delete item.ID
       delete item.zc_display_value
       item.Qty_per_Bag = item.Nett
       return item
    })
    newData.Subform = Subform
    return newData
    
}


export {
    formatData
}