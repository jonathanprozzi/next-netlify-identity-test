import Head from 'next/head';
import { useState, useEffect } from 'react';
import netlifyAuth from '../netlifyAuth';
import Header from '@components/Header';
import Footer from '@components/Footer';

export default function Home() {
  let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated);
  let [user, setUser] = useState(null);

  useEffect(() => {
    let isCurrent = true;
    netlifyAuth.initialize((user) => {
      if (isCurrent) {
        setLoggedIn(user);
      }
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  let login = () => {
    netlifyAuth.authenticate((user) => {
      setLoggedIn(!!user);
      setUser(user);
      netlifyAuth.closeModal();
    });
  };

  let logout = () => {
    netlifyAuth.signout(() => {
      setLoggedIn(false);
      setUser(null);
    });
  };

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {loggedIn ? (
          <Header title="you were ZeroCool?" />
        ) : (
          <>
            <Header title="pls hack ur way into the gibson first" />
            <button onClick={login}>engage hacking</button>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
