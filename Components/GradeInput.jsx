import React from "react";

const GradeInput = () => {
  return (
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
  );
};

export default GradeInput;
