// src/04-frameworks-and-drivers/ui/web/pages/dashboard/DashboardPage.tsx
/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo } from 'react';
import { 
  Activity
} from 'lucide-react';
import { Box, Text, Icon, Avatar, Card } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { useAuth } from '@/04-frameworks-and-drivers/ui/web/02-app/hooks/user/useAuth';
import { useI18n } from '@/shared/i18n/useI18n';
import { AppContext } from '@/05-bootstrap/app-context';
import { type StudentListItem } from '@/02-usecases/students/ports/output/ListStudentsByBranch.output';
import { type ListBranchesOutput } from '@/02-usecases/branch/ports/output/ListBranches.output';
import { type ListOngoingClassesOutput } from '@/02-usecases/class/ports/output/ListOngoingClasses.output';
import { type ListTransactionsOutput } from '@/02-usecases/finance/ports/output/ListTransactions.output';
import { type UserOutput } from '@/02-usecases/users/ports/output/IUserOutput';

import { DashboardStatsGrid } from './components/DashboardStatsGrid';
import { DashboardOngoingClasses } from './components/DashboardOngoingClasses';
import { QuickActions } from './components/QuickActions';
import { RecentActivities, type ActivityItem } from './components/RecentActivities';
import { IncomeExpenseChart } from '../finance/components/IncomeExpenseChart';
import { BranchRevenueChart } from '../finance/components/BranchRevenueChart';
import { FilterBar } from '../../share-page-or-components/components/FilterBar';
import { getChartDateRange, groupIncomeExpenseByLabel } from '../../../../../../shared/utils/chartDataUtils';

// --- Local Helper to ensure correct Stats Date Range ---
const getStatsDateRangeLocal = (
  timeRange: 'today' | 'day' | 'week' | 'month' | 'year',
  offset: number = 0
): { start: Date; end: Date } => {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);

  if (timeRange === 'today' || timeRange === 'day') {
    start.setDate(now.getDate() + offset);
    start.setHours(0, 0, 0, 0);
    end.setTime(start.getTime());
    end.setHours(23, 59, 59, 999);
  } else if (timeRange === 'week') {
    const day = now.getDay();
    // Adjust to start of week (Monday)
    const diff = now.getDate() - day + (day === 0 ? -6 : 1) + (offset * 7);
    start.setDate(diff);
    start.setHours(0, 0, 0, 0);
    
    end.setTime(start.getTime());
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
  } else if (timeRange === 'month') {
    start.setMonth(now.getMonth() + offset, 1);
    start.setHours(0, 0, 0, 0);
    
    end.setTime(start.getTime());
    end.setMonth(start.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);
  } else if (timeRange === 'year') {
    start.setFullYear(now.getFullYear() + offset, 0, 1);
    start.setHours(0, 0, 0, 0);
    
    end.setTime(start.getTime());
    end.setFullYear(start.getFullYear(), 11, 31);
    end.setHours(23, 59, 59, 999);
  }

  return { start, end };
};

