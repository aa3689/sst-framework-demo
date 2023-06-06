import { Table } from 'sst/node/table';
import handler from '@sst-framework-demo/core/handler';
import dynamoDb from '@sst-framework-demo/core/dynamodb';

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: Table.Courses.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      courseName: event.pathParameters.courseName, // The name of the course from the path
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression:
      'SET courseScope = :courseScope, courseGrade = :courseGrade',
    ExpressionAttributeValues: {
      ':courseScope': data.courseScope || null,
      ':courseGrade': data.courseGrade || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: 'ALL_NEW',
  };

  await dynamoDb.update(params);

  return { status: true };
});
