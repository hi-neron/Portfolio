'use strict'
const yo = require('yo-yo')

function curriculumTemplate (cb) {
  let template = yo`
    <div className="cv-container">
      <div className="cv-main">
        <div className="cv-main-top">
          <div className="cv-main-top-left"></div>
          <div className="cv-main-top-right">
            <div className="cv-main-top-right-top">
              <h2 className="cv-main-top-right-name"></h2>
              <div className="cv-main-top-right-line"></div>
              <h3 className="cv-main-top-right-title"></h3>
              <div className="cv-main-top-right-secondTitle"></div>
              <div className="cv-main-top-right-info"></div>
              <a className="cv-main-top-right-mail"></a>
            </div>
            <div className="cv-main-top-right-bottom">
              <h3 className="cv-main-top-right-bottom-languages-title">
                LANGUAGES
              </h3>
              <div className="cv-main-top-right-bottom-languages ul">
                <li></li>
                <li></li>
                <li></li>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cv-skills">

      </div>
    </div>
  `
  cb(template)
}

module.exports = curriculumTemplate