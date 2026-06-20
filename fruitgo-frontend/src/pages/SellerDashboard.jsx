import { useEffect, useState } from "react";
import axios from "axios";

import { Navigate } from "react-router-dom";

const role = localStorage.getItem("role");

if (role !== "SELLER" && role !== "ADMIN") {
    return <Navigate to="/" />;
}

function SellerDashboard() {


const role =
    localStorage.getItem("role");

console.log("ROLE =", role);

if (role !== "ADMIN") {

    return (

        <div className="container mt-5">

            <h2>
                Access Denied 🚫
            </h2>

            <p>
                Only Admin can access
                Seller Dashboard
            </p>

        </div>

    );
}

const [fruits, setFruits] = useState([]);

const [fruit, setFruit] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    imageUrl: ""
});

const [editingId, setEditingId] =
    useState(null);

const editFruit = (fruit) => {

    setFruit({
        name: fruit.name,
        description: fruit.description,
        price: fruit.price,
        quantity: fruit.quantity,
        category: fruit.category || "",
        imageUrl: fruit.imageUrl || ""
    });

    setEditingId(fruit.id);
};

const loadFruits = () => {

    axios.get(
        "https://fruitgo-backend-l1on.onrender.com/api/fruits"
    )
    .then((response) => {

        setFruits(response.data);

    });
};

useEffect(() => {

    loadFruits();

}, []);

const handleChange = (e) => {

    setFruit({
        ...fruit,
        [e.target.name]:
            e.target.value
    });
};

const addFruit = async (e) => {

    e.preventDefault();

    try {

        if (editingId) {

            await axios.put(
                `https://fruitgo-backend-l1on.onrender.com/api/fruits/${editingId}`,
                fruit
            );

            alert(
                "Fruit Updated"
            );

            setEditingId(null);

        } else {

            await axios.post(
              "https://fruitgo-backend-l1on.onrender.com/api/fruits",
                fruit
            );

            alert(
                "Fruit Added"
            );
        }

        setFruit({
            name: "",
            description: "",
            price: "",
            quantity: "",
            category: "",
            imageUrl: ""
        });

        loadFruits();

    } catch (error) {

        console.log(error);

        alert(
            "Failed To Save Fruit"
        );
    }
};

const deleteFruit = async (id) => {

    await axios.delete(
       `https://fruitgo-backend-l1on.onrender.com/api/fruits/${id}`
    );

    loadFruits();
};

const handleFileUpload =
    async (e) => {

    const formData =
        new FormData();

    formData.append(
        "file",
        e.target.files[0]
    );

    try {

        const response =
            await axios.post(
                "https://fruitgo-backend-l1on.onrender.com/api/upload",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

        setFruit({
            ...fruit,
            imageUrl:
                response.data
        });

        alert(
            "Image Uploaded Successfully"
        );

    } catch (error) {

        console.log(error);

        alert(
            "Image Upload Failed"
        );
    }
};

return (

    <div className="container mt-4">

        <h2>
            🏪 Seller Dashboard
        </h2>

        <form
            onSubmit={addFruit}
            className="mb-4"
        >

            <input
                type="text"
                name="name"
                placeholder="Fruit Name"
                className="form-control mb-2"
                value={fruit.name}
                onChange={handleChange}
            />

            <input
                type="text"
                name="description"
                placeholder="Description"
                className="form-control mb-2"
                value={fruit.description}
                onChange={handleChange}
            />

            <input
                type="number"
                name="price"
                placeholder="Price"
                className="form-control mb-2"
                value={fruit.price}
                onChange={handleChange}
            />

            <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                className="form-control mb-2"
                value={fruit.quantity}
                onChange={handleChange}
            />

            <select
                name="category"
                className="form-control mb-2"
                value={fruit.category}
                onChange={handleChange}
            >

                <option value="">
                    Select Category
                </option>

                <option value="FRUIT">
                    Fruits
                </option>

                <option value="BOWL">
                    Fresh Fruit Bowls
                </option>

            </select>

            <input
                type="file"
                className="form-control mb-2"
                onChange={handleFileUpload}
            />

            <button
                type="submit"
                className="btn btn-success"
            >
                {editingId
                    ? "Update Fruit"
                    : "Add Fruit"}
            </button>

        </form>

        <table className="table">

            <thead>

                <tr>

                    <th>Name</th>

                    <th>Category</th>

                    <th>Price</th>

                    <th>Stock</th>

                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

            {fruits.map(fruit => (

                <tr key={fruit.id}>

                    <td>
                        {fruit.name}
                    </td>

                    <td>

                        {fruit.category ===
                        "FRUIT"
                            ? "🍎 Fruits"
                            : "🥗 Fresh Fruit Bowl"}

                    </td>

                    <td>
                        ₹{fruit.price}
                    </td>

                    <td>
                        {fruit.quantity}
                    </td>

                    <td>

                        <button
                            type="button"
                            className="btn btn-warning me-2"
                            onClick={() =>
                                editFruit(
                                    fruit
                                )
                            }
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() =>
                                deleteFruit(
                                    fruit.id
                                )
                            }
                        >
                            Delete
                        </button>

                    </td>

                </tr>

            ))}

            </tbody>

        </table>

    </div>
);


}

export default SellerDashboard;
