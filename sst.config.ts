import { SSTConfig } from 'sst';
// @ts-ignore
import { StorageStack } from './stacks/StorageStack';
// @ts-ignore
import { ApiStack } from './stacks/ApiStack';
// @ts-ignore
import { AuthStack } from './stacks/AuthStack';
// @ts-ignore
import { FrontendStack } from './stacks/FrontendStack';

export default {
  config(_input) {
    return {
      name: 'sst-framework-demo',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app
      .stack(StorageStack)
      .stack(ApiStack)
      .stack(AuthStack)
      .stack(FrontendStack);
  },
} satisfies SSTConfig;
