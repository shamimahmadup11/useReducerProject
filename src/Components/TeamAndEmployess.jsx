/* eslint-disable no-case-declarations */


import { useReducer } from "react";
import employees from "./Data";

const initialState = {
  employees: employees.map(emp => ({ ...emp, isButtonVisible: true })), // Add visibility property to employees
  team: [],
  averageAge: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_TEAM':
      // eslint-disable-next-line no-case-declarations
      const updatedTeam = [...state.team, action.payload];
      const totalAge = updatedTeam.reduce((sum, member) => sum + member.age, 0);
      const averageAge = totalAge / updatedTeam.length;

      // Update visibility of the add button for the added employee
      const updatedEmployees = state.employees.map(emp => 
        emp.id === action.payload.id ? { ...emp, isButtonVisible: false } : emp
      );

      return {
        ...state,
        team: updatedTeam,
        employees: updatedEmployees,
        averageAge: averageAge,
      };
    case 'REMOVE_ITEM':
      const filteredTeam = state.team.filter(member => member.id !== action.payload);
      const updatedTotalAge = filteredTeam.reduce((sum, member) => sum + member.age, 0);
      const updatedAverageAge = filteredTeam.length > 0 ? updatedTotalAge / filteredTeam.length : 0;

      // Update visibility of the add button for the removed employee
      const resetEmployees = state.employees.map(emp => 
        emp.id === action.payload ? { ...emp, isButtonVisible: true } : emp
      );

      return {
        ...state,
        team: filteredTeam,
        employees: resetEmployees,
        averageAge: updatedAverageAge,
      };
    default:
      return state;
  }
};

const TeamAndEmployees = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddBtn = (employee) => {
    console.log("Adding employee:", employee);
    dispatch({ type: 'ADD_TO_TEAM', payload: employee });
  };

  const handleDeleteBtn = (memberId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: memberId });
  };

  return (
    <div className="flex gap-10 p-10 h-2/3">
      <div className="h-auto w-1/2 border shadow-md m-auto">
        <h1 className="text-2xl font-bold text-center rounded-md">Employees</h1>
        <div className="flex gap-3 flex-col max-h-96 overflow-y-auto">
          {state.employees.map((data) => (
            <div key={data.id} className="flex justify-between items-center p-2 bg-slate-500 text-white gap-4 rounded">
              <h1>{data.first_name + " " + data.last_name}</h1>
              <h1>{data.age}</h1>
              {data.isButtonVisible && (
                <button 
                  className="bg-blue-200 border-black m-2 hover:bg-blue-800 px-2 rounded-md text-black hover:text-white" 
                  onClick={() => handleAddBtn(data)}
                >
                  Add
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="h-auto w-1/2 border shadow-md m-auto">
        <h1 className="text-2xl font-bold text-center">Team</h1>
        <div className="flex gap-3 flex-col max-h-96 overflow-y-auto">
          {state.team.map((member) => (
            <div key={member.id} className="flex justify-between items-center p-2 bg-slate-500 text-white gap-4 rounded">
              <h1>{member.first_name + " " + member.last_name}</h1>
              <h1>{member.age}</h1>
              <button 
                className="bg-blue-200 border-black m-2 hover:bg-blue-800 px-2 rounded-md text-black hover:text-white" 
                onClick={() => handleDeleteBtn(member.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-center font-bold">
            Average Age: {state.averageAge.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamAndEmployees;
