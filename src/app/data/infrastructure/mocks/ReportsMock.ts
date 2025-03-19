
export function createMockReports() {
  return [
    {
      userId: 'user123',
      reason: 'Report 1',
      explanation: 'This is the first report',
      details: 'Details of the first report',
      date: new Date(),
      userIdReported: 'user123'
    },
    {
      userId: 'user123',
      reason: 'Report 2',
      explanation: 'This is the second report',
      details: 'Details of the second report',
      date: new Date(),
      userIdReported: 'user123'
    },
    {
      userId: 'user123',
      reason: 'Report 3',
      explanation: 'This is the third report',
      details: 'Details of the third report',
      date: new Date(),
      userIdReported: 'user123'
    }
  ];
}

