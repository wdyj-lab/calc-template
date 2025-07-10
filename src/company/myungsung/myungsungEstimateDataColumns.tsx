import ButtonV2 from "@/components/ButtonV2";
import { IconV2 } from "@/components/IconV2";
import { EstimateData } from "@/lib/firestore";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

const myungsungEstimateDataColumns = ({
  onConfirm,
}: {
  onConfirm: (item: EstimateData) => void;
}): ColumnDef<EstimateData>[] => {
  return [
    {
      id: "expander",
      cell: ({ row }) => {
        return (
          row.original.childEstimates !== undefined && (
            <IconV2
              name={row.getIsExpanded() ? "EXPAND_MORE" : "CHEVRON_RIGHT"}
              style={{ cursor: "pointer" }}
            />
          )
        );
      },
      size: 20,
    },
    {
      id: "action",
      header: () => <span>상태</span>,
      cell: (info) => {
        if (info.row.original.completed) {
          return <b style={{ color: "red" }}>마감</b>;
        } else {
          return (
            <ButtonV2
              size="sm"
              minWidth="60%"
              status="error"
              onClick={() => onConfirm(info.row.original)}
            >
              완료
            </ButtonV2>
          );
        }
      },
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
      accessorKey: "createdAt",
      header: () => <span>요청일시</span>,
      cell: (info) => {
        if (info.row.original.createdAt) {
          return format(
            new Date(info.row.original.createdAt.seconds * 1000),
            "yyyy-MM-dd HH:mm:ss"
          );
        }
      },
      size: 220,
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
    {
      accessorKey: "customerName",
      header: () => <span>수취인명</span>,
      cell: (info) => info.getValue() || "-",
    },
    {
      accessorKey: "customerPhone",
      header: () => <span>수취인 연락처</span>,
      cell: (info) => info.getValue() || "-",
    },
    {
      accessorKey: "customerEmail",
      header: () => <span>수취인 이메일</span>,
      cell: (info) => info.getValue() || "-",
    },
    {
      accessorKey: "customerRequest",
      header: () => <span>요청사항</span>,
      cell: (info) => info.getValue() || "-",
    },
  ];
};

export default myungsungEstimateDataColumns;
