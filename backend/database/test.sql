START TRANSACTION;

INSERT INTO empresas (nombre, rut) VALUES 
    ('Empresa test 1','87502908-8'),
    ('Empresa test 2','86307670-6'),
    ('Empresa falsa 3','70752257-7'),
    ('Empresa prueba 4','76900897-7');

INSERT into usuarios (username, password, rolId, estado, empresaId) VALUES
    ('mail@test1.com','$2a$10$UDreudDqG46x3vDhcPvhqu.w4Xz7g6bOcL9/B1.oh/HxXG47o7V06',2,1,2),
    ('mail@test2.com','$2a$10$UDreudDqG46x3vDhcPvhqu.w4Xz7g6bOcL9/B1.oh/HxXG47o7V06',2,1,3),
    ('mail@falsa3.com','$2a$10$UDreudDqG46x3vDhcPvhqu.w4Xz7g6bOcL9/B1.oh/HxXG47o7V06',2,1,4),
    ('mail@prueba4.com','$2a$10$UDreudDqG46x3vDhcPvhqu.w4Xz7g6bOcL9/B1.oh/HxXG47o7V06',2,1,5);

INSERT into personas(nombre, apellido, rut, estado, tieneUsuario) VALUES
    ('Juan', 'Carrasco', '11111111-1', 0, 0),
    ('María', 'González', '12345678-5', 0, 0),
    ('Pedro', 'Ramírez', '87654321-K', 0, 0),
    ('Laura', 'Muñoz', '19283746-2', 0, 0),
    ('Carlos', 'López', '20485739-8', 0, 0),
    ('Valentina', 'Reyes', '17283945-7', 0, 0),
    ('Jorge', 'Vásquez', '14253678-0', 0, 0),
    ('Camila', 'Fuentes', '18273645-6', 0, 0),
    ('Diego', 'Rojas', '15326487-4', 0, 0),
    ('Antonia', 'Salinas', '19827364-3', 0, 0);

INSERT into contratos(fechaInicio, estado, cargo, empresaId, personaId) VALUES
    ('2024-01-10', 1, 'Técnico en terreno', 2, 1),
    ('2024-02-15', 1, 'Administrativo', 2, 2),
    ('2024-03-05', 1, 'Operador', 3, 3),
    ('2024-04-01', 1, 'Supervisor', 4, 4),
    ('2024-05-01', 1, 'Asistente logístico', 4, 5),
    ('2024-05-17', 1, 'Prevencionista', 5, 6);

UPDATE personas
    SET estado = 1
    WHERE id IN (1, 2, 3, 4, 5, 6);
COMMIT