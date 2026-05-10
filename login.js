const { google } = require('googleapis');

async function login() {

  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  const client = await auth.getClient();

  const sheets = google.sheets({
    version: 'v4',
    auth: client
  });

  const spreadsheetId = '1cvYZUGpXwrHYvuCk4QR5c-vJgXtUi01f1rh60uZ0_Hk';

  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'users!A:D'
  });

  const rows = response.data.values || [];

  let found = false;

  for (let i = 1; i < rows.length; i++) {

    const row = rows[i];

    if (
      row[0] === username &&
      row[1] === password
    ) {
      found = true;
      console.log('LOGIN_SUCCESS');
      break;
    }
  }

  if (!found) {
    console.log('LOGIN_FAILED');
    process.exit(1);
  }
}

login();
