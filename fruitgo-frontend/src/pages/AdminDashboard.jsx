import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function AdminDashboard() {

    const role = localStorage.getItem("role");

    if (role !== "ADMIN") {
        return <Navigate to="/" />;
    }

    const [stats, setStats] = useState({});
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        axios.get(
            "https://fruitgo-backend.onrender.com/api/dashboard"
        )
        .then((response) => {
            setStats(response.data);
        });

        axios.get(
            "https://fruitgo-backend.onrender.com/api/orders"
        )
        .then((response) => {
            setOrders(response.data);
        });

    }, []);

    return (

        <div className="container mt-4">

            <h2 className="mb-4">
                📊 Revenue Dashboard
            </h2>

            <div className="row">

                <div className="col-md-4">
                    <div className="card shadow mb-3">
                        <div className="card-body">
                            <h4>🍎 Fruits</h4>
                            <h2>{stats.totalFruits}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow mb-3">
                        <div className="card-body">
                            <h4>📦 Orders</h4>
                            <h2>{stats.totalOrders}</h2>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow mb-3">
                        <div className="card-body">
                            <h4>💰 Revenue</h4>
                            <h2>₹{stats.totalRevenue}</h2>
                        </div>
                    </div>
                </div>

            </div>

            <div className="mt-5">

                <h3>📋 Recent Orders</h3>

                <table className="table table-bordered table-hover">

                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>

                    <tbody>

                    {orders
                        .slice()
                        .reverse()
                        .slice(0, 5)
                        .map(order => (

                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customerEmail}</td>
                            <td>₹{order.totalAmount}</td>
                            <td>{order.status}</td>
                            <td>
                                {new Date(order.orderDate).toLocaleString()}
                            </td>
                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

        </div>

    );
}

export default AdminDashboard;
