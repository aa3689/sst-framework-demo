// create.js lambda-funktio vastaa uuden kurssin luomisesta

import { Table } from 'sst/node/table';
import handler from '@sst-framework-demo/core/handler';
import dynamoDb from '@sst-framework-demo/core/dynamodb';

/*
Luodaan uusi kurssi TableName-muuttujan mukaiseen DynamoDB-tauluun.
Käyttäjän userId saadaan Cognito-authorizerilta ja kurssin tiedot event.body:sta.
Lopuksi odotetaan, että kurssi on luotu DynamoDB:hen ja palautetaan se.
*/
export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: Table.Courses.tableName,
    Item: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      courseName: data.courseName,
      courseScope: data.courseScope,
      courseGrade: data.courseGrade,
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
