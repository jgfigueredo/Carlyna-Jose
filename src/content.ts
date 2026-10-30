/**
 * Personaliza aquí TODO el contenido de la carta.
 * Fotos: reemplaza los archivos en public/images/
 * Canciones: reemplaza public/audio/song1.mp3, song2.mp3, song3.mp3
 * Mensaje de voz: coloca tu audio en public/audio/mensaje.mp3
 */
export const content = {
  to: "Carlyna",
  from: "Jose",
  date: "11.11.2026",
  // Cambia esta fecha por el día en que empezaron a estar juntos (YYYY-MM-DD)
  startDate: "2025-11-11T00:00:00",

  bannerCaption: "Para siempre, mi princesa",

  songs: [
    {
      title: "Lejos de mis ojos",
      artist: "Juan Duque",
      src: "/audio/song3.mp3",
    },
    {
      title: "Causa Perdida",
      artist: "Morat",
      src: "/audio/song4.flac",
    },
    {
      title: "No Hay Nadie Más",
      artist: "Sebastian Yatra",
      src: "/audio/song5.mp3",
    },
    {
      title: "Quedate Junto a Mi",
      artist: "RKM & Ken-Y",
      src: "/audio/song2.mp3",
    },
  ],

  playlistName: "Tus canciones, Carlyna",

  memories: [
    { src: "/images/memory1.jpg", caption: "Primera vez en el cine" },
    { src: "/images/memory2.jpg", caption: "Salida a divertirnos" },
    { src: "/images/memory3.jpg", caption: "Primer cumple de Emir juntos" },
    { src: "/images/memory4.jpg", caption: "Salidas a escondidas" },
    { src: "/images/memory5.jpg", caption: "Tu día" },
  ],

  letter: {
    greeting: "Hola Amor,",
    body: `Primero que nada, quiero darte las gracias por todo este tiempo que hemos compartido juntos. Cada momento a tu lado ha sido un regalo que atesoro profundamente. Desde nuestras risas hasta nuestros silencios, cada instante ha fortalecido nuestro vínculo y me ha hecho valorar aún más lo especial que eres para mí.

¡Qué locura pensar que ya llevamos un año de relación! Aún me acuerdo de la primera vez que nos vimos, del primer beso y de todos los pequeños momentos que hemos ido sumando. Me da mucha alegría saber que, en esta generación y con tantas personas que hay en el mundo, nos encontramos y nos elegimos. No hay nada más bonito que eso.

Contigo he aprendido tantas cosas, como la importancia de la paciencia, la comunicación y el apoyo mutuo. Me has enseñado a ser una mejor persona y a ver la vida desde una perspectiva más positiva y amorosa. Tu compañía me ha dado la fuerza para superar desafíos y seguir creciendo.

Todo lo que hemos vivido este año ha sido increíble. A pesar de los altibajos, hemos logrado mantenernos unidos y fortalecer nuestra relación. Cada obstáculo que hemos enfrentado nos ha hecho más fuertes y nos ha enseñado a valorar lo que tenemos.

Creo que, si no me equivoco, esta es la primera vez que te escribo una carta, y me hace muy feliz poder expresarte mis sentimientos de esta manera. Quiero que sepas que cada palabra viene desde lo más profundo de mi corazón y refleja todo el amor y la admiración que siento por ti.

Me siento muy orgulloso de que seas parte de mi mundo y de que me permitas ser parte del tuyo. Eres una persona increíble, llena de cualidades que admiro y respeto profundamente. Tu bondad, tu inteligencia y tu belleza interior son solo algunas de las razones por las que me siento tan afortunado de tenerte todos los días.

Gracias por ser mi compañera, mi confidente y mi amor. Te amo con todo mi corazón y estoy infinitamente agradecido por cada día a tu lado y por todos los que nos quedan por venir. ¡Amén!`,
    signOff: "Te amo de aqui a la luna a pasitos de tortuga,",
    signature: "Jose G.",
  },

  voice: {
    src: "/audio/mensaje.m4a",
    title: "Un mensaje para ti",
    subtitle: "Mantén presionado el corazón… o toca play",
  },

  footer: {
    closing: "Te amo, Carlyna Guzmán.",
    hint: "Desliza hacia arriba",
  },

  quiz: {
    title: "Una última cosa…",
    subtitle: "Responde con el corazón",
    questions: [
      {
        id: "day",
        question: "¿Dénde fue nuestro primer beso?",
        options: [
          { id: "a", label: "En el parque" },
          { id: "b", label: "En el Trabajo" },
          { id: "c", label: "En un ascensor" },
          { id: "d", label: "En la plaza" },
        ],
      },
      {
        id: "love",
        question: "¿Qué es lo que más te gusta de nosotros?",
        options: [
          { id: "a", label: "Cómo nos reímos de todo" },
          { id: "b", label: "Lo seguros que nos sentimos" },
          { id: "c", label: "Los planes locos a media noche" },
          { id: "d", label: "Los silencios cómodos" },
        ],
      },
      {
        id: "show",
        question: "¿Cuál es tu forma favorita de que te demuestre que te amo?",
        options: [
          { id: "a", label: "Cartitas y detalles" },
          { id: "b", label: "Abrazos eternos" },
          { id: "c", label: "Palabras al oído" },
          { id: "d", label: "Tiempo de calidad, sin prisa" },
        ],
      },
      {
        id: "forever",
        question: "Cierra los ojos. ¿Qué quieres que nunca cambie?",
        options: [
          { id: "a", label: "La forma en que te miro" },
          { id: "b", label: "Nuestras noches de risa" },
          { id: "c", label: "Este amor, tal como es" },
          { id: "d", label: "Todas las anteriores" },
        ],
      },
    ],
    finaleTitle: "Cualquier respuesta…",
    finaleText:
      "Te elijo a ti, Carlyna. Hoy, mañana y en todos los 11.11 que nos queden. Gracias por ser mi lugar seguro, mi risa favorita y mi historia más bonita.",
  },
} as const;

export type QuizQuestion = (typeof content.quiz.questions)[number];
