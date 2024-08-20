import logging

from flask import Flask, jsonify
from redis import Redis

app = Flask(__name__)
redis = Redis(host='redis', port=6379)

@app.route('/health')
def health():
    return {"status": "OK"}

@app.route('/api/products')
def hello():
    redis.incr('hits')
    counter = str(redis.get('hits'),'utf-8')

    logging.getLogger().info("Loading products")

    return jsonify([
  {
    "id": 11,
    "name": "Cappuccino",
    "description": "A classic espresso-based coffee drink topped with steamed milk foam.",
    "price": 4.50
  },
  {
    "id": 12,
    "name": "Latte",
    "description": "Smooth espresso with steamed milk, available in various flavors.",
    "price": 4.75
  },
  {
    "id": 13,
    "name": "Americano",
    "description": "Espresso diluted with hot water for a rich and smooth flavor.",
    "price": 3.50
  },
  {
    "id": 14,
    "name": "Mocha",
    "description": "A chocolate-flavored variant of a latte with whipped cream on top.",
    "price": 5.00
  },
  {
    "id": 15,
    "name": "Flat White",
    "description": "Velvety smooth espresso with a thin layer of steamed milk.",
    "price": 4.25
  },
  {
    "id": 16,
    "name": "Iced Coffee",
    "description": "Cold brew or chilled coffee served over ice, customizable with flavors and milk.",
    "price": 3.75
  },
  {
    "id": 17,
    "name": "Espresso Shot",
    "description": "A single shot of rich, intense espresso, served straight.",
    "price": 2.50
  },
  {
    "id": 18,
    "name": "Macchiato",
    "description": "Espresso 'stained' with a small amount of foamed milk, available in different flavors.",
    "price": 4.00
  },
  {
    "id": 19,
    "name": "Chai Latte",
    "description": "Spiced tea mixed with steamed milk for a warm and aromatic drink.",
    "price": 4.50
  },
  {
    "id": 20,
    "name": "Pastry",
    "description": "Assortment of freshly baked pastries, including croissants, muffins, and scones.",
    "price": 2.75
  },
  {
    "id": 1,
    "name": "Espresso Machine",
    "description": "High-performance espresso machine with programmable settings and a sleek design.",
    "price": 249.99
  },
  {
    "id": 2,
    "name": "French Press",
    "description": "Classic French press coffee maker with stainless steel frame and heat-resistant glass.",
    "price": 29.95
  },
  {
    "id": 3,
    "name": "Coffee Grinder",
    "description": "Electric coffee grinder with adjustable settings for different grind sizes.",
    "price": 39.99
  },
  {
    "id": 4,
    "name": "Cold Brew Maker",
    "description": "Large-capacity cold brew coffee maker with a fine-mesh filter for smooth results.",
    "price": 24.99
  },
  {
    "id": 5,
    "name": "Reusable Coffee Filter",
    "description": "Eco-friendly stainless steel coffee filter, compatible with most drip coffee makers.",
    "price": 12.99
  },
  {
    "id": 6,
    "name": "Travel Coffee Mug",
    "description": "Insulated travel coffee mug with leak-proof lid and double-wall construction.",
    "price": 19.99
  },
  {
    "id": 7,
    "name": "Pour-Over Coffee Maker",
    "description": "Glass pour-over coffee maker with a reusable stainless steel filter.",
    "price": 34.95
  },
  {
    "id": 8,
    "name": "Coffee Bean Storage Container",
    "description": "Airtight coffee bean storage container with a vacuum seal to keep beans fresh.",
    "price": 17.99
  },
  {
    "id": 9,
    "name": "Milk Frother",
    "description": "Electric milk frother for creating creamy foam for lattes and cappuccinos.",
    "price": 15.99
  },
  {
    "id": 10,
    "name": "Coffee Scoop",
    "description": "Stainless steel coffee scoop with a long handle for easy measuring.",
    "price": 6.99
  }
])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8002, debug=True)
