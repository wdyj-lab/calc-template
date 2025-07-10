import myungsungEstimateChildDataColumns from "@/company/myungsung/myungsungEstimateChildDataColumns";
import myungsungEstimateDataColumns from "@/company/myungsung/myungsungEstimateDataColumns";
import CheckboxV2 from "@/components/CheckboxV2";
import DropdownV2 from "@/components/DropdownV2";
import { TableV2 } from "@/components/TableV2";
import TextInputV2 from "@/components/TextInputV2";
import ButtonV2 from "@/components/ButtonV2";
import { EstimateData, firestoreService } from "@/lib/firestore";
import { StringLabelOption } from "@/types/Option";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

export default function MyungsungAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // 컴포넌트 마운트 시 세션에서 인증 상태 확인
  useEffect(() => {
    const isSessionAuthenticated = sessionStorage.getItem('myungsung_admin_auth') === 'true';
    if (isSessionAuthenticated) {
      setIsAuthenticated(true);
    }
  }, []);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");

  const [completed, setCompleted] = useState(false);
  const [estimates, setEstimates] = useState<EstimateData[]>([]);
  const [allEstimates, setAllEstimates] = useState<EstimateData[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>(currentYear);
  const [selectedMonth, setSelectedMonth] = useState<string>(currentMonth);

  const handlePasswordSubmit = () => {
    const correctPassword = `${process.env.NEXT_PUBLIC_ADMIN_PASSWORD}`; // 비밀번호를 원하는 4자리로 변경

    if (password === correctPassword) {
      // 세션스토리지에 인증 상태 저장
      sessionStorage.setItem('myungsung_admin_auth', 'true');
      setIsAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("잘못된 비밀번호입니다.");
      setPassword("");
    }
  };

  const handlePasswordKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePasswordSubmit();
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('myungsung_admin_auth');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const { getAll } = firestoreService.estimates;

    getAll().then((estimates) => {
      setAllEstimates(estimates);
      setEstimates(estimates);
    });
  }, []);

  useEffect(() => {
    const { getAll } = firestoreService.estimates;

    getAll(completed).then((estimates) => {
      setAllEstimates(estimates);
      filterEstimates(estimates, selectedYear, selectedMonth);
    });
  }, [completed, selectedMonth, selectedYear]);

  useEffect(() => {
    filterEstimates(allEstimates, selectedYear, selectedMonth);
  }, [selectedYear, selectedMonth, allEstimates]);

  const filterEstimates = (
    data: EstimateData[],
    year: string,
    month: string
  ) => {
    let filtered = data;

    if (year) {
      filtered = filtered.filter((estimate) => {
        if (!estimate.createdAt) return false;
        try {
          const createdDate = estimate.createdAt.toDate
            ? estimate.createdAt.toDate()
            : new Date(estimate.createdAt as any);
          const createdYear = createdDate.getFullYear().toString();
          return createdYear === year;
        } catch (error) {
          return false;
        }
      });
    }

    if (month) {
      filtered = filtered.filter((estimate) => {
        if (!estimate.createdAt) return false;
        try {
          const createdDate = estimate.createdAt.toDate
            ? estimate.createdAt.toDate()
            : new Date(estimate.createdAt as any);
          const createdMonth = (createdDate.getMonth() + 1)
            .toString()
            .padStart(2, "0");
          return createdMonth === month;
        } catch (error) {
          return false;
        }
      });
    }

    setEstimates(filtered);
  };

  const refetchData = () => {
    const { getAll } = firestoreService.estimates;

    getAll().then((estimates) => {
      setAllEstimates(estimates);
      filterEstimates(estimates, selectedYear, selectedMonth);
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

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>명성아크릴 견적 관리 - 로그인</title>
        </Head>
        <LoginLayout>
          <LoginBox>
            <LoginTitle>관리자 로그인</LoginTitle>
            <LoginForm>
              <TextInputV2
                type="password"
                placeholder="비밀번호를 입력하세요."
                value={password}
                onChange={(value) => setPassword(value)}
                onKeyDown={handlePasswordKeyDown}
                width="200px"
                autoFocus
                hintType={passwordError ? "negative" : "positive"}
                hintText={passwordError}
              />
              <ButtonV2
                onClick={handlePasswordSubmit}
                status="primary"
                size="md"
              >
                확인
              </ButtonV2>
            </LoginForm>
          </LoginBox>
        </LoginLayout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>명성아크릴 견적 관리</title>
      </Head>
      <Layout>
        <ControlBox>
          <DatePicker
            selectedYear={selectedYear}
            selectedMonth={selectedMonth}
            onYearChange={setSelectedYear}
            onMonthChange={setSelectedMonth}
          />
          <CheckboxV2
            label="전체 데이터 보기"
            checked={completed}
            onChange={(value) => setCompleted(value)}
            tab={false}
          />
          <ButtonV2
            onClick={handleLogout}
            status="secondary"
            size="sm"
            style={{ marginLeft: "auto" }}
          >
            로그아웃
          </ButtonV2>
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

interface DatePickerProps {
  selectedYear: string;
  selectedMonth: string;
  onYearChange: (year: string) => void;
  onMonthChange: (month: string) => void;
}

function DatePicker({
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange,
}: DatePickerProps) {
  const yearOptions: StringLabelOption[] = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return [
      { key: "all", value: "", label: "전체" },
      ...Array.from({ length: 10 }, (_, i) => ({
        key: i.toString(),
        value: (currentYear + i).toString(),
        label: `${(currentYear + i).toString()}년`,
      })),
    ];
  }, []);

  const monthOptions: StringLabelOption[] = useMemo(() => {
    return [
      { key: "all", value: "", label: "전체" },
      ...Array.from({ length: 12 }, (_, i) => ({
        key: i.toString(),
        value: (i + 1).toString().padStart(2, "0"),
        label: `${i + 1}월`,
      })),
    ];
  }, []);

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <DropdownV2
        options={yearOptions}
        placeholder="연도"
        value={selectedYear}
        onChange={onYearChange}
      />
      <DropdownV2
        options={monthOptions}
        placeholder="월"
        value={selectedMonth}
        onChange={onMonthChange}
      />
    </div>
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
  gap: 16px;
  z-index: 9999;
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

const LoginLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

const LoginBox = styled.div`
  background: white;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  min-width: 300px;
`;

const LoginTitle = styled.h2`
  margin: 0;
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;
