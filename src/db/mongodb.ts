const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Iniciando conexão com o MongoDB");
    await mongoose.connect("mongodb://mongodb:27017/KnightChallenge");
    console.log("Conexão com o MongoDB estabelecida.");
  } catch (error: any) {
    console.error("Erro ao conectar ao MongoDB:", error.message);
  }
};

export default connectDB;
