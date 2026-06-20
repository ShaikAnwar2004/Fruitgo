import { useNavigate } from "react-router-dom";

function Cart({ cartItems, setCartItems }) {

    const navigate = useNavigate();

    const increaseQuantity = (id) => {

        const updatedCart = cartItems.map(item =>
            item.id === id
                ? {
                    ...item,
                    quantity: item.quantity + 1
                }
                : item
        );

        setCartItems(updatedCart);
    };

    const decreaseQuantity = (id) => {

        const updatedCart = cartItems
            .map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity - 1
                    }
                    : item
            )
            .filter(item => item.quantity > 0);

        setCartItems(updatedCart);
    };

    const removeItem = (id) => {

        const updatedCart = cartItems.filter(
            item => item.id !== id
        );

        setCartItems(updatedCart);
    };

    const total = cartItems.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    const handleCheckout = () => {

        const token =
            localStorage.getItem("token");

        if (!token) {

            alert(
                "Please Login First To Place An Order"
            );

            navigate("/login");

            return;
        }

        navigate("/checkout", {
            state: {
                totalAmount: total,
                cartItems: cartItems
            }
        });
    };

    return (

        <div className="container mt-4">

            <h2>🛒 My Cart</h2>

            {cartItems.length === 0 ? (

                <h4>Cart is Empty</h4>

            ) : (

                <>
                    <table className="table">

                        <thead>

                            <tr>
                                <th>Fruit</th>
                                <th>Price</th>
                                <th>Qty</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {cartItems.map(item => (

                                <tr key={item.id}>

                                    <td>{item.name}</td>

                                    <td>₹{item.price}</td>

                                    <td>{item.quantity}</td>

                                    <td>

                                        <button
                                            className="btn btn-success me-2"
                                            onClick={() =>
                                                increaseQuantity(item.id)
                                            }
                                        >
                                            +
                                        </button>

                                        <button
                                            className="btn btn-warning me-2"
                                            onClick={() =>
                                                decreaseQuantity(item.id)
                                            }
                                        >
                                            -
                                        </button>

                                        <button
                                            className="btn btn-danger"
                                            onClick={() =>
                                                removeItem(item.id)
                                            }
                                        >
                                            Remove
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    <h3>
                        Total: ₹{total}
                    </h3>

                    <button
                        className="btn btn-success mt-3"
                        onClick={handleCheckout}
                    >
                        Proceed To Checkout
                    </button>

                </>

            )}

        </div>
    );
}

export default Cart;