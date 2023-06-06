import { Table } from 'sst/constructs';

export function StorageStack({ stack, app }) {
  // Create the DynamoDB table
  const table = new Table(stack, 'Notes', {
    fields: {
      userId: 'string',
      courseName: 'string',
      courseScope: 'number',
      courseGrade: 'number',
    },
    primaryIndex: { partitionKey: 'userId', sortKey: 'courseName' },
  });

  return {
    table,
  };
}
