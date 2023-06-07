// AuthStack.js vastaa Cogniton pystyttämisestä

import { Cognito, use } from 'sst/constructs';
import { ApiStack } from './ApiStack';

// Exportataan AuthStack, jota käytetään FrontendStackissa ja sst.config.ts:ssä
export function AuthStack({ stack, app }) {
  const { api } = use(ApiStack);

  // Luodaan Cognito User Pool ja Identity Pool
  const auth = new Cognito(stack, 'Auth', {
    login: ['email'],
  });

  // Liitetään API:n käyttöoikeudet autentikoituneille käyttäjille
  auth.attachPermissionsForAuthUsers(stack, [api]);

  // Tulostetaan Cogniton palauttamat tiedot
  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
    UserPoolClientId: auth.userPoolClientId,
  });

  return {
    auth,
  };
}
