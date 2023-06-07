// list.js vastaa tietyn käyttäjän kaikkien kurssien hakemisesta

import { Table } from 'sst/node/table';
import handler from '@sst-framework-demo/core/handler';
import dynamoDb from '@sst-framework-demo/core/dynamodb';

/*
Haetaan kurssi TableName-muuttujan mukaisesta DynamoDB-taulusta.
Kurssin hakemiseen käytetään avaimena käyttäjän userId:tä.
Odotetaan, että kurssit on haettu DynamoDB:stä ja palautetaan ne.
*/
export const main = handler(async (event) => {
  const params = {
    TableName: Table.Courses.tableName,
    // 'KeyConditionExpression' on DynamoDB:n tapa hakea tietoja avaimen perusteella
    KeyConditionExpression: 'userId = :userId',
    // 'ExpressionAttributeValues' on DynamoDB:n tapa "korvata" :userId muuttujan arvolla
    ExpressionAttributeValues: {
      ':userId': event.requestContext.authorizer.iam.cognitoIdentity.identityId,
    },
  };

  const result = await dynamoDb.query(params);

  return result.Items;
});
