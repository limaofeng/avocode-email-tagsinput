// @flow

import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import marked from 'marked'

import AvocodeEmailTagsInputView from './avocode-email-tagsiput/'
import BetterReactTagsInputView from './better-react-tagsinput/'
import StyledAvocodeEmailTagsInputView from './styled-avocode-email-tagsinput/'

import ApiView from './api-view'
import pkg from '../package.json'

import '../styles/index.css'

type Doc = 'avocode-email-tagsinput' | 'better-react-tagsinput'

type State = {
  apiDocs: {
    [key: Doc]: ?string,
  },
}

export default class App extends React.Component<{}, State> {
  state = {
    apiDocs: {},
  }

  componentDidMount() {
    this._fetchApiDocs()
  }

  _fetchApiDocs = () => {
    const docs = [ 'avocode-email-tagsinput', 'better-react-tagsinput' ]

    docs.forEach((docName: Doc) => {
      fetch(`static/${docName}.md`)
        .then((response) => response.text())
        .then((text) => {
          this.setState((prevState) => {
            return {
              apiDocs: {
                ...prevState.apiDocs,
                // $FlowFixMe: Ignore literal types
                [docName]: marked(text),
              },
            }
          })
        })
    })
  }

  render() {
    const avocodeEmailTagsInputDoc = this.state.apiDocs['avocode-email-tagsinput']
    const betterReactTagsInputDoc = this.state.apiDocs['better-react-tagsinput']

    return (
      <Router>
        <div className='app'>
          <div className='version-header'>
            playground: <code>{pkg.version}</code>{' ◆ '}
            avocode-email-tagsinput: <code>{pkg.dependencies['@avocode/avocode-email-tagsinput']}</code>{' ◆ '}
            better-react-tagsinput: <code>{pkg.dependencies['@avocode/better-react-tagsinput']}</code>
          </div>
          <div className='app-container'>
            <div className='app-container__header'>
              <nav>
                <ul className='nav'>
                  <li className='nav-item'><Link to="/avocode-email-tagsinput">Avocode Email TagsInput</Link></li>
                  <li className='nav-item'><Link to="/styled-avocode-email-tagsinput">Styled Avocode Email TagsInput</Link></li>
                  <li className='nav-item'><Link to="/better-react-tagsinput">Better React TagsInput</Link></li>
                </ul>
              </nav>

              <Route path='/' exact component={AvocodeEmailTagsInputView} />
              <Route path='/avocode-email-tagsinput' component={AvocodeEmailTagsInputView} />
              <Route path='/styled-avocode-email-tagsinput' component={StyledAvocodeEmailTagsInputView} />
              <Route path='/better-react-tagsinput' component={BetterReactTagsInputView} />
            </div>
            <div className='app-container__api'>
              <Route
                exact
                path='/'
                render={() => (
                  <ApiView
                    doc={avocodeEmailTagsInputDoc}
                    retryApiDocsLoadRequest={this._fetchApiDocs}
                  />
                )}
              />
              <Route
                path='/avocode-email-tagsinput'
                render={() => (
                  <ApiView
                    doc={avocodeEmailTagsInputDoc}
                    retryApiDocsLoadRequest={this._fetchApiDocs}
                  />
                )}
              />
              <Route
                path='/better-react-tagsinput'
                render={() => (
                  <ApiView
                    doc={betterReactTagsInputDoc}
                    retryApiDocsLoadRequest={this._fetchApiDocs}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

