import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase/firebase';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();
  try {
    const { email, password } = req.body;
    const response = await signInWithEmailAndPassword(auth, email, password);
    res.send(JSON.stringify(response));
  } catch (err) {
    // console.log(err);
  }
}