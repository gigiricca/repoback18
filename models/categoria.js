// models/categoria.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Categoria = sequelize.define("categoria", {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true, // Puede ser opcional
  },
  imagen: {
    type: DataTypes.STRING, // Ruta o URL de la imagen
    allowNull: true, // Puede ser opcional
  }
}, {
  timestamps: false,
  tableName: 'categorias'  // Especifica el nombre de la tabla
});

module.exports = Categoria;
