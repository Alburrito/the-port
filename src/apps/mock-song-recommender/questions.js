// Colección de 100 preguntas para el recomendador de canciones (algunas sin relación con la música)
export const questions = [
  // Preguntas originales sobre música
  {
    id: 1,
    text: "¿Prefieres música con letras o instrumental?",
    options: ["Con letras", "Instrumental", "Ambas por igual"],
  },
  {
    id: 2,
    text: "¿Qué es más importante para ti en una canción?",
    options: ["El ritmo", "La melodía", "La letra", "La producción"],
  },
  {
    id: 3,
    text: "¿Disfrutas de canciones con cambios de ritmo y estructura?",
    options: ["Sí, me encanta la complejidad", "Prefiero estructuras simples", "No me había fijado en eso"],
  },
  {
    id: 4,
    text: "¿Te gusta escuchar álbumes completos o canciones sueltas?",
    options: ["Álbumes completos", "Canciones sueltas", "Depende del artista"],
  },
  {
    id: 5,
    text: "¿Te interesan las letras con contenido filosófico o introspectivo?",
    options: ["Sí", "No", "A veces"],
  },
  {
    id: 6,
    text: "¿Qué duración prefieres para una canción?",
    options: ["Menos de 3 minutos", "Entre 3 y 5 minutos", "Más de 5 minutos", "No importa"],
  },
  {
    id: 7,
    text: "¿Escuchas música principalmente para...?",
    options: ["Relajarme", "Concentrarme", "Animarme", "Reflexionar"],
  },
  {
    id: 8,
    text: "¿Qué instrumento te parece más importante en una banda?",
    options: ["Batería", "Bajo", "Guitarra", "Voz", "Teclados/sintetizadores"],
  },
  {
    id: 9,
    text: "¿Te molesta que una canción tenga partes instrumentales largas?",
    options: ["Sí, prefiero siempre voz", "No, disfruto los solos", "Depende de la canción"],
  },
  {
    id: 10,
    text: "¿Consideras importante que la música te haga pensar o reflexionar?",
    options: ["Muy importante", "Prefiero música que me haga sentir", "No necesariamente"],
  },
  
  // Más preguntas sobre música
  {
    id: 11,
    text: "¿Qué género musical escuchas con más frecuencia?",
    options: ["Rock/Metal", "Pop", "Electrónica", "Hip-Hop/Rap", "Clásica", "Jazz/Blues"],
  },
  {
    id: 12,
    text: "¿Prefieres artistas actuales o de décadas pasadas?",
    options: ["Actuales", "De los 2000s", "De los 90s", "De los 70s-80s", "Más antiguos"],
  },
  {
    id: 13,
    text: "¿Qué tan importante es para ti la técnica musical de los instrumentistas?",
    options: ["Muy importante", "Importante pero no decisivo", "No me fijo en eso"],
  },
  {
    id: 14,
    text: "¿Te gusta la música con compases irregulares o ritmos complejos?",
    options: ["Me encantan", "Me dan igual", "Los encuentro confusos", "¿Qué es un compás?"],
  },
  {
    id: 15,
    text: "¿Prefieres música con armonías complejas o sencillas?",
    options: ["Complejas", "Sencillas", "No sé la diferencia", "Depende del momento"],
  },
  
  // Preguntas sin relación (absurdas/broma)
  {
    id: 16,
    text: "¿Cuántas veces al día piensas en espirales?",
    options: ["Nunca", "1-3 veces", "Constantemente", "Espera... ¿qué?"],
  },
  {
    id: 17,
    text: "Si tuvieras que elegir un número sagrado, ¿cuál sería?",
    options: ["El 7", "El número Pi", "La secuencia Fibonacci", "No creo en números sagrados"],
  },
  {
    id: 18,
    text: "¿Prefieres bañarte con agua caliente o fría?",
    options: ["Caliente", "Fría", "Tibia", "No me baño"],
  },
  {
    id: 19,
    text: "¿Crees que las matemáticas pueden explicar el universo?",
    options: ["Totalmente", "Parcialmente", "No lo creo", "Las matemáticas son un constructo social"],
  },
  {
    id: 20,
    text: "¿Cuál es tu posición favorita para dormir?",
    options: ["De lado", "Boca arriba", "Boca abajo", "Posición fetal"],
  },
  
  // Más preguntas aleatorias
  {
    id: 21,
    text: "¿Has experimentado alguna vez déjà vu?",
    options: ["Sí, frecuentemente", "Alguna vez", "Nunca", "Siento que ya respondí esto antes..."],
  },
  {
    id: 22,
    text: "¿Cuál es tu opinión sobre la geometría sagrada?",
    options: ["Es fascinante", "No creo en eso", "No sé qué es", "Todo está conectado"],
  },
  {
    id: 23,
    text: "¿Alguna vez has tenido un sueño recurrente?",
    options: ["Sí, el mismo sueño", "Sí, temas similares", "No que recuerde", "No sueño"],
  },
  {
    id: 24,
    text: "¿Crees en la sincronicidad o que 'todo pasa por una razón'?",
    options: ["Sí, totalmente", "A veces", "No, es casualidad", "La realidad es una ilusión"],
  },
  {
    id: 25,
    text: "¿Si pudieras tener una conversación con un animal, cuál elegirías?",
    options: ["Un gato", "Un delfín", "Un chimpancé", "Un pulpo"],
  },
  
  // Preguntas sobre percepción
  {
    id: 26,
    text: "¿Te consideras una persona espiritual?",
    options: ["Muy espiritual", "Moderadamente", "Para nada", "Prefiero no etiquetarme"],
  },
  {
    id: 27,
    text: "¿Qué opinas de la meditación?",
    options: ["La practico regularmente", "Me interesa pero no la practico", "No me interesa", "¿Eso es yoga?"],
  },
  {
    id: 28,
    text: "¿Has tenido alguna experiencia que consideres 'mística'?",
    options: ["Sí, varias", "Una vez", "Nunca", "Defina 'mística'"],
  },
  {
    id: 29,
    text: "¿Crees que hay formas de percepción más allá de los cinco sentidos?",
    options: ["Definitivamente", "Es posible", "No lo creo", "La ciencia no lo respalda"],
  },
  {
    id: 30,
    text: "¿Prefieres un día lluvioso o soleado?",
    options: ["Lluvioso", "Soleado", "Nublado", "Con tormenta eléctrica"],
  },
  
  // Volviendo a la música
  {
    id: 31,
    text: "¿Alguna vez has experimentado sinestesia al escuchar música?",
    options: ["Sí, veo colores", "Sí, otras sensaciones", "No sé qué es eso", "No"],
  },
  {
    id: 32,
    text: "¿Qué te parece más importante, la técnica o la emoción en la música?",
    options: ["La técnica", "La emoción", "Ambas por igual", "Depende del género"],
  },
  {
    id: 33,
    text: "¿Crees que el arte debe tener un mensaje o puede ser puramente estético?",
    options: ["Debe tener mensaje", "Puede ser puramente estético", "Depende del contexto"],
  },
  {
    id: 34,
    text: "¿Has experimentado alguna vez un estado alterado de conciencia escuchando música?",
    options: ["Sí, profundamente", "Ligeramente", "No", "No estoy seguro"],
  },
  {
    id: 35,
    text: "¿Has asistido alguna vez a un concierto de Tool?",
    options: ["Sí, varias veces", "Una vez", "No, pero me gustaría", "¿Quiénes son Tool?"],
  },
  
  // Preguntas absurdas otra vez
  {
    id: 36,
    text: "¿Cuántos dedos tiene tu mano dominante?",
    options: ["5", "4", "6", "Prefiero no contar"],
  },
  {
    id: 37,
    text: "¿Con qué frecuencia piensas en el fin del universo?",
    options: ["Diariamente", "A veces", "Nunca", "Ahora mismo"],
  },
  {
    id: 38,
    text: "¿Crees que la conciencia humana podría ser transferida a una máquina?",
    options: ["Sí, en el futuro", "Es teóricamente posible", "No", "Ya estamos en una simulación"],
  },
  {
    id: 39,
    text: "¿Prefieres las espirales en sentido horario o antihorario?",
    options: ["Horario", "Antihorario", "Me dan igual", "¿Qué clase de pregunta es esta?"],
  },
  {
    id: 40,
    text: "¿Crees que existe el libre albedrío o todo está predeterminado?",
    options: ["Existe el libre albedrío", "Todo está predeterminado", "Una mezcla de ambos", "La realidad es una ilusión"],
  },
  
  // Más preguntas sobre música
  {
    id: 41,
    text: "¿Tocas algún instrumento musical?",
    options: ["Sí, varios", "Sí, uno", "No, pero me gustaría", "No me interesa"],
  },
  {
    id: 42,
    text: "¿Te gusta la música con influencias de otras culturas?",
    options: ["Me encanta", "A veces", "No especialmente", "Depende de la cultura"],
  },
  {
    id: 43,
    text: "¿Qué opinas del uso de Auto-Tune en la música moderna?",
    options: ["Me molesta", "No me importa", "Puede ser una herramienta artística", "¿Qué es Auto-Tune?"],
  },
  {
    id: 44,
    text: "¿Prefieres las voces masculinas o femeninas en la música?",
    options: ["Masculinas", "Femeninas", "Ambas por igual", "Depende de la canción"],
  },
  {
    id: 45,
    text: "¿Cómo descubres nueva música habitualmente?",
    options: ["Recomendaciones de streaming", "Amigos", "Radio", "Algoritmos dudosos"],
  },
  
  // Filosofía y aleatoriedad
  {
    id: 46,
    text: "Si pudieras conocer la respuesta a una sola pregunta del universo, ¿lo harías?",
    options: ["Sí", "No", "Depende de la pregunta", "Ya conozco todas las respuestas"],
  },
  {
    id: 47,
    text: "¿Prefieres pensar en términos de patrones o caos?",
    options: ["Patrones", "Caos", "Ambos", "El caos es un patrón que no entendemos"],
  },
  {
    id: 48,
    text: "¿Cuántos lados tiene tu polígono favorito?",
    options: ["3 (triángulo)", "4 (cuadrado)", "5 (pentágono)", "Infinitos (círculo)"],
  },
  {
    id: 49,
    text: "¿Crees que el arte generado por IA es realmente arte?",
    options: ["Sí", "No", "Depende", "Todo es arte si lo consideras arte"],
  },
  {
    id: 50,
    text: "¿Con qué frecuencia te fijas en la proporción áurea?",
    options: ["Siempre", "A veces", "Nunca", "La veo en todas partes"],
  },
  
  // Música y matemáticas
  {
    id: 51,
    text: "¿Sabías que hay relaciones matemáticas en la música?",
    options: ["Sí, es fascinante", "Algo he oído", "No lo sabía", "Las matemáticas están en todo"],
  },
  {
    id: 52,
    text: "¿Qué opinas de la música generada algorítmicamente?",
    options: ["Me gusta", "Es interesante como experimento", "Prefiero música humana", "La música es matemáticas"],
  },
  {
    id: 53,
    text: "¿Crees que hay una conexión entre las matemáticas y la estética musical?",
    options: ["Definitivamente", "En cierta medida", "No lo creo", "Todo es subjetivo"],
  },
  {
    id: 54,
    text: "¿Conoces la secuencia de Fibonacci?",
    options: ["Sí, y la entiendo", "He oído hablar de ella", "No", "1, 1, 2, 3, 5, 8, 13..."],
  },
  {
    id: 55,
    text: "¿Qué te parece más importante en el arte: la intuición o la precisión técnica?",
    options: ["La intuición", "La precisión técnica", "Ambas por igual", "Depende del tipo de arte"],
  },
  
  // Preguntas raras
  {
    id: 56,
    text: "¿Cuántas dimensiones crees que existen?",
    options: ["3", "4", "10-11 (teoría de cuerdas)", "Infinitas"],
  },
  {
    id: 57,
    text: "¿Si pudieras ver un color nuevo, querrías hacerlo?",
    options: ["Sí", "No", "Ya veo colores que otros no ven", "Los colores no existen realmente"],
  },
  {
    id: 58,
    text: "¿Crees en la existencia de universos paralelos?",
    options: ["Sí", "Es posible", "No", "Estamos en uno ahora mismo"],
  },
  {
    id: 59,
    text: "¿Prefieres los números pares o impares?",
    options: ["Pares", "Impares", "Primos", "Irracionales"],
  },
  {
    id: 60,
    text: "¿Qué forma geométrica te representa mejor?",
    options: ["Círculo", "Triángulo", "Espiral", "Fractal"],
  },
  
  // Más preguntas de música
  {
    id: 61,
    text: "¿Escuchas música mientras trabajas o estudias?",
    options: ["Siempre", "A veces", "Nunca", "Solo instrumental"],
  },
  {
    id: 62,
    text: "¿Te gusta la música con letras en idiomas que no entiendes?",
    options: ["Sí", "No", "Depende del idioma", "Prefiero entender las letras"],
  },
  {
    id: 63,
    text: "¿Qué opinas de los músicos que experimentan con su sonido?",
    options: ["Me encanta la evolución", "Prefiero consistencia", "Depende del resultado", "La experimentación es necesaria"],
  },
  {
    id: 64,
    text: "¿Has sentido alguna vez que una canción fue escrita específicamente para ti?",
    options: ["Sí, muchas veces", "Una o dos veces", "Nunca", "Todas las canciones son para mí"],
  },
  {
    id: 65,
    text: "¿Crees que la música puede tener propiedades curativas?",
    options: ["Definitivamente", "En cierta medida", "No realmente", "Es pura pseudociencia"],
  },
  
  // Absurdas con pistas de Tool
  {
    id: 66,
    text: "¿Crees que es posible abrir el tercer ojo?",
    options: ["Sí", "No", "Ya lo tengo abierto", "¿Qué tercer ojo?"],
  },
  {
    id: 67,
    text: "¿Has experimentado alguna vez con psicodélicos?",
    options: ["Sí", "No", "Prefiero no responder", "La vida es un psicodélico"],
  },
  {
    id: 68,
    text: "¿Cuál es tu opinión sobre el concepto de 'trascendencia'?",
    options: ["Es mi meta", "Interesante pero abstracto", "No creo en eso", "Ya he trascendido"],
  },
  {
    id: 69,
    text: "¿Te interesa la mitología?",
    options: ["Mucho", "Un poco", "No realmente", "Creo en ella literalmente"],
  },
  {
    id: 70,
    text: "¿Qué opinas de los mandalas y símbolos geométricos?",
    options: ["Son fascinantes", "Son bonitos", "No me interesan", "Contienen secretos universales"],
  },
  
  // Más música y percepciones
  {
    id: 71,
    text: "¿Prefieres escuchar música solo o en compañía?",
    options: ["Solo", "En compañía", "Depende del contexto", "Solo en conciertos"],
  },
  {
    id: 72,
    text: "¿Crees que el gusto musical dice algo sobre la personalidad?",
    options: ["Mucho", "Algo", "No necesariamente", "Es solo una preferencia"],
  },
  {
    id: 73,
    text: "¿Sigues la teoría musical o te guías por el oído?",
    options: ["Sigo la teoría", "Me guío por el oído", "Ambos", "¿Qué es la teoría musical?"],
  },
  {
    id: 74,
    text: "¿Has experimentado ASMR alguna vez?",
    options: ["Sí, frecuentemente", "Una o dos veces", "No", "¿Qué es ASMR?"],
  },
  {
    id: 75,
    text: "¿Qué opinas de los vinilos vs. música digital?",
    options: ["Prefiero vinilos", "Prefiero digital", "Ambos tienen su lugar", "La calidad es lo mismo"],
  },
  
  // Aleatorias y filosóficas
  {
    id: 76,
    text: "¿Cuántas veces has dudado de la naturaleza de la realidad?",
    options: ["Constantemente", "A veces", "Rara vez", "Nunca"],
  },
  {
    id: 77,
    text: "¿Crees que el tiempo es lineal?",
    options: ["Sí", "No", "Es cíclico", "El tiempo no existe realmente"],
  },
  {
    id: 78,
    text: "¿Te consideras más analítico o intuitivo?",
    options: ["Analítico", "Intuitivo", "Un balance de ambos", "Depende del contexto"],
  },
  {
    id: 79,
    text: "¿Qué piensas sobre la idea de que todo está interconectado?",
    options: ["Es verdad", "Es posible", "No lo creo", "Somos uno con todo"],
  },
  {
    id: 80,
    text: "¿Crees que hay patrones ocultos en el universo?",
    options: ["Definitivamente", "Tal vez", "No", "Los estoy decodificando ahora mismo"],
  },
  
  // Referencias a Tool y música
  {
    id: 81,
    text: "¿Te gustan las canciones con títulos enigmáticos o crípticos?",
    options: ["Me encantan", "A veces", "Prefiero títulos directos", "No me fijo en los títulos"],
  },
  {
    id: 82,
    text: "¿Prefieres bandas donde todos los miembros son virtuosos?",
    options: ["Sí, valoro la técnica", "No necesariamente", "Solo necesito un buen cantante", "¿Qué es 'virtuoso'?"],
  },
  {
    id: 83,
    text: "¿Has notado alguna vez patrones matemáticos en la música?",
    options: ["Sí, constantemente", "A veces", "No", "La música es pura matemática"],
  },
  {
    id: 84,
    text: "¿Te gustan las portadas de álbumes con arte complejo y simbólico?",
    options: ["Son mis favoritas", "A veces", "Prefiero portadas simples", "No me fijo en las portadas"],
  },
  {
    id: 85,
    text: "¿Qué opinas de los músicos que son perfeccionistas?",
    options: ["Los admiro", "A veces exageran", "Prefiero la espontaneidad", "El arte nunca es perfecto"],
  },
  
  // Últimas preguntas variadas
  {
    id: 86,
    text: "¿Prefieres la lluvia o la nieve?",
    options: ["Lluvia", "Nieve", "Ambas", "Ninguna"],
  },
  {
    id: 87,
    text: "¿Consideras que tienes buen sentido del ritmo?",
    options: ["Excelente", "Bueno", "Regular", "Pésimo"],
  },
  {
    id: 88,
    text: "¿Cuál es tu opinión sobre la física cuántica?",
    options: ["Fascinante", "Confusa", "No me interesa", "Yo soy física cuántica"],
  },
  {
    id: 89,
    text: "¿Crees que los extraterrestres escuchan música?",
    options: ["Seguramente", "Tal vez de formas que no entendemos", "No", "Yo soy extraterrestre"],
  },
  {
    id: 90,
    text: "¿Cuántos brazos tienes actualmente?",
    options: ["2", "Menos de 2", "Más de 2", "Prefiero no responder"],
  },
  
  // Últimas preguntas con pistas de recomendación
  {
    id: 91,
    text: "¿Te gusta la música que requiere varias escuchas para apreciarla completamente?",
    options: ["Sí, me encanta descubrir capas", "A veces", "Prefiero inmediatez", "La vida es demasiado corta"],
  },
  {
    id: 92,
    text: "¿Has experimentado alguna vez una 'revelación' mientras escuchabas música?",
    options: ["Sí, fue transformador", "Pequeñas epifanías", "No", "La música ES la revelación"],
  },
  {
    id: 93,
    text: "¿Qué opinas de la idea 'todo es uno'?",
    options: ["Tiene sentido", "Es un concepto interesante", "No estoy de acuerdo", "Somos polvo de estrellas"],
  },
  {
    id: 94,
    text: "¿Crees que hay 'matemáticas sagradas'?",
    options: ["Sí", "Es posible", "No", "Todo es matemáticas"],
  },
  {
    id: 95,
    text: "¿Te gustan las canciones que cuentan una historia?",
    options: ["Me encantan", "Depende de la historia", "Prefiero temas abstractos", "La vida es la historia"],
  },
  {
    id: 96,
    text: "¿Tienes alguna herramienta favorita?",
    options: ["Martillo", "Destornillador", "Sierra", "No entiendo la pregunta"],
  },
  {
    id: 97,
    text: "¿Te gustan las bandas cuyo nombre es también una palabra común?",
    options: ["Sí", "No me había fijado", "No", "El nombre es irrelevante"],
  },
  {
    id: 98,
    text: "¿Qué opinas de la música progresiva?",
    options: ["Es mi favorita", "Demasiado pretenciosa", "Algunos temas me gustan", "¿Qué es música progresiva?"],
  },
  {
    id: 99,
    text: "¿Crees en las coincidencias o todo tiene un propósito?",
    options: ["Existen las coincidencias", "Todo tiene un propósito", "Un poco de ambos", "La causalidad es una ilusión"],
  },
  {
    id: 100,
    text: "¿Si tuvieras que elegir una banda para escuchar el resto de tu vida?",
    options: ["Una de mis favoritas actuales", "Algo variado y complejo", "Prefiero no elegir solo una", "Ya lo he decidido"],
  },
];