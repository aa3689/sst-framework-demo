import { SSTConfig } from 'sst';
// @ts-ignore
import { StorageStack } from './stacks/StorageStack';
// @ts-ignore
import { ApiStack } from './stacks/ApiStack';

export default {
  config(_input) {
    return {
      name: 'sst-framework-demo',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(StorageStack).stack(ApiStack);
  },
} satisfies SSTConfig;
