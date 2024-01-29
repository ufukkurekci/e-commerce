import mongoose from "mongoose";
import nanoid from "../utils/nanoid";

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const ReviewsSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  user: {
    type: ObjectId,
    required: true,
    ref: "Users"
  }
});

const Reviews = mongoose.model("Reviews", ReviewsSchema);
const ProductsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    description: {
      type: String,
    },
    categories: {
      type: [String],
    },
    brand: {
      type: String,
    },
    price: {
      basePrice: {
        type: Number,
        required: true,
      },
      discountPrice: {
        type: Number,
        required: true,
      },
    },
    currency: {
      type: String,
      required: true,
      default: "TRY",
      enum: ["TRY", "USD", "EUR"],
    },
    stock: {
      type: Number,
      required: true,
      default: 1,
    },
    itemType: {
      type: String,
      required: true,
      default: "PHYSICAL",
      enum: ["PHYSICAL", "VIRTUAL"],
    },
    reviews: {
      type: [ReviewsSchema],
      ref: "Reviews",
    },
  },
  {
    _id: true,
    collection: "products",
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return {
          ...ret,
        };
      },
    },
  }
);

const Products = mongoose.model("Products", ProductsSchema);

Products.starterData = [
  {
    name: "Samsung Galaxy S20",
    images: [
      "https://picsum.photos/500/500?random=1",
      "https://picsum.photos/500/500?random=1",
      "https://picsum.photos/500/500?random=1",
    ],
    description: "Android",
    categories: ["Telefonlar", "Android Telefonlar"],
    brand: "Samsung",
    price: { basePrice: 1200, discountPrice: 1000 },
    currency: "TRY",
    stock: 10,
    itemType: "PHYSICAL",
    reviews: {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      user: "65b6690f671c974227eab03a",
    },
  },
  {
    _id: new mongoose.Types.ObjectId("61d055016272c60f701be7ac"),
    name: "Iphone 12",
    uid: "dbMgV8AcuUMlc0sEUAaw",
    images: [
      "https://picsum.photos/500/500?random=1",
      "https://picsum.photos/500/500?random=1",
      "https://picsum.photos/500/500?random=1",
    ],
    categories: ["Telefonlar", "iOS Telefonlar"],
    brand: "Apple",
    price: 13000,
    currency: "TRY",
    stock: 5,
    itemType: "PHYSICAL",
  },
  {
    _id: new mongoose.Types.ObjectId("61d055095087612ecee33a20"),
    name: "Ipad Pro 2021",
    uid: "dbMgV8AcuUMlc0sEUAaq",
    images: [
      "https://picsum.photos/500/500?random=1",
      "https://picsum.photos/500/500?random=1",
      "https://picsum.photos/500/500?random=1",
    ],
    categories: ["Tabletler", "iPad"],
    brand: "Apple",
    price: 18000,
    currency: "TRY",
    stock: 8,
    itemType: "PHYSICAL",
  },
];

Products.initializer = async () => {
  const count = await Products.estimatedDocumentCount();
  if (count == 0) {
    const created = await Products.create(Products.starterData);
    console.log(`${created.length} Products created`);
    console.log(Products.starterData);
  }
};

//Products.initializer();

export default Products;
