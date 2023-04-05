import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/firebase/firebase';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();
  try {
    const { email, password } = req.body;
    const response = await createUserWithEmailAndPassword(auth, email, password);
    //await sendEmailVerification(auth.currentUser)
    res.send(JSON.stringify(response));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
