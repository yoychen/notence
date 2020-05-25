import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const BoardWrapper = styled.div`
  display: flex;
  overflow: auto;
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 220px;

  & + & {
    margin-left: 1em;
  }
`;

const BoardTitle = styled.div`
  margin: 0 0.25em 1em;
  user-select: none;
`;

const BoardContent = styled.div`
  flex: 1;
  padding-bottom: 1.5em;
`;

const AddBtn = styled(Button)`
  width: 100%;
  padding: 0.25em;
  border: none;
  text-align: left;
`;

export default function SortableBoard({ groups, onChange, onItemCreate, children }) {
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    onChange(result);
  };

  const renderItem = (item) => (draggableProvided) => {
    const restProps = {
      innerRef: draggableProvided.innerRef,
      ...draggableProvided.draggableProps,
      ...draggableProvided.dragHandleProps,
    };

    return children(item, restProps);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <BoardWrapper>
        {Object.entries(groups).map(([groupId, group]) => (
          <Board key={groupId}>
            <BoardTitle>{group.name}</BoardTitle>

            <Droppable droppableId={groupId}>
              {(provided) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <BoardContent {...provided.droppableProps} ref={provided.innerRef}>
                  {group.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {renderItem(item)}
                    </Draggable>
                  ))}
                  {provided.placeholder}

                  <AddBtn onClick={() => onItemCreate(groupId)} icon={<PlusOutlined />}>
                    New
                  </AddBtn>
                </BoardContent>
              )}
            </Droppable>
          </Board>
        ))}
      </BoardWrapper>
    </DragDropContext>
  );
}

SortableBoard.propTypes = {
  children: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onItemCreate: PropTypes.func.isRequired,
  groups: PropTypes.objectOf(PropTypes.object).isRequired,
};
