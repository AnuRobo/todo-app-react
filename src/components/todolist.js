import React, { useState, useEffect } from "react";
import { FcTodoList } from "react-icons/fc";
import { HiPlusSm, HiTrash } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
// css import
import "../components/todolist.css";

// to get the data from local storage
const getLocalItems = () => {
  let list = localStorage.getItem("list");
  // console.log(typeof JSON.parse(list));
  // console.log(typeof list);
  return JSON.parse(list);
};

const Todolist = () => {
  const [inputText, setInputText] = useState("");
  const [data, setData] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [editingEntity, setEditingEntity] = useState(null);

  const adData = () => {
    if (!inputText) {
      alert("Empty Fiels Detected");
    } else if (inputText && !toggleSubmit) {
      setData(
        data.map((eachItem) => {
          if (eachItem.id === editingEntity) {
            return { ...eachItem, name: inputText };
          }
          return eachItem;
        })
      );
      setToggleSubmit(true);
      setInputText("");
      setEditingEntity(null);
    } else {
      const listData = { id: new Date().getTime().toString(), name: inputText };
      setData([...data, listData]);
      setInputText("");
    }
  };

  // delete selected list data
  const deleteItem = (id) => {
    const filteredData = data.filter((eachItem) => eachItem.id !== id);
    setData([...filteredData]);
  };

  // edit selected list data
  const editItem = (id) => {
    let newEditItem = data.find((eachItem) => eachItem.id === id);
    console.log(newEditItem);
    setToggleSubmit(false);
    setInputText(newEditItem.name);
    setEditingEntity(id);
  };

  // clear whole list
  const clearTodoList = () => {
    setData([]);
  };

  // local storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(data));
    // getLocalItems();
  }, [data]);

  return (
    <div className="container">
      <div className="todo__container">
        <div className="todo__icon">
          <FcTodoList />
        </div>
        <h3>Add Your List Here</h3>

        <div className="input__list__container">
          <input
            type="text"
            placeholder="✍✍✍✍Add Items"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
          />
          {toggleSubmit ? (
            <p className="add__item" title="Add" onClick={adData}>
              <HiPlusSm />
            </p>
          ) : (
            <p className="update__item" title="Update Item" onClick={adData}>
              <FaEdit />
            </p>
          )}
        </div>
        {/* array index is working as key */}
        {data.map((eachItem) => {
          return (
            <div className="todo__list" key={eachItem.id}>
              <h2>{eachItem.name}</h2>
              <div className="edit__delete__btn__container">
                <span
                  className="edit__item"
                  title="Edit Item"
                  onClick={() => editItem(eachItem.id)}
                >
                  <FaEdit />
                </span>
                <span
                  className="delete__item"
                  title="Delete Item"
                  onClick={() => deleteItem(eachItem.id)}
                >
                  <HiTrash />
                </span>
              </div>
            </div>
          );
        })}

        <button type="button" onClick={clearTodoList}>
          Clear List
        </button>
      </div>
    </div>
  );
};

export default Todolist;
