import myungsungEstimateChildDataColumns from "@/company/myungsung/myungsungEstimateChildDataColumns";
import myungsungEstimateDataColumns from "@/company/myungsung/myungsungEstimateDataColumns";
import ButtonV2 from "@/components/ButtonV2";
import CheckboxV2 from "@/components/CheckboxV2";
import { TableV2 } from "@/components/TableV2";
import { EstimateData, firestoreService } from "@/lib/firestore";
import { set } from "date-fns";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

export default function MyungsungAdminPage() {
  const [completed, setCompleted] = useState(false);
  const [estimates, setEstimates] = useState<EstimateData[]>([]);

  useEffect(() => {
    const { getAll } = firestoreService.estimates;

    getAll().then((estimates) => {
      setEstimates(estimates);
    });
  }, []);

  useEffect(() => {
    const { getAll } = firestoreService.estimates;

    getAll(completed).then((estimates) => {
      setEstimates(estimates);
    });
  }, [completed]);

  const refetchData = () => {
    const { getAll } = firestoreService.estimates;

    getAll().then((estimates) => {
      setEstimates(estimates);
    });
  };

  const renderChildEstimates = useMemo(() => {
    return estimates.map((child) => {
      return (
        <ExpandedWrapper key={child.id}>
          <TableV2
            columns={myungsungEstimateChildDataColumns()}
            data={child.childEstimates ?? []}
            options={{
              width: "100%",
              minWidth: "100%",
              resize: true,
            }}
          />
        </ExpandedWrapper>
      );
    });
  }, [estimates]);

  return (
    <>
      <Head>
        <title>명성아크릴 견적 관리</title>
      </Head>
      <Layout>
        <ControlBox>
          <CheckboxV2
            label="전체 데이터 보기"
            checked={completed}
            onChange={(value) => setCompleted(value)}
            tab={false}
          />
        </ControlBox>
        <TableWrapper>
          <TableV2
            columns={myungsungEstimateDataColumns({
              onConfirm: (item) => {
                firestoreService.estimates.complete(item.id!, item);
                refetchData();
              },
            })}
            expandedChildrens={renderChildEstimates}
            onRowExpand={(row) => row.original.childEstimates !== undefined}
            onRowClick={(_, row) => row.getCanExpand() && row.toggleExpanded()}
            data={estimates}
            options={{
              width: "100%",
              minWidth: "1800px",
              resize: true,
            }}
          />
        </TableWrapper>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  width: 100%;
  height: 100vh;
`;

const ControlBox = styled.div`
  width: 100%;
  height: 80px;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const TableWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
`;

const ExpandedWrapper = styled.div`
  width: 100%;
  background-color: white;
  border: 1px solid #e0e0e0;
`;
