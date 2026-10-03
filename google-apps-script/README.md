# Google Sheets & Google Apps Script Setup Guide

Follow these steps to connect your Eleviq RSVP form to Google Sheets:

### 1. Create a Google Sheet
1. Go to [Google Sheets](https://sheets.new) and create a new spreadsheet.
2. Name the spreadsheet (e.g. `Eleviq RSVPs`).
3. (Optional) You can leave Row 1 blank (the script will automatically create header columns), or you can pre-set row 1 headers:
   `Timestamp | Name | Email | Phone | Company | Service / Event | Budget | Timeline | Guests | Message`

### 2. Add the Google Apps Script
1. In your spreadsheet, click **Extensions** > **Apps Script**.
2. Delete any boilerplate code inside the editor.
3. Open `google-apps-script/Code.gs` from this project, copy its entire contents, and paste it into the Apps Script editor.
4. Click the **Save** icon (disk icon or `Ctrl+S`).

### 3. Deploy as a Web App
1. In the top right corner of the Apps Script editor, click **Deploy** > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the deployment configuration:
   - **Description**: `Eleviq RSVP Endpoint`
   - **Execute as**: `Me (your_email@gmail.com)`
   - **Who has access**: `Anyone` *(Crucial: This allows form submissions without requiring users to log into Google)*
4. Click **Deploy**.
5. If prompted, click **Authorize access**, select your Google account, click **Advanced**, and then click **Go to Untitled project (unsafe)** to grant spreadsheet write permissions.
6. Copy the **Web App URL** (it looks like `https://script.google.com/macros/s/AKfycb.../exec`).

### 4. Connect to Eleviq Frontend
1. In the root of this project, create a `.env` file (or copy `.env.example` to `.env`):
   ```env
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
2. Restart your Vite development server:
   ```bash
   npm run dev
   ```
3. Test submitting the form on the website! Rows will automatically appear in your Google Sheet.
