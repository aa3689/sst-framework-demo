// ApiStack.js vastaa API Gatewayn pystyttämisestä

import { Api, use } from 'sst/constructs';
import { StorageStack } from './StorageStack';

// Exportataan ApiStack, jota käytetään Auth- ja FrontendStackissa sekä sst.config.ts:ssä
export function ApiStack({ stack, app }) {
  const { table } = use(StorageStack);

  // Luodaan API Gateway, johon bindataan DynamoDB-taulu
  const api = new Api(stack, 'Api', {
    defaults: {
      authorizer: 'iam',
      function: {
        bind: [table],
      },
    },
    // Määritellään API:n reitit
    routes: {
      'POST /courses': 'packages/functions/src/create.main', // Luo uusi kurssi
      'GET /courses/{courseName}': 'packages/functions/src/get.main', // Hae tietty kurssi sen nimellä
      'GET /courses': 'packages/functions/src/list.main', // Hae kaikki kurssit
      'PUT /courses/{courseName}': 'packages/functions/src/update.main', // Päivitä tietty kurssi sen nimellä
      'DELETE /courses/{courseName}': 'packages/functions/src/delete.main', // Poista tietty kurssi sen nimellä
    },
  });

  // Tulostetaan API:n endpointti
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  };
}
