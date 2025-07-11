import { ColumnDef } from "@tanstack/react-table";
import Estimate from "./models/Estimate";
import ButtonV2 from "@/components/ButtonV2";

const myungsungSkashiEstimateColumns = ({
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
      header: () => <span>종류</span>,
      cell: (info) => info.getValue() || "-",
    },
    {
      accessorKey: "color",
      header: () => <span>색상</span>,
      cell: (info) => info.getValue() || "-",
    },
    {
      accessorKey: "size",
      header: () => <span>글자상세 높이</span>,
      cell: (info) => info.getValue() || "-",
      size: 250,
    },
    {
      accessorKey: "formattedLetterQuantity",
      header: () => <span>글자수</span>,
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
      header: () => <span>주문하실 글자</span>,
      cell: (info) => info.getValue() || "-",
      size: 200,
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

export default myungsungSkashiEstimateColumns;
