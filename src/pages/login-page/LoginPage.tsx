import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToken, setLoading } from '../../store/slices/authSlicer';
import toast from 'react-hot-toast';
const initialValues = {
  email: '',
  password: '',
};
const backendURL = import.meta.env.VITE_BASE_BACKEND_URL;
const loginSchema = Yup.object({
  email: Yup.string().email('Invalid Email').required('Email is required'),
  password: Yup.string().min(6, 'Password too short').required('Password is required'),
});

export default function LoginPage() {
  const dispatch = useDispatch();

  const handleLogin = async (values: any) => {
    dispatch(setLoading(true));
    try {
      // 1. axios.post requires an endpoint URL as the first argument
      const response = await axios.post(`${backendURL}/auth/login/`, values);
      
      // 2. Axios automatically parses JSON to `response.data`, so you don't use `.json()`
      const data = response.data;
      
      // 3. Dispatch expects an action object unless you have custom middleware. 
      console.log('Login success:', data);
      dispatch(addToken({ token: data.access, user: null }));
      toast.success('Successfully logged in!');
      
    } catch (error: any) {
      // 4. Axios auto-throws errors on 400/500 responses, so errors go to catch directly
      console.error('Server error response:', error.response?.data || error.message);
      toast.error(error.response?.data?.detail || 'Invalid email or password. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  };
  const googleLogin = async ()=> {
    try {
      const res = await axios.post(`${backendURL}/auth/google/`);
      const data = res.data
      console.log('Login success:', data);
      dispatch(addToken({ token: data.access, user: null }));
      toast.success('Successfully logged in!');
    } catch (error) {
      console.error('Server error response:', error.response?.data || error.message);
      toast.error(error.response?.data?.detail || 'Invalid email or password. Please try again.');
    }
  }
  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden font-[var(--font-display)] antialiased bg-white">
      {/* Left Panel */}
      <div className="flex-1 lg:flex-[1.1] bg-gradient-to-br from-[#f4f3ef] via-[#f4f3ef] to-[#ebd7ca] p-8 lg:p-12 flex flex-col justify-between h-full overflow-hidden">
        <div className="flex flex-col w-full max-w-[560px] mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 xl:mb-14">
            <div className="w-7 h-7 rounded-md flex justify-center items-center overflow-hidden">
              <img src="icon.jpg" alt="" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-[#111]">CROWDFUND</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl lg:text-5xl xl:text-[56px] leading-[1.1] font-normal text-[#1a1a1a] mb-10 xl:mb-14 tracking-tighter pr-4">
            Welcome back. The world needs your support.
          </h1>

          {/* Benefits List */}
          <ul className="flex flex-col gap-6 xl:gap-8">
            <li className="flex items-center gap-5">
              <div className="w-7 h-7 text-[var(--color-primary)] shrink-0 flex justify-center items-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <span className="text-xl text-[#333] leading-relaxed font-normal">
                Your donations make a real difference
              </span>
            </li>
            <li className="flex items-center gap-5">
              <div className="w-7 h-7 text-[var(--color-primary)] shrink-0 flex justify-center items-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M3 3v18h18M7 16l4-4 4 4 6-6" />
                  <path d="M21 10V4h-6" />
                </svg>
              </div>
              <span className="text-xl text-[#333] leading-relaxed font-normal">
                Track all your backed campaigns
              </span>
            </li>
            <li className="flex items-center gap-5">
              <div className="w-7 h-7 text-[var(--color-primary)] shrink-0 flex justify-center items-center">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                  <path d="M10 15l-3-3 1.41-1.41L10 12.17l5.59-5.59L17 8l-7 7z" fill="white" />
                </svg>
              </div>
              <span className="text-xl text-[#333] leading-relaxed font-normal">
                Secure & private account
              </span>
            </li>
          </ul>
        </div>

        {/* Global Stats Pill */}
        <div className="mt-8 w-full max-w-[560px] mx-auto flex justify-center lg:justify-start">
          <div className="bg-white/80 px-6 py-4 rounded-full inline-flex items-center gap-3 shadow-sm">
            <div className="w-5 h-5 text-[var(--color-primary)]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <span className="text-[11px] font-bold tracking-[0.15em] text-[#111] uppercase">
              OVER 10,000 CAMPAIGNS FUNDED WORLDWIDE
            </span>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 lg:flex-[1.4] bg-white flex justify-center items-center p-8 lg:p-12 h-full overflow-hidden relative border-l border-[#f1f1f1]">
        <div className="w-full max-w-[420px]">
          <h2 className="text-4xl font-bold text-[#111] mb-2 tracking-tight">
            Log in to your account
          </h2>
          <p className="font-[var(--font-serif)] italic text-xl text-[#666] mb-8">
            Help drive the next big human-first initiative.
          </p>

          <button
            type="button"
            onClick={googleLogin}
            className="w-full bg-[#151515] hover:bg-black transition-colors text-white border-0 py-4 px-6 rounded-[3px] text-[12px] font-bold tracking-[0.15em] flex justify-center items-center cursor-pointer mb-8"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] mr-3">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            CONTINUE WITH GOOGLE
          </button>

          <div className="flex items-center text-center mb-8">
            <div className="flex-1 border-b border-[#eee]"></div>
            <span className="px-4 text-[#aaa] text-[10px] font-bold tracking-[0.15em] uppercase">
              OR CONTINUE WITH
            </span>
            <div className="flex-1 border-b border-[#eee]"></div>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            <Form className="flex flex-col">
              <div className="flex flex-col mb-6 relative">
                <label
                  htmlFor="email"
                  className="text-[11px] font-bold tracking-[0.1em] text-[#666] uppercase mb-3"
                >
                  EMAIL ADDRESS
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@example.com"
                  className="w-full border-0 border-b border-[#ddd] focus:-mt-[1px] focus:border-b-2 focus:border-[#555] transition-colors bg-transparent outline-none pb-2.5 focus:pb-[9px] text-lg text-[#111] placeholder:text-[#aaa]"
                />
                <ErrorMessage name="email" component="div" className="text-[#d12c24] text-[10px] font-bold mt-2 absolute -bottom-5" />
              </div>

              <div className="flex flex-col mb-3">
                <label
                  htmlFor="password"
                  className="text-[11px] font-bold tracking-[0.1em] text-[#666] uppercase mb-3"
                >
                  PASSWORD
                </label>
                <div className="relative flex items-center">
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    placeholder="........."
                    className="w-full border-0 border-b border-[#ddd] focus:-mt-[1px] focus:border-b-2 focus:border-[#555] transition-colors bg-transparent outline-none pb-2.5 focus:pb-[9px] text-lg text-[#111] placeholder:text-[#aaa] pr-10"
                  />
                  <ErrorMessage name="password" component="div" className="text-[#d12c24] text-[10px] font-bold mt-2 absolute -bottom-5 left-0" />
                  <button
                    type="button"
                    className="absolute right-0 top-0 bottom-0 pb-2.5 flex items-center text-[#999] hover:text-[#666] bg-transparent border-0 cursor-pointer"
                    aria-label="Toggle password visibility"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-[20px] h-[20px]"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex justify-end mb-8">
                <a
                  href="#"
                  className="text-[10px] font-bold tracking-[0.1em] text-[#666] uppercase no-underline border-b border-[#aaa] pb-[1px] transition-colors hover:text-[#333] hover:border-[#333]"
                >
                  FORGOT YOUR PASSWORD?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-[#151515] hover:bg-black transition-colors text-white border-0 py-4 px-6 rounded-[3px] text-[13px] font-bold tracking-[0.2em] uppercase cursor-pointer mb-8"
              >
                LOG IN
              </button>
            </Form>
          </Formik>
          <div className="text-center text-[15px] text-[#666]">
            Don't have an account?{' '}
            <a
              href="#"
              className="text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] font-bold no-underline ml-1 transition-colors"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
