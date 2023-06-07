// get.js lambda-funktio vastaa tietyn kurssin hakemisesta

import { Table } from 'sst/node/table';
import handler from '@sst-framework-demo/core/handler';
import dynamoDb from '@sst-framework-demo/core/dynamodb';

/*
Haetaan kurssi TableName-muuttujan mukaisesta DynamoDB-taulusta.
Kurssin hakemiseen käytetään avaimena käyttäjän userId:tä ja kurssin nimeä.
Kurssin nimi saadaan pathParametrinä eli URL-polun muuttuvasta osasta.
Odotetaan, että kurssi on haettu DynamoDB:stä ja palautetaan se.
*/
export const main = handler(async (event) => {
  const params = {
    TableName: Table.Courses.tableName,
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      courseName: event.pathParameters.courseName,
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error('Kurssia ei löydy.');
  }

  return result.Item;
});
