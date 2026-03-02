// src/04-frameworks-and-drivers/ui/web/pages/dashboard/DashboardPage.tsx
/** @jsxImportSource @emotion/react */
import { useState, useEffect, useMemo } from 'react';
import { 
  Activity
} from 'lucide-react';
import { Box, Text, Icon, Avatar } from '@/04-frameworks-and-drivers/ui/web/00-design-system/00-atoms';
import { useAuth } from '@/04-frameworks-and-drivers/ui/web/02-app/hooks/user/useAuthorization';
import { useI18n } from '@/shared/i18n/useI18n';
import { AppContext } from '@/05-bootstrap/app-context';
import { type StudentListItem } from '@/02-usecases/students/ports/output/ListStudentsByBranch.output';
import { type ListBranchesOutput } from '@/02-usecases/branch/ports/output/ListBranches.output';
import { type ListOngoingClassesOutput } from '@/02-usecases/class/ports/output/ListOngoingClasses.output';
import { type ListTransactionsOutput } from '@/02-usecases/finance/ports/output/ListTransactions.output';
import { type UserOutput } from '@/02-usecases/users/ports/output/IUserOutput';

import { DashboardStatsGrid } from './components/DashboardStatsGrid';
import { DashboardCharts } from './components/DashboardCharts';
import { DashboardFilters } from './components/DashboardFilters';
import { DashboardOngoingClasses } from './components/DashboardOngoingClasses';
import { QuickActions } from './components/QuickActions';
import { RecentActivities, type ActivityItem } from './components/RecentActivities';

// --- Helper Functions for Data Calculation (moved from Interactor) ---
const getStartDateForTimeRange = (timeRange: 'week' | 'month' | 'year'): Date => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  switch (timeRange) {
    case 'week':
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Adjust so Monday is the first day
      return new Date(now.setDate(diff));
    case 'month':
      return new Date(now.getFullYear(), now.getMonth(), 1);
    case 'year':
      return new Date(now.getFullYear(), 0, 1);
    default:
      return new Date(now.getFullYear(), 0, 1);
  }
};

const getChartLabels = (timeRange: 'week' | 'month' | 'year', t: (key: string) => string): string[] => {
    switch (timeRange) {
        case 'week':
            return [t('common.days.mon'), t('common.days.tue'), t('common.days.wed'), t('common.days.thu'), t('common.days.fri'), t('common.days.sat'), t('common.days.sun')];
        case 'month':
            return [t('common.weeks.1'), t('common.weeks.2'), t('common.weeks.3'), t('common.weeks.4')];
        case 'year':
            return [t('common.months.jan'), t('common.months.feb'), t('common.months.mar'), t('common.months.apr'), t('common.months.may'), t('common.months.jun'), t('common.months.jul'), t('common.months.aug'), t('common.months.sep'), t('common.months.oct'), t('common.months.nov'), t('common.months.dec')];
    }
}

