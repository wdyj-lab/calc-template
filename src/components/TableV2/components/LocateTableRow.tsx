import type { Identifier, XYCoord } from "dnd-core";
import React, { PropsWithChildren, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface LocateTableRowProps {
  id: string;
  index: number;
  className?: string;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onClick: (e: any) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const LocateTableRow = ({
  id,
  index,
  className,
  children,
  onMove,
  onClick,
}: PropsWithChildren<LocateTableRowProps>) => {
  const ref = useRef<HTMLTableRowElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "locateItem",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "locateItem",
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <tr
      ref={ref}
      className={className}
      style={{ opacity }}
      data-handler-id={handlerId}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

export default LocateTableRow;
