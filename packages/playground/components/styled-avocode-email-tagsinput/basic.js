// @flow

import React from 'react'
import StyledAvocodeEmailTagsInput from '@avocode/styled-avocode-email-tagsinput'

export default class Basic extends React.PureComponent<{}> {
  render() {
    return (
      <div>
        <p>
          <code>StyledAvocodeTagsInput</code> is input for inserting tags that are valid emails. By default it
          should <i>"just work"</i>.
          Try typing valid email and hitting <i>Comma</i>, <i>Enter</i> or <i>Space</i> to add new tag.
        </p>

        <div className='theme-container theme-container--light'>
          <div className='styled-avocode-email-tagsinput-container'>
            <h2>Light theme</h2>
            <StyledAvocodeEmailTagsInput />
          </div>
        </div>
        <div className='theme-container theme-container--dark'>
          <div className='styled-avocode-email-tagsinput-container'>
            <h2 style={{ color: '#fff' }}>Dark theme</h2>
            <StyledAvocodeEmailTagsInput theme='dark' />
          </div>
        </div>
      </div>
    )
  }
}

