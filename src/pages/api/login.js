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

/*
526028600216-1lj0emenr0knupohge4rr6kvu33jbkde.apps.googleusercontent.com
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
*/

/*
526028600216-5h8lre64879o8b5kctam4rvsdkmb9hr1.apps.googleusercontent.com
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
*/
