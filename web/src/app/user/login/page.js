"use client";
import React, { useState } from 'react';
import styles from './login.module.css'
import { useRouter, } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loadUserThunk } from '@/store/user/thunk';

export default function Login() {
  const [user, setUser] = useState('');
  const [error, setError] = useState(null);
  const dispacth = useDispatch()
  const router = useRouter()

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user?.length > 0) {
      setError('Es obligatorio un usuario')
      return
    }
    setError(null)
    dispacth(loadUserThunk({ userId: user }))
    router.back();
  };
  return <div className={styles.container}>
    <div className={styles.box}>
      <h1>Login</h1>
      <p>Usar admin para entrar con un usuario administrador</p>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input type="text" value={user} onChange={handleUserChange} />
        </label>
        <br />
        <button type="submit">Login</button>
        <br />
        {error?.length > 0 && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  </div>
}