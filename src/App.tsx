import { useEffect, useState } from "react";
import { CHARGILY_CLIENT } from "./chargily";
import {
  CreateCheckoutParams,
  ListResponse,
  Price,
  Product,
} from "@chargily/chargily-pay";

function App() {
  const [products, setProducts] = useState<ListResponse<Product>>();
  const [prices, setPrices] = useState<ListResponse<Price>>();

  useEffect(() => {
    CHARGILY_CLIENT.listProducts().then((products) => setProducts(products));
  }, []);

  useEffect(() => {
    CHARGILY_CLIENT.listPrices().then((price) => setPrices(price));
  }, [products]);

  return (
    <div className="flex flex-col justify-center items-center gap-y-6 p-12 bg-zinc-900 text-zinc-100">
      {products?.data.map((product) => {
        const productPrice = prices?.data.find(
          (price) => price.product_id === product.id
        );
        return (
          <div
            key={product.id}
            className="p-6 rounded-xl flex flex-col bg-zinc-700 gap-y-3 w-full"
          >
            <div className="font-bold">{product.name}</div>
            <div className="font-light">{product.description}</div>
            <div className="flex justify-center">
              {product.images.map((pi) => (
                <img key={pi} width={128} src={pi} />
              ))}
            </div>
            <div className="font-bold text-green-400">
              Price: {productPrice?.amount}{" "}
              {productPrice?.currency.toUpperCase()}
            </div>
            <div
              className="bg-green-600 hover:bg-green-700 rounded-xl text-center p-3 cursor-pointer"
              onClick={() => {
                const params: CreateCheckoutParams = {
                  items: [
                    {
                      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                      price: productPrice?.id!,
                      quantity: 1,
                    },
                  ],
                  success_url: "https://youtube.com/",
                };
                console.log(params);

                CHARGILY_CLIENT.createCheckout(params).then((res) => {
                  window.location.href = res.checkout_url;
                });
              }}
            >
              BUY
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
