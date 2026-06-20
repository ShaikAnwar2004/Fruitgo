import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {

    const [orders, setOrders] =
        useState([]);

    const loadOrders = () => {

        axios.get(
            "https://fruitgo-backend-l1on.onrender.com/api/orders"
        )
        .then((response) => {

            setOrders(response.data);

        });
    };

    useEffect(() => {

        loadOrders();

    }, []);

    const updateStatus =
        async (id, status) => {

        await axios.put(
            `https://fruitgo-backend-l1on.onrender.com/api/orders/${id}/${status}`
        );

        loadOrders();
    };

    return (

        <div className="container mt-4">

            <h2>
                📦 Admin Orders
            </h2>

            <table className="table">

                <thead>

                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>

                </thead>

                <tbody>

                {orders.map(order => (

                    <tr key={order.id}>

                        <td>{order.id}</td>

                        <td>
                            {order.customerEmail}
                        </td>

                        <td>
                            ₹{order.totalAmount}
                        </td>

                        <td>
                            {order.status}
                        </td>

                        <td>

                            <button
                                className="btn btn-info me-2"
                                onClick={() =>
                                    updateStatus(
                                        order.id,
                                        "PACKED"
                                    )
                                }
                            >
                                PACKED
                            </button>

                            <button
                                className="btn btn-primary me-2"
                                onClick={() =>
                                    updateStatus(
                                        order.id,
                                        "SHIPPED"
                                    )
                                }
                            >
                                SHIPPED
                            </button>

                            <button
                                className="btn btn-success"
                                onClick={() =>
                                    updateStatus(
                                        order.id,
                                        "DELIVERED"
                                    )
                                }
                            >
                                DELIVERED
                            </button>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
}

export default AdminOrders;