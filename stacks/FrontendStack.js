// FrontendStack.js vastaa React-sivuston pystyttämisestä

// Konstruktiot ('sst/constructs') ovat sst:n "valmiita komponentteja",
// joiden avulla voidaan pystyttää AWS-resursseja
import { StaticSite, use } from 'sst/constructs';
import { ApiStack } from './ApiStack';
import { AuthStack } from './AuthStack';

// Exportataan FrontendStack, jota käytetään sst.config.ts:ssä
export function FrontendStack({ stack, app }) {
  const { api } = use(ApiStack);
  const { auth } = use(AuthStack);

  // Luodaan React-sivusto ja asetetaan ympäristömuuttujat
  const site = new StaticSite(stack, 'ReactSite', {
    path: 'frontend',
    buildOutput: 'build',
    buildCommand: 'npm run build',
    environment: {
      REACT_APP_API_URL: api.customDomainUrl || api.url,
      REACT_APP_REGION: app.region,
      REACT_APP_USER_POOL_ID: auth.userPoolId,
      REACT_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId,
      REACT_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
    },
  });

  // Tulostetaan CloudFront-osoite jos olemassa, muutoin localhost:3000
  stack.addOutputs({
    SiteUrl: site.url || 'http://localhost:3000',
  });
}
