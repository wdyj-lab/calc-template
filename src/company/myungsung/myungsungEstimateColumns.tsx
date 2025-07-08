import { ColumnDef } from "@tanstack/react-table";
import Estimate from "./models/Estimate";
import ButtonV2 from "@/components/ButtonV2";

const myungsungEstimateColumns = ({
  onDelete,
}: {
  onDelete: (item: Estimate) => void;
}): ColumnDef<Estimate>[] => {
  return [
    {
      id: "action",
      header: () => <span>삭제</span>,
      cell: (info) => (
        <ButtonV2
          size="sm"
          minWidth="60%"
          status="error"
          onClick={() => onDelete(info.row.original)}
        >
          삭제
        </ButtonV2>
      ),
      meta: {
        columnStyle: {
          textAlign: "center",
        },
        cellStyle: {
          textAlign: "center",
        },
      },
      size: 80,
    },
    {
      accessorKey: "formattedName",
      header: () => <span>제품명</span>,
      cell: (info) => info.getValue() || "-",
    },
    {
      accessorKey: "color",
      header: () => <span>색상</span>,
      cell: (info) => info.getValue() || "-",
    },
    {
      accessorKey: "size",
      header: () => <span>주문크기</span>,
      cell: (info) => info.getValue() || "-",
      size: 250,
    },
    {
      accessorKey: "formattedQuantity",
      header: () => <span>수량</span>,
      cell: (info) => info.getValue() || "-",
      meta: {
        columnStyle: {
          textAlign: "right",
        },
        cellStyle: {
          textAlign: "right",
        },
      },
    },
    {
      accessorKey: "formattedPrice",
      header: () => <span>금액</span>,
      cell: (info) => info.getValue() || "-",
      meta: {
        columnStyle: {
          textAlign: "right",
        },
        cellStyle: {
          textAlign: "right",
        },
      },
    },
    {
      accessorKey: "postProcessing",
      header: () => <span>가공옵션</span>,
      cell: (info) => info.getValue() || "-",
      size: 200,
    },
    {
      accessorKey: "formattedPostProcessingPrice",
      header: () => <span>가공금액</span>,
      cell: (info) => info.getValue() || "0원",
      meta: {
        columnStyle: {
          textAlign: "right",
        },
        cellStyle: {
          textAlign: "right",
        },
      },
    },
    {
      accessorKey: "formattedTotalPrice",
      header: () => <span>총 금액</span>,
      cell: (info) => info.getValue() || "0원",
      meta: {
        columnStyle: {
          textAlign: "right",
        },
        cellStyle: {
          textAlign: "right",
        },
      },
    },
  ];
};

export default myungsungEstimateColumns;
