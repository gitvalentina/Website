const computadoras = {
    user: { 
        id: 1,
        nombreDeUsuario: " LeylaFernandez_123",
        email: "leyalfernandez@gmail.com",
        imagen: "/images/users/usuario.jpg",
        contra: "4871Leyla_",
        birthdate: '13/02/2001'},

    products: [
        {id: "1", title: 'Acer Aspire 5', description: 'Intel core i5, 32gb RAM, Nvidia gtx 1050', photo: '/images/products/AcerAspire5.jpg'},
        {id: "2", title: 'Alienware 15', description: 'Intel core i9, 32gb RAM, Nvidia rtx 2080',photo: '/images/products/Alienware15.jpg'},
        {id: "3", title: 'Asus ROG Strix', description: 'Intel core i5, 32gb RAM, Nvidia rtx 2060', photo: '/images/products/AsusROGStix.jpg'},
        {id: "4", title: 'Dell Inspiron', description: 'Intel core i7, 32gb RAM, Nvidia gtx 1070', photo: '/images/products/DellInspiron.jpg'},
        {id: "5", title: 'HP 15', description: 'Intel core i3, 32gb RAM, Nvidia gtx 1050', photo: '/images/products/HP15.jpg'},
        {id: "6", title: 'HP Pavillion', description: 'Intel core i3, 32gb RAM, Nvidia gtx 1080', photo: '/images/products/HpPavillion.jpg'},
        {id: "7",title: 'Mackboock Pro', description: 'Integrated Graphics, 32gb RAM', photo: '/images/products/macbookpro.jpg'},
        {id: "8", title: 'Razer Blade 15', description: 'Intel core i9, 32gb RAM, Nvidia rtx 2070', photo: '/images/products/RazerBlade.jpg'},
        {id: "9", title: 'Xaomi Mi Pro', description: 'Intel core i3, 32gb RAM, Nvidia gtx 1060', photo: '/images/products/XaomiMiPro.jpg'},
        {id: "10", title: 'Microsoft Surface Pro', description: 'Intel core i7, 32gb RAM, Nvidia rtx 2050', photo: '/images/products/Microsoft.jpg'},
    ],

    comments: [
        {photo: '/images/users/coment1.jpg' , content: 'No hay notebook en el mercado con las prestaciones de ésta y a mejor precio. Es rápida y el renderizado es bueno.', username: 'TomasGarrido10'},
        {photo: '/images/users/coment2.jpg' , content: 'El ángulo de visión de la pantalla no es tan amplio, pero suficiente. La batería dura por lo menos 4 horas o más, dependiendo del uso de la cpu/gpu. Eso está bien, teniendo en cuenta el tipo de cpu que trae.', username: 'LolaMeyer11'},
        {photo: '/images/users/coment3.jpg' , content: 'Diez puntos, la compu viene lista para usar, y con las especificaciones pedidas. Anda bárbaro y el mismo día en que vino, ya estaba trabajando con ella. Me salvaron!', username: 'Julian_Marcos'},
        {photo: '/images/users/coment4.jpg' , content: 'Muy buena relacion calidad-precio. Por este valor muy dificil encontrar las prestaciones que tiene esta maquina.', username: 'SofiaKravi123'},
        {photo: '/images/users/coment5.jpg' , content: 'Excelente máquina, la probé luego de haber instalado el sistema operativo. Es un avión me tomó todos los programas rapidísimo. El material es de muy buena calidad se lo ve resistente', username: 'Matias_Julian_Alvaro'}
    ],
}

module.exports= computadoras;