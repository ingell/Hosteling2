# Azure Setup Guide for Hosteling Pre-Launch

This document outlines the Azure services and configuration needed for the Hosteling pre-launch landing page.

## Required Azure Services

### 1. Azure Static Web Apps
- **Purpose**: Host the React application
- **Configuration**: 
  - Set up GitHub/Azure DevOps integration for automatic deployment
  - Configure custom domain if needed
  - Set environment variables for production

### 2. Azure Functions (Serverless)
- **Purpose**: Handle form submissions and backend logic
- **Functions needed**:
  - `submitPrelaunch`: Process pre-launch form submissions
  - `sendNotification`: Send confirmation emails
  - `analytics`: Track user interactions

### 3. Azure Cosmos DB or Azure Table Storage
- **Purpose**: Store pre-launch signups
- **Schema for pre-launch submissions**:
```json
{
  "id": "unique-id",
  "partitionKey": "volunteer|hostel",
  "firstName": "string",
  "lastName": "string", 
  "email": "string",
  "phone": "string",
  "userType": "volunteer|hostel",
  "consent": "boolean",
  "submittedAt": "datetime",
  "ipAddress": "string",
  "userAgent": "string"
}
```

### 4. Azure Application Insights
- **Purpose**: Analytics and monitoring
- **Tracks**:
  - Form submissions
  - User interactions
  - Error logging
  - Performance metrics

### 5. Azure Communication Services (Optional)
- **Purpose**: Send confirmation emails
- **Configuration**:
  - Email service for signup confirmations
  - SMS service for phone verification (future feature)

## Environment Variables

Set these in Azure Static Web Apps configuration:

```bash
# API Configuration
REACT_APP_API_BASE_URL=https://your-function-app.azurewebsites.net/api
REACT_APP_AZURE_FUNCTION_URL=https://hosteling-functions.azurewebsites.net/api
REACT_APP_PRELAUNCH_API_ENDPOINT=/api/prelaunch/submit

# Azure Services
REACT_APP_AZURE_APP_INSIGHTS_KEY=your-app-insights-key
REACT_APP_AZURE_STORAGE_URL=https://hostelingfiles.blob.core.windows.net
REACT_APP_COSMOS_DB_ENDPOINT=https://hosteling-db.documents.azure.com:443/

# Feature Flags
REACT_APP_PRELAUNCH_MODE=true
REACT_APP_ENABLE_ANALYTICS=true
REACT_APP_ENABLE_EMAIL_NOTIFICATIONS=true

# App Configuration
REACT_APP_VERSION=1.0.0
NODE_ENV=production
```

## Azure Function Example

### Function: submitPrelaunch

```javascript
// Azure Function to handle pre-launch form submissions
const { CosmosClient } = require("@azure/cosmos");

module.exports = async function (context, req) {
    try {
        // Validate request
        if (!req.body || !req.body.email) {
            context.res = {
                status: 400,
                body: { success: false, message: "Email is required" }
            };
            return;
        }

        // Initialize Cosmos DB client
        const client = new CosmosClient(process.env.COSMOS_DB_CONNECTION_STRING);
        const database = client.database("hosteling");
        const container = database.container("prelaunch-signups");

        // Prepare data
        const submission = {
            id: `${Date.now()}_${req.body.email}`,
            partitionKey: req.body.userType,
            ...req.body,
            submittedAt: new Date().toISOString(),
            ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress
        };

        // Save to database
        await container.items.create(submission);

        // Log to Application Insights
        context.log('Pre-launch signup:', { email: req.body.email, userType: req.body.userType });

        // Send confirmation email (optional)
        // await sendConfirmationEmail(req.body.email, req.body.firstName);

        context.res = {
            status: 200,
            body: { 
                success: true, 
                message: "Successfully registered for early access!",
                submissionId: submission.id
            }
        };

    } catch (error) {
        context.log.error('Error processing submission:', error);
        context.res = {
            status: 500,
            body: { success: false, message: "Internal server error" }
        };
    }
};
```

## Deployment Steps

1. **Create Azure Resource Group**
   ```bash
   az group create --name hosteling-prelaunch --location eastus
   ```

2. **Deploy Static Web App**
   ```bash
   az staticwebapp create \
     --name hosteling-app \
     --resource-group hosteling-prelaunch \
     --source https://github.com/your-username/hosteling \
     --location eastus \
     --branch main \
     --app-location "/" \
     --output-location "build"
   ```

3. **Create Function App**
   ```bash
   az functionapp create \
     --name hosteling-functions \
     --resource-group hosteling-prelaunch \
     --consumption-plan-location eastus \
     --runtime node \
     --runtime-version 18 \
     --functions-version 4
   ```

4. **Create Cosmos DB Account**
   ```bash
   az cosmosdb create \
     --name hosteling-db \
     --resource-group hosteling-prelaunch \
     --kind GlobalDocumentDB \
     --locations regionName=eastus failoverPriority=0
   ```

5. **Create Application Insights**
   ```bash
   az monitor app-insights component create \
     --app hosteling-insights \
     --location eastus \
     --resource-group hosteling-prelaunch
   ```

## Security Considerations

- Use Azure Key Vault for sensitive configuration
- Enable CORS only for your domain
- Implement rate limiting on form submission
- Use HTTPS for all communications
- Validate and sanitize all input data

## Monitoring and Analytics

- Set up Application Insights dashboards
- Monitor form submission rates
- Track user engagement metrics
- Set up alerts for errors or high traffic

## Cost Optimization

- Use consumption plans for Functions
- Implement caching for static assets
- Use free tier of Cosmos DB for pre-launch
- Monitor usage and adjust resources as needed