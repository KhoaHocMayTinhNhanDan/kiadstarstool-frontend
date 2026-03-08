// d:\DEV\learning\kiadstarstool-frontend\frontend\src\04-frameworks-and-drivers\ui\web\02-app\shared\utils\chartDataUtils.ts

export const getChartDateRange = (timeRange: 'today' | 'day' | 'week' | 'month' | 'year' | 'custom', offset: number = 0, customStart?: string, customEnd?: string): { start: Date, end: Date } => {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);

  if (timeRange === 'custom' && customStart && customEnd) {
    const s = new Date(customStart);
    s.setHours(0, 0, 0, 0);
    const e = new Date(customEnd);
    e.setHours(23, 59, 59, 999);
    return { start: s, end: e };
  }

  if (timeRange === 'today') {
    start.setDate(now.getDate() + offset);
    start.setHours(0, 0, 0, 0);
    end.setTime(start.getTime());
    end.setHours(23, 59, 59, 999);
  } else if (timeRange === 'day' || timeRange === 'week') {
    start.setMonth(now.getMonth() + offset, 1);
    start.setHours(0, 0, 0, 0);
    end.setTime(start.getTime());
    end.setMonth(start.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);
  } else if (timeRange === 'month') {
    start.setFullYear(now.getFullYear() + offset, 0, 1);
    start.setHours(0, 0, 0, 0);
    end.setTime(start.getTime());
    end.setFullYear(start.getFullYear(), 11, 31);
    end.setHours(23, 59, 59, 999);
  } else if (timeRange === 'year') {
    const currentYear = now.getFullYear();
    start.setFullYear(currentYear - 4 + (offset * 5), 0, 1);
    start.setHours(0, 0, 0, 0);
    end.setFullYear(start.getFullYear() + 4, 11, 31);
    end.setHours(23, 59, 59, 999);
  }
  return { start, end };
};

export const getStatsDateRange = (
  timeRange: 'today' | 'day' | 'week' | 'month' | 'year',
  offset: number = 0
): { start: Date; end: Date } => {

  const now = new Date()

  const start = new Date(now)
  const end = new Date(now)

  if (timeRange === 'today' || timeRange === 'day') {

    start.setDate(now.getDate() + offset)
    start.setHours(0,0,0,0)

    end.setDate(now.getDate() + offset)
    end.setHours(23,59,59,999)

  }

  if (timeRange === 'week') {

    const day = now.getDay()

    start.setDate(now.getDate() - day + offset * 7)
    start.setHours(0,0,0,0)

    end.setDate(start.getDate() + 6)
    end.setHours(23,59,59,999)

  }

  if (timeRange === 'month') {

    start.setMonth(now.getMonth() + offset, 1)
    start.setHours(0,0,0,0)

    end.setMonth(start.getMonth() + 1, 0)
    end.setHours(23,59,59,999)

  }

  if (timeRange === 'year') {

    start.setFullYear(now.getFullYear() + offset, 0, 1)
    start.setHours(0,0,0,0)

    end.setFullYear(start.getFullYear(), 11, 31)
    end.setHours(23,59,59,999)

  }

  return { start, end }

};

export const getChartLabels = (timeRange: 'today' | 'day' | 'week' | 'month' | 'year', t: (key: string) => string): string[] => {
  switch (timeRange) {
    case 'today': return Array.from({ length: 24 }, (_, i) => `${i}h`);
    case 'day': return Array.from({ length: 31 }, (_, i) => `${i + 1}`);
    case 'week': return [t('common.weeks.1'), t('common.weeks.2'), t('common.weeks.3'), t('common.weeks.4'), t('common.weeks.5')];
    case 'month': return [t('common.months.jan'), t('common.months.feb'), t('common.months.mar'), t('common.months.apr'), t('common.months.may'), t('common.months.jun'), t('common.months.jul'), t('common.months.aug'), t('common.months.sep'), t('common.months.oct'), t('common.months.nov'), t('common.months.dec')];
    case 'year': {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 5 }, (_, i) => (currentYear - 4 + i).toString());
    }
    default: return [];
  }
};

export const groupIncomeExpenseByLabel = (
  transactions: any[],
  timeRange: 'today' | 'day' | 'week' | 'month' | 'year',
  t: (key: string) => string
): Array<{ name: string; income: number; expense: number }> => {
  const labels = getChartLabels(timeRange, t);
  const dataMap = new Map<string, { income: number; expense: number }>();
  labels.forEach(label => dataMap.set(label, { income: 0, expense: 0 }));

  for (const trx of transactions) {
    const date = new Date(trx.date || trx.transactionDate); // Support both field names
    let key = '';

    switch (timeRange) {
      case 'today': key = `${date.getHours()}h`; break;
      case 'day': key = date.getDate().toString(); break;
      case 'week': {
        const weekOfMonth = Math.ceil(date.getDate() / 7);
        key = labels[(weekOfMonth > 5 ? 5 : weekOfMonth) - 1];
        break;
      }
      case 'month': key = labels[date.getMonth()]; break;
      case 'year': key = date.getFullYear().toString(); break;
    }

    if (dataMap.has(key)) {
      const current = dataMap.get(key)!;
      if (trx.type === 'income') current.income += (trx.amount || 0);
      if (trx.type === 'expense') current.expense += (trx.amount || 0);
      dataMap.set(key, current);
    }
  }

  return Array.from(dataMap.entries()).map(([name, val]) => ({ name, income: val.income, expense: val.expense }));
};

