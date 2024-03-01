import React from "react";
import "./DeveloperForm.css";
import { useState } from "react";

function DeveloperForm({ data, onChange, validation, onAdd }) {
  const [selectedValue, setSelectedValue] = useState("junior");

  const handleRadioChange = (value) => {
    setSelectedValue(value);
    data.level = value;
  };

  const sendChange = () => {
    onAdd();
    setSelectedValue("junior");
  };

  return (
    <div className="fish-form">
      <input
        type="text"
        placeholder="Jméno"
        name="name"
        value={data.name}
        onChange={onChange}
      />
      <input
        type="radio"
        id="junior"
        name="levelDev"
        value="junior"
        checked={selectedValue === "junior"}
        onChange={() => handleRadioChange("junior")}
      />
      <label htmlFor="junior">junior</label>
      <input
        type="radio"
        id="senior"
        name="levelDev"
        value="senior"
        checked={selectedValue === "senior"}
        onChange={() => handleRadioChange("senior")}
      />
      <label htmlFor="senior">senior</label>
      <button disabled={!validation} onClick={sendChange}>
        Vložit
      </button>
    </div>
  );
}

export default DeveloperForm;
