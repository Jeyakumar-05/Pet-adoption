import Pet from "../models/petModel.js";
export const getPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pets" });
  }
};

export const addPet = async (req, res) => {
  try {
    const { id, name, breed, age, image } = req.body;

    const pet = new Pet({
      id,
      name,
      breed,
      age,
      image,
    });

    const createdPet = await pet.save();
    res.status(201).json(createdPet);
  } catch (error) {
    res.status(400).json({ message: "Error adding pet" });
  }
};

export const deletePet = async (req, res) => {
  try {
    const { name } = req.params;

    // Find the pet by name and delete it
    const pet = await Pet.findOneAndDelete({ name });

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting pet", error: error.message });
  }
};
