const backend_url = process.env.BACKEND_URL;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(400).send('Invalid operation');
  try {
    console.log('CREATE SPACE');
    const { name, description, people, accessToken } = JSON.parse(req.body);
    const response = await fetch(`${backend_url}/spaces/`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
        people,
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
  } catch (err) {
    console.log(err);
    res.status(500).send(
      JSON.stringify({
        error: err,
        data: null,
      })
    );
  }
}
