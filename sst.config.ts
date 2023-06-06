import { SSTConfig } from 'sst';
// @ts-ignore
import { StorageStack } from './stacks/StorageStack';

export default {
  config(_input) {
    return {
      name: 'sst-framework-demo',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(StorageStack);
  },
} satisfies SSTConfig;
