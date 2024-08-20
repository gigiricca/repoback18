const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");

exports.crearUsuario = async(req, res) => {
    try {
      const { nombre, apellido, email, password } = req.body;

      // Verificar si el usuario ya existe
      const usuarioExistente = await Usuario.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(400).json({ message: "El usuario ya existe" });
      }

      // Crear un nuevo usuario
      const nuevoUsuario = await Usuario.create({ nombre, apellido, email, password });

      res.status(201).json(nuevoUsuario);
    } catch (error) {
      res.status(500).json({ message: "Error al registrar el usuario" + error, error });
    }
  };


  exports.login = async(req, res) => {
    try {
      const { email, password } = req.body;

      // Buscar el usuario por email
      const usuario = await Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(400).json({ message: "Usuario no encontrado" });
      }

      // Verificar la contraseña
      const isMatch = await bcrypt.compare(password, usuario.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }

      res.json({ 
        id: usuario.id, 
        nombre: usuario.nombre, 
        apellido: usuario.apellido,
        email: usuario.email,
        rolId: usuario.rolId
      });
    } catch (error) {
      res.status(500).json({ message: "Error al iniciar sesión", error });
    }
  };

  exports.obtenerUsuarios = async(req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: ['id', 'nombre', 'apellido', 'email', 'rolId'],
            include: {
                model: Rol,
                attributes: ['nombre'],
            }
        });
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios", error });
    }
};

exports.cambiarRol = async(req, res) => {
  try {
      const { id, rolId } = req.body;

      // Verificar si el usuario existe
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
          return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Actualizar el rol del usuario
      usuario.rolId = rolId;
      await usuario.save();

      res.json({ message: "Rol actualizado exitosamente" });
  } catch (error) {
      res.status(500).json({ message: "Error al actualizar el rol del usuario", error });
  }
};
