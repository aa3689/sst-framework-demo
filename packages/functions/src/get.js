import { Table } from 'sst/node/table';
import handler from '@sst-framework-demo/core/handler';
import dynamoDb from '@sst-framework-demo/core/dynamodb';

export const main = handler(async (event) => {
  const params = {
    TableName: Table.Courses.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      userId: '123', // The id of the author
      courseName: event.pathParameters.courseName, // The name of the course from the path
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error('Course not found.');
  }

  // Return the retrieved item
  return result.Item;
});
