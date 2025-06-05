import {useState} from 'react';
import {useLogin} from '@/screens/login/hooks/useLogin';
import {useEmailSigninMutation} from './useEmailSigninMutation';
import {useEmailSignupMutation} from './useEmailSigninMutation';

export const useEmailSignin = (mode: 'login' | 'signup') => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const {fcmToken} = useLogin();
  const {mutate: emailSignin} = useEmailSigninMutation();
  const {mutate: emailSignup} = useEmailSignupMutation();
  const handleSubmit = () => {
    if (mode === 'login') {
      emailSignin({
        email,
        password,
        fcmToken: fcmToken || 'fcmToken이 없습니다.',
      });
    } else {
      emailSignup({
        email,
        password,
        name,
      });
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    handleSubmit,
  };
};
