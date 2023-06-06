import { Table } from 'sst/node/table';
import handler from '@sst-framework-demo/core/handler';
import dynamoDb from '@sst-framework-demo/core/dynamodb';

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: Table.Courses.tableName,
    Item: {
      // The attributes of the item to be created
      userId: '123',
      courseName: data.courseName,
      courseScope: data.courseScope,
      courseGrade: data.courseGrade,
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});

// import AWS from 'aws-sdk';
// import { Table } from 'sst/node/table';
// import handler from '@notes/core/handler';
// import dynamoDb from '@notes/core/dynamodb';

// const dynamoDb = new AWS.DynamoDB.DocumentClient();

// export const main = handler(async (event) => {
//   const data = JSON.parse(event.body);
//   const params = {
//     TableName: Table.Notes.tableName,
//     Item: {
//       // The attributes of the item to be created
//       userId: '123',
//       courseName: data.courseName,
//       courseScope: data.courseScope,
//       courseGrade: data.courseGrade,
//     },
//   };

//   await dynamoDb.put(params);

//   return params.Item;
// });
