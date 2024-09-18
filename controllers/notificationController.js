const nodemailer = require('nodemailer');

// Configuración del transporte
const transporter = nodemailer.createTransport({
    service: 'gmail', // O cualquier otro servicio que uses
    auth: {
        user: 'proyectointegrador631@gmail.com', // Reemplaza con tu email
        pass: 'xfgf vhke cigb nblv' // Reemplaza con tu contraseña o usa un token de app si usas Gmail
    },
    tls: {
      rejectUnauthorized: false
    }
});

// Función para enviar correo
exports.enviarCorreoReserva = async (usuario, producto, fecha) => {
    const mailOptions = {
        from: 'proyectointegrador631@gmail.com', // Remitente
        to: usuario.email, // Email del usuario
        subject: 'Detalles de tu Reserva',
        html: `
            <h1>Reserva Confirmada</h1>
            <p>Gracias por tu reserva, ${usuario.nombre}.</p>
            <p><strong>Producto:</strong> ${producto.nombre}</p>
            <p><strong>Fecha de Reserva:</strong> ${fecha}</p>
            <p><strong>Proveedor:</strong> ${producto.proveedorContacto}</p>
            <p>Para más información, contacta con ${producto.proveedorContacto}.</p>
        `
    };

    // Enviar correo
    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo enviado exitosamente');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};
