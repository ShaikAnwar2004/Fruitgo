import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "https://fruitgo-backend.onrender.com/api/users/login",
                loginData
            );
            console.log(response.data);
            localStorage.setItem(
    "token",
    response.data.token
);

localStorage.setItem(
"token",
response.data.token
);

localStorage.setItem(
"role",
response.data.role
);

localStorage.setItem(
    "email",
    loginData.email
);


alert("Login Successful");

navigate("/");

        } catch (error) {

            console.log(error);

            alert("Login Failed");
        }
    };

    return (
        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">
                                Login
                            </h2>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label>Email</label>

                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={loginData.email}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="mb-3">

                                    <label>Password</label>

                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={loginData.password}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Login
                                </button>

                            </form>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;