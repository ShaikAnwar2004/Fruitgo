import { useEffect, useState } from "react";
import { getAllFruits } from "../services/FruitService";
import { Link } from "react-router-dom";

function Home({ cartItems, setCartItems }) {


const [fruits, setFruits] = useState([]);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("ALL");

useEffect(() => {

    getAllFruits()
        .then((response) => {

            setFruits(response.data);

        })
        .catch((error) => {

            console.log(error);

        });

}, []);

const addToCart = (fruit) => {

    if (fruit.quantity <= 0) {

        alert("Out Of Stock");

        return;
    }

    const existingItem = cartItems.find(
        item => item.id === fruit.id
    );

    if (existingItem) {

        const updatedCart = cartItems.map(
            item =>
                item.id === fruit.id
                    ? {
                          ...item,
                          quantity:
                              item.quantity + 1
                      }
                    : item
        );

        setCartItems(updatedCart);

    } else {

        setCartItems([
            ...cartItems,
            {
                ...fruit,
                quantity: 1
            }
        ]);
    }
};

const filteredFruits =
    fruits.filter(fruit => {

        const matchesSearch =
            fruit.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                );

        const matchesCategory =
    category === "ALL"
        ? true
        : (fruit.category || "") === category;

        return (
            matchesSearch &&
            matchesCategory
        );
    });

return (

    <div className="container mt-4">

        <h1 className="mb-4 text-center">
            🍎 FruitGo
        </h1>

        <div className="hero-banner">

            <h2>
                Fresh Fruits Delivered Fast 🚚
            </h2>

            <p>
                Order fresh fruits online
                and get them delivered
                to your doorstep.
            </p>

        </div>

        <div className="mb-4">

            <button
                className="btn btn-dark me-2"
                onClick={() =>
                    setCategory("ALL")
                }
            >
                All
            </button>

            <button
                className="btn btn-success me-2"
                onClick={() =>
                    setCategory("FRUIT")
                }
            >
                🍎 Fruits
            </button>

            <button
                className="btn btn-info"
                onClick={() =>
                    setCategory("BOWL")
                }
            >
                🥗 Fresh Fruit Bowls
            </button>

        </div>

        <div className="mb-4">

            <input
                type="text"
                className="form-control search-box"
                placeholder="🔍 Search Products..."
                value={search}
                onChange={(e) =>
                    setSearch(
                        e.target.value
                    )
                }
            />

        </div>

        <div className="row">

            {filteredFruits.map(
                (fruit) => (

                <div
                    className="col-md-4 mb-4"
                    key={fruit.id}
                >

                    <div className="card h-100 shadow">

                        <img
                            src={
                                fruit.imageUrl
                            }
                            className="card-img-top"
                            alt={
                                fruit.name
                            }
                            style={{
                                height:
                                    "220px",
                                objectFit:
                                    "cover"
                            }}
                        />

                        <div className="card-body">

                            <Link
                                to={`/fruit/${fruit.id}`}
                                className="text-decoration-none"
                            >

                                <h5 className="card-title">
                                    {fruit.name}
                                </h5>

                            </Link>

                            <span className="badge bg-secondary mb-2">

                               {fruit.category === "FRUIT"
                                     ? "🍎 Fruit"
                                     : fruit.category === "BOWL"
                                     ? "🥗 Bowl"
                                     : "🍏 Uncategorized"}

                            </span>

                            <p className="card-text">

                                {fruit.description}

                            </p>

                            <h4 className="text-success">
                                    ₹{fruit.price}
                            </h4>

                            <p className="fw-bold">

                             Stock:
                             {fruit.quantity}

                            </p>

{fruit.quantity > 0 ? (

    cartItems.find(item => item.id === fruit.id) ? (

        <div className="d-flex justify-content-center align-items-center">

            <button
                className="btn btn-warning"
                onClick={() => {

                    const updatedCart =
                        cartItems
                            .map(item =>
                                item.id === fruit.id
                                    ? {
                                          ...item,
                                          quantity:
                                              item.quantity - 1
                                      }
                                    : item
                            )
                            .filter(
                                item =>
                                    item.quantity > 0
                            );

                    setCartItems(updatedCart);
                }}
            >
                -
            </button>

            <span className="mx-3 fw-bold fs-5">

                {
                    cartItems.find(
                        item =>
                            item.id === fruit.id
                    )?.quantity
                }

            </span>

            <button
                className="btn btn-success"
                onClick={() =>
                    addToCart(fruit)
                }
            >
                +
            </button>

        </div>

    ) : (

        <button
            className="btn btn-success w-100"
            onClick={() =>
                addToCart(fruit)
            }
        >
            Add To Cart
        </button>

    )

) : (

    <button
        className="btn btn-danger w-100"
        disabled
    >
        Out Of Stock
    </button>

)}

                        </div>

                    </div>

                </div>

            ))}

        </div>

    </div>

);


}

export default Home;
