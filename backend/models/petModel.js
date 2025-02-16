import mongoose from "mongoose";

const petSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
},{timestamps: true});

const Pet = mongoose.model("Pet", petSchema);

export default Pet;
