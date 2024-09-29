import React from 'react'

const ProductRow = () => {
  return (
    <>
    <tr>
        <td className="px-4 py-2">
      <input
        type="text"
        value={item?.Qty_per_Bag}
        // onChange={(e)=>{ updateProductForm("Required_Quantity", e.target.value, item?.Batch_ID);}}
        className="border border-gray-300 p-2 rounded-lg w-full"
      />
      </td>
      <td className="px-4 py-2">
      <input
        type="text"
        value={item?.Qty_per_Bag}
        // onChange={(e)=>{ updateProductForm("Required_Quantity", e.target.value, item?.Batch_ID);}}
        className="border border-gray-300 p-2 rounded-lg w-full"
      />
      </td>        <td className="px-4 py-2">
      <input
        type="text"
        value={item?.Qty_per_Bag}
        // onChange={(e)=>{ updateProductForm("Required_Quantity", e.target.value, item?.Batch_ID);}}
        className="border border-gray-300 p-2 rounded-lg w-full"
      />
      </td>        <td className="px-4 py-2">
      <input
        type="text"
        value={item?.Qty_per_Bag}
        // onChange={(e)=>{ updateProductForm("Required_Quantity", e.target.value, item?.Batch_ID);}}
        className="border border-gray-300 p-2 rounded-lg w-full"
      />
      </td>        <td className="px-4 py-2">
      <input
        type="text"
        value={item?.Qty_per_Bag}
        // onChange={(e)=>{ updateProductForm("Required_Quantity", e.target.value, item?.Batch_ID);}}
        className="border border-gray-300 p-2 rounded-lg w-full"
      />
      </td>
      
      </tr>
    </>
  )
}

export default ProductRow