import { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const apiURL = import.meta.env.VITE_API_BASE_URL;
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${apiURL}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json(); // token burda
        console.log(data);
        localStorage.setItem("authdata", JSON.stringify(data));
        console.log(data.user.role);
        if (data.user.role === "admin") {
          window.location.href = "/admin";
        }
        if (data.user.role === "user") {
          navigate("/");
        }
        message.success("Giriş yapıldı.");
      } else {
        message.error("E-posta adresiniz veya şifreniz hatalı.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="account-column">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              <span>
                Email address <span className="required">*</span>
              </span>
              <input name="email" onChange={handleInputChange} type="text" />
            </label>
          </div>
          <div>
            <label>
              <span>
                Password <span className="required">*</span>
              </span>
              <input
                name="password"
                onChange={handleInputChange}
                type="password"
              />
            </label>
          </div>
          <p className="remember">
            <label>
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <button className="btn btn-sm">Login</button>
          </p>
          <a href="#" className="form-link">
            Lost your password?
          </a>
        </form>
      </div>
    </>
  );
};

export default Login;
