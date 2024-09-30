const formatData = (data)=>{
    const newData = JSON.parse(JSON.stringify(data))
    delete newData.Added_Date
    delete newData.Added_Time
    delete newData.Batch_ID
    delete newData.Blend_Approved
    delete newData.ID
    delete newData.Total
    delete newData.Total_Qty_of_P_Sacks_in_Pcs1
    newData.Total_Qty_PSacks= Number((newData?.Blend_Quantity_in_kg ?? 0 )/(newData?.Net_Qty_per_P_Sacks ?? 1)).toFixed(2)
    const Subform = data?.Subform?.map(item=>{
       delete item.ID
       delete item.zc_display_value
       item.Qty_per_Bag = item.Nett
       item.Select_Item = true
       return item
    })
    const Packaging_Details = data?.Packaging_Details.map((item)=>{
        delete item?.ID
        delete item?.zc_display_value;

        item.Select_Product = true;
        return item
    })
    newData.Subform = Subform
    return newData
    
}


export {
    formatData
}