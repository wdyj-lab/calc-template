import { EstimateData } from "@/lib/firestore";
import { ColumnDef } from "@tanstack/react-table";

const myungsungEstimateChildDataColumns = (): ColumnDef<EstimateData>[] => {
  return [
    {
      id: "#",
      header: () => <span>#</span>,
      cell: (info) => info.row.index + 1,
      size: 30,
    },
    {
      accessorKey: "type",
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
      accessorKey: "quantity",
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
      accessorKey: "price",
      header: () => <span>금액</span>,
      cell: (info) => {
        if (info.row.original.price) {
          return <>{info.row.original.price.toLocaleString()}원</>;
        } else {
          return "0원";
        }
      },
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
      accessorKey: "postProcessingPrice",
      header: () => <span>가공금액</span>,
      cell: (info) => {
        if (info.row.original.postProcessingPrice) {
          return (
            <>{info.row.original.postProcessingPrice.toLocaleString()}원</>
          );
        } else {
          return "0원";
        }
      },
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
      accessorKey: "totalPrice",
      header: () => <span>총 금액</span>,
      cell: (info) => {
        if (info.row.original.totalPrice) {
          return <>{info.row.original.totalPrice.toLocaleString()}원</>;
        } else {
          return "0원";
        }
      },
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

export default myungsungEstimateChildDataColumns;
