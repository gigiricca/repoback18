const Producto = require("../models/producto"); 
const Usuario = require("../models/usuario");
const Reserva = require("../models/usuario_producto");


const { Op } = require("sequelize");


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
            producto_id: productoId,
            usuario_id: usuarioId,
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

exports.obtenerFechasDisponibles = async (req, res) => {
    try {
        const { producto_id, fechaInicio, fechaFin } = req.body;

        // Obtener todas las reservas para el producto en el rango de fechas dado
        const reservas = await Reserva.findAll({
            where: {
                producto_id,
                fecha_reserva: {
                    [Op.between]: [fechaInicio, fechaFin]  // Asegúrate de importar Op de Sequelize
                }
            }
        });

        // Extraer todas las fechas reservadas
        const fechasReservadas = reservas.map(reserva => reserva.fecha_reserva.toISOString().split('T')[0]);

        // Crear una lista de todas las fechas en el rango dado
        const fechasDisponibles = [];
        let currentFecha = new Date(fechaInicio);
        const finFecha = new Date(fechaFin);

        while (currentFecha <= finFecha) {
            const fechaString = currentFecha.toISOString().split('T')[0];
            if (!fechasReservadas.includes(fechaString)) {
                fechasDisponibles.push(fechaString);
            }
            currentFecha.setDate(currentFecha.getDate() + 1);
        }

        // Retornar las fechas disponibles
        res.json({ fechasDisponibles });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las fechas disponibles', error });
    }
};
