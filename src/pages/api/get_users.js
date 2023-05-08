const backend_url = process.env.BACKEND_URL;

export default async function (req, res) {
  if (req.method !== 'POST') return res.status(400).send('Invalid operation');
  try {
    const { accessToken } = JSON.parse(req.body);
    const response = await fetch(`${backend_url}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    console.log('USERS');
    console.log(data);
    res.send(
      JSON.stringify({
        error: null,
        data,
      })
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: err,
      data: null,
    });
  }
}
