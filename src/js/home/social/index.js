'use strict'
const yo = require('yo-yo')

let socialButtons = document.createElement('div')
socialButtons.setAttribute('class', 'cv-socialnetworks-socialbag')

const socialnetworks = {
  'twitter' : {
    url: 'https://twitter.com/Mutatipo',
    title: '@Mutatipo'
  },
  'codepen' : {
    url: 'https://codepen.io/HiNeron',
    title: 'HiNeron'
  },
  'instagram' : {
    url: 'https://www.instagram.com/mutatipo',
    title: 'mutatipo'
  },
  'github' : {
    url: 'https://github.com/hi-neron',
    title: 'hi-neron'
  }
}

for (let socialN in socialnetworks) {
  let socialNT = document.createElement('a')
  socialNT.setAttribute('class', `cv-socialnetworks-${socialN}`)
  socialNT.setAttribute('href', socialnetworks[socialN].url)
  socialNT.setAttribute('title', socialnetworks[socialN].title)
  socialNT.setAttribute('target', `blank`)

  let icon = yo`
    <i className="icon-${socialN}"></i>
  `

  socialNT.appendChild(icon)
  socialButtons.appendChild(socialNT)
}


module.exports = socialButtons