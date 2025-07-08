import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Row, flexRender } from "@tanstack/react-table";
import React, { CSSProperties } from "react";
import { useTheme } from "styled-components";

import { IconV2 } from "../../IconV2";

interface DraggableRowProps<T> {
  row: Row<T>;
  selectedRowId?: string;
  selectedOriginalCodes?: string[];
  onRowClick?: (e: any, row: Row<T>) => void;
}

const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
  const theme = useTheme();
  const { attributes, listeners } = useSortable({
    id: rowId,
  });

  return (
    <IconV2
      name="DRAG_HANDLE"
      color={theme.palette.core.IconGray}
      {...attributes}
      {...listeners}
    />
  );
};

const DraggableRow = <T extends { code: string }>({
  row,
  selectedRowId,
  selectedOriginalCodes,
  onRowClick,
}: DraggableRowProps<T>) => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.code,
  });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform), // let dnd-kit do its thing
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative",
    backgroundColor: isDragging ? "rgba(0, 0, 0, 0.1)" : "",
  };

  return (
    <tr
      ref={setNodeRef}
      key={row.id}
      onClick={(e) => onRowClick?.(e, row)}
      className={`${
        selectedRowId === row.id ||
        selectedOriginalCodes?.includes(row.original.code)
          ? "selected"
          : ""
      } ${onRowClick ? "clickable" : ""}`}
      style={style}
    >
      <td
        key="drag-handle"
        style={{ textAlign: "center", padding: "10px 5px" }}
      >
        <RowDragHandleCell rowId={row.original.code} />
      </td>
      {row.getVisibleCells().map((cell) => (
        <td
          key={cell.id}
          style={{
            width: cell.column.getSize(),
            ...cell.column.columnDef.meta?.cellStyle,
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};

export default DraggableRow;
