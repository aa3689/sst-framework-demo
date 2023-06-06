import { Api, use } from 'sst/constructs';
import { StorageStack } from './StorageStack';

export function ApiStack({ stack, app }) {
  const { table } = use(StorageStack);

  // Luodaan API ja määritellään sen reitit
  const api = new Api(stack, 'Api', {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      'POST /courses': 'packages/functions/src/create.main', // Luo uusi kurssi
      'GET /courses/{courseName}': 'packages/functions/src/get.main', // Hae tietty kurssi sen nimellä
      'GET /courses': 'packages/functions/src/list.main', // Hae kaikki kurssit
      'PUT /courses/{courseName}': 'packages/functions/src/update.main', // Päivitä tietty kurssi sen nimellä
      'DELETE /courses/{courseName}': 'packages/functions/src/delete.main', // Poista tietty kurssi sen nimellä
    },
  });

  // Tulosta API:n endpointti
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Palauta API
  return {
    api,
  };
}
