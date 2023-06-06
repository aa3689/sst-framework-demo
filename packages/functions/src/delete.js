import { Table } from 'sst/node/table';
import handler from '@sst-framework-demo/core/handler';
import dynamoDb from '@sst-framework-demo/core/dynamodb';

export const main = handler(async (event) => {
  const params = {
    TableName: Table.Courses.tableName,
    // 'Key' defines the partition key and sort key of the item to be removed
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      courseName: event.pathParameters.courseName, // The id of the note from the path
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});
