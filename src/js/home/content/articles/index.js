/**
 * EXAMPLE
  {
    title: 'Historias de Cal',
    subtitle: 'A small web-game for city Hall of Popayán to teach children important topics about city.',
    type: 'project',
    colors: [0xebe9df, 0x502B27, 0x2cc5ff],
    date: {
      year: '2011',
      color: 1
    },
    mainImageType: 'image',
    abstract: "Para muchos lectores argentinos 'La sudestada' fue el cómic del año en 2015; una historia sencilla, sutil, una variación entre un policial sentimental en un marco costumbrista y melancólico. Ese aclamado libro puede leerse ahora en Colombia gracias a una nueva edición por parte del sello Cohete Cómics, de la editorial independiente Laguna libros.",
    keywords: ['design', 'illustration', 'serious-game', 'ux-ui', 'history', 'web', 'characters'],
    content: [
      {
        type: 'Image',
        subtype: 'Single:1',
        url: './img/articles/sept/player.gif',
        superCaption: 'game animation',
        caption: 'player walking animation (historias de cal)',
        captionPos: 'top',
        background: false
      },
      {
        type: 'Image',
        subtype: 'Single:1',
        url: './img/articles/sept/bird.gif',
        superCaption: 'game animation',
        caption: 'Bird intro (historias de cal)',
        captionPos: 'bottom',
        background: true
      },
      {
        type: 'Text',
        subtype: 'Short',
        background: true,
        text: 'el velóz murcielago indú alcanzó los apaches y se los puse, yendo a correr por toda la manzana donde vivía su madre'
      },
      {
        type: 'Text',
        subtype: 'Long',
        background: false,
        text: 'El que Gran Salón México ofreció su primer encuentro en 2014, momento en el cual la ilustración pasaba de ser un simple servicio gráfico a entender como una manifestación artística con peso en la cultura visual. Cuatro años después, todavía se caracteriza por ser una de las primeras ferias totalmente dedicadas a la  ilustración contemporánea en formato de cuadro y piezas coleccionables. Se trata de un encuentro anual en el que 35 ilustradores mexicanos y un invitado internacional se juntan durante tres días para exhibir y vender sus obras, además de participar en conversatorios, talleres y revisiones de su portafolio.'
      },
      {
        type: 'Image',
        subtype: 'Dual',
        images: [
          {
            url: './img/articles/sept/main.gif',
            captionPos: 'top',
            background: true,
            caption: 'First image'
          },
          {
            url: './img/articles/sept/main.gif',
            captionPos: 'bottom',
            background: true,
            caption: 'Decond image'
          }
        ]
      },
      {
        type: 'Text',
        subtype: 'Link:download',
        background: false,
        text: 'Este es un link',
        caption: '56k',
        url: './files/mifile.pdf'
      },
      {
        type: 'Text',
        subtype: 'Quote',
        text: 'Lo mejor del mundo mundial',
        data: 'new york times',
        subdata: '1982',
      },
    ],
    front: {
      url: '/img/articles/sept/mainxl.png',
      captionPos: 'bottom',
      color: 1
    },
    pictures: {
      main: {
        name: 'hello World',
        url: '/img/articles/sept/main.gif'
      },
    },
  },
 */

