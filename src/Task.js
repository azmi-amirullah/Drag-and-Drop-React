import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

function Task({ name, indexColumn, indexTask }) {
  return (
    <Draggable
      key={indexTask}
      draggableId={`${indexColumn}-${indexTask.toString()}task`}
      index={indexTask}
      indexTask={indexTask}
      indexColumn={indexColumn}
    >
      {(provided, snapshot) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div
            className="px-2 py-1 my-2 border border-secondary"
            style={{ backgroundColor: snapshot.isDragging ? "lightgray" : "white", transition: "background-color 0.2s ease" }}
          >
            <div>{name}</div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

Task.propTypes = {};

export default Task;
