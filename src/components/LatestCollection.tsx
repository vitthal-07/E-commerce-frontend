import { motion } from "motion/react";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Product } from "../types";
import ProductItem from "./ProductItem";
import Title from "./Title";

const LatestCollection = () => {
  const { products, loading } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState<Product[]>();

  useEffect(() => {
    setLatestProducts(products?.slice(0, 6));
  }, [loading, products]);

  if (loading) {
    return <div className="text-md font-normal mt-3">Loading Products....</div>;
  }

  return (
    <motion.div
      className="my-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTION" />
        <motion.p
          className="w-3/4 text-xs sm:text-base text-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet autem
          voluptatum aut iste, facilis aperiam cumque?
        </motion.p>
      </div>
      {/* Rendering Products */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {latestProducts?.map((product, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <ProductItem
              Id={product._id}
              image={product.imageUrls}
              name={product.name}
              price={product.price}
              description={product.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default LatestCollection;
