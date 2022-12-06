import { UserData } from '../model/UserData';

type weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';

export function createUserDataFromRows(
  rows: any[] | undefined,
): UserData | undefined {
  const userData = rows?.pop();
  if (userData) {
    const numberOfArticles = userData.CNT_ARTICLES;
    const percentileNumberOfArticles = getPercentileOfReadArticles(numberOfArticles);
    const topDepartments = Object.entries(userData.RESSORTS)
      .sort((a, b) => {
        return (b[1] as number) - (a[1] as number);
      })
      .map((keyVal) => keyVal[0])
      .slice(0, 5);
    const topTopics = Object.entries(userData.TOPICS)
      .sort((a, b) => {
        return (b[1] as number) - (a[1] as number);
      })
      .map((keyVal) => keyVal[0])
      .slice(0, 10);
    const mostActiveWeekday = mapWeekday(
      Object.entries(userData.WEEKDAYS).sort((a, b) => {
        return (b[1] as number) - (a[1] as number);
      })[0][0] as unknown as weekday,
    );
    return {
      numberOfArticles,
      topTopics,
      topDepartments,
      mostActiveWeekday,
      percentileNumberOfArticles,
    };
  }
}

function mapWeekday(weekday: weekday) {
  switch (weekday) {
    case 'Mon':
      return 'Montag';
    case 'Tue':
      return 'Dienstag';
    case 'Wed':
      return 'Mittwoch';
    case 'Thu':
      return 'Donnerstag';
    case 'Fri':
      return 'Freitag';
    case 'Sat':
      return 'Samstag';
    case 'Sun':
      return 'Sonntag';
  }
}

function getPercentileOfReadArticles(numberOfArticles: number) {
  if(numberOfArticles <= 5) return 25;
  if(numberOfArticles <= 28) return 50;
  if(numberOfArticles <= 154 || numberOfArticles > 154) return 75;
  return 0;
}
