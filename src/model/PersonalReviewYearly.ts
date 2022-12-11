import { QueryResult } from '../snowflake/Snowflake';
import {
  CustomApplicationError,
  ErrorCode,
} from '../error/CustomApplicationError';

const countArticlesKey: string = 'CNT_ARTICLES';
const ressortsKey: string = 'RESSORTS';
const topicsKey: string = 'TOPICS';
const weekdaysKey: string = 'WEEKDAYS';

type weekdayGER =
  | 'Montag'
  | 'Dienstag'
  | 'Mittwoch'
  | 'Donnerstag'
  | 'Freitag'
  | 'Samstag'
  | 'Sonntag';

type weekdayAbbreviationEN =
  | 'Mon'
  | 'Tue'
  | 'Wed'
  | 'Thu'
  | 'Fri'
  | 'Sat'
  | 'Sun';

class PersonalReviewYearly {
  numberOfArticles: number;
  topDepartments: string[];
  mostActiveWeekday: weekdayGER;
  topTopics: string[];
  percentileNumberOfArticles: number;

  constructor(
    numberOfArticles: number,
    topDepartments: string[],
    mostActiveWeekday: weekdayGER,
    topTopics: string[],
    percentileNumberOfArticles: number,
  ) {
    this.numberOfArticles = numberOfArticles;
    this.topDepartments = topDepartments;
    this.mostActiveWeekday = mostActiveWeekday;
    this.topTopics = topTopics;
    this.percentileNumberOfArticles = percentileNumberOfArticles;
  }
}

export function createFromQueryResult(
  queryResult: QueryResult,
): PersonalReviewYearly {
  const rawPersonalReviewData = queryResult.rows?.pop();
  if (rawPersonalReviewData) {
    return parseRawPersonalReviewData(rawPersonalReviewData);
  }
  throw new CustomApplicationError(ErrorCode.EmptyQueryResult);
}

function parseRawPersonalReviewData(rawPersonalReviewData: any) {
  const numberOfArticles = getNumberOfArticles(rawPersonalReviewData);
  return new PersonalReviewYearly(
    numberOfArticles,
    getTopXDepartments(rawPersonalReviewData, 5),
    getMostActiveWeekday(rawPersonalReviewData),
    getTopXTopics(rawPersonalReviewData, 10),
    getPercentileOfReadArticles(numberOfArticles),
  );
}

function getNumberOfArticles(rawPersonalReviewData: any): number {
  return rawPersonalReviewData[countArticlesKey];
}

function getPercentileOfReadArticles(numberOfArticles: number) {
  if (numberOfArticles <= 5) return 25;
  if (numberOfArticles <= 28) return 50;
  if (numberOfArticles <= 154 || numberOfArticles > 154) return 75;
  return 0;
}

function getMostActiveWeekday(rawPersonalReviewData: any) {
  const weekdaysAndActivity = rawPersonalReviewData[weekdaysKey];
  const entries = Object.entries(weekdaysAndActivity);
  if (entries.length) {
    const maxWeekdayAndActivity: [string, number] = entries.sort(
      (weekdayAndActivityA, weekdayAndActivityB) => {
        return (
          (weekdayAndActivityB[1] as number) -
          (weekdayAndActivityA[1] as number)
        );
      },
    )[0] as unknown as [string, number];
    return mapWeekday(maxWeekdayAndActivity[0] as weekdayAbbreviationEN);
  }
  throw new CustomApplicationError(ErrorCode.EmptyQueryResult);
}

function getTopXDepartments(rawPersonalReviewData: any, x: number) {
  const ressortsAndCount = rawPersonalReviewData[ressortsKey];
  const entries = Object.entries(ressortsAndCount);
  if (entries.length) {
    const descOrderedRessortsByCount = entries
      .sort((ressortAndCountA, ressortAndCountB) => {
        return (
          (ressortAndCountB[1] as number) - (ressortAndCountA[1] as number)
        );
      })
      .map((ressortAndCount) => ressortAndCount[0]);
    return getFirstXElementsOfArray(descOrderedRessortsByCount, x);
  }
  throw new CustomApplicationError(ErrorCode.EmptyQueryResult);
}

function getTopXTopics(rawPersonalReviewData: any, x: number) {
  const topicsAndCount = rawPersonalReviewData[topicsKey];
  const entries = Object.entries(topicsAndCount);
  if (entries.length) {
    const descOrderedTopicsByCount = entries
      .sort((topicAndCountA, topicAndCountB) => {
        return (topicAndCountB[1] as number) - (topicAndCountA[1] as number);
      })
      .map((topicAndCount) => topicAndCount[0]);
    return getFirstXElementsOfArray(descOrderedTopicsByCount, x);
  }
  throw new CustomApplicationError(ErrorCode.EmptyQueryResult);
}

function mapWeekday(weekday: weekdayAbbreviationEN) {
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

function getFirstXElementsOfArray<T>(arr: T[], x: number): T[] {
  const arrayContainsAtLeastXElements = arr.length >= x;
  return arr.slice(0, arrayContainsAtLeastXElements ? x : arr.length);
}
