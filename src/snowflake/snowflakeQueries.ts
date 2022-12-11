const getSzUsageOfYearQuery = (userId: string): string => {
  return `
    SELECT *
    FROM SZ_SAND.PUBLIC.SDJRUECKFULL_AGG
    WHERE hashed_sso_id = '${userId}'
    `;
};

export { getSzUsageOfYearQuery };
