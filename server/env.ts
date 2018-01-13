import * as env_dev from '../src/environments/environment';
import * as env_prod from '../src/environments/environment.prod';

const environment = process.env.IS_PROD ? env_prod.environment : env_dev.environment;

export default environment;
