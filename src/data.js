export const ME = {
  name: 'María José',
  age: 72,
  area: 'Alcobendas',
  description: 'Me encanta pasear por el parque y conocer gente nueva. Salgo casi todos los días por las mañanas.',
  photo: '/me.jpg',
  routes: 12,
  friends: 8,
}

export const USERS = [
  { id: 1, name: 'Chloe',  age: 28, area: 'Alcobendas', photo: '/avatars/user5.jpg',  favorite: true,  online: true,  route: 'Parque de la Cañada',  time: '10:00', description: 'Estudiante de enfermería. Salgo a caminar casi todas las mañanas por la zona.' },
  { id: 2, name: 'Taylor', age: 24, area: 'Alcobendas', photo: '/avatars/user44.jpg', favorite: true,  online: true,  route: 'Paseo de la Chopera',  time: '10:30', description: 'Voluntaria los fines de semana. Muy activa y con muchas ganas de pasear.' },
  { id: 3, name: 'Ethan',  age: 31, area: 'Alcobendas', photo: '/avatars/user33.jpg', favorite: true,  online: false, route: 'Ruta del Río Jarama',  time: '11:00', description: 'Aficionado al senderismo. Conozco todos los parques y rutas de la zona.' },
  { id: 4, name: 'Emma',   age: 26, area: 'Alcobendas', photo: '/avatars/user16.jpg', favorite: true,  online: false, route: 'Jardines de la Villa', time: '09:30', description: 'Me gusta la naturaleza y las conversaciones tranquilas durante el paseo.' },
  { id: 5, name: 'Lucy',   age: 22, area: 'Alcobendas', photo: '/avatars/user25.jpg', favorite: true,  online: true,  route: 'Parque de la Cañada',  time: '10:00', description: 'Universitaria con horario flexible. Me encanta conocer a personas con experiencia.' },
  { id: 6, name: 'Gavin',  age: 29, area: 'Alcobendas', photo: '/avatars/user53.jpg', favorite: false, online: true,  route: 'Paseo de la Chopera',  time: '11:30', description: 'Trabajo en el barrio y salgo a caminar antes de empezar la jornada.' },
  { id: 7, name: 'Miguel', age: 68, area: 'Alcobendas', photo: '/avatars/user57.jpg', favorite: false, online: true,  route: 'Parque de la Cañada',  time: '09:00', description: 'Jubilado, busco compañía para el paseo diario de mañana.' },
  { id: 8, name: 'Paz',    age: 75, area: 'Alcobendas', photo: '/avatars/user49.jpg', favorite: false, online: false, route: 'Jardines de la Villa', time: '10:00', description: 'Salgo cada mañana al jardín. Me gusta caminar despacio y charlar.' },
  { id: 9, name: 'Amanda', age: 71, area: 'Alcobendas', photo: '/avatars/user46.jpg', favorite: false, online: true,  route: 'Ruta del Río Jarama',  time: '10:30', description: 'Muy activa. Prefiero rutas tranquilas con buena conversación.' },
]

export const ROUTES = [
  {
    id: 1, name: 'Parque de la Cañada',
    distance: '2.5 km', duration: '35 min', difficulty: 'Fácil',
    going: [1, 5, 7],
    photo: '/routes/route1.jpg',
    bgPhoto: '/routes/route1bg.jpg',
  },
  {
    id: 2, name: 'Paseo de la Chopera',
    distance: '1.8 km', duration: '25 min', difficulty: 'Fácil',
    going: [2, 6],
    photo: '/routes/route2.jpg',
    bgPhoto: '/routes/route2bg.jpg',
  },
  {
    id: 3, name: 'Ruta del Río Jarama',
    distance: '3.2 km', duration: '50 min', difficulty: 'Media',
    going: [3, 9],
    photo: '/routes/route3.jpg',
    bgPhoto: '/routes/route3bg.jpg',
  },
  {
    id: 4, name: 'Jardines de la Villa',
    distance: '1.2 km', duration: '20 min', difficulty: 'Fácil',
    going: [4, 8],
    photo: '/routes/route4.jpg',
    bgPhoto: '/routes/route4bg.jpg',
  },
]

export const COMPLETED = [
  { id: 1, routeName: 'Parque de la Cañada',  date: '15 mayo',   partnerId: 1, photo: '/completed/walk1.jpg', fallback: '/routes/route1.jpg' },
  { id: 2, routeName: 'Paseo de la Chopera',  date: '10 mayo',   partnerId: 2, photo: '/completed/walk2.jpg', fallback: '/routes/route2.jpg' },
  { id: 3, routeName: 'Jardines de la Villa', date: '3 mayo',    partnerId: 4, photo: '/completed/walk3.jpg', fallback: '/routes/route4.jpg' },
  { id: 4, routeName: 'Ruta del Río Jarama',  date: '28 abril',  partnerId: 3, photo: '/completed/walk4.jpg', fallback: '/routes/route3.jpg' },
]

export const MESSAGES = {
  2: [
    { id: 1, from: 'them', text: '¡Hola María José! ¿Te apuntas mañana al paseo por la Chopera?', time: '09:14' },
    { id: 2, from: 'me',   text: '¡Hola Taylor! Sí, me encantaría. ¿A qué hora quedamos?', time: '09:20' },
    { id: 3, from: 'them', text: 'A las 10:30 en la entrada principal. ¡Perfecto!', time: '09:21' },
    { id: 4, from: 'me',   text: 'Ahí estaré. Muchas gracias', time: '09:23' },
    { id: 5, from: 'them', text: '¡Genial! Hasta mañana entonces.', time: '09:23' },
  ],
  1: [
    { id: 1, from: 'them', text: '¡Buenos días! ¿Vas hoy al Parque de la Cañada?', time: '08:30' },
    { id: 2, from: 'me',   text: 'Sí, a las 10. ¿Te unes?', time: '08:45' },
    { id: 3, from: 'them', text: 'Por supuesto, allí estaré.', time: '08:46' },
  ],
  5: [
    { id: 1, from: 'them', text: 'Hola, soy Lucy. Vi tu ruta en el parque y me gustaría acompañarte.', time: 'Ayer' },
    { id: 2, from: 'me',   text: '¡Claro! Será un placer. Salgo a las 10.', time: 'Ayer' },
  ],
}
