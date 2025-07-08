import { Table, flexRender } from "@tanstack/react-table";
import Color from "color";
import React from "react";
import styled from "styled-components";

import typography from "../../../foundations/typography";
import type { TableV2Options } from "../TableV2";

interface TableV2HeadProps<T> {
  table: Table<T>;
  options: TableV2Options;
}

const TableV2Head = <T extends { code: string }>({
  table,
  options: { headerAlign = "left", resize = false, dragMode = false },
}: TableV2HeadProps<T>) => {
  return (
    <TableHead $headerAlign={headerAlign}>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {dragMode && (
            <th key="drag-handle" style={{ width: 10 }}>
              {resize && <Resizer className="resizer" />}
            </th>
          )}
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              style={{ ...header.column.columnDef.meta?.columnStyle }}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
              {resize && (
                <Resizer
                  className="resizer"
                  {...{
                    onMouseDown: header.getResizeHandler(),
                    onTouchStart: header.getResizeHandler(),
                  }}
                />
              )}
            </th>
          ))}
        </tr>
      ))}
    </TableHead>
  );
};

export default TableV2Head;

const TableHead = styled.thead<{ $headerAlign: string }>`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.elevation.tableFixedElements};
  color: ${({ theme }) =>
    Color(theme.palette.text.PrimaryText).alpha(0.8).toString()};
  background-color: ${({ theme }) => theme.palette.core.BackgroundSecondary};

  ${typography.Body3_400}

  th {
    position: relative;
    padding: 10px 15px;
    text-align: ${({ $headerAlign }) => $headerAlign};
    vertical-align: middle;
    border-top: 1px solid ${({ theme }) => theme.palette.core.Borders100};
    border-bottom: 1px solid ${({ theme }) => theme.palette.core.Borders100};

    &:last-child > .resizer {
      display: none;
    }
  }
`;

const Resizer = styled.div`
  position: absolute;
  top: 20%;
  right: 0;
  width: 1px;
  height: 65%;
  background: ${({ theme }) =>
    Color(theme.palette.core.Divider).alpha(0.5).toString()};
  cursor: col-resize;
  touch-action: none;
  user-select: none;
`;
