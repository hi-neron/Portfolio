'use strict'
const yo = require('yo-yo')
const elf = require('./elf')

// colors
let mainColor = '#322934'
let secondaryColor = '#FF4369'
let thirdColor = '#cfffff'
let gray = '#e7e7e7'

let launcher = document.createElement('div')
launcher.setAttribute('id', 'cv-launcher-container')

let abilitiesContainer = document.createElement('div')
abilitiesContainer.setAttribute('class', 'cv-skills-container')

let template = document.createElement('div')
template.setAttribute('class', 'cv-container')

let me = yo`<p className="cv-launcher-button-text2">
  ME
</p>`

let launcherButton = yo`
<div className="cv-launcher-button">
  <p className="cv-launcher-button-text1">
    ABOUT
  </p>
  ${me}
</div>
`

launcher.appendChild(launcherButton)

let bio = yo`
  <div className="cv-main-bottom-bio-text">
    <p>Hi, I’m <span className="cv-bio-highlight name">Jose Sánchez</span>. I’m from Popayán, a small and precious city (Perhaps a bit outdated) in Colombia country. I got my professional degree in <span className="cv-bio-highlight gdesigner">Graphic Design</span> there, from the University of Cauca. On the process to achieve my degree (moreover to design) I too learned to <span className="cv-bio-highlight wteam">work on a team</span>, to be empathetic, <span className="cv-bio-highlight gdesigner">researching</span>, work with typography, <span className="cv-bio-highlight gdesigner">illustration</span>, to paint, a lot of things. I love to design but too the <span className="cv-bio-highlight gdesigner">develop</span>... I’ve programmed all my life. I also like maths, I like physics, cook, run, the coffee and the sea.</p>
    <p>¿What is my most powerful skill? I learn too fast and love it. I prefer to say that I work looking for solutions or "challenging me" before to design, to develop, to illustrate, blah, blah, bl... I named my way of work: <span className="cv-bio-highlight gdesigner">resilience style</span>.</p>
    <p>Years ago, I’ve been working on the web: Interaction, multimedia, illustration and animation <span className="cv-bio-highlight gdesigner">(UX/UI)</span>, and I would like to continue like this for a long time.</p>
  </div>
`

let abilities = {
  "DESIGN" : {
    time: '5 years',
    skills: 'Diseñador (UX/UI), con experiencia en diseño de videojuegos (Conceptual de Personajes, escenarios; Narrativas e interacción multimedia)',
    competences: {
      "Illustrator" : 12,
      "Photoshop" : 12,
      "InDesign" : 10,
      "Sketch" : 12,
      "Blender" : 6,
      "SVG" : 12,
      "HTML" : 12,
      "CSS/SCSS" : 12
    }
  },
  "DEV" : {
    time: '2 years',
    skills: 'Desarrollo de interfaces (UI), construcción, diseño, animación de páginas web (diseño y construcción de menús).',
    competences: {
       "Javascript" : 12,
       "GSAP" : 12,
       "Jquery" : 12,
       "Git/Github" : 8,
       "Node.js" : 6,
       "NPM" : 12,
       "WebPack" : 8
    }
  },
  "TEAMWORK" : {
    time: '7 years',
    skills: 'Comunicación con equipos multidisciplinares en proyectos que requieren interacción permanente con ingenieros, animadores, comunicadores y gerentes, en entorno de oficina compartida. Experiencia trabajando en proyectos ágiles con límites de tiempo y recursos. Facilidad de comunicación con programadores basada en mis propios conocimientos técnicos. Liderazgo y habilidades de negociación obtenidas a través del mi propio emprendimiento empresarial (MUTAR SAS). Empatía y habilidades para la creación en colectivo',
    competences: {
       "Kanban" : 6,
       "SCRUM" : 12,
       "Design_Thinking" : 12,
       "Lean_Startup" : 12
    }
  }
}

let curriculum = true

function barGenerator (max, number, label, color) {
  let container = document.createElement('div')
  container.setAttribute('class', 'cv-filled-bar-container')
  
  let title = document.createElement('div')
  title.setAttribute('class', 'cv-filled-bar-title')
  title.innerHTML = label
  
  let template = document.createElement('div')
  template.setAttribute('class', 'cv-filled-bar')
  template.style.gridTemplateColumns = `repeat(${max}, 1fr)`
  
  for (let x = 0; x < number; x++) {
    let filled = document.createElement('div')
    filled.setAttribute('class', 'filled-square')
    if (color) {
      filled.style.backgroundColor = color
    }
    if (x === number - 1) {
      filled.appendChild(title)
    }
    template.appendChild(filled)
  }

  container.appendChild(template)

  return container
}

