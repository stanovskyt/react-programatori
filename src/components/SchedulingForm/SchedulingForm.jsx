import React from "react";
import "./SchedulingForm.css";
import { useState, useEffect } from "react";

function SchedulingForm({ devData, onHandle }) {
  const [scheduling, setScheduling] = useState({
    rows: "",
    days: "",
  });

  const [disable, setDisable] = useState(true);

  const handleScheduling = (event) => {
    const source = event.target.name;

    switch (source) {
      case "rows": {
        setScheduling({
          rows: event.target.value,
          days: scheduling.days,
        });
        break;
      }
      case "days": {
        setScheduling({
          rows: scheduling.rows,
          days: event.target.value,
        });
        break;
      }
      default: {
        break;
      }
    }
  };

  useEffect(() => {
    const tempScheduling =
      parseInt(scheduling.rows) / parseInt(scheduling.days);

    if (
      scheduling.rows === "" ||
      scheduling.days === "" ||
      devData < tempScheduling
    ) {
      const red = `rgb(255, 0, 0)`;
      document.querySelector(".btn").style.backgroundColor = `${red}`;
      setDisable(true);
    } else {
      const green = `rgb(0, 128, 0)`;
      document.querySelector(".btn").style.backgroundColor = `${green}`;
      setDisable(false);
    }
  }, [scheduling]);

  const handleClick = () => {
    const schedulingToSend = {
      rows: scheduling.rows === "" ? 0 : parseInt(scheduling.rows),
      days: scheduling.days === "" ? 0 : parseInt(scheduling.days),
    };
    onHandle(schedulingToSend);
    setScheduling({
      rows: "",
      days: "",
    });
  };

  return (
    <div className="scheduling-form">
      <input
        type="number"
        min="0"
        placeholder="Zadej počet řádků"
        name="rows"
        value={scheduling.rows}
        onChange={handleScheduling}
      />
      <input
        type="number"
        min="0"
        placeholder="Zadej počet dnů"
        name="days"
        value={scheduling.days}
        onChange={handleScheduling}
      />
      <button className="btn" disabled={disable} onClick={handleClick}>
        Vložit do plánování
      </button>
    </div>
  );
}

export default SchedulingForm;
