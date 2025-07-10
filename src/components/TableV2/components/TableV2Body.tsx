import { UniqueIdentifier } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ColumnDef, Row, Table, flexRender } from "@tanstack/react-table";
import Color from "color";
import React, { Fragment, useCallback } from "react";
import styled from "styled-components";

import typography from "../../../foundations/typography";
import Placeholder from "../Placeholder";

import DraggableRow from "./DraggableRow";

interface TableV2BodyProps<T> {
  table: Table<T>;
  columns: ColumnDef<T, any>[];
  showLoading: boolean;
  showMoreLoading: boolean;
  dragMode: boolean;
  dataIds: UniqueIdentifier[];
  selectedRowId?: string;
  selectedOriginalCodes?: string[];
  expandedChildrens?: React.ReactNode[];
  onRowClick?: (e: any, row: Row<T>) => void;
}

const TableV2Body = <T extends { code: string }>({
  table,
  columns,
  showLoading,
  showMoreLoading,
  dragMode,
  dataIds,
  selectedRowId,
  selectedOriginalCodes,
  expandedChildrens,
  onRowClick,
}: TableV2BodyProps<T>) => {
  const placeholderRow = useCallback(
    (rowIndex: number) => {
      return (
        <tr key={`placeholder-${rowIndex}`}>
          {columns.map((_, index) => (
            <td key={`placeholder-${rowIndex}-cell-${index}`}>
              <Placeholder $width="75%" />
            </td>
          ))}
        </tr>
      );
    },
    [columns]
  );

  const handleRowClick = useCallback(
    (e: any, row: Row<T>) => {
      if (e.target.type === "checkbox" || e.target.parentElement.htmlFor) {
        e.stopPropagation();
        return;
      }

      onRowClick?.(e, row);
    },
    [onRowClick]
  );

  if (showLoading) {
    return (
      <TableBody>
        {Array.from({ length: 5 }).map((_, i) => placeholderRow(i))}
      </TableBody>
    );
  }

  if (dragMode) {
    return (
      <TableBody>
        <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
          {table.getRowModel().rows.map((row) => (
            <DraggableRow
              key={row.id}
              row={row}
              selectedRowId={selectedRowId}
              selectedOriginalCodes={selectedOriginalCodes}
              onRowClick={onRowClick}
            />
          ))}
          {showMoreLoading && placeholderRow(1)}
        </SortableContext>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => (
        <Fragment key={row.id}>
          <tr
            onClick={(e) => handleRowClick(e, row)}
            className={`${
              selectedRowId === row.id ||
              selectedOriginalCodes?.includes(row.original.code)
                ? "selected"
                : ""
            } ${onRowClick ? "clickable" : ""}`}
          >
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
          {row.getIsExpanded() && expandedChildrens?.[row.index] && (
            <InnerTable>
              <InnerCell />
              <InnerCell colSpan={row.getVisibleCells().length - 1}>
                {expandedChildrens[row.index]}
              </InnerCell>
            </InnerTable>
          )}
        </Fragment>
      ))}
      {showMoreLoading && placeholderRow(1)}
    </TableBody>
  );
};

export default TableV2Body;

const TableBody = styled.tbody`
  tr {
    transition: background-color 0.3s;

    &:hover {
      background-color: ${({ theme }) =>
        Color(theme.palette.core.BasePrimary).alpha(0.1).toString()};
    }

    &.selected {
      background-color: ${({ theme }) =>
        Color(theme.palette.core.BasePrimary).alpha(0.2).toString()};
    }

    &.clickable {
      cursor: pointer;

      td,
      label {
        cursor: pointer;
      }
    }
  }

  td {
    padding: 10px 15px;
    ${typography.Body3_200}
    color: ${({ theme }) => theme.palette.text.PrimaryText};
    vertical-align: middle;
    border-bottom: 1px solid
      ${({ theme }) =>
        Color(theme.palette.core.Borders100).alpha(0.6).toString()};
  }
`;

const InnerTable = styled.tr`
  background-color: #fcfcfc;

  &:hover {
    background-color: transparent !important;
  }

  &.selected {
    background-color: transparent !important;
  }

  thead {
    z-index: 90;
  }
`;

const InnerCell = styled.td`
  padding: 10px 0 !important;
`;
