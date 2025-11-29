// Helper function to convert response to JSON
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  }
  throw new Error("Bad Response");
}

// List all product categories you want to merge
const categories = ["tents", "sleeping-bags", "backpacks", "hammocks"]; 
// Add or remove categories based on your json folder

export default class AllProducts {
  constructor() {
    this.paths = categories.map(cat => `../json/${cat}.json`);
  }

  // Load all products from all categories
  async getAllProducts() {
    // Fetch all JSON files at the same time
    const responses = await Promise.all(
      this.paths.map(path => fetch(path).then(convertToJson))
    );

    // Flatten all arrays into one big array
    return responses.flat();
  }

  // Find product by ID across ALL categories
  async findProductById(id) {
    const allProducts = await this.getAllProducts();
    return allProducts.find(item => item.Id === id);
  }
}
