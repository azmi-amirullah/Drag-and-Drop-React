import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";

function Board() {
  useEffect(() => {
    window.addEventListener("resize", () => setInnerHeight(window.innerHeight));

    setInnerHeight(window.innerHeight);

    return () => {
      window.removeEventListener("resize", () => setInnerHeight(window.innerHeight));
    };
  }, []);

  const [InnerHeight, setInnerHeight] = useState(window.innerHeight);

  const [ListColumn, setListColumn] = useState([
    { name: "Start", card: [{ name: "Test - 1" }, { name: "Test - 2" }, { name: "Test - 3" }] },
    { name: "Progress", card: [{ name: "Test - 4" }, { name: "Test - 5" }] },
    { name: "Finish", card: [{ name: "Test - 6" }] },
  ]);
  const [AddAnotherList, setAddAnotherList] = useState({ isOpen: false, name: "" });
  const [AddAnotherCard, setAddAnotherCard] = useState({ isOpen: false, name: "", index: null });

  function onDragEnd(input) {
    const { destination, source, type } = input;
    if (!destination) {
      return;
    }
    if (type === "column") {
      if (destination.index === source.index) {
        return;
      } else {
        let oldListColumn = [...ListColumn];
        oldListColumn.splice(source.index, 1);
        oldListColumn.splice(destination.index, 0, ListColumn[source.index]);

        const newListColumn = JSON.parse(JSON.stringify(oldListColumn));

        setListColumn(newListColumn);
      }
    } else {
      if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
      }
      if (destination.droppableId === source.droppableId) {
        let newListColumn = JSON.parse(JSON.stringify(ListColumn));
        newListColumn[source.droppableId].card.splice(source.index, 1);
        newListColumn[destination.droppableId].card.splice(destination.index, 0, ListColumn[destination.droppableId].card[source.index]);
        setListColumn(newListColumn);
      } else {
        let newListColumn = JSON.parse(JSON.stringify(ListColumn));
        newListColumn[source.droppableId].card.splice(source.index, 1);
        newListColumn[destination.droppableId].card.splice(destination.index, 0, ListColumn[source.droppableId].card[source.index]);
        setListColumn(newListColumn);
      }
    }
  }

  function addAnotherListClick(type, value) {
    switch (type) {
      case "Open":
        setAddAnotherList({ ...AddAnotherList, isOpen: true, name: "" });
        break;
      case "Close":
        setAddAnotherList({ ...AddAnotherList, isOpen: false, name: "" });
        break;
      case "Add":
        setListColumn([...ListColumn, { name: AddAnotherList.name, card: [] }]);
        addAnotherListClick("Close");
        break;
      case "Value":
        setAddAnotherList({ ...AddAnotherList, name: value });
        break;
      default:
        break;
    }
  }
  function addAnotherCardClick(type, value) {
    let newColumn = JSON.parse(JSON.stringify(ListColumn));
    switch (type) {
      case "Open":
        setAddAnotherCard({ ...AddAnotherCard, isOpen: true, name: "", index: value });
        break;
      case "Close":
        setAddAnotherCard({ ...AddAnotherCard, isOpen: false, index: null, name: "" });
        break;
      case "Add":
        newColumn[value].card = [...newColumn[value].card, { name: AddAnotherCard.name }];
        setListColumn(newColumn);
        addAnotherCardClick("Close");
        break;
      case "Value":
        setAddAnotherCard({ ...AddAnotherCard, name: value });
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div className="row m-0 overflow-auto" style={{ height: InnerHeight, userSelect: "none" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="column" type="column" direction="horizontal">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div
                  className="row m-0 pl-1 d-inline-flex"
                  style={{
                    flexWrap: "nowrap",
                    height: "100%",
                    backgroundColor: snapshot.isDraggingOver ? "darkgray" : "white",
                    transition: "background-color 0.2s ease",
                  }}
                >
                  {ListColumn.map((value, index) => {
                    return (
                      <Column
                        key={index}
                        name={value.name}
                        card={value.card}
                        index={index}
                        AddAnotherCard={AddAnotherCard}
                        addAnotherCardClick={addAnotherCardClick}
                      />
                    );
                  })}
                  {provided.placeholder}
                  {AddAnotherList.isOpen ? (
                    <div className="pl-0 pr-2 py-0 d-inline-block" style={{ width: "300px", flexWrap: "nowrap", backgroundColor: "white" }}>
                      <div className="px-2 py-1 border border-secondary rounded m-1" style={{ cursor: "pointer" }}>
                        <input
                          className="form-control form-control-sm mb-2"
                          type="text"
                          placeholder="Enter list title..."
                          onChange={(e) => addAnotherListClick("Value", e.target.value)}
                          value={AddAnotherList.name}
                        />
                        <button className="btn btn-sm btn-success" onClick={() => addAnotherListClick("Add")}>
                          Add List
                        </button>
                        <button className="btn btn-sm btn-danger ml-2" onClick={() => addAnotherListClick("Close")}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="pl-0 pr-2 py-0 d-inline-block" style={{ width: "300px", flexWrap: "nowrap", backgroundColor: "white" }}>
                      <div
                        className="px-2 py-1 border border-secondary rounded m-1"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          addAnotherListClick("Open");
                        }}
                      >
                        + Add Another List
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}

export default Board;
