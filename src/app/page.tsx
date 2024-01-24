'use client'
import { Button, TextField } from '@mui/material';
import styles from './Login.module.scss';
import userData from '@/mocks/userData';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/StatusContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });
  const router = useRouter();

  const handleLogin = () => {
    let newError = { email: '', password: '' };
    const emailValidation = email === userData.email;
    const passwordValidation = password === userData.senha;

    if (!emailValidation) {
      newError.email = 'Email não encontrado. Confira e tente novamente.';
    }
    if (!passwordValidation) {
      newError.password = 'Senha incorreta. Por favor, verifique e tente novamente.';
    }

    setError(newError);

    if (emailValidation && passwordValidation) {
      router.push('/UserManegement');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>

        <div className={styles.loginSidebar}>
          <div className={styles.logo}>LOGO</div>
          <h1 className={styles.h1}>Bem-vindo(a)</h1>
          <p className={styles.p}>Acesse sua conta para iniciar a sessão</p>

          <div className={styles.loginButtons}>
            <TextField
              fullWidth
              label="E-mail"
              variant="outlined"
              error={!!error.email}
              helperText={error.email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Senha"
              variant="outlined"
              error={!!error.password}
              helperText={error.password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>

          <p className={styles.forgotPassword}>Esqueceu sua senha?</p>

          <Button
            variant="contained"
            style={{ backgroundColor: '#9747FF', marginTop: 32, textTransform: 'none' }}
            onClick={handleLogin}
          >
            Acessar plataforma
          </Button>

        </div>

        <div className={styles.loginForm}>
        </div>

      </div>
    </div>
  );
}
