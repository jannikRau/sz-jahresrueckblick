import { Snowflake } from '../snowflake/Snowflake';
import { UserData } from '../model/UserData';

export async function handleSzUsageOfYearRequest(
  userId: string,
  snowflake: Snowflake,
): Promise<UserData | undefined> {
  return await snowflake.getUserData(userId);
}
