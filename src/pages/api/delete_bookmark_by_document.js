const backend_url = process.env.BACKEND_URL;

export default async function handler(req, res) {
  if (req.method !== 'DELETE')
    return res.status(400).send(
      JSON.stringify({
        error: 'Invalid operation',
        data: null,
      })
    );
  try {
    const { accessToken, documentId } = JSON.parse(req.body);
    const response = await fetch(`${backend_url}/bookmarks`, {
      method: 'DELETE',
      body: JSON.stringify({
        document: documentId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log(data);
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
