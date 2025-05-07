import mongoose from "mongoose";

const connectMongoDB = async() => {
  try {
    await mongoose.connect("");
    console.log("Conectado con MongoDB!");
  } catch (error) {
    console.log("Error al conectar con mongodb");
  }
}

export default connectMongoDB;