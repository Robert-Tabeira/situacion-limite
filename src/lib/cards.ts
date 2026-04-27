export type Card = {
  situacion: string
  opciones: [string, string, string, string]
}

const FALLBACK_CARDS: Card[] = [
  {
    situacion: 'En una cena con tus suegros se te escapa un audio comprometedor por el parlante del celular. Todos te miran esperando una explicacion.',
    opciones: ['Lo apagas y cambias de tema', 'Dices que era una joda interna', 'Lo dejas sonar y te ries', 'Culpas al algoritmo y sigues comiendo'],
  },
  {
    situacion: 'Tu mejor amigo te pide cubrir una mentira frente a su pareja y te lo pregunta delante de ambos sin avisarte.',
    opciones: ['Lo bancas sin pensar', 'Te haces el confundido', 'Le dices la verdad de una', 'Desvias con un chiste raro'],
  },
  {
    situacion: 'Te agregan por error al grupo familiar de alguien del trabajo y lees un secreto fuerte antes de que se den cuenta.',
    opciones: ['Sales sin decir nada', 'Avisas enseguida y pides perdon', 'Te quedas mirando un poco mas', 'Mandas un sticker para medir el caos'],
  },
  {
    situacion: 'En una fiesta reconoces a la persona con la que salias justo cuando estas presentando a tu nueva cita.',
    opciones: ['Saludas como si nada', 'Finges no verla', 'Presentas a ambos con orgullo', 'Te vas al bano de emergencia'],
  },
  {
    situacion: 'Tu jefe propone un juego de sinceridad en una reunion y la primera pregunta incomoda te toca a ti.',
    opciones: ['Respondes con honestidad brutal', 'La piloteas elegante', 'Te haces el gracioso', 'Dices que prefieres pasar'],
  },
  {
    situacion: 'Encuentras una billetera con bastante dinero minutos antes de quedar corto para pagar algo importante.',
    opciones: ['La devuelves completa', 'Tomas un poco y luego la devuelves', 'La entregas sin abrirla', 'Esperas a ver si aparece alguien'],
  },
  {
    situacion: 'Tu ex te manda “te extrano” justo cuando estas mostrando fotos de tus vacaciones con otra persona.',
    opciones: ['Respondes al instante', 'Dejas el mensaje en visto', 'Lees en voz alta y te ries', 'Bloqueas por paz mental'],
  },
  {
    situacion: 'En clase te acusan de copiarte por un examen perfecto y el profesor te pide explicarte frente a todos.',
    opciones: ['Defiendes tu nota con datos', 'Te ofendes y reclamas', 'Lo tomas con humor', 'Aceptas repetirlo en el momento'],
  },
  {
    situacion: 'Te invitan a un casamiento y descubres que tu ex va a sentarse en tu misma mesa durante toda la noche.',
    opciones: ['Pides cambio de mesa', 'Actuas como si nada', 'Te sientas y provocas tension', 'Llegas tarde para evitar el saludo'],
  },
  {
    situacion: 'En una videollamada de trabajo compartes pantalla y se ve una busqueda demasiado personal en el navegador.',
    opciones: ['Cierras todo en seco', 'Haces un chiste y sigues', 'Inventas una excusa floja', 'Finges que no lo viste'],
  },
  {
    situacion: 'Tu vecino te pide ayuda para mover un mueble enorme justo cuando estabas saliendo a una cita importante.',
    opciones: ['Lo ayudas igual', 'Le dices que vuelves luego', 'Te haces el distraido', 'Convences a alguien mas de ayudar'],
  },
  {
    situacion: 'Una persona famosa que admiras entra al mismo ascensor y quedan solos durante varios pisos.',
    opciones: ['Le hablas con naturalidad', 'Te quedas congelado', 'Pides una selfie de una', 'Aprovechas para venderle una idea'],
  },
  {
    situacion: 'Tu familia arma una vaquita para un regalo y tu aporte es mucho menor que el de todos los demas.',
    opciones: ['Explicas tu situacion', 'Te endeudas y empatas', 'Te haces el boludo', 'Compensas con un discurso emotivo'],
  },
  {
    situacion: 'Descubres que mandaste un meme burlandote de alguien al mismo grupo donde estaba esa persona.',
    opciones: ['Pides perdon enseguida', 'Dices que iba para otro chat', 'Te ries y te haces cargo', 'Silencias el grupo por una semana'],
  },
  {
    situacion: 'En un karaoke te anotan sin preguntarte y te toca subir justo despues de la persona que canto increible.',
    opciones: ['Subes con confianza falsa', 'Te bajas antes de empezar', 'Haces show aunque desafines', 'Eliges una cancion imposible'],
  },
  {
    situacion: 'Te prestan un auto y lo rozas apenas saliendo del estacionamiento, pero nadie mas lo nota.',
    opciones: ['Lo cuentas de inmediato', 'Intentas arreglarlo antes', 'Esperas a ver si preguntan', 'Culpas a un rayoncito anterior'],
  },
  {
    situacion: 'Tu cita va al bano y en la mesa ves un mensaje entrante que dice “decile la verdad hoy”.',
    opciones: ['Miras para otro lado', 'Lees mas de lo debido', 'Preguntas de frente al volver', 'Te inventas una salida rapida'],
  },
  {
    situacion: 'Te confunden con alguien del staff en un evento y varias personas empiezan a pedirte soluciones.',
    opciones: ['Improvisas autoridad', 'Aclaras el error al instante', 'Ayudas un rato por diversion', 'Te escapas entre la gente'],
  },
  {
    situacion: 'En una comida importante se te cae una empanada entera sobre la ropa de la persona mas elegante de la mesa.',
    opciones: ['Ayudas a limpiar enseguida', 'Te disculpas sin parar', 'Haces un chiste nervioso', 'Finges que fue un accidente menor'],
  },
  {
    situacion: 'Tu grupo de amigos propone revisar telefonos por juego y alguien agarra el tuyo con entusiasmo.',
    opciones: ['Lo bloqueas con reflejos', 'Aceptas y rezas', 'Negocias otra prueba', 'Te haces el ofendido'],
  },
  {
    situacion: 'Te cruzas al profesor que acabas de criticar por mensaje y el celular sigue abierto en tu mano.',
    opciones: ['Lo saludas fuerte para disimular', 'Guardas el celular de golpe', 'Le dices que era una catarsis', 'Actuas como si nada raro pasara'],
  },
  {
    situacion: 'Tu pareja te pregunta si de verdad te cae bien su mejor amigo y hoy no tienes ganas de mentir.',
    opciones: ['Dices que no del todo', 'La piloteas diplomatica', 'Cambias de tema', 'Respondes con una broma filosa'],
  },
  {
    situacion: 'En una reunion familiar te piden que expliques por que sigues soltero delante de todos.',
    opciones: ['Respondes serio y honesto', 'Lo conviertes en stand up', 'Te sirves mas comida y esquivas', 'Devuelves la pregunta a otro'],
  },
  {
    situacion: 'Te toca cuidar el perro de un amigo y desaparece durante el paseo en los primeros diez minutos.',
    opciones: ['Lo buscas desesperado', 'Llamas al dueño ya', 'Pides ayuda por redes', 'Finges calma mientras entras en panico'],
  },
  {
    situacion: 'En el gimnasio se te salen los auriculares y toda la sala escucha el audio vergonzoso que estabas oyendo.',
    opciones: ['Los apagas de inmediato', 'Sigues como si nada', 'Te ries de ti mismo', 'Culpas al bluetooth'],
  },
  {
    situacion: 'Te regalan algo horrendo pero hecho con mucho amor y te piden opinion apenas lo abres.',
    opciones: ['Mientes con ternura', 'Destacas la intencion', 'Dices una verdad suave', 'Preguntas si incluye ticket de cambio'],
  },
  {
    situacion: 'Una criatura pequena te pregunta en publico algo incomodisimo sobre tu aspecto fisico.',
    opciones: ['Respondes con paciencia', 'Te ries y la sigues', 'Buscas al padre con la mirada', 'Le contestas con otra pregunta'],
  },
  {
    situacion: 'En una escapada con amigos te enteras de que reservaron menos camas que personas.',
    opciones: ['Cedes tu cama por paz', 'Peleas por la mejor', 'Propones sorteo', 'Duermes donde caiga'],
  },
  {
    situacion: 'Tu jefe manda por error su salario al grupo del equipo y todos se quedan en silencio.',
    opciones: ['Haces como que no viste', 'Lanzas un comentario ironico', 'Aprovechas para pedir aumento', 'Cambias de tema rapido'],
  },
  {
    situacion: 'Tu madre comenta una foto vieja tuya en redes con una anecdota humillante y ya la vio media ciudad.',
    opciones: ['Le pides que la borre', 'Te sumas al chiste', 'La ignoras con dolor', 'Contraatacas con una foto de ella'],
  },
  {
    situacion: 'Vas a una entrevista y reconoces al reclutador como alguien con quien tuviste una cita pesima.',
    opciones: ['Lo mencionas de frente', 'Finges no recordarlo', 'Usas el pasado a tu favor', 'Pides agua para ganar tiempo'],
  },
  {
    situacion: 'Se corta la luz en tu edificio y quedas atrapado en el ascensor con dos desconocidos muy habladores.',
    opciones: ['Conversas para matar tension', 'Te quedas en silencio total', 'Organizas el grupo como lider', 'Te sientas y aceptas tu destino'],
  },
  {
    situacion: 'En una fiesta alguien pone tu nombre en un juego de “a quien no invitarias nunca mas”.',
    opciones: ['Preguntas por que', 'Te lo tomas con humor', 'Te ofendes fuerte', 'Anotas mentalmente enemigos'],
  },
  {
    situacion: 'Recibes por error un deposito grande de un desconocido justo cuando estas fundido.',
    opciones: ['Lo devuelves de una', 'Esperas a que reclamen', 'Usas una parte y luego ves', 'Consultas si es karma positivo'],
  },
  {
    situacion: 'Tu amigo cocina para todos y la comida sale objetivamente horrible, pero te mira buscando aprobacion.',
    opciones: ['Lo elogias igual', 'Sugieres pedir delivery', 'Das una critica suave', 'Comes en silencio y sobrevives'],
  },
  {
    situacion: 'Te invitan a hablar frente a mucha gente sobre un tema que apenas entiendes.',
    opciones: ['Improvisas con seguridad', 'Admites que sabes poco', 'Lees frases generales', 'Intentas zafar antes de subir'],
  },
  {
    situacion: 'Alguien te confiesa un secreto enorme y al minuto te encuentras con la persona involucrada.',
    opciones: ['Actuas normal como campeon', 'Evitas todo contacto visual', 'Insinuas que sabes algo', 'Te vas antes de embarrarla'],
  },
  {
    situacion: 'Pierdes una apuesta ridicula y el castigo es publicar una foto humillante por 24 horas.',
    opciones: ['La subes sin filtro', 'Negocias una version light', 'Pagas para no hacerlo', 'Cumples pero con ironia'],
  },
  {
    situacion: 'En un almuerzo de trabajo todos piden algo barato y tu querias el plato mas caro de la carta.',
    opciones: ['Pides lo que querias igual', 'Cambias por presion social', 'Sugieres compartir algo', 'Dices que no tienes hambre'],
  },
  {
    situacion: 'Tu companero de piso trae visita sorpresa y tu casa esta en un nivel de desastre historico.',
    opciones: ['Limpias como loco', 'Los haces pasar igual', 'Culpas a una semana complicada', 'Invitas a salir en vez de entrar'],
  },
  {
    situacion: 'En una despedida te ofrecen decir unas palabras y no habias pensado nada.',
    opciones: ['Improvisas desde el corazon', 'Haces un brindis cortisimo', 'Copias una frase famosa', 'Te quebras y abrazas'],
  },
  {
    situacion: 'Te reencuentras con alguien a quien debias dinero y no le has pagado todavia.',
    opciones: ['Le pagas ahi mismo', 'Prometes fecha concreta', 'Te haces el sorprendido', 'Lo abrazas fuerte para descolocar'],
  },
  {
    situacion: 'Tu grupo decide jugar verdad o reto y sabes que hoy eres un objetivo facil.',
    opciones: ['Vas con verdad siempre', 'Pides retos absurdos', 'Te haces el enfermo', 'Aceptas el caos con orgullo'],
  },
  {
    situacion: 'Una persona te presenta como experto en algo que una vez hiciste y ahora debes sostener la mentira.',
    opciones: ['Improvisas tecnicismos', 'Aclaras que exageraron', 'Rediriges a otra persona', 'Sonries y hablas poco'],
  },
  {
    situacion: 'En la playa una ola se lleva una prenda tuya y vuelve justo cerca de un grupo enorme de gente.',
    opciones: ['Vas a buscarla ya', 'La das por perdida', 'Pides ayuda muerto de risa', 'Esperas a que se despeje la zona'],
  },
  {
    situacion: 'Te invitan a un asado y caes con las manos vacias cuando todos llevaron algo.',
    opciones: ['Ofreces pagar despues', 'Te haces cargo del fuego', 'Actuas como invitado premium', 'Sales a comprar algo urgente'],
  },
  {
    situacion: 'En una reunion alguien cuenta un chisme sobre ti que es cierto, pero no deberia saberse.',
    opciones: ['Lo niegas sin pestañear', 'Lo admites con estilo', 'Preguntas quien hablo', 'Desvias el foco a otro chisme'],
  },
  {
    situacion: 'Tu medico te reconoce en la calle justo cuando estabas contando un detalle vergonzoso de la consulta.',
    opciones: ['Lo saludas normal', 'Te callas en seco', 'Te ries del destino', 'Cruzas de vereda dramaticamente'],
  },
  {
    situacion: 'En un viaje grupal te roncas toda la noche y por la mañana todos te lo hacen saber.',
    opciones: ['Pides disculpas sinceras', 'Lo niegas ridiculamente', 'Te burlas contigo mismo', 'Exiges pruebas audiovisuales'],
  },
  {
    situacion: 'Te escriben “tenemos que hablar” y justo sales a encontrarte con esa persona en una fiesta.',
    opciones: ['La encaras de entrada', 'Evitas estar a solas', 'Te haces el desentendido', 'Te preparas un discurso mental'],
  },
  {
    situacion: 'Te piden que seas jurado en una competencia entre dos personas que quieres por igual.',
    opciones: ['Juzgas con dureza', 'Empatas como sea', 'Inventas criterios raros', 'Intentas renunciar al puesto'],
  },
  {
    situacion: 'Descubres que has estado pronuciando mal el nombre de un companero durante meses y hoy debes presentarlo.',
    opciones: ['Preguntas de una vez', 'Lo evitas elegantemente', 'Te la juegas otra vez', 'Le pasas la palabra rapido'],
  },
  {
    situacion: 'En una cena romantica se acerca un musico a cantarte muy cerca y tu cita parece amarlo.',
    opciones: ['Participas del momento', 'Te hundes en la silla', 'Pides otra cancion peor', 'Transformas todo en comedia'],
  },
  {
    situacion: 'Un amigo te pide opinion sincera sobre un corte de pelo nuevo que salio objetivamente mal.',
    opciones: ['Mientes por amor', 'Dices la verdad suave', 'Sugieres gorro temporal', 'Lo conviertes en personaje iconico'],
  },
  {
    situacion: 'En una fila larguisima alguien intenta colarse delante tuyo con una excusa muy floja.',
    opciones: ['Lo enfrentas ahi mismo', 'Lo dejas pasar igual', 'Llamas al resto como testigos', 'Usas sarcasmo elegante'],
  },
  {
    situacion: 'Tu telefono se conecta solo al auto ajeno y empieza a sonar una cancion vergonzosa a volumen alto.',
    opciones: ['Lo desconectas de golpe', 'Saludas al ritmo', 'Finges que no eres tu', 'Aprovechas para conocer a la persona'],
  },
  {
    situacion: 'Te invitan a un programa en vivo y el conductor hace un chiste pesado sobre ti al presentarte.',
    opciones: ['Le sigues el juego', 'Lo ubicas con clase', 'Te pones serio', 'Le respondes con algo peor'],
  },
  {
    situacion: 'Descubres en plena cita que tu camisa tiene la etiqueta gigante afuera desde hace horas.',
    opciones: ['La escondes discretamente', 'Lo confiesas riendo', 'Actuas como tendencia', 'Vas al bano y reseteas existencia'],
  },
  {
    situacion: 'Estando de visita rompes sin querer un objeto carisimo en casa ajena y nadie vio el momento exacto.',
    opciones: ['Lo cuentas al instante', 'Intentas repararlo solo', 'Esperas a que aparezca el tema', 'Te preguntas si puede pasar por desgaste'],
  },
  {
    situacion: 'Te dejan a cargo del playlist de una fiesta y vacias la pista con tres canciones seguidas.',
    opciones: ['Cambias radicalmente de estilo', 'Defiendes tu vision artistica', 'Cedes el control enseguida', 'Subes el volumen como si ayudara'],
  },
  {
    situacion: 'Una persona con la que sales te pide ver una pelicula que odias y te dice que definira mucho sobre ustedes.',
    opciones: ['La ves con esfuerzo', 'Dices que no con honestidad', 'Negocias otra opcion', 'Finges entusiasmo por amor'],
  },
  {
    situacion: 'En una reunion de exalumnos descubres que todos parecen mucho mas exitosos que tu.',
    opciones: ['Te muestras orgulloso igual', 'Exageras un poco tu vida', 'Preguntas mucho y hablas poco', 'Lo conviertes en terapia colectiva'],
  },
  {
    situacion: 'Te enteras de que olvidaste el cumpleaños de alguien que siempre recuerda el tuyo.',
    opciones: ['Llamas y pides perdon', 'Inventas un plan sorpresa', 'Mandas un mensaje larguisimo', 'Esperas a la medianoche siguiente'],
  },
  {
    situacion: 'Tu acompanante se va al bano y llega la cuenta. Sabes que ambos esperaban que pagara el otro.',
    opciones: ['Pagas sin dudar', 'Esperas su regreso firme', 'Propones mitad y mitad', 'Te haces el distraido con el celular'],
  },
]

export function getFallbackCard(): Card {
  return FALLBACK_CARDS[Math.floor(Math.random() * FALLBACK_CARDS.length)]
}
