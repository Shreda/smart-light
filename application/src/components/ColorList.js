import React, { Component } from 'react'
import ColorPick from './ColorPick'
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'
import {Row} from 'react-materialize';

class ColorList extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  updateLight(e, id, color) {
    e.preventDefault()
    console.log(color)
    this.props.updateLight({
      variables: {
        id,
        color: color
      }
    })
  }

  render(){
    if (this.props.lightsQuery.loading) {
      return (
        <div className="flex w-100 h-100 items-center justify-center pt7">
          <div>Loading (from {process.env.REACT_APP_GRAPHQL_ENDPOINT})</div>
        </div>
      )
    }

    return(
      <Row>
        {this.props.lightsQuery &&
          this.props.lightsQuery.lights.map(light => 
            <ColorPick
              key={light.id}
              data = {light}
              updateLight = {(e, color) => this.updateLight(e, light.id, color)}
            />
          )
        }
      </Row>
    )
  }
}

const LIGHTS_QUERY = gql`
  query LightsQuery{
    lights{
      id
      color
    }
  }
`


const UPDATE_LIGHT_MUTATION = gql`
  mutation UpdateLightMutation($id:ID!, $color: String!){
    updateLight(id:$id, color:$color){
      id
      color
    }
  }
`

export default compose(
  graphql(LIGHTS_QUERY, {
    name:'lightsQuery'
  }),
  graphql(UPDATE_LIGHT_MUTATION, {
    name:'updateLight'
  })
)(ColorList)