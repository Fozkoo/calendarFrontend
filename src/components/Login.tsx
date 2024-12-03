
import { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import servicesAPI from '../service/Helper';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const loginResponse = await servicesAPI.login(formData.username, formData.password);

      if (loginResponse.userId) {
        const { token, userId } = loginResponse;

        const authorizeResponse = await servicesAPI.authorized(token, "4");

        if (authorizeResponse.authorized) {
          login(userId, token);
          navigate('/home');
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'You are not authorized to access this page',
            icon: 'error',
            confirmButtonText: 'Okey'
          }) 
          navigate('/login');
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: ' Wrong password or user not found',
          icon: 'error',
          confirmButtonText: 'Okey'
        })
      }
    } catch (error) {
      console.error('Error al iniciar sesión o verificar autorización:', error);
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login bg-white w-[434px] h-[700px] mt-10 mx-auto rounded-2xl shadow-xl flex flex-col items-center p-8 max-2xl:w-[390px] max-2xl:shadow-2xl">
      <h2 className="font-bold text-4xl mt-10 mb-6">Login</h2>
      <form className="w-full flex flex-col items-center space-y-4 gap-9 mt-[10%]" onSubmit={sendForm}>
        <div className="text_area w-full h-16 rounded-lg shadow-md flex items-center">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="text_input w-4/5 ml-5 border-none text-lg outline-none"
          />
        </div>
        <div className="text_area w-full h-16 rounded-lg shadow-md flex items-center">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="text_input w-4/5 ml-5 border-none text-lg outline-none"
          />
          {showPassword ? (
            <BiShow onClick={togglePasswordVisibility} className="h-6 w-6 cursor-pointer" />
          ) : (
            <BiHide onClick={togglePasswordVisibility} className="h-6 w-6 cursor-pointer" />
          )}
        </div>
        <input
          type="submit"
          value="LOGIN"
          className="btn mt-6 w-40 h-14 rounded-full bg-purple-400 text-white font-semibold text-lg shadow-md cursor-pointer hover:bg-purple-500"
        />
      </form>
    </div>
  );
}

export default Login;
