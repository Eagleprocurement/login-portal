const { google } = require('googleapis');
const fs = require('fs');

async function signup() {

  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  const client = await auth.getClient();

  const sheets = google.sheets({
    version: 'v4',
    auth: client
  });

  const spreadsheetId = 'YOUR_SHEET_ID';

  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  const response = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'users!A:D',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [[
        username,
        password,
        'member',
        new Date().toISOString()
      ]]
    }
  });

  console.log('User added:', response.data);
}

signup();
