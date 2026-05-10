const { google } = require('googleapis');

async function main() {
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

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Sheet1!A1:C10'
  });

  console.log(response.data.values);
}

main();
