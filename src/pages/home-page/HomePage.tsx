import { useDispatch } from 'react-redux';
import { removeToken } from '../../store/slices/authSlicer';
import { useNavigate } from 'react-router';

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeToken());
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center">
        <h1 className="text-4xl font-extrabold text-[#111] mb-4">Hi!</h1>
        <p className="text-[#666] mb-8 text-lg">
          You are successfully authenticated.
        </p>
        <button
          onClick={handleLogout}
          className="w-full bg-[#151515] hover:bg-black text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-[1.02]"
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}
