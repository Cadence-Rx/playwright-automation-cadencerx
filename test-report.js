#!/usr/bin/env node

/**
 * Simple test script to verify report generation works
 */

console.log('🧪 Testing report generation...');

try {
    // Register ts-node to handle TypeScript files
    require('ts-node/register');
    
    // Check if reports directory exists
    const fs = require('fs');
    const path = require('path');
    
    const reportsDir = './reports';
    if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir, { recursive: true });
        console.log('📁 Created reports directory');
    }
    
    // Check if JSON report exists
    const jsonReportPath = './reports/report.json';
    if (!fs.existsSync(jsonReportPath)) {
        console.log('⚠️  No JSON report found. Creating empty report for testing...');
        fs.writeFileSync(jsonReportPath, '[]');
    }
    
    // Try to generate the report
    require('./src/utils/generate-report.ts');
    console.log('✅ Report generation test successful!');
    console.log('📊 Report location: ./reports/cucumber-html-reports/index.html');
    
} catch (error) {
    console.error('❌ Report generation test failed:', error.message);
    console.error('Full error:', error);
    process.exit(1);
}