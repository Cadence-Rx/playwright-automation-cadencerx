#!/usr/bin/env node

/**
 * Standalone script to generate multiple-cucumber-html-reporter
 * Usage: npm run generate-report
 */

console.log('🎯 Generating Cucumber HTML Report...');

try {
    // Register ts-node to handle TypeScript files
    require('ts-node/register');
    require('./src/utils/generate-report.ts');
    console.log('✅ HTML Report generated successfully!');
    console.log('📊 Report location: ./reports/cucumber-html-reports/index.html');
    console.log('🌐 Open the report in your browser to view results');
} catch (error) {
    console.error('❌ Failed to generate HTML report:', error);
    process.exit(1);
}