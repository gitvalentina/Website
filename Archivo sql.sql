DROP DATABASE IF EXISTS proyecto_integrador;
CREATE DATABASE proyecto_integrador;
USE proyecto_integrador; 

CREATE TABLE usuarios (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(45) ,
    email VARCHAR (150) unique,
    contrasenia VARCHAR(100) ,
    birthdate DATE ,
    photo VARCHAR(100) ,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE productos (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) ,
    description VARCHAR (450) ,
    photo VARCHAR (250) ,
    user_id INT UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES usuarios (id) ON DELETE CASCADE,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comentarios(
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    content VARCHAR(450) ,
    product_id INT UNSIGNED,
    user_id INT UNSIGNED,
    FOREIGN KEY(product_id) REFERENCES productos (id) ON DELETE CASCADE, 
    FOREIGN KEY (user_id) REFERENCES usuarios (id) ON DELETE CASCADE,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
 
insert into usuarios values (default, 'Maxi Sucari','maxisucari@gmail.com','maxisucari','2001-08-01','perfil-1.png',DEFAULT, DEFAULT);
insert into usuarios values (default, 'Guido Reblon','guidoreblon@gmail.com','guidoreblon','2021-02-10','perfil-2.png',DEFAULT, DEFAULT);
insert into usuarios values (default, 'Micaela Gomez','micaelagomez@gmail.com','micaelagomez','2021-03-10','perfil-3.png',DEFAULT, DEFAULT);
insert into usuarios values (default, 'Santi Mendez','santimendez@gmail.com','santimendez','2021-04-10','perfil-4.png',DEFAULT, DEFAULT);
insert into usuarios values (default, 'Clarisa Ocampo','clariocampo@gmail.com','clariocampo','2021-04-10','perfil-5.png',DEFAULT, DEFAULT);
select*from usuarios;

insert into productos  values (default, 'Acer Aspire 5','Intel core i5, 32gb RAM, Nvidia gtx 1050','/images/products/AcerAspire5.jpg','3',DEFAULT, DEFAULT);
insert into productos  values (default, 'Alienware 15','Intel core i9, 32gb RAM, Nvidia rtx 2080','/images/products/Alienware15.jpg','4',DEFAULT, DEFAULT);
insert into productos  values (default, 'Asus ROG Strix','Intel core i5, 32gb RAM, Nvidia rtx 2060','/images/products/AsusROGStix.jpg','1',DEFAULT, DEFAULT);
insert into productos  values (default, 'Dell Inspiron','Intel core i7, 32gb RAM, Nvidia gtx 1070','/images/products/DellInspiron.jpg','2',DEFAULT, DEFAULT);
insert into productos  values (default, 'HP 15','Intel core i3, 32gb RAM, Nvidia gtx 1050','/images/products/HP15.jpg','3',DEFAULT, DEFAULT);
insert into productos  values (default, 'HP Pavillion','Intel core i3, 32gb RAM, Nvidia gtx 1080','/images/products/HpPavillion.jpg','4',DEFAULT, DEFAULT);
insert into productos  values (default, 'Mackboock Pro','Integrated Graphics, 32gb RAM','/images/products/macbookpro.jpg','1',DEFAULT, DEFAULT);
insert into productos  values (default, 'Razer Blade 15','Intel core i9, 32gb RAM, Nvidia rtx 2070','/images/products/RazerBlade.jpg','2',DEFAULT, DEFAULT);
insert into productos  values (default, 'Xaomi Mi Pro','Intel core i3, 32gb RAM, Nvidia gtx 1060','/images/products/XaomiMiPro.jpg','3',DEFAULT, DEFAULT);
insert into productos  values (default, 'Microsoft Surface Pro','Intel core i7, 32gb RAM, Nvidia rtx 2050','/images/products/Microsoft.jpg','4',DEFAULT, DEFAULT);

select*from productos;

insert into comentarios  values (default, 'tremenda','1','1',DEFAULT, DEFAULT);
insert into comentarios  values (default, 'No hay notebook en el mercado con las prestaciones de ésta y a mejor precio','1','2',DEFAULT, DEFAULT);
insert into comentarios  values (default, 'Espectacular','1','3',DEFAULT, DEFAULT);

insert into comentarios  values (default, 'Increible','2','4',DEFAULT, DEFAULT);
insert into comentarios  values (default, 'Es rápida y el renderizado es bueno.','2','1',DEFAULT, DEFAULT);
insert into comentarios  values (default, 'El ángulo de visión de la pantalla no es tan amplio, pero suficiente.','2','2',DEFAULT, DEFAULT);

insert into comentarios  values (default, 'La batería dura por lo menos 4 horas o más, dependiendo del uso de la cpu/gpu. Eso está bien, teniendo en cuenta el tipo de cpu que trae.','3','3',DEFAULT, DEFAULT);
insert into comentarios  values (default, 'Diez puntos, la compu viene lista para usar, y con las especificaciones pedidas.','3','4',DEFAULT, DEFAULT);
insert into comentarios  values (default, 'Anda bárbara y el mismo día en que vino, ya estaba trabajando con ella.','3','1',DEFAULT, DEFAULT);

insert into comentarios  values (default, 'Me salvaron!','4','2',DEFAULT, DEFAULT);
insert into comentarios  values (default, 'Por este valor muy dificil encontrar las prestaciones que tiene esta maquina.','4','3',DEFAULT, DEFAULT);
insert into comentarios  values (default, 'Increible','4','4',DEFAULT, DEFAULT);

insert into comentarios  values (default, 'Parecen re suavecitas','5','1',DEFAULT, DEFAULT);
insert into comentarios  values (default, 'Por este valor muy dificil encontrar las prestaciones que tiene esta maquina.','5','2',DEFAULT, DEFAULT);
insert into comentarios  values (default, 'Muy buena relacion calidad-precio.','5','3',DEFAULT, DEFAULT);

insert into comentarios  values (default, 'ME FASCINAN','6','4',DEFAULT, DEFAULT);
insert into comentarios  values (default, 'Excelente máquina, la probé luego de haber instalado el sistema operativo.','6','1',DEFAULT, DEFAULT);
insert into comentarios  values (default, 'Precio?','6','2',DEFAULT, DEFAULT);

insert into comentarios  values (default, 'Es un avión me tomó todos los programas rapidísimo.','7','3',DEFAULT, DEFAULT);
insert into comentarios  values (default, 'El material es de muy buena calidad se lo ve resistente','7','4',DEFAULT, DEFAULT);
insert into comentarios  values (default, 'Hermosasss','7','3',DEFAULT, DEFAULT);

insert into comentarios  values (default, 'Uff una facha','8','4',DEFAULT, DEFAULT);
insert into comentarios  values (default, 'Espectacular','8','3',DEFAULT, DEFAULT);
insert into comentarios  values (default, 'Re lindass','8','2',DEFAULT, DEFAULT);

insert into comentarios  values (default, 'Alta estetica','9','3',DEFAULT, DEFAULT);
insert into comentarios  values (default, 'Muy facheras','9','2',DEFAULT, DEFAULT);

insert into comentarios  values (default, 'Quiero todas','10','3',DEFAULT, DEFAULT);
insert into comentarios  values (default, 'Cuanto sale?','10','4',DEFAULT, DEFAULT);

