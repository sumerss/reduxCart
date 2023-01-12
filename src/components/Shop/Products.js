import ProductItem from './ProductItem';
import classes from './Products.module.css';

const allProducts = [
  {
    id: 1,
    title: 'Book1',
    price: 9,
    description: 'This is my first book - amazing!'
  },
  {
    id: 2,
    title: 'Book2',
    price: 5,
    description: 'This is my second book - amazing!'
  },
  {
    id: 3,
    title: 'Book3',
    price: 14,
    description: 'This is my third book - amazing!'
  },
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {allProducts.map((item) => {
          return <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        })}
      </ul>
    </section>
  );
};

export default Products;
