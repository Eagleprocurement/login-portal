const { google } = require('googleapis');

module.exports = async (req, res) => {

  try {

    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const client = await auth.getClient();

    const sheets = google.sheets({
      version: 'v4',
      auth: client
    });

    const spreadsheetId = process.env.SHEET_ID;

    const { username, password } = req.body;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'users!A:D'
    });

    const rows = response.data.values || [];

    for (let i = 1; i < rows.length; i++) {

      const row = rows[i];

      if (
        row[0] === username &&
        row[1] === password
      ) {

        return res.status(200).json({
          success: true,
          role: row[2]
        });
      }
    }

    return res.status(401).json({
      success: false
    });

  } catch (error) {

    return res.status(500).json({
      error: error.message
    });
  }
};
