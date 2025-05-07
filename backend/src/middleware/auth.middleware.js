import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies['auth-token'];
    console.log('Token recibido en cookie:', token ? 'Sí' : 'No')

    if (!token) {
        // Si no hay token, no está autenticado
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token.' });
    }
    
    try {
        // Verifica el token
        const verified = jwt.verify(token, 'tu_clave_secreta');
        req.user = verified; // Adjunta el payload del token a req.user
        console.log('Token verificado, usuario:', req.user);
        next(); // Pasa al siguiente middleware o controlador
    } catch (error) {
        console.error('Error de verificación de token:', error.message);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token inválido.' });
        }
        if (error.name === 'TokenExpiredError') {
            // Podrías querer limpiar la cookie expirada aquí
            res.clearCookie('auth-token', { path: '/' });
            return res.status(401).json({ message: 'Token expirado.' });
        }
        // Otro error durante la verificación
        return res.status(500).json({ message: 'Error interno al verificar el token.' });
    }
};