launcherButton.onclick = (ev) => {
  let parent = template.parentNode
  if(curriculum){
    parent.style.transform = 'translateX(0%)'
    me.style.left = '30px'
    launcherButton.style.backgroundColor = mainColor
    document.body.style.overflowY = 'hidden'
    
  } else {
    me.style.left = '4px'
    document.body.style.overflowY = 'scroll'
    launcherButton.style.backgroundColor = thirdColor
    parent.style.transform = 'translateX(-100%)'
  }
  curriculum =! curriculum
}

function curriculumBehavior (mainContentP) {
  let vPosition = window.pageYOffset

  if (vPosition > mainContentP.top - 150) {
    launcherButton.classList.add('curriculum-trigger-down')
  } else {
    launcherButton.classList.remove('curriculum-trigger-down')
  }
}

function curriculumCreator (cb) {
  const socialButtons = require('../social')
  
  let cvmain = yo`
    <div className="cv-main">
      <div className="cv-main-top">
        <div className="cv-main-top-left">
          <img src="/img/me.png" alt="me"/>
          <div class="cv-me-eyes"></div>
        </div>
        <div className="cv-main-top-right">
          <div className="cv-main-top-right-top">
            <h2 className="cv-main-top-right-name">
            JOSE_L. SÁNCHEZ
            </h2>
            <div className="cv-main-top-right-line"></div>
            <h3 className="cv-main-top-right-title">
              GRAPHIC DESIGNER <span>/ professional</span>
            </h3>
            <div className="cv-main-top-right-secondTitle">
              FRONT-END <span>/ self-taught</span>
            </div>
            <div className="cv-main-top-right-info">
              Bogotá / Colombia 
            </div>
            <a className="cv-main-top-right-mail" href="mailto:hola@josesan.ch">
              hola@josesan.ch
            </a>
          </div>
          <div className="cv-main-top-right-bottom">
            <h3 className="cv-main-top-right-bottom-languages-title">
              LANGUAGES
            </h3>
            <div className="cv-main-top-right-bottom-languages">
              ${barGenerator(12, 12, 'SPANISH (native)', '#FF4369')}
              ${barGenerator(12, 10, 'ENGLISH (10/12)', '#FF4369')}
              ${barGenerator(12, 6, 'FRENCH (6/12)', '#FF4369')}
            </div>
          </div>
        </div>
      </div>
      <div className="cv-main-bottom-bio">
        ${bio}
      </div>
    </div>
  `

  let social = document.createElement('div')
  social.setAttribute('class', 'cv-socialnetworks-container')

  template.appendChild(cvmain)

  for (const ability in abilities) {
    let singleAbilityContainer = document.createElement('article')
    singleAbilityContainer.setAttribute('class', 'cv-skill-container')

    let competences = document.createElement('div')
    competences.setAttribute('class', 'cv-skill-competences-container')

    for (let competence in abilities[ability].competences) {
      let competenceTemplate = yo`
        <div className="cv-skill-competence">
          ${barGenerator(12, abilities[ability].competences[competence], competence, ability === 'TEAMWORK'? '#ff7e98': null)}
        </div>
      `
      competences.appendChild(competenceTemplate)
    }

    let abilityTemplate = yo`
      <div className="cv-skill-body cv-${ability.toLowerCase()}">
        <div className="cv-skill-header">
          <h2 className="cv-skill-header-title">
            ${ability}
            <span className="cv-skill-header-years">
              ${abilities[ability].time}
            </span>
          </h2>
        </div>
        <div className="cv-skill-skills">
          <h2 className="cv-skill-skills-title">SKILLS</h2>
          <span className="cv-skill-skills-content">
            ${abilities[ability].skills}
          </span>
        </div>
        <div className="cv-skill-competences">
          <h2 className="cv-skill-competences-title">ABILITIES</h2>
          ${competences}
        </div>
      </div>
    `
    template.appendChild(abilityTemplate)
  }

  let socialTemplate = yo`
    <div className="cv-socialnetworks-body">
      <div className="cv-socialnetworks-top">
        ${elf}
      </div>
      <div className="cv-socialnetworks-bottom">
        ${socialButtons()}
      </div>
    </div>
  `
  social.appendChild(socialTemplate)
  template.appendChild(social)

  cb({cv:template, launcher:launcher})
}

module.exports = {
  curriculumCreator,
  curriculumBehavior
}