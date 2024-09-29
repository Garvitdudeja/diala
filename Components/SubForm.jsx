import axios from "axios";
import React, { useState } from "react";

const SubForm = (props) => {
  const [data, setData] = useState({});
  const [gradeList, setGradeList] = useState();
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
      if (label == "garden") {
        const documents = await getDocuments("Riya", "B");
        const newArray = [];
        documents?.data?.documents?.forEach((item) => {
          item?.Batch_Details?.forEach((ele) =>
            newArray.push({ ...ele, Garden2: ele?.Garden, Grade1: ele?.Grade })
          );
        });
        setData((prev) => ({
          ...prev,
          Subform: [...prev.Subform, ...newArray],
        }));
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {" "}
      {props?.data?.Subform &&
        props?.data?.Subform.map((item) => (
          <tr>
            <td className="px-4 py-2">
              <select
                name="garden"
                value={item?.Garden2}
                className="border border-gray-300 p-2 rounded-lg w-full"
                onChange={(e) => {
                  updateProductForm("Garden2", e.target.value, item.id);
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
                value={item?.Grade1}
                onChange={(e) => {
                  updateProductForm("garden", e.target.value, item?.id);
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
                value={item?.Batch_No}
                onChange={() => {
                  updateProductForm("Batch_No", e.target.value, item?.id);
                }}
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
            </td>
            <td className="px-4 py-2">
              <input
                type="text"
                value={item?.Available_Quantity}
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
            </td>
            <td className="px-4 py-2">
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
            </td>
            <td className="px-4 py-2">
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
            </td>
            <td className="px-4 py-2">
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
            </td>
            <td className="px-4 py-2">
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
            </td>
            <td className="px-4 py-2">
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
            </td>
            <td className="px-4 py-2">
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
            </td>
            <td className="px-4 py-2">
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
            </td>
            <td className="px-4 py-2">
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg w-full"
              />
            </td>
          </tr>
        ))}
    </>
  );
};

export default SubForm;
