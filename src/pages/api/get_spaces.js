const backend_url = process.env.BACKEND_URL;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(400).send(
      JSON.stringify({
        error: 'Invalid operation',
        data: null,
      })
    );
  }
  const { accessToken } = JSON.parse(req.body);
  try {
    const response = await fetch(`${backend_url}/spaces`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    res.send(
      JSON.stringify({
        data,
        error: null,
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(
      JSON.stringify({
        data: null,
        error,
      })
    );
  }
}
