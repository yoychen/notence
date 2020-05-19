import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function SortableList({ items, onSort, children }) {
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const [startIndex, endIndex] = [result.source.index, result.destination.index];
    onSort({ startIndex, endIndex });
  };

  const renderListItem = (item) => (draggableProvided) => {
    const restProps = {
      innerRef: draggableProvided.innerRef,
      ...draggableProvided.draggableProps,
      ...draggableProvided.dragHandleProps,
    };

    return children(item, restProps);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="sortableList">
        {(provided) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {renderListItem(item)}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

SortableList.propTypes = {
  children: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};
