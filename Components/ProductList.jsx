import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const ProductList = (props) => {
  const handleRemove = (id)=>{
    props.updateData(prev=>{
      const updatedList  = prev.Packaging_Details.filter(item=>item?.Item_ID != id);
      return {...prev, Packaging_Details: updatedList}
  })
  }
    const getPackingDetails = async (item = "", id) => {
        try {
          const itemInfo = await axios.post(
            process.env.NEXT_PUBLIC_BASE_URL + "item-detail",
            { item_name: item }
          );
          const data = itemInfo.data
          props.updateData(prev=>{
            const updatedList  = prev.Packaging_Details.map(item=>(item?.Item_ID == id ? {Unit: data?.unit,Item_ID:data?.item_id,Product_Name1:data?.item_name,Available_Quantity:Number(data?.available_stock).toFixed(2),Select_Product:false }: item ))
            return {...prev, Packaging_Details: updatedList}
        })
        } catch (e) {
          console.log(e);
        }
      };
      const updatePackingDetails = (label, value, id)=>{
        if(label == "Required_Quantity"){
          if(value > Number(props?.item?.Available_Quantity)){
            toast.error("Required QTY cannot be greater then Available Quantity")
            return
          }
          value = Number(value).toFixed(2);
        }
        props.updateData(prev=>{
            const updatedList  = prev.Packaging_Details.map(item=>(item.Item_ID == id ? {...item,[label]:value}: item))
            return {...prev, Packaging_Details: updatedList}
        })
            }
  return (
    <> 
    <tr key={props?.item?.Item_ID}>
    <td className="px-4 py-2">
      <select
        value={props?.item?.Product_Name1}
        className="border border-gray-300 p-2 rounded-lg w-full"
        onChange={(e) => {
            updatePackingDetails("Product_Name1",e.target.value,props?.item?.Item_ID)
            getPackingDetails(e.target.value, props?.item?.Item_ID)
        }}
      >
        <option value={""} selected disabled>
          Select Item
        </option>
        {props?.ProductList?.length > 0 &&
          props?.ProductList.map((item) => (
            <option value={item}>{item}</option>
          ))}
      </select>
    </td>
    <td className="px-4 py-2">
    <input
        type="text"
        value={props?.item?.Unit ?? 0}
        disabled
        className="border border-gray-300 p-2 rounded-lg w-full"
      />
    </td>
    <td className="px-4 py-2">
    <input
        type="text"
        value={props?.item?.Available_Quantity ?? 0}
        disabled
        className="border border-gray-300 p-2 rounded-lg w-full"
      />
    </td>
    <td className="px-4 py-2">
    <input
        type="text"
        value={Number(props?.item?.Required_Quantity ?? 0)}
        onChange={(e)=>{updatePackingDetails("Required_Quantity",e.target.value,props?.item?.Item_ID)}}
        className="border border-gray-300 p-2 rounded-lg w-full"
      />
    </td>
    <td className="px-4 py-2">
      <input
        type="checkbox"
        value={props?.item?.Select_Product}
        onChange={(e)=>{ updatePackingDetails("Select_Product",e.target.value,props?.item?.Item_ID)}}
        className="border border-gray-300 p-2 rounded-lg w-full"
      />
    </td>
    <td className="px-4 py-2">
     <button className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition' onClick={()=>handleRemove(props?.item?.Item_ID)}>Remove</button>
    </td>
  </tr></>
  )
}

export default ProductList