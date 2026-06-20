import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout({
    cartItems,
    setCartItems
}) {


const [addresses, setAddresses] = useState([]);

const location = useLocation();
const navigate = useNavigate();

const totalAmount =
    location.state?.totalAmount || 0;

const checkoutItems =
    location.state?.cartItems || [];

useEffect(() => {

    axios.get(
       "https://fruitgo-backend-l1on.onrender.com/api/address"
    )
    .then((response) => {

        setAddresses(response.data);

    })
    .catch((error) => {

        console.log(error);

    });

}, []);

const placeOrder = async () => {

    try {

        await axios.post(
           "https://fruitgo-backend-l1on.onrender.com/api/orders",
            {
                customerEmail:
                    localStorage.getItem("email"),

                totalAmount: totalAmount,

                status: "PLACED"
            }
        );

        return true;

    } catch (error) {

        console.log(error);

        alert("Order Failed");

        return false;
    }
};

const handlePayment = () => {

    if (totalAmount <= 0) {

        alert(
            "Cart is Empty"
        );

        return;
    }

    const options = {

        key: "rzp_test_T3Y962TI6N35aE",

        amount: totalAmount * 100,

        currency: "INR",

        name: "FruitGo",

        description: "Fruit Order Payment",

        image:
            "https://cdn-icons-png.flaticon.com/512/415/415733.png",

        handler: async function (response) {

            console.log(
                "Payment Success:",
                response
            );

            for (const item of checkoutItems) {

    await axios.put(

        `https://fruitgo-backend-l1on.onrender.com/api/fruits/stock/${item.id}/${item.quantity}`

    );
}

            const orderPlaced =
                await placeOrder();

           if (orderPlaced) {

    setCartItems([]);

    localStorage.removeItem(
        "cart"
    );

    alert(
        "🎉 Payment Successful & Order Placed!"
    );

    navigate("/orders");
}
        },

        prefill: {

            email:
                localStorage.getItem("email"),

            contact:
                "6300321495"
        },

        theme: {
            color: "#198754"
        }
    };

    const razorpay =
        new window.Razorpay(options);

    razorpay.on(
        "payment.failed",
        function (response) {

            console.log(
                "Payment Failed:",
                response.error
            );

            alert(
                "❌ Payment Failed\n" +
                response.error.description
            );
        }
    );

    razorpay.open();
};

return (

    <div className="container mt-4">

        <h2>
            Checkout
        </h2>

        <h4 className="mt-4">
            Select Delivery Address
        </h4>

        {addresses.map(address => (

            <div
                key={address.id}
                className="card mb-3"
            >

                <div className="card-body">

                    <h5>
                        {address.name}
                    </h5>

                    <p>
                        {address.houseNo},
                        {" "}
                        {address.street},
                        {" "}
                        {address.city},
                        {" "}
                        {address.state}
                        {" - "}
                        {address.pincode}
                    </p>

                </div>

            </div>

        ))}

        <div className="card mb-3">

            <div className="card-body">

                <h4>
                    Total Amount: ₹{totalAmount}
                </h4>

            </div>

        </div>

        <button
            className="btn btn-success"
            onClick={handlePayment}
        >
            Pay ₹{totalAmount}
        </button>

    </div>
);


}

export default Checkout;
