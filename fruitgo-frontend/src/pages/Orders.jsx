import { useEffect, useState } from "react";
import { getOrders } from "../services/OrderService";

function Orders() {


const [orders, setOrders] = useState([]);

useEffect(() => {

    getOrders()
        .then((response) => {

            const email =
                localStorage.getItem("email");

            const userOrders =
                response.data.filter(
                    order =>
                        order.customerEmail === email
                );

            setOrders(userOrders);

        })
        .catch((error) => {
            console.log(error);
        });

}, []);

return (

    <div className="container mt-4">

        <h2 className="mb-4">
            📦 My Orders
        </h2>

        <table className="table table-bordered table-hover">

            <thead className="table-dark">

                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
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
                        {new Date(
                            order.orderDate
                        ).toLocaleString()}
                    </td>

                    <td>

                        {order.status === "PLACED" && (
                            <span className="badge bg-warning text-dark">
                                PLACED
                            </span>
                        )}

                        {order.status === "PACKED" && (
                            <span className="badge bg-info">
                                PACKED
                            </span>
                        )}

                        {order.status === "SHIPPED" && (
                            <span className="badge bg-primary">
                                SHIPPED
                            </span>
                        )}

                        {order.status === "DELIVERED" && (
                            <span className="badge bg-success">
                                DELIVERED
                            </span>
                        )}

                    </td>

                </tr>

            ))}

            </tbody>

        </table>

    </div>
);


}

export default Orders;

