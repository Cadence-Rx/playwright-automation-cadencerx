import { setDefaultTimeout } from '@cucumber/cucumber';

//Load env variables from .env file
import {config as loadEnv} from "dotenv";
const env = loadEnv({path: './env/.env'});

const customTime = parseInt(env.parsed?.CUCUMBER_STEP_TIMEOUT || '60000');

// Set default timeout for Cucumber steps to 60 seconds
setDefaultTimeout(customTime);