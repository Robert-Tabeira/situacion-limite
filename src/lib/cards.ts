export type Card = {
  situacion: string
  opciones: [string, string, string, string]
}

const FALLBACK_CARDS: Card[] = [
  {
    situacion: 'En la cena de cumpleanos de tu pareja, su madre te pregunta delante de toda la mesa cuando van a convivir. Tu pareja se queda en silencio y todos esperan tu respuesta.',
    opciones: [
      'Dices que todavia no lo hablaron en serio.',
      'Sonries y respondes que seria lindo, algun dia.',
      'Haces un chiste para cambiar el foco de inmediato.',
      'Devuelves la pregunta a tu pareja y la comprometes tambien.',
    ],
  },
  {
    situacion: 'Un amigo te pide que confirmes una mentira para cubrirlo frente a su pareja. Te lo pregunta delante de ambos y no te habia avisado nada antes.',
    opciones: [
      'Lo bancas y sostienes la version sin dudar.',
      'Dices que no entiendes de que esta hablando.',
      'Admites que no puedes mentir en esa situacion.',
      'Improvisas una salida graciosa para aflojar la tension.',
    ],
  },
  {
    situacion: 'Durante una videollamada importante compartes pantalla y queda visible una pestana con una busqueda bastante personal. Nadie dice nada, pero todos la vieron.',
    opciones: [
      'Cierras la pestana de golpe y sigues como si nada.',
      'Reconoces el papelon con humor y continuas.',
      'Inventas una excusa tecnica bastante floja.',
      'Pides un minuto para resetearte y volver prolijo.',
    ],
  },
  {
    situacion: 'Te agregan por error al grupo familiar de una companera de trabajo. Antes de salir, lees un secreto delicado sobre su vida sentimental.',
    opciones: [
      'Sales sin escribir nada y finges que nunca estuviste.',
      'Avisas enseguida que te agregaron por error.',
      'Te quedas un rato mas mirando que pasa.',
      'Mandas un mensaje ambiguo para medir el caos.',
    ],
  },
  {
    situacion: 'Estas presentando a tu nueva cita en una fiesta y, en ese momento, aparece una persona con la que saliste hace poco y te saluda con demasiada confianza.',
    opciones: [
      'La saludas normal y sigues adelante con calma.',
      'Finges que apenas la conoces para bajar tension.',
      'Presentas a las dos personas y bancas el momento.',
      'Te inventas una urgencia y desapareces unos minutos.',
    ],
  },
  {
    situacion: 'En una reunion de trabajo, tu jefa propone un juego de sinceridad para “romper el hielo” y la primera pregunta incomoda te toca a ti.',
    opciones: [
      'Respondes con sinceridad total y bancas consecuencias.',
      'Das una respuesta elegante, pero muy filtrada.',
      'Lo conviertes en chiste para no exponerte tanto.',
      'Dices que prefieres pasar porque no te copa.',
    ],
  },
  {
    situacion: 'Encuentras una billetera con mucho dinero justo antes de quedarte corto para pagar algo que necesitabas de verdad esa misma noche.',
    opciones: [
      'La devuelves completa aunque te cueste un monton.',
      'Sacas solo lo justo y despues la devuelves.',
      'La entregas cerrada sin mirar nada mas.',
      'Esperas un rato por si aparece la persona.',
    ],
  },
  {
    situacion: 'Tu ex te manda “te extrano” mientras estas mostrando fotos de un viaje con la persona con la que sales ahora. Tu pantalla esta a la vista.',
    opciones: [
      'Respondes en el momento porque te gana la curiosidad.',
      'Dejas el mensaje en visto y sigues la charla.',
      'Lees el mensaje en voz alta y te ries del timing.',
      'Archivas el chat para no abrir un drama nuevo.',
    ],
  },
  {
    situacion: 'En clase te acusan de haberte copiado porque sacaste la nota mas alta. El profesor te pide que te expliques delante de todos.',
    opciones: [
      'Defiendes tu examen con argumentos y detalles.',
      'Te enojas y marcas que la acusacion es injusta.',
      'Te lo tomas con humor para no tensar mas.',
      'Aceptas repetir parte del examen en ese momento.',
    ],
  },
  {
    situacion: 'En una boda descubres que tu ex estara en tu misma mesa durante toda la noche y ademas va con su nueva pareja.',
    opciones: [
      'Pides discreto cambio de mesa antes de sentarte.',
      'Te sientas y actuas con una calma teatral.',
      'Aprovechas para mostrar que estas espectacular.',
      'Llegas tarde para evitar el primer contacto incomodo.',
    ],
  },
  {
    situacion: 'Tu vecino te pide ayuda para subir un mueble enorme justo cuando estabas por salir a una cita que te importa mucho.',
    opciones: [
      'Lo ayudas igual, aunque llegues tarde.',
      'Le explicas que ahora no puedes y ofreces volver.',
      'Te haces el distraido y sales rapido.',
      'Consigues otra persona que lo ayude por ti.',
    ],
  },
  {
    situacion: 'Una persona famosa que admiras entra sola contigo al ascensor. Tienen varios pisos por delante y el silencio pesa.',
    opciones: [
      'Le hablas con naturalidad, sin idolatrarla demasiado.',
      'Te quedas callado porque no quieres molestar.',
      'Le pides una foto aunque sea incomodo.',
      'Aprovechas para contarle una idea o proyecto tuyo.',
    ],
  },
  {
    situacion: 'Tu familia hace una vaquita para un regalo importante y tu aporte queda bastante por debajo del de todos los demas.',
    opciones: [
      'Explicas honestamente que hoy no puedes poner mas.',
      'Te endeudas un poco para quedar a la altura.',
      'No dices nada y esperas que pase desapercibido.',
      'Compensas con organizacion y discurso emotivo.',
    ],
  },
  {
    situacion: 'Mandas un meme burlandote de alguien al grupo equivocado. La persona del meme esta ahi y lo lee al instante.',
    opciones: [
      'Pides perdon de una y te haces cargo.',
      'Dices que iba a otro chat y tratas de remar.',
      'Te ries de tu propio desastre y sigues.',
      'Silencias el grupo y dejas morir la escena.',
    ],
  },
  {
    situacion: 'Te anotan en un karaoke sin preguntarte y te toca subir justo despues de alguien que canto increible. Toda la mesa te filma.',
    opciones: [
      'Subes igual y cantas con actitud aunque desafines.',
      'Te bajas antes y aceptas la humillacion social.',
      'Haces un show comico mas que musical.',
      'Eliges una cancion imposible y te entregas al caos.',
    ],
  },
  {
    situacion: 'Te prestan un auto y lo rozas al salir del estacionamiento. El dano es pequeno, pero imposible de no notar despues.',
    opciones: [
      'Lo cuentas apenas llegas porque corresponde.',
      'Intentas arreglarlo antes de devolverlo.',
      'Esperas a ver si la otra persona lo menciona.',
      'Minimizas el golpe y pruebas suerte.',
    ],
  },
  {
    situacion: 'Tu cita va al bano y ves entrar un mensaje a su celular que dice: “Decile la verdad hoy”. El telefono queda justo frente a ti.',
    opciones: [
      'Miras hacia otro lado y no tocas nada.',
      'Lees un poco mas porque no resistes la tentacion.',
      'Preguntas de frente apenas vuelve a la mesa.',
      'Inventas una salida porque te cambió el clima.',
    ],
  },
  {
    situacion: 'Te confunden con parte del staff en un evento y varias personas empiezan a pedirte indicaciones y soluciones de verdad.',
    opciones: [
      'Improvisas seguridad y ayudas lo mejor posible.',
      'Aclaras de entrada que no trabajas ahi.',
      'Juegas un rato al personaje por diversion.',
      'Te escapas antes de quedar muy expuesto.',
    ],
  },
  {
    situacion: 'En una comida formal se te cae una empanada entera sobre la ropa de la persona mas elegante de la mesa.',
    opciones: [
      'Te levantas enseguida a ayudar a limpiar.',
      'Pides disculpas una y otra vez, muy nervioso.',
      'Tiras un chiste porque no sabes que mas hacer.',
      'Intentas minimizarlo para no agrandarlo mas.',
    ],
  },
  {
    situacion: 'Tu grupo propone revisar telefonos como juego. Una persona toma el tuyo con entusiasmo y sabes que hay chats dificiles de explicar.',
    opciones: [
      'Bloqueas el telefono con reflejos de superheroe.',
      'Aceptas y confias en que no explote nada grave.',
      'Negocias otro reto para salvar tu privacidad.',
      'Te ofendes por principio y te plantas.',
    ],
  },
  {
    situacion: 'Tu pareja te pregunta si realmente te cae bien su mejor amigo. Justo hoy no tienes energia para mentiras diplomaticas.',
    opciones: [
      'Dices que no te cae tan bien, pero con cuidado.',
      'La piloteas con una respuesta muy diplomatica.',
      'Cambias de tema porque sabes que se complica.',
      'Respondes con humor acido para no quedar rigido.',
    ],
  },
  {
    situacion: 'En una reunion familiar te preguntan por que sigues soltero y varias personas se suman con opiniones no pedidas.',
    opciones: [
      'Respondes en serio y marcas un limite amable.',
      'Lo conviertes en monologo comico para salir.',
      'Te refugias en la comida y esquivas todo.',
      'Le devuelves la pregunta a otra persona curiosa.',
    ],
  },
  {
    situacion: 'Te toca cuidar el perro de un amigo y se te escapa en los primeros diez minutos del paseo. No responde y no lo ves por ningun lado.',
    opciones: [
      'Llamas al dueno de inmediato y cuentas todo.',
      'Lo buscas a full antes de avisar nada.',
      'Pides ayuda por redes y grupos del barrio.',
      'Intentas sonar calmado mientras entras en panico.',
    ],
  },
  {
    situacion: 'En el gimnasio se desconectan tus auriculares y toda la sala escucha un audio vergonzoso que estabas reproduciendo.',
    opciones: [
      'Apagas todo de inmediato y miras al piso.',
      'Sigues normal como si no hubiera pasado nada.',
      'Te ries de ti mismo y asumes el papelon.',
      'Culpas al bluetooth y haces catarsis tecnica.',
    ],
  },
  {
    situacion: 'Te regalan algo objetivamente horrible, pero sabes que lo hicieron a mano y con muchisimo carino. Te preguntan si te gusto.',
    opciones: [
      'Mientes con dulzura porque valoras el gesto.',
      'Elogias la dedicacion, no el resultado.',
      'Das una opinion suave y bien medida.',
      'Preguntas si aceptan mejoras o una version dos.',
    ],
  },
  {
    situacion: 'En una escapada con amigos descubres que reservaron menos camas que personas. Todos se miran midiendo territorio.',
    opciones: [
      'Cedes la cama para evitar una guerra absurda.',
      'Peleas por una buena cama con argumentos firmes.',
      'Propones sorteo para hacerlo mas justo.',
      'Aceptas dormir donde caiga y listo.',
    ],
  },
  {
    situacion: 'Tu madre comenta una foto vieja tuya en redes con una anecdota muy humillante y ya la vio media ciudad.',
    opciones: [
      'Le pides que la borre sin rodeos.',
      'Te sumas al chiste para aduenarte del momento.',
      'La ignoras aunque te duela por dentro.',
      'Contraatacas con una foto vieja de ella.',
    ],
  },
  {
    situacion: 'Vas a una entrevista y reconoces al reclutador como alguien con quien tuviste una cita pesima hace un tiempo.',
    opciones: [
      'Lo mencionas con naturalidad para desactivar rareza.',
      'Finges que no recuerdas absolutamente nada.',
      'Usas la anecdota para romper el hielo.',
      'Pides unos segundos para recomponerte mentalmente.',
    ],
  },
  {
    situacion: 'Se corta la luz y quedas atrapado en el ascensor con dos desconocidos que no dejan de hablarte para bajar la tension.',
    opciones: [
      'Conversas y tratas de sostener la calma del grupo.',
      'Respondes lo minimo porque necesitas silencio.',
      'Tomas el rol de lider para ordenar la situacion.',
      'Te sientas y aceptas tu destino dramaticamente.',
    ],
  },
  {
    situacion: 'Recibes por error una transferencia importante de alguien que no conoces. Justo estas muy ajustado con la plata este mes.',
    opciones: [
      'La devuelves enseguida porque no es tuya.',
      'Esperas a que te contacten antes de mover nada.',
      'Tomas una pequena parte y despues arreglas.',
      'Consultas a alguien si podria ser un error o una estafa.',
    ],
  },
  {
    situacion: 'Tu amigo cocina para todos y la comida sale mal de verdad. Te mira a los ojos buscando una reaccion sincera.',
    opciones: [
      'Lo elogias por amor y comes igual.',
      'Sugi eres pedir comida afuera sin destruirlo.',
      'Das una critica suave, pero honesta.',
      'Comes en silencio y rezas por postre.',
    ],
  },
  {
    situacion: 'Te invitan a hablar frente a mucha gente sobre un tema que apenas conoces. Te presentan como si fueras especialista.',
    opciones: [
      'Improvisas con confianza y ordenas ideas generales.',
      'Admites que no eres experto y ajustas expectativas.',
      'Lees conceptos amplios para zafar con dignidad.',
      'Intentas bajarte antes de quedar tan expuesto.',
    ],
  },
  {
    situacion: 'Pierdes una apuesta y el castigo es subir por 24 horas una foto bastante humillante a tus historias.',
    opciones: [
      'La subes sin filtro y bancas las respuestas.',
      'Negocias una version mas suave del castigo.',
      'Pagas o compensas para no publicarla.',
      'La subes, pero acompanada de mucha ironia.',
    ],
  },
  {
    situacion: 'En un almuerzo de trabajo todos piden platos baratos y tu tenias muchas ganas del mas caro de la carta.',
    opciones: [
      'Pides lo que querias sin pedir permiso social.',
      'Cambias tu pedido para no desentonar tanto.',
      'Propones compartir algo intermedio y elegante.',
      'Dices que no tienes mucha hambre y te achicas.',
    ],
  },
  {
    situacion: 'Tu companero de piso lleva visita sorpresa y la casa esta en un nivel de desorden historico que te averguenza mucho.',
    opciones: [
      'Limpias a velocidad absurda antes de abrir.',
      'Los haces pasar igual y bancas la realidad.',
      'Culpas a una semana caotica y sigues adelante.',
      'Los invitas a salir antes de que entren.',
    ],
  },
  {
    situacion: 'Te reencuentras con una persona a la que le debes dinero y todavia no le pagaste. Te saluda con una sonrisa demasiado tranquila.',
    opciones: [
      'Le pagas ahi mismo o haces transferencia ya.',
      'Das una fecha concreta y la sostienes.',
      'Te haces el sorprendido para ganar tiempo.',
      'Lo abrazas con carisma mientras piensas un plan.',
    ],
  },
  {
    situacion: 'En una reunion alguien cuenta un chisme sobre ti que es totalmente cierto, pero no tendria que haberse sabido.',
    opciones: [
      'Lo niegas sin pestañear y bancas la actuacion.',
      'Lo admites con aplomo para quitarle poder.',
      'Preguntas directamente quien hablo de mas.',
      'Desvias el foco hacia otro tema picante.',
    ],
  },
  {
    situacion: 'Te escriben “tenemos que hablar” y esa misma noche te cruzas con esa persona en una fiesta donde no puedes escapar facil.',
    opciones: [
      'La encaras de entrada y cierras el suspenso.',
      'Evitas a esa persona todo lo posible.',
      'Te haces el desentendido hasta que no haya salida.',
      'Te preparas un discurso mental y esperas el momento.',
    ],
  },
  {
    situacion: 'En una fila larguisima alguien intenta colarse delante tuyo con una excusa bastante floja y cara de total impunidad.',
    opciones: [
      'Lo frenas en el momento y marcas el limite.',
      'Lo dejas pasar porque no quieres conflicto.',
      'Buscas apoyo del resto de la fila.',
      'Le clavas sarcasmo fino para incomodarlo.',
    ],
  },
  {
    situacion: 'Estando de visita rompes un objeto caro en casa ajena. Nadie vio el momento exacto y aun no lo descubrieron.',
    opciones: [
      'Lo cuentas en el acto y te haces cargo.',
      'Intentas repararlo antes de confesar nada.',
      'Esperas a que aparezca el tema y ahi hablas.',
      'Pruebas si puede pasar por desgaste previo.',
    ],
  },
  {
    situacion: 'Te dejan a cargo del playlist de una fiesta y logras vaciar la pista con tres canciones seguidas. Varias miradas te apuntan.',
    opciones: [
      'Cambias radicalmente el estilo y remontas.',
      'Defiendes tu criterio musical con orgullo.',
      'Cedes el control a otra persona enseguida.',
      'Subes el volumen como si ese fuera el problema.',
    ],
  },
  {
    situacion: 'En una reunion de exalumnos sientes que todas las demas personas parecen muchisimo mas exitosas que tu en este momento.',
    opciones: [
      'Te muestras orgulloso de tu proceso real.',
      'Exageras un poco tu presente para empatar clima.',
      'Preguntas mucho y cuentas poco sobre ti.',
      'Lo conviertes en charla honesta sobre comparaciones.',
    ],
  },
  {
    situacion: 'Olvidaste el cumpleanos de alguien que siempre recuerda el tuyo y te escribe con toda la buena onda del mundo.',
    opciones: [
      'Llamas al instante y pides perdon de verdad.',
      'Armas una sorpresa improvisada para compensar.',
      'Mandas un mensaje largo y bien pensado.',
      'Esperas a verla en persona para explicarte mejor.',
    ],
  },
  {
    situacion: 'Tu acompanante va al bano justo cuando llega la cuenta. Los dos venian actuando como si no supieran quien iba a pagar.',
    opciones: [
      'Pagas sin dudar y no haces escena.',
      'Esperas su regreso porque no te toca asumirlo solo.',
      'Propones dividir con claridad cuando vuelva.',
      'Te entretienes con el celular para ganar tiempo.',
    ],
  },
  {
    situacion: 'Un musico de restaurante se acerca a tu mesa en plena cita y empieza a cantarte demasiado cerca. Tu cita parece fascinada.',
    opciones: [
      'Te sumas al momento y lo abrazas con humor.',
      'Te hundes un poco en la silla y sobrevives.',
      'Pides otra cancion para empujar mas el papelon.',
      'Transformas toda la escena en una broma compartida.',
    ],
  },
]

function randomFrom(cards: Card[]) {
  return cards[Math.floor(Math.random() * cards.length)]
}

export function getFallbackCard(excludedSituations: string[] = []): Card {
  const excluded = new Set(excludedSituations)
  const available = FALLBACK_CARDS.filter(card => !excluded.has(card.situacion))
  return randomFrom(available.length > 0 ? available : FALLBACK_CARDS)
}
