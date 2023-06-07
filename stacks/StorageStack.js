// StorageStack.js vastaa DynamoDB-taulun pystyttämisestä

// Konstruktiot ('sst/constructs') ovat sst:n "valmiita komponentteja",
// joiden avulla voidaan pystyttää AWS-resursseja
import { Table } from 'sst/constructs';

// Exportataan StorageStack, jota käytetään ApiStackissa ja sst.config.ts:ssä
export function StorageStack({ stack, app }) {
  const table = new Table(stack, 'Courses', {
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
