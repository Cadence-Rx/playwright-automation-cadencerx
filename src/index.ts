import { exec } from "child_process";
//Load env variables from .env file
import dotenv from "dotenv";
dotenv.config({ path: './env/.env'});

//Setting retry value from envionment variable or default to 0
const parallelValue = process.env.PARALLEL_NUMBER || '1';
const retryValue = process.env.RETRY_ATTEMPTS || '0';

//Define a common command string for running cucumber tests
const common = `./src/features/**/*.feature \
  --require-module ts-node/register \
  --require ./src/step-definitions/**/**/*.ts \
  --require ./src/utils/cucumber-timeouts.ts \
  -f json:./reports/report.json \
  --format html:./reports/cucumber-html/playwright-report.html \
  --parallel ${parallelValue} \
  --retry ${retryValue} \
  --tags "not @ignore" `;

//Define an interface for the profiles object
//It defines an interface where each key is a string and its value is also a string
interface ProfileCommands {
    [key: string]: string;
}

//Define a command strings for different test profiles
const profiles: ProfileCommands = {
    smoke: `${common} --tags "@smoke"`,
    regression: `${common} --tags "@regression"`,
    login: `${common} --tags "@login"`,
    contactUs: `${common} --tags "@contact-us"`,
    patient: `${common} --tags "@patient"`,
    priorAuth: `${common} --tags "@priorAuth"`,
}

//Get the third command-line argument and assign it to the profile
//i.e. smoke, regression etc
const profile = process.argv[2];

//Construct the command string based on the selected profile
//command is the full command to run the tests for the selected profile
let command = `npx cucumber-js ${profiles[profile as 'smoke' | 'regression' | 'login' | 'contact-us' | 'patient' | 'priorAuth']}`;

//Print the constructed command
//console.log(command);

//Execute the command
exec(command, { encoding: 'utf-8'}, (error: Error | null, stdout: string) =>{
  //Log the output of the command
  console.log(stdout);

  // Generate the HTML report regardless of test results
  console.log('\n🎯 Generating HTML Report...');
  try {
    require('./utils/generate-report');
    console.log('✅ HTML Report generated successfully!');
    console.log('📊 Report location: ./reports/./reports/cucumber-html-multi-reports/index.html');
  } catch (reportError) {
    console.error('❌ Failed to generate HTML report:', reportError);
  }

  //check if there was an error during execution
  if(error) {
    //throw a new error with a simple message
    throw new Error('⚠️ 💥 Some automation test(s) have failed! - Please review. ⚠️ 💥\n' + error)
  }
});