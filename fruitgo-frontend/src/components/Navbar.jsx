import { Link, useNavigate } from "react-router-dom";

function Navbar({ cartCount }) {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.clear();

        alert(
            "Logged Out Successfully"
        );

        navigate("/login");
    };

    const token =
        localStorage.getItem("token");

    const role =
        localStorage.getItem("role");

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-success">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to="/"
                >
                    🍎 FruitGo
                </Link>

                <div className="ms-auto d-flex align-items-center">

                    {token && (

                        <span className="text-white fw-bold me-3">

                            {role}

                        </span>

                    )}

                    <Link
                        to="/cart"
                        className="btn btn-warning me-2"
                    >
                        Cart ({cartCount})
                    </Link>

                    {token ? (

                        <div className="dropdown">

                            <button
                                className="btn btn-primary dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                            >
                                Profile
                            </button>

                            <ul className="dropdown-menu dropdown-menu-end">

                                <li>

                                    <Link
                                        className="dropdown-item"
                                        to="/profile"
                                    >
                                        👤 My Profile
                                    </Link>

                                </li>

                                <li>

                                    <Link
                                        className="dropdown-item"
                                        to="/address"
                                    >
                                        🏠 Address
                                    </Link>

                                </li>

                                <li>

                                    <Link
                                        className="dropdown-item"
                                        to="/orders"
                                    >
                                        📦 My Orders
                                    </Link>

                                </li>

                                {role === "ADMIN" && (

                                    <>

                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>

                                        <li>

                                            <Link
                                                className="dropdown-item"
                                                to="/seller"
                                            >
                                                🏪 Seller Dashboard
                                            </Link>

                                        </li>

                                        <li>

                                            <Link
                                                className="dropdown-item"
                                                to="/dashboard"
                                            >
                                                📊 Revenue Dashboard
                                            </Link>

                                        </li>

                                        <li>

                                            <Link
                                                className="dropdown-item"
                                                to="/admin-orders"
                                            >
                                                📋 Admin Orders
                                            </Link>

                                        </li>

                                    </>

                                )}

                                <li>
                                    <hr className="dropdown-divider" />
                                </li>

                                <li>

                                    <button
                                        className="dropdown-item text-danger"
                                        onClick={logout}
                                    >
                                        🚪 Logout
                                    </button>

                                </li>

                            </ul>

                        </div>

                    ) : (

                        <>

                            <Link
                                to="/login"
                                className="btn btn-light me-2"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="btn btn-info"
                            >
                                Register
                            </Link>

                        </>

                    )}

                </div>

            </div>

        </nav>

    );
}

export default Navbar;


