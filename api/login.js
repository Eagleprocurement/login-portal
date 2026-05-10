export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        username
      }
    });
  }

  return res.status(405).json({
    error: 'Method not allowed'
  });
}
