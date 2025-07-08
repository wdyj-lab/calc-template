import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove } from "@dnd-kit/sortable";
import {
  ColumnDef,
  Row,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Color from "color";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Waypoint from "react-awesome-waypoint";
import styled from "styled-components";

import typography from "../../foundations/typography";

import TableV2Body from "./components/TableV2Body";
import TableV2Head from "./components/TableV2Head";

export interface TableV2Props<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  onRowClick?: (e: any, row: Row<T>) => void;
  onDragChange?: (data: T[]) => void;
  onWayPointEnter?: () => void;
  onRowExpand?: (row: Row<T>) => boolean;
  onScroll?: (scrollTop: number) => void;
  isLoading?: boolean;
  isMoreLoading?: boolean;
  options: TableV2Options;
  totalCount?: number;
  scrollPosition?: number;
  selectedRowId?: string;
  selectedOriginalCodes?: string[];
  expandedChildrens?: React.ReactNode[];
}

export interface TableV2Options {
  width?: string;
  minWidth?: string;
  maxHeight?: string;
  margin?: string;
  headerAlign?: "left" | "center" | "right";
  resize?: boolean;
  dragMode?: boolean;
  expandMode?: boolean;
  overflow?: string;
  tableLayout?: string;
}

const TableV2 = <T extends { code: string }>({
  data,
  columns,
  onRowClick,
  onWayPointEnter,
  onDragChange,
  onRowExpand,
  onScroll,
  isLoading = false,
  isMoreLoading = false,
  totalCount,
  selectedRowId,
  selectedOriginalCodes,
  expandedChildrens,
  scrollPosition = 0,
  options: {
    width = "100%",
    minWidth = "100%",
    maxHeight,
    margin = "0",
    headerAlign = "left",
    resize = false,
    dragMode = false,
    expandMode = false,
    overflow,
    tableLayout,
  },
  ...rest
}: TableV2Props<T>) => {
  const [originData, setOriginData] = useState(data);
  const [rowSelection, setRowSelection] = useState({});
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo(0, scrollPosition);
  }, [scrollPosition]);

  useEffect(() => {
    setOriginData(data);
  }, [data]);

  useEffect(() => {
    ref.current?.addEventListener("scroll", () => {
      const { scrollTop } = ref.current!;

      onScroll?.(scrollTop);
    });
  }, [onScroll]);

  const dataIds = useMemo<UniqueIdentifier[]>(
    () => originData.map((d) => d.code),
    [originData]
  );

  const table = useReactTable({
    data: originData,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getRowCanExpand: onRowExpand,
    columnResizeMode: resize ? "onChange" : undefined,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const handleRowClick = (e: any, row: Row<T>) => {
    if (
      e.target?.tagName === "A" ||
      e.target.childNodes?.[0]?.tagName === "A"
    ) {
      e.stopPropagation();
      return;
    }

    onRowClick?.(e, row);
  };

  const handleWaypointEnter = useCallback(() => {
    if (data.length === 0) return;
    onWayPointEnter?.();
  }, [data.length, onWayPointEnter]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const oldIndex = dataIds.indexOf(active.id);
      const newIndex = dataIds.indexOf(over.id);

      setOriginData((data) => {
        const moveArray = arrayMove(data, oldIndex, newIndex);
        onDragChange?.(moveArray);
        return moveArray;
      });
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    <Wrapper maxHeight={maxHeight} overflow={overflow}>
      {totalCount !== undefined && (
        <TableTitle>
          검색결과{" "}
          <span>
            총 <b>{totalCount.toLocaleString()}개</b>
          </span>
        </TableTitle>
      )}
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <TableContainer
          ref={ref}
          $width={width}
          $minWidth={minWidth}
          $margin={margin}
          {...rest}
        >
          <NativeTable width="100%" $tableLayout={tableLayout}>
            <TableV2Head
              table={table}
              options={{ headerAlign, resize, dragMode, expandMode }}
            />
            <TableV2Body
              table={table}
              columns={columns}
              showLoading={isLoading}
              showMoreLoading={isMoreLoading}
              dragMode={dragMode}
              dataIds={dataIds}
              selectedRowId={selectedRowId}
              selectedOriginalCodes={selectedOriginalCodes}
              expandedChildrens={expandedChildrens}
              onRowClick={handleRowClick}
            />
          </NativeTable>
          <Waypoint onEnter={handleWaypointEnter}>
            <WaypointBox />
          </Waypoint>
        </TableContainer>
      </DndContext>
    </Wrapper>
  );
};

export default TableV2;

const Wrapper = styled.div<{ maxHeight?: string; overflow?: string }>`
  display: flex;
  flex-direction: column;
  height: ${({ maxHeight }) => (maxHeight ? maxHeight : "100%")};

  ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight};`}
  ${({ overflow }) => overflow && `overflow: ${overflow};`}
`;

const TableContainer = styled.div<{
  $width: string;
  $minWidth: string;
  $margin: string;
}>`
  position: relative;
  width: ${({ $width }) => $width};
  height: 100%;
  margin: ${({ $margin }) => $margin};
  overflow: auto;

  table {
    min-width: ${({ $minWidth }) => $minWidth};
    border-spacing: 0;
    border-collapse: separate;
  }
`;

const NativeTable = styled.table<{ $tableLayout?: string }>`
  width: 100%;
  ${({ $tableLayout }) => $tableLayout && `table-layout: ${$tableLayout};`}
`;

const TableTitle = styled.div`
  ${typography.Body1_300}
  margin-bottom: 10px;

  > span {
    margin-left: 5px;
    ${typography.Caption_200}
    color: ${({ theme }) =>
      Color(theme.palette.text.PrimaryText).alpha(0.6).toString()};

    > b {
      ${typography.Caption_300}
      color: ${({ theme }) => theme.palette.text.PrimaryText};
    }
  }
`;

const WaypointBox = styled.div`
  width: 100%;
  height: 10px;
`;