export const DashboardPage = () => {
  const { t } = useI18n();
  const { user } = useAuth();

  // --- States for raw data from different sources ---
  const [allStudents, setAllStudents] = useState<StudentListItem[]>([]);
  const [allBranches, setAllBranches] = useState<ListBranchesOutput>([]);
  const [ongoingClasses, setOngoingClasses] = useState<ListOngoingClassesOutput>([]);
  const [allTransactions, setAllTransactions] = useState<ListTransactionsOutput>([]);
  const [userProfile, setUserProfile] = useState<UserOutput | null>(null);
  const [totalStudentsCount, setTotalStudentsCount] = useState<number>(0);

  // --- Filter States ---
  const [selectedBranchIds, setSelectedBranchIds] = useState<string[]>([]); // Empty array = All Branches
  const [timeRange, setTimeRange] = useState<'today' | 'day' | 'week' | 'month' | 'year' | 'custom'>('month'); // Default to Month view for better data visibility
  
  const todayStr = new Date().toISOString().split('T')[0];
  const [customStartDate, setCustomStartDate] = useState(todayStr);
  const [customEndDate, setCustomEndDate] = useState(todayStr);
  
  // --- UI States ---
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all necessary data on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const studentController = AppContext.getStudentsController();
        const branchController = AppContext.getBranchController();
        const classController = AppContext.getClassesController();
        const financeController = AppContext.getFinanceController();

        // Fetch all data in parallel
        const [studentResult, branchResult, ongoingClassResult, financeResult, countResult] = await Promise.all([
          studentController.listStudentsByBranch({ branchId: '' }), // Assuming '' gets all
          branchController.listBranches({}),
          classController.listOngoingClasses(),
          financeController.listTransactions({}),
          // Sử dụng Aggregation Query để lấy tổng số học viên chính xác
          studentController.countStudents()
        ]);

        if (studentResult.isSuccess) {
          // The interactor/repository layer is returning DTOs, which is not ideal but the UI can handle it.
          // The previous mapping logic was incorrect as it treated DTOs as Entities, causing a runtime error.
          // We now accept the DTOs directly into the state.
          setAllStudents(studentResult.getValue());
        } else {
          throw new Error(studentResult.getErrorValue() as string);
        }

        if (branchResult.isSuccess) {
          setAllBranches(branchResult.getValue());
        } else {
          throw new Error(branchResult.getErrorValue() as string);
        }

        if (ongoingClassResult.isSuccess) {
          setOngoingClasses(ongoingClassResult.getValue());
        } else {
          throw new Error(ongoingClassResult.getErrorValue() as string);
        }

        if (financeResult.isSuccess) {
          setAllTransactions(financeResult.getValue());
        } else {
          // Don't throw here, just log, so dashboard still loads if finance fails
          console.error('Failed to load transactions:', financeResult.getErrorValue());
        }

        if (countResult.isSuccess) {
          setTotalStudentsCount(countResult.getValue());
        }
      } catch (e: any) {
        setError(e.message || "Đã có lỗi không xác định xảy ra khi tải dữ liệu.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []); // Fetch only once on mount

  // Fetch User Profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.id) {
        try {
          const usersController = AppContext.getUsersController();
          const result = await usersController.getUser({ userId: user.id });
          if (result.isSuccess) {
            setUserProfile(result.getValue());
          }
        } catch (e) {
          console.error('Failed to fetch user profile', e);
        }
      }
    };
    fetchUserProfile();
  }, [user]);

  // --- Derived Data Calculation using useMemo ---
  const pageData = useMemo(() => {
    if (allStudents.length === 0 || allBranches.length === 0) {
      return null;
    }

    // Range cho Stats (Thẻ thống kê)
    let statsCurrentRange: { start: Date, end: Date };
    let statsPreviousRange: { start: Date, end: Date };
    // Range cho Chart (Biểu đồ)
    let chartRange: { start: Date, end: Date };
    let customDayCount = 0;

    if (timeRange === 'custom') {
      const start = new Date(customStartDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(customEndDate);
      end.setHours(23, 59, 59, 999);
      
      // Với Custom, Stats và Chart dùng chung range
      statsCurrentRange = { start, end };
      chartRange = { start, end };
      
      // FIX: Tính toán kỳ trước cho Custom Range (x ngày so với x ngày trước đó)
      const duration = end.getTime() - start.getTime();
      const prevEnd = new Date(start.getTime() - 1); // Kết thúc ngay trước khi kỳ hiện tại bắt đầu
      const prevStart = new Date(prevEnd.getTime() - duration);
      statsPreviousRange = { start: prevStart, end: prevEnd };
      customDayCount = Math.ceil(duration / (1000 * 60 * 60 * 24));
    } else {
      // Stats dùng getStatsDateRangeLocal (Lấy đúng ngày/tuần/tháng hiện tại)
      statsCurrentRange = getStatsDateRangeLocal(timeRange as any, 0);
      statsPreviousRange = getStatsDateRangeLocal(timeRange as any, -1);
      // Chart dùng getChartDateRange (Lấy range rộng hơn để vẽ biểu đồ drill-down)
      chartRange = getChartDateRange(timeRange, 0, customStartDate, customEndDate);
    }

    // --- Filter Transactions for Revenue Stats ---
    const filterTransactions = (range: { start: Date, end: Date }) => allTransactions.filter(t => {
      // FIX: Check for both 'date' and 'transactionDate' properties to ensure compatibility with DTO
      const dateVal = t.date || (t as any).transactionDate;
      const trxDate = new Date(dateVal);
      const isInBranch = selectedBranchIds.length === 0 || selectedBranchIds.includes(t.branchId);
      const isInTimeRange = trxDate >= range.start && trxDate <= range.end;
      return isInBranch && isInTimeRange;
    });

    // Dữ liệu cho Stats
    const currentStatsTransactions = filterTransactions(statsCurrentRange);
    const previousStatsTransactions = filterTransactions(statsPreviousRange);
    // Dữ liệu cho Chart
    const currentChartTransactions = filterTransactions(chartRange);

    // Tính toán KPI tổng quan
    const currentIncome = currentStatsTransactions.filter(t => t.type === 'income');
    const previousIncome = previousStatsTransactions.filter(t => t.type === 'income');

    // --- Calculate Stats ---
    const totalRevenue = currentIncome.reduce((sum, t) => sum + t.amount, 0);
    const previousTotalRevenue = previousIncome.reduce((sum, t) => sum + t.amount, 0);
    const revenueTrend = previousTotalRevenue === 0 ? (totalRevenue > 0 ? 100 : 0) : ((totalRevenue - previousTotalRevenue) / previousTotalRevenue) * 100;
    
    const totalSales = currentIncome.length; // Number of income transactions
    const previousTotalSales = previousIncome.length;
    const salesTrend = previousTotalSales === 0 ? (totalSales > 0 ? 100 : 0) : ((totalSales - previousTotalSales) / previousTotalSales) * 100;

    // --- Filter Students/Enrollments ---
    const allEnrollments = allStudents.flatMap(s => s.enrollments || []).filter(e => e);
    
    // FIX: Đếm số lượng Học viên mới (New Students) thay vì đếm lượt ghi danh (Enrollments) để tránh trùng lặp
    const newStudentsCurrent = allStudents.filter(s => {
      const joinedDate = new Date(s.joinedDate);
      const isInBranch = selectedBranchIds.length === 0 || s.enrollments.some(e => selectedBranchIds.includes(e.branchId));
      return isInBranch && joinedDate >= statsCurrentRange.start && joinedDate <= statsCurrentRange.end;
    });
    
    const newStudentsPrevious = allStudents.filter(s => {
      const joinedDate = new Date(s.joinedDate);
      const isInBranch = selectedBranchIds.length === 0 || s.enrollments.some(e => selectedBranchIds.includes(e.branchId));
      return isInBranch && joinedDate >= statsPreviousRange.start && joinedDate <= statsPreviousRange.end;
    });

    const totalSubs = newStudentsCurrent.length;
    const previousTotalSubs = newStudentsPrevious.length;
    const subsTrend = previousTotalSubs === 0 ? (totalSubs > 0 ? 100 : 0) : ((totalSubs - previousTotalSubs) / previousTotalSubs) * 100;

    // OPTIMIZATION: Sử dụng totalStudentsCount từ Aggregation Query nếu không lọc theo chi nhánh
    // Nếu có lọc theo chi nhánh, ta vẫn dùng dữ liệu aggregate từ Branch Entity (studentCount)
    const activeStudentsCount = selectedBranchIds.length === 0 
      ? totalStudentsCount 
      : allBranches
          .filter(b => selectedBranchIds.includes(b.id))
          .reduce((sum, b) => sum + (b.studentCount || 0), 0);

    // --- NEW: Revenue by Type Calculation ---
    // Since Transaction entity doesn't strictly separate Course vs Session fee yet (it's in description),
    // we will fallback to using Paid Enrollments for this specific chart to keep the breakdown logic working.
    // Ideally, we would tag transactions with a subtype.
    const paidEnrollments = allEnrollments.filter(e => 
      e.paymentStatus === 'paid' && 
      (selectedBranchIds.length === 0 || selectedBranchIds.includes(e.branchId))
    );
    let courseRevenue = 0;
    let sessionRevenue = 0;
    for (const enrollment of paidEnrollments) {
        if (enrollment.prepaidSessions && enrollment.prepaidSessions > 0) {
            sessionRevenue += enrollment.tuitionAmount || 0;
        } else {
            courseRevenue += enrollment.tuitionAmount || 0;
        }
    }
    const revenueByTypeData = [
        { name: t('dashboard.revenue_type_course'), value: courseRevenue },
        { name: t('dashboard.revenue_type_session'), value: sessionRevenue },
    ];

    // Xác định chế độ gom nhóm cho biểu đồ
    let chartGroupingMode: 'today' | 'day' | 'week' | 'month' | 'year' = timeRange as any;
    if (timeRange === 'custom') {
        const diffDays = (chartRange.end.getTime() - chartRange.start.getTime()) / (1000 * 3600 * 24);
        if (diffDays <= 2) chartGroupingMode = 'today';
        else if (diffDays <= 31) chartGroupingMode = 'day';
        else if (diffDays <= 90) chartGroupingMode = 'week';
        else if (diffDays <= 730) chartGroupingMode = 'month';
        else chartGroupingMode = 'year';
    }


    // --- Prepare Chart Data (Thu & Chi) ---
    const incomeExpenseChartData = groupIncomeExpenseByLabel(currentChartTransactions, chartGroupingMode, t);

    // --- Recent Activities Calculation ---
    const activities: ActivityItem[] = [];

    // 1. From Transactions
    allTransactions.forEach(trx => {
      const dateVal = trx.date || (trx as any).transactionDate;
      if (dateVal) {
        activities.push({
          id: `trx-${trx.id}`,
          type: 'finance',
          titleKey: trx.type === 'income' ? 'finance.income' : 'finance.expense',
          // Pass raw description and amount separately for i18n formatting in the component
          descriptionContext: trx.description || '',
          params: { amount: trx.amount },
          timestamp: new Date(dateVal)
        });
      }
    });

    // 2. From Students (Joined Date)
    allStudents.forEach(s => {
       const joinedDate = s.enrollments?.[0]?.joinedDate;
       if (joinedDate) {
         activities.push({
           id: `stu-${s.id}`,
           type: 'student',
           titleKey: 'dashboard.new_student',
           descriptionKey: 'dashboard.student_joined',
           params: { name: s.name },
           timestamp: new Date(joinedDate)
         });
       }
    });

    // Sort by date desc and take top 5
    const recentActivities = activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 5);

    // --- Map Ongoing Classes to UI format ---
    const mappedOngoingClasses = ongoingClasses.map((cls: any) => ({
      ...cls,
      students: cls.currentStudents ?? cls.students ?? 0,
      time: cls.schedule ?? cls.time ?? 'N/A'
    }));

    return {
      totalRevenue,
      revenueTrend,
      totalSubs,
      subsTrend,
      totalSales,
      salesTrend,
      totalActive: activeStudentsCount,
      chartData: incomeExpenseChartData,
      revenueByTypeData,
      recentActivities,
      branches: allBranches,
      ongoingClasses: mappedOngoingClasses.slice(0, 4), // Limit to 4
      currentTransactions: currentStatsTransactions, // Biểu đồ tròn dùng dữ liệu Stats (chính xác theo thời gian chọn)
      customDayCount // Số ngày tùy chỉnh để hiển thị label
    };
  }, [allStudents, allBranches, ongoingClasses, allTransactions, selectedBranchIds, timeRange, t, totalStudentsCount]);

  const toggleBranch = (branchId: string) => {
    setSelectedBranchIds(prev => {
      if (prev.includes(branchId)) {
        return prev.filter(id => id !== branchId);
      } else {
        return [...prev, branchId];
      }
    });
  };

  const welcomeMessage = userProfile?.displayName 
    ? t('common.welcome_back', { name: userProfile.displayName }) 
    : (user?.email ? t('common.welcome_back', { name: user.email }) : t('dashboard.title'));


  return (
    <Box display="flex" flexDirection="column" gap="xl">
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <Box display="flex" alignItems="center" gap="md">
          <Avatar 
            src={userProfile?.photoURL} 
            alt={userProfile?.displayName || user?.email || 'User'} 
            size="xl" 
            fallback={userProfile?.displayName?.[0] || user?.email?.[0] || 'U'}
          />
          <Box>
            <Text as="h1" variant="heading-xl" weight="bold">{welcomeMessage}</Text>
            <Text color="SECONDARY">{t('dashboard.subtitle')}</Text>
          </Box>
        </Box>
        
        {/* Quick Actions */}
        <Box display={{ base: 'none', md: 'flex' }}>
          <QuickActions />
        </Box>
      </Box>

      {/* Filters Section */}
      <FilterBar 
        branches={pageData?.branches || []}
        selectedBranchIds={selectedBranchIds}
        onToggleBranch={toggleBranch}
        onClearBranchSelection={() => setSelectedBranchIds([])}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        customStartDate={customStartDate}
        onCustomStartDateChange={setCustomStartDate}
        customEndDate={customEndDate}
        onCustomEndDateChange={setCustomEndDate}
      />

      {/* Error State */}
      {error && !isLoading && (
        <Box p="lg" bg="DANGER_LIGHT" radius="md" border="1px solid" sx={{ borderColor: 'DANGER' }} display="flex" alignItems="center" gap="md">
          <Icon color="DANGER"><Activity /></Icon>
          <Box>
            <Text color="DANGER" weight="bold">{t('dashboard.error_loading_title')}</Text>
            <Text color="DANGER" size="sm">{error}</Text>
          </Box>
        </Box>
      )}

      {/* Stats Grid */}
      <DashboardStatsGrid 
        pageData={pageData} 
        isLoading={isLoading} 
        timeRange={timeRange} 
        customDayCount={pageData?.customDayCount}
      />

      {/* Main Content: Charts & Recent Activities */}
      <Box display="grid" sx={{ gridTemplateColumns: { base: '1fr', lg: '2fr 1fr' } }} gap="xl">
        {/* Left Column: Charts */}
        {/* <DashboardCharts pageData={pageData} timeRange={timeRange} isLoading={isLoading} /> */}
        <Box
          sx={{
            display: "grid",
            gap: "24px",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", // Tự động xuống dòng nếu màn hình nhỏ
            alignItems: "stretch"
          }}
        >
          <Card sx={{ p: 'lg', height: 420 }}>
            <Text variant="heading-md" mb="md">
              Thu / Chi
            </Text>
            <Box sx={{ width: "100%", height: "340px" }}>
              <IncomeExpenseChart data={pageData?.chartData} />
            </Box>
          </Card>

          <Card sx={{ p: 'lg', height: 420 }}>
            <Text variant="heading-md" mb="md">
              Tỷ trọng doanh thu theo Chi nhánh
            </Text>
            <Box sx={{ width: "100%", height: "340px" }}>
              <BranchRevenueChart transactions={pageData?.currentTransactions || []} branches={allBranches} />
            </Box>
          </Card>
        </Box>

        {/* Right Column: Recent Activities */}
        <RecentActivities activities={pageData?.recentActivities || []} />
      </Box>

      {/* Ongoing Classes Section - Entry point for Attendance */}
      <DashboardOngoingClasses classes={pageData?.ongoingClasses || []} />
    </Box>
  );
};
