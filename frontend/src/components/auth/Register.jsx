import { useState } from "react";
import { message} from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
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
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${apiURL}/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("authdata",JSON.stringify(data));
          navigate("/");
          message.success("Kaydınız başarıyla gerçekleşti.");
        }
        else {
          message.error("Kayıt başarısız.");
        }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="account-column">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div>
            <label>
              <span>
                Email address <span className="required">*</span>
              </span>
              <input name="email" type="email" onChange={handleInputChange} />
            </label>
          </div>
          <div>
            <label>
              <span>
                Password <span className="required">*</span>
              </span>
              <input
                name="password"
                type="password"
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="privacy-policy-text remember">
            <p>
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our <a href="#">privacy policy.</a>
            </p>
            <button className="btn btn-sm">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
