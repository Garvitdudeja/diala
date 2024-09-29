import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SingleRow = (props) => {
  const [listData, setListData] = useState(props?.listData.lenght > 0 ?[...props?.listData]: [{index:"0",Required_Quantity:0}] );
  const [data, setData] = useState({});
  const [gradeList, setGradeList] = useState();
  const getDocuments = async (garden = "", grade = "") => {
    try {
      const documents = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "documents",
        { garden: garden, grades: [grade], index: 0 }
      );
      return documents;
    } catch (e) {
      console.log(e);
    }
  };
  const getGrades = async (garden = "") => {
    try {
      const gradeList = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "grades",
        { garden: garden }
      );
      setGradeList(gradeList.data);
    } catch (e) {
      console.log(e);
    }
  };

  const updateProductForm = async (label, value, id) => {
    try {
      if (label == "Garden2") {
        setListData((prev) => [
          {
            Garden2: value,
            Grade1: "",
            Inv_No: "",
            Available_Quantity: 0,
            Required_Quantity: 0,
            Qty_per_Bag: 0,
          },
        ]);
        return;
      }
      if (label == "Required_Bags") {
        setListData((prev) =>
          prev.map((item) =>
            item.Batch_ID === id
              ? {
                  ...item,
                  [label]: value,
                  Required_Quantity: item?.Qty_per_Bag * value,
                }
              : item
          )
        );
        return;
      }
      if (label == "Required_Quantity") {
        const selectedItem = listData.find(item=>item?.Batch_ID==id);
        if(value> selectedItem?.Available_Quantity ){
          toast.error("Required Quantity cannot be greater then Available Quantity ")
          return
        }
        setListData((prev) =>
          prev.map((item) =>
            item.Batch_ID === id
              ? {
                  ...item,
                  [label]: value,
                  Required_Bags: Number(value / item?.Qty_per_Bag).toFixed(2),
                }
              : item
          )
        );
        return;
      }
      if (label == "Grade1") {
        const currentObject = listData.find((item) => item.Batch_ID == id);
        if (!currentObject?.Garden2) {
          toast.error("Select a garden first!");
        }

        const documents = await getDocuments(currentObject?.Garden2, value);
        const newArray = [];
        documents?.data?.documents?.forEach((item) => {
          item?.Batch_Details?.forEach((ele) =>
            newArray.push({
              ...ele,
              Garden2: ele?.Garden,
              Grade1: ele?.Grade,
              Item_ID: item?.Item_ID,
              Product_Name: item?.Product_Name,
              Inv_No: ele?.Batch_No,
              Select_Item: false,  
            })
          );
        });
        setListData(newArray);
      } else {
        setListData((prev) =>
          prev.map((item) =>
            item.Batch_ID === id ? { ...item, [label]: value } : item
          )
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleRemove = (id, value) => {
    setListData((prev) => prev.filter((item) => item.Batch_ID != id));
    if (value) {
      updateFinalData(id, false);
    }
  };
  const updateFinalData = (id, value = true) => {
    const selectedItem = listData.find((item) => item.Batch_ID == id);
    if (
      !selectedItem?.Required_Quantity ||
      selectedItem?.Required_Quantity == 0) {
      toast.error("Required Quantity should not be empty!");
      return;
    }
    if(selectedItem?.Required_Quantity > props?.data?.Blend_Quantity_in_kg){
      toast.error("Selected Quantity is greater than the Blend Quantity. Please select a quantity less than or equal to the Blend Quantity");
      return
    }
    selectedItem.PK = Number((selectedItem?.Available_Quantity ?? 0) / Number(selectedItem?.Qty_per_Bag ?? 1)).toFixed(2)
    selectedItem.Nett = selectedItem.Qty_per_Bag
    selectedItem.Select_Item = "true"
    delete selectedItem.Batch_No
    delete selectedItem.Bill_No
    delete selectedItem.Bill_ID
    delete selectedItem.Garden
    delete selectedItem.Grade
    // delete selectedItem.Qty_per_Bag
    delete selectedItem.W_h 
    updateProductForm(
      "Select_Item",
      value,
      id
    );

    if (value) {

      props?.updateData((prev) => ({
        ...prev,
        Total_Quantity_Selected:
          Number(prev.Total_Quantity_Selected) +
          Number(selectedItem?.Required_Quantity),
        Total_Remaining_Quantity:
          Number(prev.Total_Remaining_Quantity) -
          Number(selectedItem?.Required_Quantity),
        Subform: [
          ...prev?.Subform,
          {
            ...selectedItem,
            Required_Quantity: Number(selectedItem?.Required_Quantity).toFixed(
              2
            ),
            Required_Bags: Number(selectedItem?.Required_Bags).toFixed(2),
          },
        ],
      }));
    } else {
      props?.updateData((prev) => ({
        ...prev,
        Total_Quantity_Selected:
          Number(prev.Total_Quantity_Selected) -
          Number(
            listData.find((item) => item.Batch_ID == id)?.Required_Quantity
          ),
        Total_Remaining_Quantity:
          Number(prev.Total_Remaining_Quantity) +
          Number(selectedItem?.Required_Quantity),
        Subform: prev?.Subform.filter((item) => item?.Batch_ID != id),
      }));
    }
    console.log(listData,"Dtaaaaaaaaaaaaaaaaa")
  };

  return (
    <>
      {listData?.map((item) => (
        <tr key={item?.Batch_ID}>
          {console.log(item,"itemmmmmmmm")}
          <td className="px-4 py-2">
            <select
              name="garden"
              value={item?.Garden2}
              disabled={item?.Select_Item}
              className="border border-gray-300 p-2 rounded-lg w-full"
              onChange={(e) => {
                updateProductForm("Garden2", e.target.value, item.Batch_ID);
                getGrades(e.target.value);
              }}
            >
              <option value={""} selected disabled>
                Select Garden
              </option>
              {props?.gardenList?.length > 0 &&
                props?.gardenList.map((item) => (
                  <option value={item}>{item}</option>
                ))}
            </select>
          </td>
          <td className="px-4 py-2">
            <select
              name="garden"
              disabled={item?.Select_Item}
              value={item?.Grade1}
              onChange={(e) => {
                updateProductForm("Grade1", e.target.value, item?.Batch_ID);
              }}
              className="border border-gray-300 p-2 rounded-lg w-full"
            >
              <option value={""} selected disabled>
                Select Grade
              </option>
              {gradeList?.length > 0 &&
                gradeList.map((item) => <option value={item}>{item}</option>)}
            </select>
          </td>
          <td className="px-4 py-2">
            <input
              type="text"
              value={item?.Inv_No}
              disabled
              onChange={() => {
                // updateProductForm("Inv_No", e.target.value, item?.Batch_ID);
              }}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </td>
          <td className="px-4 py-2">
            <input
              type="text"
              disabled
              value={item?.Available_Quantity}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </td>
          <td className="px-4 py-2">
            <input
              type="text"
              disabled
              value={item?.Qty_per_Bag}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </td>
          <td className="px-4 py-2">
            <input
              type="number"
              disabled
              value={Number((item?.Available_Quantity ?? 0) / (item?.Qty_per_Bag ?? 1)).toFixed(2)}
              // onChange={(e)=>{ updateProductForm("Required_Quantity", e.target.value, item?.Batch_ID);}}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </td>
          <td className="px-4 py-2">
            <input
              type="number"
              value={item?.Required_Bags ?? 0}
              disabled={item?.Select_Item}
              onChange={(e) => {
                updateProductForm(
                  "Required_Bags",
                  e.target.value,
                  item?.Batch_ID
                );
              }}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </td>
          <td className="px-4 py-2">
            <input
              type="text"
              value={item?.Required_Quantity ?? 0}
              disabled={item?.Select_Item}
              onChange={(e) => {
                updateProductForm(
                  "Required_Quantity",
                  e.target.value,
                  item?.Batch_ID
                );
              }}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </td>
          <td className="px-4 py-2">
            <input
              type="checkbox"
              checked={item?.Select_Item ?? false}
              onChange={(e) => {
                updateFinalData(item?.Batch_ID, e.target.checked);
              }}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </td>
          <td className="px-4 py-2">
            <input
              type="text"
              value={item?.Sale_Broker_Lot ?? ""}
              disabled={item?.Select_Item}
              onChange={(e) => {
                updateProductForm(
                  "Sale_Broker_Lot",
                  e.target.value,
                  item?.Batch_ID
                );
              }}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </td>
          <td className="px-4 py-2">
            <input
              type="text"
              value={item?.Warehouse ?? ""}
              disabled={item?.Select_Item}
              onChange={(e) => {
                updateProductForm("Warehouse", e.target.value, item?.Batch_ID);
              }}
              className="border border-gray-300 p-2 rounded-lg w-full"
            />
          </td>
          <td className="px-4 py-2">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
              onClick={() => {
                handleRemove(item?.Batch_ID, item?.Select_Item);
              }}
            >
              Remove
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default SingleRow;