module.exports = [
  {
    title: 'Historias de Cal',
    subtitle: 'A small web-game for city Hall of Popayán to teach children important topics about city.',
    type: 'project',
    colors: [0xffeecf, 0x9c2819, 0x2cc5ff],
    date: {
      year: '2013',
      color: 1
    },
    mainImageType: 'image',
    abstract: {
      content: "... ¡Wroag! ¡Crack! El suelo de Popayán crujía, mientras la marea roja iba saqueando las calles de esquina a esquina. Perros, gatos, transeúntes-despistados; ladraban, maullaban, gritaban. No había remedio, lo que embestía el enjambre de ácaros, metro a metro, era arrastrado sin esfuerzo ni misericordia.",
      color: 1,
      background: 0
    },
    keywords: ['design', 'illustration', 'serious-game', 'ux-ui', 'history', 'web', 'characters'],
    content: [
      {
        type: 'Image',
        subtype: 'Single:1',
        url: './img/articles/sept/bird.gif'
      },
      {
        type: 'Image',
        subtype: 'Single:1',
        url: './img/articles/sept/farol.png'
      },
      {
        type: 'Image',
        subtype: 'Single:2',
        url: './img/articles/sept/woar.png',
        superCaption: 'La gran nigüa',
        caption: 'arte conceptual',
        captionPos: 'bottom',
        background: true
      },
      {
        type: 'Text',
        subtype: 'Long',
        background: false,
        text: 'El enjambre funcionaba como una cinta transportadora, la más nauseabunda que se haya visto jamás. Las zancas de nigüa, que eran tan diminutas como innumerables, se sincronizaban perfectamente para formar un poderoso oleaje, muy parecido al zigzagueo de una serpiente o una bandera que se agita con el viento.'
      },
      {
        type: 'Text',
        subtype: 'short',
        background: true,
        text: 'Historias de Cal. Un videojuego educativo. Relata las aventuras de Francisco, un cuasi-adolescente que siempre ha vivido con sus abuelos en Popayán-city.'
      },
      {
        type: 'Image',
        subtype: 'Single:1',
        url: './img/articles/sept/nigua.png',
        caption: 'Pequeña nigüa',
        captionPos: 'bottom'
      },
      {
        type: 'Image',
        subtype: 'Single:1',
        url: './img/articles/sept/player.gif',
        caption: 'Francisco',
        captionPos: 'bottom',
        background: false
      },
      {
        type: 'Text',
        subtype: 'Long',
        background: false,
        text: 'Todo lo que quedase atrapado en aquel torbellino de insectos, sin remedio, se escurría hasta al vestíbulo principal de la colmena. El hoyo negro, el parque de los gritos. Aguardaba ahí la gran nigua reina...'
      },
      {
        type: 'Text',
        subtype: 'Long',
        background: false,
        text: 'Inesperadamente, una plaga de nigüas rojas se desata por toda la ciudad, la estupidez y el desconocimiento de las nuevas generaciones son la causa; Francisco que siempre escucho con atención las historias de su abuelo, lo sabe. Toma su mochila y asume la responsabilidad de combatirlas.'
      },
      {
        type: 'Text',
        subtype: 'Long',
        background: false,
        text: 'Es como empieza su viaje por la historia, recorriendo los lugares más emblemáticos de la ciudad, para dar con pistas de como, en antaño, se pudo combatir y triunfar contra esta terrible plaga.'
      },
      {
        type: 'Image',
        subtype: 'Single:1',
        url: './img/articles/sept/hat.png'
      },
      {
        type: 'Text',
        subtype: 'Link',
        background: false,
        text: 'Historias de Popayán',
        caption: 'Link al juego',
        url: 'http://popayan.gov.co/zonainfantil/juego/'
      },
      {
        type: 'Image',
        subtype: 'Single:2',
        url: './img/articles/sept/main.gif',
        superCaption: 'Nivel uno',
        caption: 'Nigüa animada',
        captionPos: 'bottom',
        background: true
      },
      {
        type: 'Image',
        subtype: 'Single:2',
        url: './img/articles/sept/pan.jpg',
        superCaption: 'Francisco',
        caption: 'Puente Humilladero',
        captionPos: 'bottom',
        background: true
      }
    ],
    front: {
      url: '/img/articles/sept/mainxl.jpg',
      captionPos: 'bottom',
      color: 0
    },
    pictures: {
      main: {
        name: 'hello World',
        url: '/img/articles/sept/main.gif'
      },
    },
  },
  {
    title: 'AUTÓMATA PROJECT',
    subtitle: 'Web-app, permite construir en tiempo real y en colectivo un fanzine',
    type: 'PROJECT',
    date: {
      year: '2017',
      color: 1
    },
    abstract: {
      content: 'Autómata además de fanzine, es una plataforma social y digital, que permite a una pequeña comunidad de diseñadores a través del trabajo colaborativo y co-creativo: construir, diseñar, experimentar, conectar y jugar en tiempo real con sus propias piezas visuales.',
      color: 0,
      background: 1
    },
    colors: [0xe6e6e6, 0x252525, 0xfc2f4f],
    front: {
      url: '/img/articles/one/main_b.svg',
      captionPos: 'bottom',
      color: 0,
      background: 1
    },
    content: [
      {
        type: 'Image',
        subtype: 'Single:2',
        url: './img/articles/one/two.svg'
      },
      {
        type: 'Text',
        subtype: 'long',
        background: false,
        text: '<p>Definir que es un <span class="document-bold">fanzine</span> no es tarea fácil, es demasiado abstracto. Se transforma en la medida en que un grupo de personas lo adopta y cuando esto ocurre, el contexto moldea un significado; la tecnología y su práctica, construyen soportes; y los participantes, contenidos.</p>',
      },
      {
        type: 'Text',
        subtype: 'short',
        background: true,
        text: '<p><span class="document-bold">Backend:</span> node.js, mongoDB y socket.io. <span class="document-bold">Front-end:</span> vanilla-js, lodash y pequeños modulos de npm: page, yo-yo, entre otros. <span class="document-bold">Herramientas de desarrollo: </span>git, gulp, webpack, babel...</p>',
      },
      {
        type: 'Image',
        subtype: 'Single:1',
        url: './img/articles/one/hands.gif',
      },
      {
        type: 'Text',
        subtype: 'long',
        background: false,
        text: '<p>Es una pena, que la mayoría de propuestas que nos dejan las <span class="document-bold">culturas resilientes</span>, resultan antes de intrigantes, aterradoras para la sociedad, que se siente vulnerable frente al cambio, principal enemigo del status quo. La idea de someter a presión un sistema que ya se encuentra en perfecto equilibrio le es motivo de pánico; más para las partes dominantes de la ecuación, que ensimismadas, atacan con fuerza y sucesivamente cualquier intento de <span class="document-bold document-line">sabotaje</span>.</p>',
      },
      {
        type: 'Image',
        subtype: 'Single:2',
        superCaption: ' Autómata ADN',
        caption: 'Libertad, co-creación, juego',
        captionPos: 'bottom',
        background: true,
        url: './img/articles/one/graph.jpg',
      },
      {
        type: 'Text',
        subtype: 'long',
        background: false,
        text: '<p> <span class="document-bold document-line">¿Sabotaje?</span> Si, de un pequeño sector de la sociedad que ni es marginal —no todavía—, ni tan importante, pero que se ve atrapado en medio de una compleja estructura de control: la norma, la moral, la economía... etc. Un reducido fragmento de sociedad que rebosante en diversidad, juventud y decisión; se ve forzado a aparecer en escena asqueado por las mentiras, las clasificaciones y las injusticias de un sistema que se les vendió como perfecto y que nunca afectaron, ni siquiera les consultaron ¿Cómo? Sí cuando naces ya todo existe.</p>',
      },
      {
        type: 'Image',
        subtype: 'Single:1',
        url: './img/articles/one/phone1.gif',
      },
      {
        type: 'Image',
        subtype: 'Single:1',
        url: './img/articles/one/phone2.gif',
      },
      {
        type: 'Text',
        subtype: 'long',
        background: false,
        text: '<p>Queda entonces un único camino para esta banda de marginales: buscar o crear con sus propias manos, los canales o espacios sociales en los que dejar fluir sus ideas, <span class="document-line"> hacer ruido, mostrar su inconformismo, atacar la opresión</span> ... en pocas palabras practicar una verdadera libertad. Y es precisamente esto último, este ejercicio de buscar espacios alternativos en medio de la ausencia de recursos, la presión social, la persecución, la indiferencia, el rechazo; el campo de cultivo para que florezcan dinámicas alternativas de participación social. Justo aquí es donde surge <span class="document-bold document-line">Autómata.</span> </p>',
      },
      {
        type: 'Text',
        subtype: 'long',
        background: false,
        text: '<p> <span class="document-bold">Autómata</span> es mucho de muchas cosas: pretensión de libertad, un estado de resiliencia y un mirada desde la contracultura; la apropiación de elementos del videojuego, un supuesto del trabajo en co-creación, mi experiencia del trabajo con TIC’s puesto a contracorriente. </p><p>Puede conocer más de <span class="document-bold">Autómata</span> en el documento que aparece en esta pagina.</p>',
      },
      {
        type: 'Image',
        subtype: 'Single:1',
        url: './img/articles/one/phone3.gif',
      },
      {
        type: 'Image',
        subtype: 'Single:2',
        url: './img/articles/one/clise.jpg',
      },
      {
        type: 'Image',
        subtype: 'Single:2',
        url: './img/articles/one/intro.gif'
      },
      {
        type: 'Text',
        subtype: 'link:download',
        caption: '(75mb)',
        text: 'Documento proyecto',
        url: 'img/articles/one/automata.pdf'
      }
    ],
    keywords: ['design', 'co-creation' , 'dev', 'ux-ui', 'brand', 'digital', 'web', 'editorial', 'collective'],
    pictures: {
      main: {
        name: 'hello World',
        url: '/img/articles/one/main-80.jpg',
        urlXX: '/img/articles/one/main_b.svg',
        comment: 'first coment main image',
      }
    },

  },
  {
    title: "Popayán",
    subtitle: 'Ilustraciones del centro de la ciudad en colores aleatorios.',
    type: 'Illustration',
    date: {
      year: '2015',
      color: 0
    },
    abstract: {
      content: 'Popayán, lugar donde nací. Queda por el Cauca, que es Colombia pero al sur. Es una ciudad pequeña de muchas iglesias y muchos fieles (infieles pocos, pero muy bien supervisados). El atípico centro urbano, completamente blanco, le da cierta apariencia opulenta, como de lujo; de ahí el titulo de “la ciudad blanca de Colombia”.',
      color: 1,
      background: 0
    },
    colors: [0xb1e8c8, 0x2e2a38, 0xff6a9c],
    front: {
      url: '/img/articles/eight/main.jpg',
      captionPos: 'bottom',
      color: 1,
      background: 0
    },
    content: [
      {
        type: 'Image',
        subtype: 'Single:1',
        complete: true,
        url: './img/articles/eight/photo1.jpg',
        captionPos: 'bottom',
        caption: 'Iglesia San Francisco'
      },
      {
        type: 'Text',
        subtype: 'short',
        background: true,
        text: '<p>Existen dos tipos de popayanejos: los que no aguantan un segundo en una ciudad tan blanca, sosa, sin sabor.</p>'
      },
      {
        type: 'Image',
        subtype: 'Single:2',
        url: './img/articles/eight/house1.png',
        captionPos: 'bottom',
        caption: 'Museo arquidiocesano'
      },
      {
        type: 'Text',
        subtype: 'short',
        background: true,
        text: '<p> Y los que disfrutan plácidamente de este pedazo de edén, lleno de paz, tranquilidad, laxitud (de esto hasta el tope).</p>'
      },
      {
        type: 'Image',
        subtype: 'Single:2',
        url: './img/articles/eight/house3.png',
        captionPos: 'bottom',
        caption: 'Iglesia Santo Domingo'
      },
      {
        type: 'Image',
        subtype: 'Single:2',
        url: './img/articles/eight/vertical.png',
        caption: 'Museo Francisco José de Caldas',
        captionPos: 'bottom',
        background: true
      },
      {
        type: 'Image',
        subtype: 'Single:2',
        captionPos: 'bottom',
        url: './img/articles/eight/two.png',
        caption: 'Basilica Nuestra señora de la asunción'
      },
      {
        type: 'Image',
        subtype: 'Single:2',
        captionPos: 'bottom',
        url: './img/articles/eight/house4.jpg',
        caption: 'Iglesia San José'
      },
      {
        type: 'Image',
        subtype: 'Single:1',
        complete: true,
        url: './img/articles/eight/photo2.jpg',
        captionPos: 'bottom',
        caption: 'Torre del reloj'
      },
      {
        type: 'Image',
        subtype: 'Single:2',
        captionPos: 'bottom',
        url: './img/articles/eight/photo3.jpg',
        caption: 'Nuestra señora de la asunción'
      },
    ],
    pictures: {
      main: {
        name: 'hello World',
        url: '/img/articles/eight/main.jpg',
        urlXX: '/img/articles/eight/main.png',
        comment: 'first coment main image',
      }
    },
    keywords: ['design', 'illustration', 'experimental', 'icecream'],
  },
  {
    title: 'Inside the mouse king castle',
    subtitle: 'Imagen-Palabra 2017, exposure.',
    type: 'Illustration',
    intro: "Para muchos lectores argentinos 'La sudestada' fue el cómic del año en 2015; una historia sencilla, sutil, una variación entre un policial sentimental en un marco costumbrista y melancólico. Ese aclamado libro puede leerse ahora en Colombia gracias a una nueva edición por parte del sello Cohete Cómics, de la editorial independiente Laguna libros.",
    date: {
      year: '2017',
      color: 0
    },
    important: false,
    colors: [0xd7edd6, 0x161405],
    content: `Tiene un piercing en la oreja izquierda y dice “chévere” más veces de las que uno esperaría que una persona de 44 años lo dijera. Usa gafas solo a ratos; gafas rectangulares de sólido marco negro. Desde hace siete años (con un intermedio de dos en Colombia) vive en Jaffa, o como a él le gusta decir, “en territorio sin nombre”, con su esposa y sus tres hijos. Allá escribió la novela Tres ataúdes blancos, ganadora del premio Herralde en 2010 y finalista del Rómulo Gallegos en 2011. Salvo un libro infantil, después de eso, nada. Hasta ahora.
    Antonio Ungar dice que es muy zanahorio y muy solitario. Que quizás sea por eso que no le salen bien los diálogos en sus libros, con personajes muy concentrados sobre sí, y que quizás sea esa la razón por la que el alcohol funciona como mecanismo de desahogo en sus personajes. Personajes que pueden aparecer en ciudades inglesas o colombianas con la misma naturalidad con que pueden aparecer en ciudades francesas o italianas. No hay una geografía definida en su literatura. Como en su vida. Ha vivido en Manchester, en la selva colombiana, en México D.F., en Barcelona, en Iowa y en Palestina. Se graduó de arquitectura y empezó una maestría en literatura comparada que nunca terminó porque le tocaba leer teoría y crítica literaria, pero nunca llegaba a los libros.
    En enero de este año estuvo en Barcelona unos días presentando su más reciente novela. Una novela que no tiene nada que ver con la anterior: ni en tamaño, ni en tono, ni en tema. Luego de una semana en ruedas de prensa, cocteles, almuerzos con editores, cenas con cónsules, estaba frito.`,
    keywords: ['illustration', 'challenge', 'expo', 'storytelling'],
    pictures: {
      main: {
        name: 'hello World',
        url: '/img/articles/two/main.png',
        urlXX: '/img/articles/two/main_b.png',
        comment: 'first coment main image',
      },
      others: [
        {
          type: 'image',
          name: 'hello World',
          url: '/img/articles/two/two.png',
          comment: 'did you know that information, say me the true, if you did not, we wil not have problems. relax with me boy ',
        },
        {
          type: 'image2',
          name: 'hello World',
          url: '/img/articles/two/three.jpg'
        },
        {
          type: 'quote',
          text: `Una vez, al filo de una lúgubre media noche,
          mientras débil y cansado, en tristes reflexiones embebido,
          inclinado sobre un viejo y raro libro de olvidada ciencia,
          cabeceando, casi dormido`,
        }
      ]
    },
  },
  {
    title: 'Kids society',
    subtitle: 'A serious video game for children who do not respect the rules.',
    type: 'Project',
    date: {
      year: '2016',
      color: 1
    },
    colors: [0xffd193, 0x161405],
    intro: "Para muchos lectores argentinos 'La sudestada' fue el cómic del año en 2015; una historia sencilla, sutil, una variación entre un policial sentimental en un marco costumbrista y melancólico. Ese aclamado libro puede leerse ahora en Colombia gracias a una nueva edición por parte del sello Cohete Cómics, de la editorial independiente Laguna libros.",
    content: `Dos películas presentes en ambos ciclos hicieron a Chaplin merecedor de premios Óscar: en 1929 fue galardonado por El Circo, y en 1973 por la banda sonora de Candilejas. Y, en 1972 ganó el  galardón honorífico de la Academia por su trayectoria cinematográfica El hombre transmitió en sus largometrajes una crítica constante a la sociedad en que vivía, a partir de personajes marginales o menospreciados. Sin embargo, su mensaje no fue desalentador: a través de la comedia logró balancear la crudeza de la realidad, de tal manera que a cada burla en pantalla lo acompañaba una reflexión y una mirada sarcástica y crítica para no sucumbir ante el sistema.
    Rodrigo Torrijos, editor de cine y cultura de la revista Rolling Stone, dice que Chaplin no se puede catalogar como una figura vigente, sino eterna. “Es uno de los culpables de potenciar la máquina cinematográfica, hizo trascender el negocio de la estimulación a través de imágenes proyectadas en un muro, a un juego entre el poder, el cuerpo y la memoria. En Tiempos modernos metía la cabeza entre los engranajes de la automatización que podrían aniquilarlo; no disimulaba el miedo, pero salía del otro lado, no triunfante, pero al menos vivo, y con ese gesto solapado de resistencia, de desacato ante lo imaginado. Por eso está presente, porque se sigue burlando de lo establecido, nos sigue inspirando a desafiar el poder, al negocio del entretenimiento, a la dictadura del aburrimiento. Es eterno porque siempre estaremos del lado de los vagos que muerden el cuello de lo imposible” explica Torrijos.`,
    keywords: ['design', 'ux-ui', 'videogame', 'brand', 'illustration'],
      pictures: {
      main: {
        name: 'hello World',
        url: '/img/articles/three/main.png',
        urlXX: '/img/articles/three/main_b.png',
        comment: 'first coment main image',
      },
      others: []
    },
  },
  {
    title: 'Portfolio 2018',
    subtitle: 'Design / Illustration / Develop et Animation for this page.',
    type: 'project',
    date: {
      year: '2018',
      color: 0
    },
    mainImageType: 'video',
    colors: [0x000000, 0xffffff],
    intro: "Para muchos lectores argentinos 'La sudestada' fue el cómic del año en 2015; una historia sencilla, sutil, una variación entre un policial sentimental en un marco costumbrista y melancólico. Ese aclamado libro puede leerse ahora en Colombia gracias a una nueva edición por parte del sello Cohete Cómics, de la editorial independiente Laguna libros.",
    content: `El que Gran Salón México ofreció su primer encuentro en 2014, momento en el cual la ilustración pasaba de ser un simple servicio gráfico a entender como una manifestación artística con peso en la cultura visual. Cuatro años después, todavía se caracteriza por ser una de las primeras ferias totalmente dedicadas a la  ilustración contemporánea en formato de cuadro y piezas coleccionables. Se trata de un encuentro anual en el que 35 ilustradores mexicanos y un invitado internacional se juntan durante tres días para exhibir y vender sus obras, además de participar en conversatorios, talleres y revisiones de su portafolio.
    Aunque los organizadores del evento tienen planeado realizar el Gran Salón México (GSM) en noviembre, tendrán, como antesala y con la convicción de afianzar los lazos entre ilustradores, editores, galeristas y promotores de distintas latitudes, una edición especial en un país distinto a México. En 2018 la exhibición se realizará en Colombia: obras de 18 ilustradores mexicanos podrán serán mostrados a artistas colombiano y al público local.`,
    keywords: ['design', 'illustration', 'ux-ui', 'web', 'dev', 'front-end', 'animation'],
      pictures: {
      main: {
        name: 'hello World',
        url: '/img/articles/neuf/main.mp4',
        urlXX: '/img/articles/neuf/main.png',
        comment: 'first coment main image',
      },
      others: []
    },
  },
  {
    title: 'Huele a caña!',
    subtitle: '(Smells like cane) A micro-project, I did it in two days.',
    type: 'micro-project',
    date: {
      year: '2014',
      color: 1
    },
    colors: [0x000000, 0xffffff],
    intro: "Para muchos lectores argentinos 'La sudestada' fue el cómic del año en 2015; una historia sencilla, sutil, una variación entre un policial sentimental en un marco costumbrista y melancólico. Ese aclamado libro puede leerse ahora en Colombia gracias a una nueva edición por parte del sello Cohete Cómics, de la editorial independiente Laguna libros.",
    content: `El que Gran Salón México ofreció su primer encuentro en 2014, momento en el cual la ilustración pasaba de ser un simple servicio gráfico a entender como una manifestación artística con peso en la cultura visual. Cuatro años después, todavía se caracteriza por ser una de las primeras ferias totalmente dedicadas a la  ilustración contemporánea en formato de cuadro y piezas coleccionables. Se trata de un encuentro anual en el que 35 ilustradores mexicanos y un invitado internacional se juntan durante tres días para exhibir y vender sus obras, además de participar en conversatorios, talleres y revisiones de su portafolio.
    Aunque los organizadores del evento tienen planeado realizar el Gran Salón México (GSM) en noviembre, tendrán, como antesala y con la convicción de afianzar los lazos entre ilustradores, editores, galeristas y promotores de distintas latitudes, una edición especial en un país distinto a México. En 2018 la exhibición se realizará en Colombia: obras de 18 ilustradores mexicanos podrán serán mostrados a artistas colombiano y al público local.`,
    keywords: ['design', 'illustration', 'serious-game', 'challenge', 'ux-ui', 'history'],
      pictures: {
      main: {
        name: 'hello World',
        url: '/img/articles/six/main.png',
        urlXX: '/img/articles/six/main.png',
        comment: 'first coment main image',
      },
      others: []
    },
  },
  {
    title: 'Mutar',
    subtitle: 'co-founder Startup Project, When I wanted to be independent.',
    type: 'project',
    date: {
      year: '2016',
      color: 1
    },
    mainImageType: 'image',
    colors: [0x270944, 0xaefff8],
    intro: "Para muchos lectores argentinos 'La sudestada' fue el cómic del año en 2015; una historia sencilla, sutil, una variación entre un policial sentimental en un marco costumbrista y melancólico. Ese aclamado libro puede leerse ahora en Colombia gracias a una nueva edición por parte del sello Cohete Cómics, de la editorial independiente Laguna libros.",
    content: `Mariana hace uso de su cuerpo como una plastilina de kínder: sin mezquindad nos recuerda que la gente está muy delgada o es muy estúpida, y con agudo sentido del humor reflexiona sobre los mecanismos simplistas con los que hemos construido perpetuando un idealismo famélico en tiempos de selfies, óxido y nada. Mariana nos advierte sobre el espejismo de modelo de revista de moda o estrella de Instagram que a su vez nos mira con desprecio, cara de culo, o en el mejor de los casos parece ignorarnos, mientras juzga nuestra fealdad que es aquí un eufemismo para nuestra pobreza: nuestra esclavitud. Me regaló un pin donde aparece usando un vestido de baño estampado con la bandera confederada gringa: esa misma que campea en la era Trump con sabor a cajita feliz mezclada con pólvora de cañón con las que los tiranos españoles nos defendían de los piratas.
    El punto crucial de esta exhibición titulada “Estaba perdido, pero estar perdido nunca se sintió tan cabrón”, y que es preciso leer con acento puertorriqueño, era una fuente amarilla cuya construcción fue hecha a cuatro manos con el también boricua y mítico artista Radamés “Juni" Figueroa, cuyo contenido el público se apresuró a beber como pueblo sediento del antiguo testamento. Se rumoraba que su agua estaba ligeramente envenenada con MDMA o éxtasis en su estado puro: de ese que toman los jóvenes ansiosos en fiestas electrónicas que duran días y no tienen ni pies, cabeza, ni fin.
    Los tumultos de estudiantes, artista y visitantes ocasionales aglomerados tratando de probar un poco de la bebida prometida, fue como una bocanada de verdad y tristeza: Había mucha confusión pero sobre todo había mucha nada. Una semana después estaría en un avión con rumbo a Cartagena de Indias para asistir al FICCI, del que no vi casi nada, pero eso no importa mientras el ventilador gire como hipnotizador parsimonioso o como una eficiente máquina de sopor.`,
    keywords: ['illustration', 'design', 'animation', 'ux-ui', 'dev', 'brand', 'web', 'front-end'],
      pictures: {
      main: {
        name: 'hello World',
        url: '/img/articles/four/main.gif',
        urlXX: '/img/articles/four/main.gif',
        comment: 'first coment main image',
      },
      others: []
    },
  },
  {
    title: 'Historias de Popayán',
    subtitle: '(Popayán stories) A videogame to know the forgotten history of Popayan city.',
    date: {
      year: '2013',
      color: 0
    },
    type: 'project',
    colors: [0x000000, 0xffffff],
    intro: "Para muchos lectores argentinos 'La sudestada' fue el cómic del año en 2015; una historia sencilla, sutil, una variación entre un policial sentimental en un marco costumbrista y melancólico. Ese aclamado libro puede leerse ahora en Colombia gracias a una nueva edición por parte del sello Cohete Cómics, de la editorial independiente Laguna libros.",
    content: `El que Gran Salón México ofreció su primer encuentro en 2014, momento en el cual la ilustración pasaba de ser un simple servicio gráfico a entender como una manifestación artística con peso en la cultura visual. Cuatro años después, todavía se caracteriza por ser una de las primeras ferias totalmente dedicadas a la  ilustración contemporánea en formato de cuadro y piezas coleccionables. Se trata de un encuentro anual en el que 35 ilustradores mexicanos y un invitado internacional se juntan durante tres días para exhibir y vender sus obras, además de participar en conversatorios, talleres y revisiones de su portafolio.
    Aunque los organizadores del evento tienen planeado realizar el Gran Salón México (GSM) en noviembre, tendrán, como antesala y con la convicción de afianzar los lazos entre ilustradores, editores, galeristas y promotores de distintas latitudes, una edición especial en un país distinto a México. En 2018 la exhibición se realizará en Colombia: obras de 18 ilustradores mexicanos podrán serán mostrados a artistas colombiano y al público local.`,
    keywords: ['design', 'illustration', 'serious-game', 'history', 'ux-ui', 'characters'],
      pictures: {
      main: {
        name: 'hello World',
        url: '/img/articles/five/main.svg',
        urlXX: '/img/articles/five/main.jpg',
        comment: 'first coment main image',
      },
      others: []
    },
  }
]