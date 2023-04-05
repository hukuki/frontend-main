import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../utils/firebase/firebase';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();
  try {
    const credential = GoogleAuthProvider.credentialFromResult(req.body);
    const response = await signInWithCredential(auth, credential);
    res.send(response);
  } catch (err) {
    // console.log(err);
  }
}
