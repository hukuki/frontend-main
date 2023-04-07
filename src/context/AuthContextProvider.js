import { useState, useContext, createContext, useEffect } from 'react';
import { auth, googleAuthProvider } from '../utils/firebase/firebase';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';

const Context = createContext();

export const AuthContextProvider = ({ children }) => {
  const auth = useFirebaseAuth();
  return <Context.Provider value={auth}>{children}</Context.Provider>;
};

export default function useAuthContext() {
  return useContext(Context);
}

const useFirebaseAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handleUser = (user) => {
    if (user) {
      setUser(user);
      setLoading(false);
      return user;
    } else {
      setUser(null);
      setLoading(false);
      return false;
    }
  };

  const signInWithGoogle = async (redirectPath) => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleAuthProvider);
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const response = await signInWithCredential(auth, credential);
      const user = handleUser(response.user);
      if (redirectPath) {
        router.push(redirectPath);
      }
      return { error: null, user };
    } catch (error) {
      return { error: error.message, user: null };
    }
  };

  const signUpWithGoogle = async (redirectPath) => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleAuthProvider);
      const rawUser = res.user;
      const user = handleUser(rawUser);
      if (redirectPath) {
        router.push(redirectPath);
      }
      return { error: null, user };
    } catch (error) {
      return { error: error.message, user: null };
    }
  };

  const signOutWithGoogle = async () => {
    try {
      await signOut(auth);
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  };

  const signUpWithEmailAndPassword = async (credentials, redirectPath) => {
    if (!credentials) {
      return { error: 'User object cannot be null', user: null };
    }
    try {
      const { email, password } = credentials;
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const rawUser = res.user;
      const user = handleUser(rawUser);
      if (redirectPath) {
        router.push(redirectPath);
      }
      return { error: null, user };
    } catch (error) {
      return { error: error.message, user: null };
    }
  };

  const signInWithEmailAndPasswordFirebase = async (credentials, redirectPath) => {
    if (!credentials) {
      return { error: 'Credentials cannot be null', user: null };
    }
    try {
      const { email, password } = credentials;
      const response = await signInWithEmailAndPassword(auth, email, password);
      const rawUser = response.user;
      const user = handleUser(rawUser);
      if (redirectPath) {
        router.push(redirectPath);
      }
      return { error: null, user };
    } catch (error) {
      return { error: error.message, user: null };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser);
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signInWithGoogle,
    signUpWithGoogle,
    signOutWithGoogle,
    signInWithEmailAndPasswordFirebase,
    signUpWithEmailAndPassword,
  };
};
