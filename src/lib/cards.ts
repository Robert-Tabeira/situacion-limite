export type Card = {
  situacion: string
  opciones: [string, string, string, string]
}

const FALLBACK_CARDS: Card[] = [
  // ── ORIGINALES ────────────────────────────────────────────────────────────
  {
    situacion: 'En la cena de cumpleaños de tu pareja, su madre te pregunta delante de toda la mesa cuándo van a convivir. Tu pareja se queda en silencio y todos esperan tu respuesta.',
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
    situacion: 'En una reunion de trabajo, tu jefa propone un juego de sinceridad para "romper el hielo" y la primera pregunta incomoda te toca a ti.',
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
    situacion: 'Tu ex te manda "te extrano" mientras estas mostrando fotos de un viaje con la persona con la que sales ahora. Tu pantalla esta a la vista.',
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
    situacion: 'Tu cita va al baño y ves entrar un mensaje a su celular que dice: "Decile la verdad hoy". El teléfono queda justo frente a ti.',
    opciones: [
      'Miras hacia otro lado y no tocas nada.',
      'Lees un poco más porque no resistes la tentación.',
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
      'Sugieres pedir comida afuera sin destruirlo.',
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
    situacion: 'Tu compañero de piso lleva visita sorpresa y la casa está en un nivel de desorden histórico que te avergüenza mucho.',
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
    situacion: 'Te escriben "tenemos que hablar" y esa misma noche te cruzas con esa persona en una fiesta donde no puedes escapar facil.',
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
    situacion: 'Olvidaste el cumpleaños de alguien que siempre recuerda el tuyo y te escribe con toda la buena onda del mundo.',
    opciones: [
      'Llamas al instante y pides perdon de verdad.',
      'Armas una sorpresa improvisada para compensar.',
      'Mandas un mensaje largo y bien pensado.',
      'Esperas a verla en persona para explicarte mejor.',
    ],
  },
  {
    situacion: 'Tu acompañante va al baño justo cuando llega la cuenta. Los dos venían actuando como si no supieran quién iba a pagar.',
    opciones: [
      'Pagas sin dudar y no haces escena.',
      'Esperas su regreso porque no te toca asumirlo solo.',
      'Propones dividir con claridad cuando vuelva.',
      'Te entretienes con el celular para ganar tiempo.',
    ],
  },
  {
    situacion: 'Un músico de restaurante se acerca a tu mesa en plena cita y empieza a cantarte demasiado cerca. Tu cita parece fascinada.',
    opciones: [
      'Te sumas al momento y lo abrazas con humor.',
      'Te hundes un poco en la silla y sobrevives.',
      'Pides otra cancion para empujar mas el papelon.',
      'Transformas toda la escena en una broma compartida.',
    ],
  },

  // ── NUEVAS: COTIDIANAS Y SOCIALES ─────────────────────────────────────────
  {
    situacion: 'Escuchas sin querer a dos compañeros de trabajo hablar mal de ti justo antes de entrar a una reunion. Nada de lo que dijeron es completamente mentira.',
    opciones: [
      'Entras como si no hubieras escuchado nada.',
      'Los confrontas antes de que empiece la reunion.',
      'Usas lo que escuchaste para mejorar en silencio.',
      'Se lo cuentas a alguien de confianza primero.',
    ],
  },
  {
    situacion: 'Tu jefe te pide que cubras los errores de un compañero en un informe. Si no lo haces, ese compañero probablemente pierda el trabajo.',
    opciones: [
      'Te niegas porque no es etico aunque sea incómodo.',
      'Lo haces por solidaridad, es tu compañero.',
      'Hablas primero con el compañero para que se haga cargo.',
      'Buscas una versión del informe que no mienta pero tampoco diga todo.',
    ],
  },
  {
    situacion: 'Encontrás una conversación privada de tu pareja abierta en la computadora de uso compartido. No la estabas buscando.',
    opciones: [
      'La cierras sin leer nada y no dices que la viste.',
      'Lees un par de lineas antes de cerrar.',
      'La lees completa porque sientes que algo raro pasa.',
      'Se lo dices de una y le preguntas si hay algo que hablar.',
    ],
  },
  {
    situacion: 'Tas manejando y chocas levemente un auto estacionado sin testigos. Hay un rayón visible pero el dueño claramente no está.',
    opciones: [
      'Dejas una nota con tu número y te vas.',
      'Te vas porque fue muy leve y nadie lo vio.',
      'Esperas diez minutos por si aparece alguien.',
      'Sacas una foto al otro auto y evalúas después.',
    ],
  },
  {
    situacion: 'Te das cuenta de que el mozo te cobró menos de lo que consumiste. Ya pagaste y estás por salir del restaurante.',
    opciones: [
      'Volvés y avisás aunque sea incómodo.',
      'Seguís de largo, fue error de ellos.',
      'Dejas propina extra para compensar.',
      'Volvés solo si la diferencia es significativa.',
    ],
  },
  {
    situacion: 'Una amiga te pide opinión sobre su nuevo emprendimiento. Es una idea bastante mala y ya invirtió todos sus ahorros.',
    opciones: [
      'Le decis la verdad con toda la delicadeza posible.',
      'La apoyas incondicionalmente porque ya no hay vuelta atrás.',
      'Le señalás solo los puntos que se pueden mejorar.',
      'Le preguntás qué espera escuchar antes de responder.',
    ],
  },
  {
    situacion: 'En una cena familiar, un familiar mayor hace un comentario claramente discriminatorio. Todos en la mesa se quedan callados.',
    opciones: [
      'Lo corregís con calma pero con firmeza.',
      'Te quedás callado para no arruinar la cena.',
      'Cambias el tema rápido para evitar el conflicto.',
      'Le hacés una pregunta que lo haga reflexionar sin atacarlo.',
    ],
  },
  {
    situacion: 'Ves a alguien conocido haciendo trampa en un examen universitario muy importante. Esa persona es amiga de tus mejores amigos.',
    opciones: [
      'No hacés nada, no es tu problema.',
      'Se lo decis a esa persona en privado después.',
      'Lo reportas porque es una falta grave.',
      'Esperás a ver si alguien más lo denuncia primero.',
    ],
  },
  {
    situacion: 'Te llaman para un trabajo soñado pero tendrías que abandonar a tu equipo actual en medio de un proyecto crítico sin reemplazo posible.',
    opciones: [
      'Aceptas el trabajo, las oportunidades no esperan.',
      'Rechazas por lealtad al equipo aunque te duela.',
      'Negociás con el nuevo trabajo empezar después.',
      'Le contás todo a tu jefe actual y ves qué pasa.',
    ],
  },
  {
    situacion: 'Tu mejor amigo te confiesa que le gusta tu pareja. Te lo dice llorando y diciéndote que lo está pasando muy mal.',
    opciones: [
      'Lo escuchás con calma y después establecés un límite claro.',
      'Te enojás en el momento porque te parece una traición.',
      'Le agradecés la honestidad y le decis que necesitás distancia.',
      'Le restás importancia para no complicar la amistad.',
    ],
  },
  {
    situacion: 'Ganás un concurso pero sabés que hubo un error en el conteo y en realidad la ganadora debería haber sido otra persona.',
    opciones: [
      'Lo reportás aunque pierdas el premio.',
      'Te quedás callado, quizás fue el destino.',
      'Se lo decís en privado a los organizadores.',
      'Compartís el premio o reconocimiento con la otra persona.',
    ],
  },
  {
    situacion: 'Tu compañero de trabajo lleva semanas llegando tarde y vos lo estás cubriendo. Tu jefe empieza a preguntarte si notaste algo raro.',
    opciones: [
      'Lo cubrís una vez más y después le avisás que no podés más.',
      'Le contás todo al jefe porque ya fue demasiado.',
      'Le decís a tu compañero que o habla él o hablás vos.',
      'Decís que no notaste nada porque no es tu rol informar.',
    ],
  },

  // ── NUEVAS: DILEMAS MORALES ────────────────────────────────────────────────
  {
    situacion: 'Podes salvar a cinco personas desconocidas o a un ser querido. No hay tiempo para pensar demasiado.',
    opciones: [
      'Salvás al ser querido, no te podés engañar.',
      'Salvás a los cinco aunque te destroce.',
      'Buscás desesperadamente una tercera opción.',
      'Te paralizás y no tomás ninguna decisión.',
    ],
  },
  {
    situacion: 'Descubrís que tu empresa está haciendo algo legal pero profundamente poco ético. Podrías denunciarlo pero perderías el trabajo.',
    opciones: [
      'Lo denunciás de todas formas, es lo correcto.',
      'Te quedás callado, no podés perder el sueldo ahora.',
      'Buscás otro trabajo primero y después hablás.',
      'Se lo contás a alguien de confianza para que lo denuncie.',
    ],
  },
  {
    situacion: 'Encontrás evidencia de que alguien inocente fue condenado por un crimen. Para probarlo tendrías que admitir que vos estabas en ese lugar también.',
    opciones: [
      'Das un paso al frente aunque te complique la vida.',
      'Mandás la evidencia de forma anónima.',
      'Buscás un abogado para ver cómo proceder sin exponerte.',
      'No hacés nada porque no fue culpa tuya.',
    ],
  },
  {
    situacion: 'Sabés que un familiar cercano está cometiendo un fraude que perjudica a gente vulnerable. Es alguien que siempre estuvo para vos.',
    opciones: [
      'Le pedís que pare y si no, lo denunciás.',
      'Lo cubrís porque la familia es la familia.',
      'Le dás un plazo para que lo corrija solo.',
      'Cortás el vínculo pero no lo denunciás.',
    ],
  },
  {
    situacion: 'Te ofrecen el doble de tu sueldo en otra empresa, pero para conseguir ese puesto tuviste que exagerar bastante tu experiencia en el CV.',
    opciones: [
      'Aceptás y confiás en que vas a poder aprender rápido.',
      'Rechazás porque no querés empezar con una mentira.',
      'Aceptás pero les aclarás desde el primer día tus límites reales.',
      'Pedís tiempo para capacitarte antes de aceptar.',
    ],
  },
  {
    situacion: 'En un hospital colapsado, el médico te dice que hay recursos para salvar a una persona y hay dos pacientes críticos. Te pide tu opinión.',
    opciones: [
      'Decís que no podés tomar esa decisión, que decida el médico.',
      'Sugerís salvar al más joven porque tiene más vida por delante.',
      'Sugerís salvar al que llegó primero.',
      'Proponés sorteo porque no hay criterio justo.',
    ],
  },
  {
    situacion: 'Descubrís que tu mejor amigo le fue infiel a su pareja. La pareja te lo pregunta directamente mirándote a los ojos.',
    opciones: [
      'Decís la verdad aunque destruyas la relación de tu amigo.',
      'Mentís para proteger a tu amigo.',
      'Decís que no te metés en esos temas.',
      'Le sugerís que se lo pregunte directamente a tu amigo.',
    ],
  },

  // ── NUEVAS: POLICIALES Y LEGALES ──────────────────────────────────────────
  {
    situacion: 'Ves a alguien robar en un supermercado. La persona robó comida y tiene aspecto de estar pasándola muy mal.',
    opciones: [
      'No decís nada y seguís con tu compra.',
      'Le avisás al guardia discretamente.',
      'Le ofrecés pagar vos lo que robó.',
      'Te acercás a la persona y le preguntás si necesita ayuda.',
    ],
  },
  {
    situacion: 'Un policía te para de noche sin razón clara y empieza a revisarte el auto de forma bastante agresiva. Tenés todos los papeles en regla.',
    opciones: [
      'Pedís calma y explicás que todo está en orden.',
      'Grabás la situación con el celular desde el principio.',
      'Cooperás sin decir nada para que pase rápido.',
      'Preguntás el motivo de la detención antes de hacer nada.',
    ],
  },
  {
    situacion: 'Sos testigo de un accidente de tránsito. El conductor que tuvo la culpa te mira y te dice: "por favor, no dijiste nada".',
    opciones: [
      'Declarás todo lo que viste sin importar nada más.',
      'Te alejás porque no querés complicarte la vida.',
      'Esperás a ver qué dice la otra parte primero.',
      'Le pedís algo a cambio de tu silencio.',
    ],
  },
  {
    situacion: 'Tu abogado te dice que podés ganar el juicio mintiendo en un punto clave. La otra parte también mintió, pero de forma más difícil de probar.',
    opciones: [
      'Te negás, no vas a mentir aunque pierdas.',
      'Aceptás porque el otro también lo hizo.',
      'Le pedís una semana para pensarlo.',
      'Buscás otro abogado que no te proponga eso.',
    ],
  },
  {
    situacion: 'Encontrás droga en la mochila de tu hermano menor. Tiene 17 años y es la primera vez que te pasa algo así.',
    opciones: [
      'Lo enfrentás directamente y hablás con tus padres.',
      'Hablás solo con él antes de involucrar a nadie más.',
      'Tirás la droga y no decís nada por ahora.',
      'Buscás un profesional para pedir consejo primero.',
    ],
  },
  {
    situacion: 'En una manifestación pacífica, la policía empieza a dispersar a la gente de forma violenta. Estás en el medio.',
    opciones: [
      'Te retirás lo más rápido que podés.',
      'Te quedás filmando todo para documentar.',
      'Ayudás a sacar a las personas que no pueden moverse.',
      'Te ponés frente a alguien más vulnerable para cubrirlo.',
    ],
  },

  // ── NUEVAS: TECNOLOGÍA Y REDES ─────────────────────────────────────────────
  {
    situacion: 'Descubrís sin querer que podés acceder a la cuenta bancaria de otra persona por un error del sistema. Tenés los datos a la vista.',
    opciones: [
      'Cerrás todo y reportás el bug al banco.',
      'Mirás el saldo por curiosidad pero no tocás nada.',
      'Cerrás sin hacer nada y no decís nada a nadie.',
      'Transferís una pequeña cantidad para ver si funciona.',
    ],
  },
  {
    situacion: 'Una foto tuya de hace diez años se viraliza y te pone en una situación muy incómoda con tu entorno actual.',
    opciones: [
      'Salís a dar explicaciones y contexto públicamente.',
      'Ignorás todo y esperás que pase.',
      'Borrás cuentas y desaparecés un tiempo.',
      'Contactás a quien la viralizó para pedirle que la baje.',
    ],
  },
  {
    situacion: 'Tu ex empieza a subir indirectas en redes que claramente son para vos. Vuestra historia en común los sigue teniendo conectados.',
    opciones: [
      'Le escribís en privado para cerrar el tema.',
      'Le respondés con una indirecta tuya también.',
      'Lo bloqueás sin decir nada.',
      'Lo ignorás olímpicamente y seguís con tu vida.',
    ],
  },
  {
    situacion: 'Alguien sube una foto tuya sin pedirte permiso y tiene miles de likes. La foto es linda pero vos no querías que circulara.',
    opciones: [
      'Le pedís que la baje con amabilidad.',
      'La dejás porque total se ve bien.',
      'La reportás directamente en la plataforma.',
      'La compartís vos también para al menos controlarlo un poco.',
    ],
  },
  {
    situacion: 'Recibís un mensaje privado de alguien famoso que te dice que le gustás. Tiene pareja pública y muchos seguidores.',
    opciones: [
      'No respondés y borrás el mensaje.',
      'Respondés con curiosidad pero con límites claros.',
      'Le preguntás qué onda con su pareja primero.',
      'Hacés captura por si acaso y evalúas después.',
    ],
  },

  // ── NUEVAS: CIENCIA FICCIÓN Y SITUACIONES EXTREMAS ────────────────────────
  {
    situacion: 'Descubrís que podés escuchar los pensamientos de las personas durante exactamente una hora al día. Hoy empieza la primera hora.',
    opciones: [
      'No la usás, ese poder no debería existir.',
      'La usás para protegerte de personas que te rodean.',
      'La usás solo para saber si una persona específica te miente.',
      'La usás sin limite porque sería una locura no hacerlo.',
    ],
  },
  {
    situacion: 'Una IA te ofrece darte la respuesta exacta a cualquier pregunta que hagas durante el resto de tu vida. Hay una condición: nunca podrás volver a tomar una decisión difícil por vos mismo.',
    opciones: [
      'Aceptás, las decisiones difíciles te agotan.',
      'Rechazás, el libre albedrío es todo.',
      'Pedís más tiempo para pensarlo con la propia IA.',
      'Aceptás pero con límites: solo para decisiones grandes.',
    ],
  },
  {
    situacion: 'Podés viajar en el tiempo pero solo una vez, solo 5 minutos, y no podés interactuar con nadie. ¿Cuándo vás?',
    opciones: [
      'Al pasado para ver algo que perdiste para siempre.',
      'Al futuro para saber cómo terminás.',
      'A un momento histórico que siempre te fascinó.',
      'No usás el viaje, el misterio vale más.',
    ],
  },
  {
    situacion: 'Te ofrecen borrar un recuerdo doloroso de tu mente para siempre, como si nunca hubiera pasado. Ese recuerdo también incluye personas importantes.',
    opciones: [
      'Lo borrás, ese dolor ya no te sirve.',
      'No lo borrás, ese dolor te hizo quien sos.',
      'Pedís borrarlo parcialmente, solo la parte que duele.',
      'Preguntás qué más desaparece antes de decidir.',
    ],
  },
  {
    situacion: 'Descubrís que tenés exactamente un año de vida. La enfermedad no tiene síntomas ni dolor. Solo vos lo sabés.',
    opciones: [
      'Se lo contás a todos desde el principio.',
      'Solo se lo contás a las personas más cercanas.',
      'No se lo decís a nadie y vivís como si nada.',
      'Lo usás para hacer todo lo que postergaste sin dar explicaciones.',
    ],
  },
  {
    situacion: 'Una empresa te ofrece implantarte un chip que te haría un 40% más inteligente. Es irreversible y cambia tu personalidad levemente.',
    opciones: [
      'Lo aceptás sin dudar, más inteligencia es más libertad.',
      'Lo rechazás, no querés que nadie modifique quién sos.',
      'Pedís conocer casos de otras personas primero.',
      'Preguntás exactamente qué parte de la personalidad cambia.',
    ],
  },
  {
    situacion: 'Te dicen que en una vida paralela sos la versión de vos mismo que siempre quisiste ser. Podés cambiarte a esa vida pero perdés todos tus vínculos actuales.',
    opciones: [
      'Te cambiás, esa persona es quien realmente querés ser.',
      'No te cambiás, tus vínculos son tu vida.',
      'Preguntás si podés visitar antes de decidir.',
      'Preguntás si en esa vida también podés construir vínculos nuevos.',
    ],
  },
  {
    situacion: 'Te enterás de que sos parte de una simulación. Todo lo que viviste fue real para vos, pero podés elegir salir y enfrentar una realidad desconocida.',
    opciones: [
      'Salís porque la verdad siempre vale más.',
      'Te quedás, lo real para vos es lo que conocés.',
      'Buscás evidencia adicional antes de decidir.',
      'Le preguntás al sistema qué hay del otro lado primero.',
    ],
  },

  // ── NUEVAS: LABORALES ──────────────────────────────────────────────────────
  {
    situacion: 'En una presentación importante, notás que tu jefe está atribuyéndose ideas que claramente fueron tuyas delante de directivos clave.',
    opciones: [
      'Lo interrumpís con tacto para aclarar la autoría.',
      'No decís nada en el momento y lo hablás después.',
      'Dejás correr porque no querés conflicto ahora.',
      'Se lo decís a los directivos en privado más tarde.',
    ],
  },
  {
    situacion: 'Te ofrecen un ascenso pero implica hacerte cargo de despedir a un compañero que considerás amigo.',
    opciones: [
      'Rechazás el ascenso para no pasar por eso.',
      'Aceptás y le avisás a tu amigo antes que nadie.',
      'Aceptás y buscás la forma más humana de manejarlo.',
      'Aceptás y pedís que lo haga otra persona.',
    ],
  },
  {
    situacion: 'Te das cuenta de que tu empresa le está facturando al cliente por horas que nadie trabajó. Tu silencio es parte del sistema.',
    opciones: [
      'Lo reportás internamente antes de ir a otro lado.',
      'Renunciás porque no querés ser parte de eso.',
      'Lo seguís tolerando porque no es tu decisión.',
      'Se lo decís al cliente directamente.',
    ],
  },
  {
    situacion: 'Llevas dos años en un trabajo donde te tratan bien pero no crecés nada. Te llega una oferta más desafiante pero en un ambiente desconocido.',
    opciones: [
      'Te vas, la comodidad no es crecimiento.',
      'Te quedás, lo conocido tiene valor real.',
      'Negociás un plan de crecimiento antes de irte.',
      'Aceptás la otra oferta y evaluás los primeros tres meses.',
    ],
  },
  {
    situacion: 'Descubrís que una compañera con menos experiencia gana bastante más que vos por hacer el mismo trabajo.',
    opciones: [
      'Pedís una reunión para hablar de tu sueldo con datos.',
      'Te enojás con ella aunque no sea su culpa.',
      'Buscás trabajo en otro lado directamente.',
      'Lo dejás pasar para no generar drama.',
    ],
  },

  // ── NUEVAS: RELACIONES Y VÍNCULOS ─────────────────────────────────────────
  {
    situacion: 'Llevas meses saliendo con alguien que te gusta mucho, pero acabas de descubrir que tiene una forma de pensar en algo importante que choca completamente con la tuya.',
    opciones: [
      'Lo hablás de frente aunque sea incómodo.',
      'Intentás convencerte de que no es tan importante.',
      'Lo dejás antes de encariñarte más.',
      'Lo dejás pasar por ahora y ves cómo evoluciona.',
    ],
  },
  {
    situacion: 'Tu mejor amigo de toda la vida se hace novio de tu ex, con la que terminaste hace seis meses de muy mala manera.',
    opciones: [
      'Le decís que te parece una traición aunque sea libre de elegir.',
      'Lo aceptás porque no tenés derecho a meterte.',
      'Cortás la amistad sin dar muchas explicaciones.',
      'Lo hablás con calma y establecen cómo manejar la situación.',
    ],
  },
  {
    situacion: 'Tu pareja de años te confiesa que tiene dudas sobre la relación pero no quiere terminar. Te pide tiempo para pensar.',
    opciones: [
      'Aceptás el tiempo porque lo amás y querés que esté seguro.',
      'Le decís que o están o no están, no podés quedar en pausa.',
      'Aprovechás para revisar también vos qué querés.',
      'Le ponés un límite de tiempo concreto para decidir.',
    ],
  },
  {
    situacion: 'Tu mejor amiga te pide que la acompañés a hacer algo que considerás un error enorme, pero es su decisión y te necesita ahí.',
    opciones: [
      'La acompañás aunque no estés de acuerdo.',
      'Le decís lo que pensás y luego decides si ir.',
      'No vas porque no podés avalar eso.',
      'Vas pero dejás claro que no estás de acuerdo.',
    ],
  },
  {
    situacion: 'Un familiar te pide plata prestada sabiendo que hay muy pocas chances de que te la devuelva. Necesitás ese dinero pero podés vivir sin él.',
    opciones: [
      'Se la prestás como regalo para no generar deuda.',
      'Le prestás con un acuerdo claro de devolución.',
      'Le decís que no podés porque también estás ajustado.',
      'Le ofrecés la mitad de lo que pide.',
    ],
  },

  // ── NUEVAS: VIAJES Y SITUACIONES EXTREMAS ─────────────────────────────────
  {
    situacion: 'Estás en un país extranjero y te roban el pasaporte, la plata y el celular. Hay una persona desconocida que ofrece ayudarte, pero algo te genera desconfianza.',
    opciones: [
      'Aceptás la ayuda porque no tenés otra opción.',
      'Le agradecés pero buscás la embajada por tu cuenta.',
      'Le pedís que te lleve a la embajada y evaluás en el camino.',
      'Pedís ayuda a otro turista antes de confiar en esa persona.',
    ],
  },
  {
    situacion: 'Estás de acampada y te perdés del grupo. Tenés agua para un día y dos caminos posibles. No tenés señal.',
    opciones: [
      'Te quedás quieto donde estás para que te encuentren.',
      'Elegís el camino que parece más transitado y caminás.',
      'Subís a un punto alto para orientarte antes de moverte.',
      'Racionás el agua y esperás hasta el amanecer para decidir.',
    ],
  },
  {
    situacion: 'En un vuelo con turbulencia severa, el pasajero de al lado empieza a tener un ataque de pánico que contagia a toda la fila.',
    opciones: [
      'Lo ayudás activamente a calmarse con técnicas de respiración.',
      'Llamás a la azafata y dejás que lo manejen ellos.',
      'Te ponés los auriculares porque no podés manejarlo vos tampoco.',
      'Hablás con él con calma aunque vos también estés nervioso.',
    ],
  },
  {
    situacion: 'Te quedás encerrado solo en una ciudad desconocida un fin de semana sin dinero, sin cargador y con el celular al 3%.',
    opciones: [
      'Buscás la comisaría o embajada más cercana.',
      'Pedís ayuda a la primera persona que te parezca confiable.',
      'Usás el 3% para llamar a alguien que pueda hacer algo.',
      'Buscás un bar o restaurante y explicás la situación.',
    ],
  },

  // ── NUEVAS: HUMOR Y LO COTIDIANO ABSURDO ─────────────────────────────────
  {
    situacion: 'Llegás a una reunión importante y te das cuenta de que tenés las medias de dos colores diferentes. Todavía no te vio nadie de cerca.',
    opciones: [
      'Lo mostrás vos primero con humor para neutralizarlo.',
      'Buscás la forma de que nadie lo note en toda la reunion.',
      'Lo ignorás y respondés si alguien lo señala.',
      'Inventás que lo hiciste a propósito como declaración de estilo.',
    ],
  },
  {
    situacion: 'Saludás con demasiado entusiasmo a alguien que resultó ser un desconocido que se le parece mucho a tu amigo. Ya es tarde para disimular.',
    opciones: [
      'Te reís y explicás el error con naturalidad.',
      'Te perdés en el barrio antes de que hable.',
      'Seguís la actuación y rezás para que no pregunte.',
      'Le pedís disculpas y arrancás una conversación.',
    ],
  },
  {
    situacion: 'Escuchás tu canción favorita en el supermercado y tu cuerpo empieza a moverse solo. Hay varias personas mirando.',
    opciones: [
      'Bailás sin vergüenza, no te importa nadie.',
      'Frenás inmediatamente y seguís comprando.',
      'Te hacés el que busca algo en la góndola para disimular.',
      'Le hacés un gesto a alguien para que baile con vos.',
    ],
  },
  {
    situacion: 'Le mandás un audio de voz largo quejándote de una persona y ese audio lo recibe exactamente esa persona por error.',
    opciones: [
      'Llamás al instante y te hacés cargo de todo.',
      'Mandás otro audio diciendo que era una broma.',
      'Bloqueás y desaparecés del mundo conocido.',
      'Esperás a que reaccione y respondés según lo que diga.',
    ],
  },
  {
    situacion: 'Estás en silencio absoluto en una reunión formal y tu estómago empieza a hacer los ruidos más escandalosos de su historia.',
    opciones: [
      'Lo comentás con humor antes de que alguien lo señale.',
      'Fingís una tos para taparlo aunque sea obvio.',
      'Te hacés el distraído y esperás que pase.',
      'Pedís permiso para salir un momento.',
    ],
  },
  {
    situacion: 'Tu jefe te agrega a redes sociales y tus últimas publicaciones son bastante incompatibles con tu imagen profesional.',
    opciones: [
      'Borrás las publicaciones antes de aceptar.',
      'Aceptás y dejás todo como está, es tu vida privada.',
      'No aceptás con una excusa de que no usás mucho las redes.',
      'Aceptás y configurás quién puede ver qué.',
    ],
  },
  {
    situacion: 'Te quedás dormido en el transporte público y te despertás con la cabeza apoyada en el hombro de un desconocido que no te movió.',
    opciones: [
      'Te incorporás rápido y pedís disculpas.',
      'Fingís que te estabas por despertar igual.',
      'Le agradecés que no te haya movido con sinceridad.',
      'Te bajás en la próxima parada aunque no sea la tuya.',
    ],
  },

  // ── NUEVAS: FILOSÓFICAS Y EXISTENCIALES ───────────────────────────────────
  {
    situacion: 'Un gurú de vida te ofrece una sesión gratuita y después de una hora te dice que tu mayor problema sos vos mismo. Tiene razón.',
    opciones: [
      'Lo aceptás aunque duela y pedís más sesiones.',
      'Te defendés porque nadie puede resumirte en una hora.',
      'Te vas pensativo y procesás solo durante días.',
      'Le agradecés y bloqueás la información emocionalmente.',
    ],
  },
  {
    situacion: 'Podés saber exactamente cuántas personas te quieren de verdad en el mundo. El número podría ser más bajo de lo que esperás.',
    opciones: [
      'Querés saberlo, la verdad siempre vale.',
      'No querés, preferís vivir con la incertidumbre.',
      'Solo querés saber si supera cierto número mínimo.',
      'Querés saber solo si podés hacer algo con esa información.',
    ],
  },
  {
    situacion: 'Descubrís que tus padres cometieron algo que considerás moralmente muy grave antes de que nacieras. No afecta a nadie vivo hoy.',
    opciones: [
      'Los confrontás porque necesitás entender.',
      'No decís nada porque no cambia nada del presente.',
      'Se lo contás a tus hermanos para procesarlo juntos.',
      'Procesás solo y reevaluás la relación con ellos.',
    ],
  },
  {
    situacion: 'Te preguntan si fueras a morir mañana qué harías hoy. Pero la persona espera una respuesta honesta de verdad, no la de Instagram.',
    opciones: [
      'Decís la verdad aunque suene rara o egoísta.',
      'Decís algo inspirador porque tampoco querés exponerte tanto.',
      'Preguntás primero qué haría esa persona.',
      'Decís que no sabés y que eso en sí te dice algo.',
    ],
  },

  // ── NUEVAS: SITUACIONES GRUPALES ──────────────────────────────────────────
  {
    situacion: 'En un juego de verdad o consecuencia, la pregunta que te toca es la más incómoda que podría tocarte en ese grupo específico.',
    opciones: [
      'Respondés con total honestidad y bancás todo.',
      'Elegís consecuencia para no responder.',
      'Respondés a medias con una versión editada.',
      'Proponés cambiar la pregunta por otra igual de difícil.',
    ],
  },
  {
    situacion: 'Todos en el grupo planean hacer algo que vos considerás una mala idea. Vos sos el único que piensa diferente.',
    opciones: [
      'Decís lo que pensás aunque quedes como el aguafiestas.',
      'Vas igual porque tampoco es tan grave.',
      'No vas y no decís por qué.',
      'Intentás convencer a alguien más antes de hablar solo.',
    ],
  },
  {
    situacion: 'El grupo tiene que elegir quién lidera una actividad importante y todos te miran a vos, pero no te sentís listo ni con ganas.',
    opciones: [
      'Aceptás porque confían en vos y lo das todo.',
      'Decís que preferís que lidere otra persona.',
      'Proponés hacerlo en equipo sin un líder único.',
      'Aceptás pero pedís apoyo claro desde el principio.',
    ],
  },
  {
    situacion: 'En un escape room tu grupo está trabado hace veinte minutos y vos ves la solución claramente, pero nadie te está escuchando.',
    opciones: [
      'Insistís con más volumen hasta que te escuchen.',
      'Esperás a que fallen todas las otras ideas primero.',
      'Pedís un momento de silencio y explicás con calma.',
      'Directamente implementás la solución sin pedir permiso.',
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
