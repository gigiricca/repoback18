const Producto = require("../models/producto"); 
const Usuario = require("../models/usuario");
const Reserva = require("../models/usuario_producto");


// Obtener detalle temporal de reserva (producto, usuario y fecha seleccionada)
exports.obtenerDetalleReserva = async (req, res) => {
    try {
        const { productoId, usuarioId, fecha } = req.body; // datos recibidos del frontend
        const producto = await Producto.findByPk(productoId);
        const usuario = await Usuario.findByPk(usuarioId);

        if (!producto || !usuario) {
            return res.status(404).json({ mensaje: 'Producto o usuario no encontrados' });
        }

        // Retornamos los detalles de la reserva sin guardar
        res.json({
            producto,
            usuario,
            fecha
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los detalles de la reserva', error });
    }
};

// Confirmar reserva
exports.confirmarReserva = async (req, res) => {
    try {
        const { productoId, usuarioId, fecha } = req.body;
        
        // Crear la reserva en la base de datos
        const nuevaReserva = await Reserva.create({
            productoId,
            usuarioId,
            fecha_reserva: fecha
        });

        res.json({
            mensaje: 'Reserva confirmada exitosamente',
            reserva: nuevaReserva
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al confirmar la reserva', error });
    }
};

