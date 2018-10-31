import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'
import {Button, Col, Card, Row} from 'react-materialize'

class ColorPick extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <Col m={6} s={12} className={'center-align'}>
        <Card title={this.props.data.id.slice(0,10)}>
          <div>
            <Button floating large className='red' waves='light' onClick={(e) => this.props.updateLight(e, '0x00ff00')}/>
          </div>
          <div>
            <Button floating large className='yellow' waves='light' onClick={(e) => this.props.updateLight(e, '0xffd700')}/>
          </div>
          <div>
            <Button floating large className='green' waves='light' onClick={(e) => this.props.updateLight(e, '0xff0000')}/>
          </div>
        </Card>
      </Col>
    )
  }
}

export default compose()(ColorPick)
