import {useState} from 'react';
import {useLogin} from '@/screens/login/hooks/useLogin';
import {useEmailSigninMutation} from './useEmailSigninMutation';
import {useEmailSignupMutation} from './useEmailSigninMutation';
import {Alert} from 'react-native';

export const useEmailSignin = (mode: 'login' | 'signup') => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const {fcmToken} = useLogin();
  const {mutate: emailSignin} = useEmailSigninMutation();
  const {mutate: emailSignup} = useEmailSignupMutation();
  const handleSubmit = () => {
    // 이메일 정규식
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      Alert.alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    if (password.length < 8) {
      Alert.alert('비밀번호는 8자 이상이어야 합니다.');
      return;
    }
    if (mode === 'signup' && name.trim().length === 0) {
      Alert.alert('이름을 입력해주세요.');
      return;
    }
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
