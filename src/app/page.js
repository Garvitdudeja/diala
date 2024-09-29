"use client";
import axios from "axios";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import SingleRow from "../../Components/SingleRow";
import ProductList from "../../Components/ProductList";
import { useSearchParams } from "next/navigation";
import { formatData } from "../../Components/CommonFunc";

const Page = () => {
  const searchParams = useSearchParams()
  const search = searchParams.get('id')
  const [data, setData] = useState({ Subform: [], Total_Remaining_Quantity: 0, Total_Quantity_Selected: 0 ,Packaging_Details:[], Date_field: moment().format("DD-MMM-YYYY")});
  const [gardenList, setGardenList] = useState();
  const [packingList, setPackingList] = useState();
  const [tempList, setTempList] = useState([]);
  const [listData,setListData] = useState([]);
  const getGardens = async () => {
    try {
      const gardenList = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "gardens"
      );
      setGardenList(gardenList?.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getPackingItems = async () => {
    try {
      const packingList = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "item-names"
      );
      setPackingList(packingList?.data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getGardens();
    getPackingItems();
  }, []);

  const submitData = async(type)=>{
    try{
      if(!search){
        const response = await axios.post(
          process.env.NEXT_PUBLIC_BASE_URL + "creator/",
          {data:{...data,"type_field": type,"Total_Quantity_Selected":Number(data?.Total_Quantity_Selected).toFixed(2),"Total_Remaining_Quantity":Number(data?.Total_Remaining_Quantity ?? 0).toFixed(2),"Remaining_Quantity1":"0.00"}}
        );
      }
      else{
        const response = await axios.put(
          process.env.NEXT_PUBLIC_BASE_URL + "creator/"+search,
          {data:{...data,"type_field": type,"Total_Quantity_Selected":Number(data?.Total_Quantity_Selected).toFixed(2),"Total_Remaining_Quantity":Number(data?.Total_Remaining_Quantity ?? 0).toFixed(2),"Remaining_Quantity1":"0.00"}}
        );
      }
      console.log(response)
    }catch(e){
      console.log(e)
    }
  }

  const getEditData = async(id)=>{
  try{
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + "creator/edit/"+ id
    );
    response.data = formatData(response?.data)
    setTempList(response.data.Subform)
    setListData(response.data.Subform)
    const fixData = {...response.data,Packaging_Details: response.data.Packaging_Details.map(item=>({...item,Available_Quantity:Number(item.Available_Quantity)})) } 
    setData(fixData);
  }
  catch(e){
    console.log(e)
  }
  }
  useEffect(()=>{
    if(search){
      getEditData(search);
    }
  },[search])
  return (
    <div className="p-6 mx-auto space-y-6">
      {/* Tea Blending Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Tea Blending</h1>
        <div className="flex items-center gap-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
            Sync
          </button>
        </div>
      </div>

      {/* Create Blend Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Create Blend</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Blend Number */}
          <div>
            <label className="block text-gray-700 mb-2">Blend No.</label>
            <input
              type="text"
              onChange={(e) =>
                setData((prev) => ({ ...prev, Blend_No: e.target.value }))
              }
              value={data?.Blend_No}
              className="border border-gray-300 p-3 rounded-lg w-full"
              placeholder="Enter blend number"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 mb-2">Date</label>
            <input
              type="date"
              disabled
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  Date_field: moment(e.target.value).format("DD-MMM-YYYY"),
                }))
              }
              value={data?.Date_field ? moment(data.Date_field, "DD-MMM-YYYY").format("YYYY-MM-DD") : ""}
              className="border border-gray-300 p-3 rounded-lg w-full"
            />
          </div>

          {/* STD No. */}
          <div>
            <label className="block text-gray-700 mb-2">STD No.</label>
            <input
              type="text"
              onChange={(e) =>
                setData((prev) => ({ ...prev, STD_No: e.target.value }))
              }
              value={data?.STD_No}
              className="border border-gray-300 p-3 rounded-lg w-full"
              placeholder="Enter STD number"
            />
          </div>

          {/* Blend Quantity */}
          <div>
            <label className="block text-gray-700 mb-2">
              Blend Quantity (in kg)
            </label>
            <input
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  Blend_Quantity_in_kg: e.target.value,
                  Total_Remaining_Quantity: (e.target.value ?? 0) - (prev?.Total_Quantity_Selected ?? 0)
                }))
              }
              value={data?.Blend_Quantity_in_kg}
              type="number"
              className="border border-gray-300 p-3 rounded-lg w-full"
              placeholder="Enter blend quantity"
            />
          </div>

          {/* Shipment From */}
          <div>
            <label className="block text-gray-700 mb-2">Shipment From</label>
            <input
              value={data?.Shipment_From}
              onChange={(e) =>
                setData((prev) => ({ ...prev, Shipment_From: e.target.value }))
              }
              type="text"
              className="border border-gray-300 p-3 rounded-lg w-full"
              placeholder="Enter shipment location"
            />
          </div>

          {/* Total Quantity Selected */}
          <div>
            <label className="block text-gray-700 mb-2">
              Total Quantity Selected
            </label>
            <input
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  Total_Quantity_Selected: e.target.value,
                }))
              }
              value={data?.Total_Quantity_Selected ?? 0}
              type="number"
              disabled
              className="border border-gray-300 p-3 rounded-lg w-full"
            />
          </div>

          {/* Inspection By */}
          <div>
            <label className="block text-gray-700 mb-2">Inspection By</label>
            <input
              onChange={(e) =>
                setData((prev) => ({ ...prev, Inspection_By: e.target.value }))
              }
              value={data?.Inspection_By ?? 0}
              type="text"
              className="border border-gray-300 p-3 rounded-lg w-full"
              placeholder="Enter inspector's name"
            />
          </div>

          {/* Remaining Quantity */}
          <div>
            <label className="block text-gray-700 mb-2">
              Remaining Quantity
            </label>
            <input
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  Total_Remaining_Quantity: e.target.value,
                }))
              }
              value={data?.Total_Remaining_Quantity}
              disabled
              type="text"
              className="border border-gray-300 p-3 rounded-lg w-full"
              placeholder="Enter remaining quantity"
            />
          </div>
        </div>

        {/* Inventory Table Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-4">Inventory Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600">Garden</th>
                  <th className="px-4 py-2 text-left text-gray-600">Grade</th>
                  <th className="px-4 py-2 text-left text-gray-600">Inv No.</th>
                  <th className="px-4 py-2 text-left text-gray-600">Avl Qty</th>
                  <th className="px-4 py-2 text-left text-gray-600">Qty/Bag</th>
                  <th className="px-4 py-2 text-left text-gray-600">
                    Avl Bags
                  </th>
                  <th className="px-4 py-2 text-left text-gray-600">
                    Req Bags
                  </th>
                  <th className="px-4 py-2 text-left text-gray-600">Req Qty</th>
                  <th className="px-4 py-2 text-left text-gray-600">
                    Select Item
                  </th>
                  <th className="px-4 py-2 text-left text-gray-600">
                    Sale Broker Lot
                  </th>
                  <th className="px-4 py-2 text-left text-gray-600">WH</th>
                  <th className="px-4 py-2 text-left text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tempList?.map((item) => (
                  <SingleRow
                    data={data}
                    listData={listData}
                    gardenList={gardenList}
                    updateData={setData}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          onClick={() => {
            setTempList((prev) => [...prev, {}]);
          }}
        >
        {console.log(tempList)}
          + Add Tea Item
        </button>

        {/* PackingItemSection */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-xl font-semibold mb-4">Packaging Items</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600">Product Name	</th>
                  <th className="px-4 py-2 text-left text-gray-600">Unit</th>
                  <th className="px-4 py-2 text-left text-gray-600">Available Qty	</th>
                  <th className="px-4 py-2 text-left text-gray-600">Required Qty	</th>
                  <th className="px-4 py-2 text-left text-gray-600">
                    Select Item
                  </th>
                  <th className="px-4 py-2 text-left text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">

                {data?.Packaging_Details?.map((item) => (
                  <ProductList
                    data={data}
                    item={item}
                    ProductList={packingList}
                    updateData={setData}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          onClick={() => {
            setData((prev) => ({...prev,Packaging_Details: [...prev?.Packaging_Details,{}]}));
          }}
        >
          + Add Tea Item
        </button>

        {/* Packing Details */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
          <h3 className="text-lg font-semibold mb-4">
            To be packed as follows
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* STD */}
            <div>
              <label className="block text-gray-700 mb-2">STD</label>
              <input
                onChange={(e) => { setData(prev => ({ ...prev, STD: e.target.value })) }}
                value={data?.STD}
                type="text"
                className="border border-gray-300 p-3 rounded-lg w-full"
                placeholder="Enter STD"
              />
            </div>

            {/* Net Qty per Sack */}
            <div>
              <label className="block text-gray-700 mb-2">
                Net Qty. per Sack (in kgs)
              </label>
              <input
                onChange={(e) => { setData(prev => ({ ...prev, Net_Qty_per_P_Sacks: e.target.value })) }}
                value={data?.Net_Qty_per_P_Sacks}
                type="number"
                className="border border-gray-300 p-3 rounded-lg w-full"
                placeholder="Enter net quantity per sack"
              />
            </div>

            {/* Grade */}
            <div>
              <label className="block text-gray-700 mb-2">Grade</label>
              <input
                type="text"
                onChange={(e) => { setData(prev => ({ ...prev, Grade: e.target.value })) }}
                value={data?.Grade}
                className="border border-gray-300 p-3 rounded-lg w-full"
                placeholder="Enter Grade"
              />
            </div>

            {/* Total Qty to be Packed */}
            <div>
              <label className="block text-gray-700 mb-2">
                Total Qty to be Packed (in kgs)
              </label>
              <input
                type="number"
                onChange={(e) => { setData(prev => ({ ...prev, Total_Qty_be_packed_in_kgs: e.target.value })) }}
                value={data?.Total_Qty_be_packed_in_kgs}
                className="border border-gray-300 p-3 rounded-lg w-full"
                placeholder="Enter total quantity to be packed"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-gray-700 mb-2">Brand</label>
              <input
                type="text"
                onChange={(e) => { setData(prev => ({ ...prev, Brand: e.target.value })) }}
                value={data?.Brand}
                className="border border-gray-300 p-3 rounded-lg w-full"
                placeholder="Enter brand"
              />
            </div>

            {/* Total Qty of P/Sacks */}
            <div>
              <label className="block text-gray-700 mb-2">
                Total Qty of P/Sacks (in pcs)
              </label>
              <input
                type="number"
                onChange={(e) => { setData(prev => ({ ...prev, Net_Qty_per_P_Sacks: e.target.value })) }}
                value={data?.Net_Qty_per_P_Sacks}
                className="border border-gray-300 p-3 rounded-lg w-full"
                placeholder="Enter total quantity of sacks"
              />
            </div>

            {/* LOT No/Batch No. */}
            <div>
              <label className="block text-gray-700 mb-2">
                LOT No/Batch No.
              </label>
              <input
                type="text"
                onChange={(e) => { setData(prev => ({ ...prev, LOT: e.target.value })) }}
                value={data?.LOT}
                className="border border-gray-300 p-3 rounded-lg w-full"
                placeholder="Enter LOT or Batch number"
              />
            </div>

            {/* Origin */}
            <div>
              <label className="block text-gray-700 mb-2">Origin</label>
              <input
                type="text"
                onChange={(e) => { setData(prev => ({ ...prev, Origin: e.target.value })) }}
                value={data?.Origin}
                className="border border-gray-300 p-3 rounded-lg w-full"
                placeholder="Enter origin"
              />
            </div>

            {/* Production Date */}
            <div>
              <label className="block text-gray-700 mb-2">
                Production Date
              </label>
              <input
                type="date"
                onChange={(e) => { setData(prev => ({ ...prev, Production_Date: moment(e.target.value).format("DD-MMM-YYYY") })) }}
                value={data?.Production_Date ? moment(data.Production_Date, "DD-MMM-YYYY").format("YYYY-MM-DD") : ""}
                className="border border-gray-300 p-3 rounded-lg w-full"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-gray-700 mb-2">Expiry Date</label>
              <input
                type="date"
                onChange={(e) => { setData(prev => ({ ...prev, Expiry_Date: moment(e.target.value).format("DD-MMM-YYYY") })) }}
                value={data?.Expiry_Date ? moment(data.Expiry_Date, "DD-MMM-YYYY").format("YYYY-MM-DD") : ""}
                className="border border-gray-300 p-3 rounded-lg w-full"
              />
            </div>

            {/* Net Weight */}
            <div>
              <label className="block text-gray-700 mb-2">
                Net Weight (in kgs)
              </label>
              <input
                type="number"
                onChange={(e) => { setData(prev => ({ ...prev, Net_Weight_in_kgs: e.target.value })) }}
                value={data?.Net_Weight_in_kgs}
                className="border border-gray-300 p-3 rounded-lg w-full"
                placeholder="Enter net weight"
              />
            </div>

            {/* Gross Weight */}
            <div>
              <label className="block text-gray-700 mb-2">
                Gross Weight (in kgs)
              </label>
              <input
                type="number"
                onChange={(e) => { setData(prev => ({ ...prev, Gross_Weight_in_kgs: e.target.value })) }}
                value={data?.Gross_Weight_in_kgs}
                className="border border-gray-300 p-3 rounded-lg w-full"
                placeholder="Enter gross weight"
              />
            </div>
          </div>
        </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition mt-4" onClick={()=>{submitData("create")}}>Create</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition mt-4" onClick={()=>{submitData("draft")}}>Draft</button>
      </div>
    </div>
  );
};

export default Page;
