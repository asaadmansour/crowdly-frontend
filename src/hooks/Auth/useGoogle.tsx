import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { setLoading, addToken } from '../../store/slices/authSlicer';
import toast from 'react-hot-toast';
const backendURL = import.meta.env.VITE_BASE_BACKEND_URL;
export default function useGoogleLoginHandler() {
  const dispatch = useDispatch();
  return useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      dispatch(setLoading(true));
      try {
        const response = await axios.post(
          `${backendURL}/auth/google/callback/`,
          {
            code: codeResponse.code,
          },
          {
            withCredentials: true,
          }
        );
        const data = response.data;
        dispatch(addToken({ token: data.access, user: data.user || null }));
        localStorage.setItem("access_token",data.access);
        toast.success('Successfully logged in with Google!');
      } catch (error: any) {
        console.error('Google login error:', error.response?.data || error.message);
        toast.error(error.response?.data?.detail || 'Failed to complete Google login');
      } finally {
        dispatch(setLoading(false));
      }
    },
    onError: () => toast.error('Google Login failed'),
  });
}
