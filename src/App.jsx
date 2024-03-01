import "./App.css";
import { useState } from "react";
import developerData from "./developerData.json";
import Toggler from "./components/Toggler/Toggler";
import DeveloperList from "./components/DeveloperList/DeveloperList";
import DeveloperForm from "./components/DeveloperForm/DeveloperForm";
import SchedulingForm from "./components/SchedulingForm/SchedulingForm";

function App() {
  const [listOfDeveloper, setListOfDeveloper] = useState(
    developerData.developer
  );
  const [newDeveloper, setNewDeveloper] = useState({
    id:
      listOfDeveloper.length > 0
        ? Math.max(...listOfDeveloper.map((developer) => developer.id)) + 1
        : 1,
    name: "",
    level: "junior",
  });

  const [activeTab, setActiveTab] = useState(1);

  const [valid, setValid] = useState(false);

  const [scheduling, setScheduling] = useState({
    rows: 0,
    days: 0,
  });

  const [developerCapacity, setDeveloperCapacity] = useState(0);
  const [sumJunior, setSumJunior] = useState(0);
  const [sumSenior, setSumSenior] = useState(0);

  const handleChoose = (source) => {
    switch (source) {
      case "list-of-developer": {
        setActiveTab(1);
        break;
      }
      case "task-scheduling": {
        let required = 0;
        let numJuniors = 0;
        let numSeniors = 0;

        setActiveTab(2);

        listOfDeveloper.map((item) => {
          if (item.level === "senior") {
            required += 200;
            numSeniors++;
          } else if (item.level === "junior") {
            required += 100;
            numJuniors++;
          }
        });
        setDeveloperCapacity(required);
        setSumJunior(numJuniors);
        setSumSenior(numSeniors);
        break;
      }
      default:
        break;
    }
  };

  const validateData = (developer) => {
    if (developer.name.trim().length === 0) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const handleChange = (event) => {
    const updatedDeveloper = {
      ...newDeveloper,
      [event.target.name]: event.target.value,
    };
    validateData(updatedDeveloper);
    setNewDeveloper(updatedDeveloper);
  };

  const handleAdd = () => {
    setListOfDeveloper((listOfDeveloper) => {
      return [...listOfDeveloper, newDeveloper];
    });
    const newDevId = newDeveloper.id + 1;
    const updatedDeveloper = {
      id: newDevId,
      name: "",
      level: "junior",
    };
    setNewDeveloper(updatedDeveloper);
    validateData(updatedDeveloper);
  };

  const handleDelete = (idToDelete) => {
    setListOfDeveloper(listOfDeveloper.filter((dev) => dev.id !== idToDelete));
  };

  const handleScheduling = (temp) => {
    setScheduling(temp);
  };

  return (
    <div className="App page-container">
      <Toggler active={activeTab} onChoose={handleChoose} />
      {activeTab === 1 && (
        <>
          <DeveloperList data={listOfDeveloper} onDelete={handleDelete} />
          <DeveloperForm
            data={newDeveloper}
            validation={valid}
            onChange={handleChange}
            onAdd={handleAdd}
          />
        </>
      )}
      {activeTab === 2 && (
        <>
          <h3>Plánování</h3>
          <p>Počet řádků kódu: {scheduling.rows} </p>
          <p>Počet dnů: {scheduling.days}</p>
          <p></p>
          <fieldset className="box">
            <legend>Počet programátorů</legend>
            <p>Junior: {sumJunior}</p>
            <p>Senior: {sumSenior}</p>
            <p>Napíšou {developerCapacity} řádků denně</p>
          </fieldset>

          <SchedulingForm
            devData={developerCapacity}
            onHandle={handleScheduling}
          />
        </>
      )}
    </div>
  );
}

export default App;
