function Profile() {

    const email =
        localStorage.getItem("email");

    const role =
        localStorage.getItem("role");

    return (

        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="mb-4">
                        👤 My Profile
                    </h2>

                    <p>
                        <strong>Email:</strong> {email}
                    </p>

                    <p>
                        <strong>Role:</strong> {role}
                    </p>

                </div>

            </div>

        </div>

    );
}

export default Profile;