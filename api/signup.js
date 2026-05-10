export default function handler(req, res) {
  if (req.method === 'POST') {
    const { fullName, username, password } = req.body;

    return res.status(200).json({
      success: true,
      message: 'Signup successful',
      user: {
        fullName,
        username
      }
    });
  }

  return res.status(405).json({
    error: 'Method not allowed'
  });
}
