# playwright-automation-cadencerx

## Useful links
- https://playwright.dev/docs/intro 
- https://cucumber.io/
- https://github.com/cucumber/cucumber-expressions#readme 


## Installation
### Install git bash
1. Download and install git bash
2. https://git-scm.com/install/windows 
3. https://git-scm.com/cheat-sheet
4. ⚠️ When installing git be sure to install under the following directory `C:\Program Files\Git`
   - Need admin access to your machine 
   
### Install Node 20 or higher
1. Download and install Node.js
2. https://nodejs.org/en/download/
3. `node -v`

### Install Java JDK
1. install 24.0.2 version Windows zip
2. Create "Java JDK" folder under Program files (x86)
   - ⚠️ Need admin access to your machine
3. Unzip file in download folder
4. Drag and drop unzipped directory in "Java JDK" folder
5. Set system environment variables  
     - need admin access
     - create  new system variabel `JAVA_HOME`
     - copy jdk directory location
     - <img width="598" height="174" alt="image" src="https://github.com/user-attachments/assets/95874aa1-5951-4814-ae31-25cb23e12155" />
     - Add Java JDK top you path: %JAVA_HOME%\bin
     - <img width="844" height="893" alt="image" src="https://github.com/user-attachments/assets/e56b6f5a-2666-4538-a610-94ce7536821b" />
     - Open new git bash window and verify java version `java -version`

### install yarn
```
npm install -g yarn@latest
yarn config set strict-ssl false
```

### install Playwright and Typescript
```
yarn global add typescript
npm install -g ts-node --force
npm install or yarn install
npx playwright install
```

### VSCode setup
1. Install plugins
     - GitHub copilot and chat
     - Cucumber (Gherkin) Full support
     - Prettier - Code Formatter
     - Material Icon Theme
     - **Crtl+Shift+P** reload windows
2. Cucumber Configuration
     - File -> Preferences -> Settings -> Extensions -> Cucumber Auto Complete settings -> Edit in `setting.json`
     - Add the following
     ```json
      "cucumberautocomplete.strictGherkinCompletion": true,
       "cucumberautocomplete.steps": [
           "cypress/support/step_definitions/**/*.ts",
           "cypress/support/step_definitions/**/*.js",
           "src/step-definitions/**/*.ts",
           "src/step-definitions/**/*.js"
       ],
     ```

### Reporting
1. Download cucumber-json-formatter-windows-amd64 from https://github.com/cucumber/json-formatter#readme
2. Save cucumber formatter under `C:\Users\your_name\cucumber-json-formatter`
3. Rename to cucumber-json-formatter.exe
4. Set Path in system environment variables
5. <img width="482" height="532" alt="image" src="https://github.com/user-attachments/assets/c25752be-4f2a-4489-a033-ade71346df68" />
> [!CAUTION]
> 🚨 Don't forgot to add back slash in the end

6. Close and reopen VSCode
7. Verify you can run the following: `cucumber-json-formatter --help`
8. Report set up can be found under `./utils/generate-report.ts`

> [!IMPORTANT]
> 🧠 The brains of the project is located in `index.ts`. 
> Here, you can configure commands commands tags e.g. `@smoke`, implement retry logic, configure parallelization, reporting and more!

> [!WARNING]
> ⚠️ When crating new tagas do NOT forget to include in the `index.ts` file and the `generate-report.ts`
> The tag name needs to be included in the `generate-report.ts` for tag ran to show up on the report. 

### Running Scripts
`yarn run cucumber <tagName>`

### Adding Additinal Tag Instructions   
1. Inlcude new tags under `index.ts` in the following places. 
   - `const profiles: ProfileCommands`
   - `let commands`
2. Include new tag under `generate-report.ts` in the following place
   - `const tagPatterns`


  

