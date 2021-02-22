import React from "react";
import PropTypes from "prop-types";
import Task from "./Task";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TextareaAutosize from "react-textarea-autosize";

function Column({ name, card, index, AddAnotherCard, addAnotherCardClick }) {
  return (
    <Draggable draggableId={index.toString() + "-column"} index={index}>
      {(provided, snapshot) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div
            className="border border-secondary rounded p-0 m-1"
            style={{ width: "300px", backgroundColor: snapshot.isDragging ? "lightgray" : "white", transition: "background-color 0.2s ease" }}
          >
            <div className="py-1 px-2 border-bottom border-secondary" {...provided.dragHandleProps}>
              {name}
            </div>
            <div style={{ backgroundColor: "white" }}>
              <Droppable droppableId={index.toString()} direction="vertical" type="task">
                {(provided, snapshot) => (
                  <>
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{ backgroundColor: snapshot.isDraggingOver ? "darkgray" : "inherit", transition: "background-color 0.2s ease" }}
                    >
                      <div className="px-2 py-0">
                        {card.map((value, ind) => {
                          return <Task key={ind} name={value.name} indexColumn={index} indexTask={ind} />;
                        })}
                      </div>

                      {provided.placeholder}
                      {AddAnotherCard.index == index && AddAnotherCard.isOpen ? (
                        <div className={`px-2 ${card.length > 0 ? "pt-0 pb-1" : "py-1"}`} style={{ backgroundColor: "white" }}>
                          <TextareaAutosize
                            className="form-control form-control-sm mb-2"
                            minRows={2}
                            placeholder="Enter card title..."
                            onChange={(e) => addAnotherCardClick("Value", e.target.value)}
                            value={AddAnotherCard.name}
                            style={{ resize: "none" }}
                          />
                          <button className="btn btn-sm btn-success" onClick={() => addAnotherCardClick("Add", index)}>
                            Add List
                          </button>
                          <button className="btn btn-sm btn-danger ml-2" onClick={() => addAnotherCardClick("Close")}>
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div
                          className={`px-2 py-1 ${card.length > 0 ? "border-top border-secondary" : ""}`}
                          style={{ backgroundColor: "white", cursor: "pointer" }}
                          onClick={() => addAnotherCardClick("Open", index)}
                        >
                          + Add Another Card
                        </div>
                      )}
                    </div>
                  </>
                )}
              </Droppable>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

Column.propTypes = {};

export default Column;