const groupRevenueByLabel = (
    transactions: any[],
    timeRange: 'week' | 'month' | 'year',
    t: (key: string) => string
): Array<{ name: string; value: number }> => {
    const labels = getChartLabels(timeRange, t);
    const dataMap = new Map<string, number>();
    labels.forEach(label => dataMap.set(label, 0));

    for (const trx of transactions) {
        const date = new Date(trx.date); // Transaction has 'date' field
        let key = '';

        switch (timeRange) {
            case 'year':
                key = labels[date.getMonth()];
                break;
            case 'month':
                const weekOfMonth = Math.ceil(date.getDate() / 7);
                key = labels[(weekOfMonth > 4 ? 4 : weekOfMonth) - 1];
                break;
            case 'week':
                const dayOfWeek = date.getDay(); // Sun: 0, Mon: 1, ...
                key = labels[dayOfWeek === 0 ? 6 : dayOfWeek - 1];
                break;
        }

        if (dataMap.has(key)) {
            dataMap.set(key, (dataMap.get(key) || 0) + (trx.amount || 0));
        }
    }

    return Array.from(dataMap.entries()).map(([name, value]) => ({ name, value }));
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

  // --- Filter States ---
  const [selectedBranchIds, setSelectedBranchIds] = useState<string[]>([]); // Empty array = All Branches
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('year');
  
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
        const [studentResult, branchResult, ongoingClassResult, financeResult] = await Promise.all([
          studentController.listStudentsByBranch({ branchId: '' }), // Assuming '' gets all
          branchController.listBranches({}),
          classController.listOngoingClasses(),
          financeController.listTransactions({})
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

    const startDate = getStartDateForTimeRange(timeRange);

    // --- Filter Transactions for Revenue Stats ---
    const filteredTransactions = allTransactions.filter(t => {
      const trxDate = new Date(t.date);
      const isInBranch = selectedBranchIds.length === 0 || selectedBranchIds.includes(t.branchId);
      const isInTimeRange = trxDate >= startDate;
      return isInBranch && isInTimeRange;
    });

    const incomeTransactions = filteredTransactions.filter(t => t.type === 'income');
    const expenseTransactions = filteredTransactions.filter(t => t.type === 'expense');

    // --- Calculate Stats ---
    const totalRevenue = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
    // Optional: Calculate Net Revenue (Income - Expense) if needed, but dashboard usually shows Total Revenue
    // const totalExpense = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    const totalSales = incomeTransactions.length; // Number of income transactions

    // --- Filter Students for Active Count (Still derived from Students) ---
    // We still use enrollments for "Total Subs" (Active Enrollments) as transactions don't represent active status
    const allEnrollments = allStudents.flatMap(s => s.enrollments || []).filter(e => e);
    const activeEnrollments = allEnrollments.filter(e => {
      const isInBranch = selectedBranchIds.length === 0 || selectedBranchIds.includes(e.branchId);
      return isInBranch && e.status === 'active';
    });
    const totalSubs = activeEnrollments.length;

    const activeStudentsCount = allStudents.filter(s => 
      s.status === 'active' &&
      (selectedBranchIds.length === 0 || s.enrollments.some(e => selectedBranchIds.includes(e.branchId) && e.status === 'active'))
    ).length;

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

    // --- Prepare Chart Data ---
    const revenueChartData = groupRevenueByLabel(incomeTransactions, timeRange, t);

    // --- Recent Activities Calculation ---
    const activities: ActivityItem[] = [];

    // 1. From Transactions
    allTransactions.forEach(trx => {
      activities.push({
        id: `trx-${trx.id}`,
        type: 'finance',
        title: trx.type === 'income' ? t('finance.income') : t('finance.expense'),
        description: `${trx.description || t('finance.new_transaction')} - ${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(trx.amount)}`,
        timestamp: new Date(trx.date)
      });
    });

    // 2. From Students (Joined Date)
    allStudents.forEach(s => {
       const joinedDate = s.enrollments?.[0]?.joinedDate;
       if (joinedDate) {
         activities.push({
           id: `stu-${s.id}`,
           type: 'student',
           title: t('dashboard.new_student'),
           description: t('dashboard.student_joined', { name: s.name }),
           timestamp: new Date(joinedDate)
         });
       }
    });

    // Sort by date desc and take top 5
    const recentActivities = activities
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 5);

    return {
      totalRevenue,
      totalSubs,
      totalSales,
      totalActive: activeStudentsCount,
      chartData: revenueChartData,
      revenueByTypeData,
      recentActivities,
      branches: allBranches,
      ongoingClasses: ongoingClasses.slice(0, 4) // Limit to 4
    };
  }, [allStudents, allBranches, ongoingClasses, allTransactions, selectedBranchIds, timeRange, t]);

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
      <DashboardFilters 
        branches={pageData?.branches || []}
        selectedBranchIds={selectedBranchIds}
        onToggleBranch={toggleBranch}
        onClearBranchSelection={() => setSelectedBranchIds([])}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
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
      <DashboardStatsGrid pageData={pageData} isLoading={isLoading} />

      {/* Main Content: Charts & Recent Activities */}
      <Box display="grid" sx={{ gridTemplateColumns: { base: '1fr', lg: '2fr 1fr' } }} gap="xl">
        {/* Left Column: Charts */}
        <DashboardCharts pageData={pageData} timeRange={timeRange} isLoading={isLoading} />

        {/* Right Column: Recent Activities */}
        <RecentActivities activities={pageData?.recentActivities || []} />
      </Box>

      {/* Ongoing Classes Section - Entry point for Attendance */}
      <DashboardOngoingClasses classes={pageData?.ongoingClasses || []} />
    </Box>
  );
};
