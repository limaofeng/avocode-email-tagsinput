// @flow

import React from 'react'
import uuid from 'uuid'
import StyledAvocodeEmailTagsInput, { utils } from '@avocode/styled-avocode-email-tagsinput'
import StateView from '../state-view'

import type { Query, Tags } from '@avocode/styled-avocode-email-tagsinput/dist/types'

type State = {
  query: Query,
  tags: Tags,
}

export default class Collapsible extends React.PureComponent<{}, State> {
  state = {
    tags: [
      { value: 'test@test.com' },
      { value: 'test2@test.com' },
      { value: 'test3@test.com' },
      { value: 'test4@test.com' },
      { value: 'test5@test.com' },
      { value: 'test6@test.com' },
      { value: 'test7@test.com' },
      { value: 'test8@test.com' },
      { value: 'test9@test.com' },
      { value: 'test10@test.com' },
      { value: 'test11@test.com' },
      { value: 'test12@test.com' },
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

  _addRandomTag = () => {
    this._handleTagAdd(
      String(`${uuid.v4().substring(0, 8)}@avocode.com`),
    )
  }

  render() {
    return (
      <div>
        <p>
          Passing <code>collapsible=true</code> will render the input as collapsible that will
          display counter by default
        </p>

        <p>
          Add random tag programatically with this button.
          <br />
          <button onClick={this._addRandomTag}>Add +</button>
        </p>

        <StateView tags={this.state.tags} query={this.state.query} />

        <StyledAvocodeEmailTagsInput
          collapsible
          tags={this.state.tags}
          query={this.state.query}
          onQueryChangeRequest={this._handleQueryChange}
          onTagAddRequest={this._handleTagAdd}
          onTagDeleteRequest={this._handleTagDelete}
        />
      </div>
    )
  }
}

