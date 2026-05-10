import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  try {
    const { fullName, username, password } = req.body;

    const sheets = google.sheets({
      version: 'v4',
      auth,
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'users!A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          username,
          password,
          'member',
          new Date().toISOString(),
        ]],
      },
    });

    console.log('User appended successfully');

    return res.status(200).json({
      success: true,
      message: 'Signup successful',
      user: {
        fullName,
        username,
      },
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
