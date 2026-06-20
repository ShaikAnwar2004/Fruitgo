import { useState } from "react";
import axios from "axios";

function Address() {

    const [address, setAddress] = useState({
        name: "",
        phone: "",
        houseNo: "",
        street: "",
        city: "",
        state: "",
        pincode: ""
    });

    const handleChange = (e) => {

        setAddress({
            ...address,
            [e.target.name]: e.target.value
        });
    };

    const saveAddress = async (e) => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/api/address",
                address
            );

            alert("Address Saved Successfully");

            setAddress({
                name: "",
                phone: "",
                houseNo: "",
                street: "",
                city: "",
                state: "",
                pincode: ""
            });

        } catch (error) {

            console.log(error);

            alert("Failed To Save Address");
        }
    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="mb-4">
                        🏠 Delivery Address
                    </h2>

                    <form onSubmit={saveAddress}>

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="form-control mb-2"
                            value={address.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            className="form-control mb-2"
                            value={address.phone}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="houseNo"
                            placeholder="House No"
                            className="form-control mb-2"
                            value={address.houseNo}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="street"
                            placeholder="Street"
                            className="form-control mb-2"
                            value={address.street}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            className="form-control mb-2"
                            value={address.city}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            className="form-control mb-2"
                            value={address.state}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            name="pincode"
                            placeholder="Pincode"
                            className="form-control mb-3"
                            value={address.pincode}
                            onChange={handleChange}
                            required
                        />

                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            Save Address
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default Address;