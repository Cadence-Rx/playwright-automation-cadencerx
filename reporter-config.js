/**
 * Advanced configuration for multiple-cucumber-html-reporter
 * This file can be used for custom styling and advanced features
 */

module.exports = {
    // Basic configuration
    jsonDir: './reports',
    reportPath: './reports/cucumber-html-reports',
    
    // Report settings
    openReportInBrowser: false,
    reportName: 'Cadence RX Automation Report',
    pageTitle: 'Cadence RX Test Results',
    displayDuration: true,
    displayReportTime: true,
    
    // Metadata will be set dynamically by generate-report.ts
    
    // Custom styling
    customStyle: `
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background-color: #f5f5f5;
        }
        .navbar-brand {
            font-weight: bold;
            color: #2c3e50 !important;
        }
        .badge-success {
            background-color: #27ae60 !important;
        }
        .badge-danger {
            background-color: #e74c3c !important;
        }
        .card {
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            border: none;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .card-header {
            background-color: #34495e;
            color: white;
            border-radius: 8px 8px 0 0;
        }
    `,
    
    // Additional customization options
    overrideStyle: false,
    disableLog: false,
    saveCollectedJSON: true,
    
    // Custom metadata template (if needed)
    customMetadata: true
};