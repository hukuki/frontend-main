const backend_url = process.env.BACKEND_URL;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(400).send('Invalid operation!');
  try {
    const { accessToken, query } = JSON.parse(req.body);
    const response = await fetch(`${backend_url}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    const people = data.filter((user) => {
      if (user.email.startsWith(query)) {
        return true;
      }
    });
    console.log(people);
    res.send(
      JSON.stringify({
        error: null,
        data: people,
      })
    );
  } catch (err) {
    res.status(500).send(
      JSON.stringify({
        error: err,
        data: null,
      })
    );
  }
}
