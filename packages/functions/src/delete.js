// delete.js lambda-funktio vastaa kurssin poistamisesta

import { Table } from 'sst/node/table';
import handler from '@sst-framework-demo/core/handler';
import dynamoDb from '@sst-framework-demo/core/dynamodb';

/*
Poistetaan kurssi TableName-muuttujan mukaisesta DynamoDB-taulusta.
Kurssin poistamiseen käytetään avaimena käyttäjän userId:tä ja kurssin nimeä.
Kurssin nimi saadaan pathParametrinä eli URL-polun muuttuvasta osasta.
Odotetaan, että kurssi on poistettu DynamoDB:stä ja palautetaan tieto siitä.
*/
export const main = handler(async (event) => {
  const params = {
    TableName: Table.Courses.tableName,
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      courseName: event.pathParameters.courseName,
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});
