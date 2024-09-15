const Caracteristica = require("../models/caracteristica");
const sequelize = require("../config/database");

// Obtener todas las caracteristica
exports.getAllCaracteristicas = async (req, res) => {
  try {
    const caracteristica = await Caracteristica.findAll();
    res.json(caracteristica);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener caracteristica " + error });
  }
};

// Crear una nueva característica
exports.createCaracteristica = async (req, res) => {
  try {
    const { nombre, icono } = req.body;

    // Validar los datos recibidos
    if (!nombre || !icono) {
      return res.status(400).json({ error: 'Nombre e icono son obligatorios' });
    }

    // Crear la nueva característica
    const nuevaCaracteristica = await Caracteristica.create({ nombre, icono });

    res.status(201).json({
      mensaje: 'Característica creada exitosamente',
      caracteristica: nuevaCaracteristica
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la característica ' + error });
  }
};

// Eliminar una característica
exports.deleteCaracteristica = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar que se haya proporcionado un id
    if (!id) {
      return res.status(400).json({ error: 'El id de la característica es obligatorio' });
    }

    // Buscar la característica por id
    const caracteristica = await Caracteristica.findByPk(id);

    if (!caracteristica) {
      return res.status(404).json({ error: 'Característica no encontrada' });
    }

    // Eliminar la característica
    await caracteristica.destroy();

    res.json({ mensaje: 'Característica eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la característica ' + error });
  }
};

// Actualizar una característica
exports.updateCaracteristica = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, icono } = req.body;

    // Validar que se haya proporcionado un id
    if (!id) {
      return res.status(400).json({ error: 'El id de la característica es obligatorio' });
    }

    // Buscar la característica por id
    const caracteristica = await Caracteristica.findByPk(id);

    if (!caracteristica) {
      return res.status(404).json({ error: 'Característica no encontrada' });
    }

    // Actualizar la característica
    const caracteristicaActualizada = await caracteristica.update({ nombre, icono });

    res.json({
      mensaje: 'Característica actualizada exitosamente',
      caracteristica: caracteristicaActualizada
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la característica ' + error });
  }
};
