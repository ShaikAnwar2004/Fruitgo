import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllFruits } from "../services/FruitService";

function FruitDetails({ cartItems, setCartItems }) {


const { id } = useParams();

const [fruit, setFruit] = useState(null);

useEffect(() => {

    getAllFruits()
        .then((response) => {

            const selectedFruit =
                response.data.find(
                    f => f.id === Number(id)
                );

            setFruit(selectedFruit);
        })
        .catch((error) => {

            console.log(error);

        });

}, [id]);

if (!fruit) {

    return (

        <div className="container mt-5">

            <h2>
                Loading...
            </h2>

        </div>

    );
}

const addToCart = () => {

    if (fruit.quantity <= 0) {

        alert("Out Of Stock");

        return;
    }

    const existingItem = cartItems.find(
        item => item.id === fruit.id
    );

    if (existingItem) {

        const updatedCart =
            cartItems.map(item =>
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

    alert(
        "Added To Cart Successfully"
    );
};

return (

    <div className="container mt-5">

        <div className="card shadow p-4">

            <div className="row">

                <div className="col-md-6">

                    <img
                        src={fruit.imageUrl}
                        alt={fruit.name}
                        className="img-fluid rounded"
                        style={{
                            height: "400px",
                            width: "100%",
                            objectFit: "cover"
                        }}
                    />

                </div>

                <div className="col-md-6">

                    <h1>
                        {fruit.name}
                    </h1>

                    <div className="mb-3">

                        {fruit.category ===
                        "FRUIT" ? (

                            <span className="badge bg-success fs-6">

                                🍎 Fruit

                            </span>

                        ) : (

                            <span className="badge bg-info fs-6">

                                🥗 Fresh Fruit Bowl

                            </span>

                        )}

                    </div>

                    <h2 className="text-success">

                        ₹{fruit.price}

                    </h2>

                    <hr />

                    <h5>
                        Description
                    </h5>

                    <p>
                        {fruit.description}
                    </p>

                    <h5>
                        Availability
                    </h5>

                    {fruit.quantity > 0 ? (

                        <p className="text-success fw-bold">

                            ✅ In Stock
                            ({fruit.quantity})

                        </p>

                    ) : (

                        <p className="text-danger fw-bold">

                            ❌ Out Of Stock

                        </p>

                    )}

                    {fruit.quantity > 0 ? (

                        <button
                            className="btn btn-success btn-lg mt-3"
                            onClick={addToCart}
                        >
                            Add To Cart
                        </button>

                    ) : (

                        <button
                            className="btn btn-danger btn-lg mt-3"
                            disabled
                        >
                            Out Of Stock
                        </button>

                    )}

                </div>

            </div>

        </div>

    </div>
);


}

export default FruitDetails;
