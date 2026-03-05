import { useState } from "react";
import axios from "axios";

const AddResource = () => {
  const [form, setForm] = useState({ title: "", description: "" });
  const token = localStorage.getItem("token");

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/cases", form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Case Added");
  };

  return (
    <div className="p-6">
      <form onSubmit={submitHandler} className="flex flex-col gap-3">
        <input placeholder="Title" className="p-2 rounded"
          onChange={(e)=>setForm({...form,title:e.target.value})}/>
        <textarea placeholder="Description" className="p-2 rounded"
          onChange={(e)=>setForm({...form,description:e.target.value})}/>
        <button className="bg-blue-600 text-white p-2 rounded">
          Add Case Study
        </button>
      </form>
    </div>
  );
};
export default AddResource;