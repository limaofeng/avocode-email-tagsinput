// @flow

import React from 'react'
import StyledAvocodeEmailTagsInput, { utils } from '@avocode/styled-avocode-email-tagsinput'
import StateView from '../state-view'

import type { Query, Tags } from '@avocode/avocode-email-tagsinput/dist/types'

type State = {
  query: Query,
  tags: Tags,
}

export default class Controlled extends React.PureComponent<{}, State> {
  state = {
    tags: [
      { value: 'test@test.com' },
      { value: 'test2@test.com' },
      { value: 'hello@world.com' },
      { value: 'foo@bar.com' },
      { value: 'loremp@ipsum.com' },
    ],
    query: '',
  }

  _handleTagAdd = (text: Query) => {
    this.setState((prevState) => {
      return {
        query: '',
        tags: [ ...prevState.tags, { value: text } ],
      }
    })
  }

  _handleQueryChange = (query: Query) => {
    this.setState({ query })
  }

  _handleTagDelete = (indices: Array<number>) => {
    this.setState((prevState) => {
      const nextTags = utils.removeTagsByIndices(
        prevState.tags,
        indices
      )

      return {
        tags: nextTags,
      }
    })
  }


  render() {
    return (
      <div>
        <StateView tags={this.state.tags} query={this.state.query} />

        <div className='theme-container theme-container--light'>
          <StyledAvocodeEmailTagsInput
            collapsible
            theme='light'
            tags={this.state.tags}
            query={this.state.query}
            onQueryChangeRequest={this._handleQueryChange}
            onTagAddRequest={this._handleTagAdd}
            onTagDeleteRequest={this._handleTagDelete}
          />
        </div>
        <div className='theme-container theme-container--dark'>
          <StyledAvocodeEmailTagsInput
            collapsible
            theme='dark'
            tags={this.state.tags}
            query={this.state.query}
            onQueryChangeRequest={this._handleQueryChange}
            onTagAddRequest={this._handleTagAdd}
            onTagDeleteRequest={this._handleTagDelete}
          />
        </div>
      </div>
    )
  }
}

