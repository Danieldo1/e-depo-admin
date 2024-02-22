export function filterProductsByProperty(product, propertyFilterValue) {
  if (!propertyFilterValue) return true; // If no property filter is selected, return all products

  // Check if any property of the product matches the filter value
  return (
    product.properties &&
    Object.values(product.properties).includes(propertyFilterValue)
  );
}
export function uniquePropertyKeys(products) {
  const keys = new Set();
  products.forEach((product) => {
    if (product.properties) {
      Object.keys(product.properties).forEach((key) => keys.add(key));
    }
  });
  return Array.from(keys);
}