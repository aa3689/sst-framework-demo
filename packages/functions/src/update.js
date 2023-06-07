// update.js lambda-funktio vastaa kurssin tietojen päivittämisestä

import { Table } from 'sst/node/table';
import handler from '@sst-framework-demo/core/handler';
import dynamoDb from '@sst-framework-demo/core/dynamodb';

/*
Päivitetään kurssi TableName-muuttujan mukaisessa DynamoDB-taulussa.
Otetaan data-nimiseen muuttujaan event.body:sta tuleva data (kurssin tiedot ja käyttäjän userId).
Kurssin päivittämiseen käytetään avaimena käyttäjän userId:tä ja kurssin nimeä.
Lopuksi palautetaan tieto onnistuneesta operaatiosta.
*/
export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: Table.Courses.tableName,
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      courseName: event.pathParameters.courseName, // The name of the course from the path
    },
    // 'UpdateExpression'-kohdassa määritetään, mitä attribuutteja päivitetään ja millä arvoilla
    UpdateExpression:
      'SET courseScope = :courseScope, courseGrade = :courseGrade',
    // 'ExpressionAttributeValues-kohdassa määritetään arvot, joita käytetään UpdateExpression-kohdassa
    ExpressionAttributeValues: {
      ':courseScope': data.courseScope || null,
      ':courseGrade': data.courseGrade || null,
    },
    // Palautetaan kohteen attribuutit sellaisina kuin ne näkyvät päivityksen jälkeen
    ReturnValues: 'ALL_NEW',
  };

  await dynamoDb.update(params);

  return { status: true };
});
