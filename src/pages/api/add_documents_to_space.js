const backend_url = process.env.BACKEND_URL;

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(400).send(
      JSON.stringify({
        error: 'Invalid operation',
        data: null,
      })
    );
  try {
    const { accessToken, spaceId, documents } = JSON.parse(req.body);
    const response = await fetch(`${backend_url}/spaces/${spaceId}/documents`, {
      method: 'POST',
      body: JSON.stringify({
        documents,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    res.send(
      JSON.stringify({
        error: null,
        data,
      })
    );
  } catch (error) {
    res.status(500).send(
      JSON.stringify({
        error,
        data: null,
      })
    );
  }
}
