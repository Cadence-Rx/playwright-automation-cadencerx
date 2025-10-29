const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: './env/.env' });

// Function to get browser info from environment
function getBrowserInfo() {
    const browser = process.env.UI_AUTOMATION_BROWSER || 'chromium';
    return {
        name: browser,
        version: 'latest'
    };
}

// Function to get OS info
function getOSInfo() {
    const platform = process.platform;
    let osName = 'Unknown';
    let osVersion = 'Unknown';
    
    if (platform === 'win32') {
        osName = 'Windows';
        osVersion = '11';
    } else if (platform === 'darwin') {
        osName = 'macOS';
        osVersion = 'latest';
    } else if (platform === 'linux') {
        osName = 'Linux';
        osVersion = 'latest';
    }
    
    return { name: osName, version: osVersion };
}

// Function to read test results and extract summary
function getTestSummary() {
    const reportPath = './reports/report.json';
    if (fs.existsSync(reportPath)) {
        try {
            const reportData = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
            let totalScenarios = 0;
            let passedScenarios = 0;
            let failedScenarios = 0;
            
            reportData.forEach((feature: any) => {
                feature.elements.forEach((scenario: any) => {
                    if (scenario.type === 'scenario') {
                        totalScenarios++;
                        const failed = scenario.steps.some((step: any) => 
                            step.result && step.result.status === 'failed'
                        );
                        if (failed) {
                            failedScenarios++;
                        } else {
                            passedScenarios++;
                        }
                    }
                });
            });
            
            return { totalScenarios, passedScenarios, failedScenarios };
        } catch (error) {
            console.error('Error reading test results:', error);
            return { totalScenarios: 0, passedScenarios: 0, failedScenarios: 0 };
        }
    }
    return { totalScenarios: 0, passedScenarios: 0, failedScenarios: 0 };
}

// Generate timestamp
const now = new Date();
const executionTime = now.toLocaleString();

// Get test summary
const testSummary = getTestSummary();

// Generate the HTML report
report.generate({
    jsonDir: './reports',
    reportPath: './reports/cucumber-html-reports',
    openReportInBrowser: false,
    reportName: 'Cadence RX Automation Report',
    pageTitle: 'Cadence RX Test Results',
    displayDuration: true,
    displayReportTime: true,
    metadata: {
        browser: getBrowserInfo(),
        device: 'Local test machine',
        platform: getOSInfo()
    },
    customData: {
        title: 'Cadence RX Test Execution Report',
        data: [
            {label: 'Project', value: 'Playwright Automation Cadence RX'},
            {label: 'Release', value: '1.0.0'},
            {label: 'Environment', value: 'UAT'},
            {label: 'Execution Time', value: executionTime},
            {label: 'Total Scenarios', value: testSummary.totalScenarios.toString()},
            {label: 'Passed Scenarios', value: testSummary.passedScenarios.toString()},
            {label: 'Failed Scenarios', value: testSummary.failedScenarios.toString()},
            {label: 'Pass Rate', value: testSummary.totalScenarios > 0 ? 
                `${Math.round((testSummary.passedScenarios / testSummary.totalScenarios) * 100)}%` : '0%'}
        ]
    },
    // Optional: Use custom CSS file (uncomment the line below if you want custom styling)
    // customStyle: './reports/custom-style.css'
});