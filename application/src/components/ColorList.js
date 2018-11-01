import React, { Component } from 'react'
import ColorPick from './ColorPick'
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'
import {Row, Button} from 'react-materialize';

class ColorList extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
    this.createLight = this.createLight.bind(this)
  }

  async updateLight(e, id, color) {
    e.preventDefault()
    console.log(color)
    await this.props.updateLight({
      variables: {
        id,
        color: color
      }
    })
  }

  async createLight(e){
    e.preventDefault()
    await this.props.createLight({
      variables: {
        color: "0xff0000"
      },
      update: (store, {data: {createLight}}) => {
        const data = store.readQuery({query: LIGHTS_QUERY})
        data.lights.unshift(createLight)
        store.writeQuery({query: LIGHTS_QUERY, data})
      }
    })
    this.props.history.replace('/')
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
        <h4>Traffic Lights:</h4>
        {this.props.lightsQuery &&
          this.props.lightsQuery.lights.map(light => 
            <ColorPick
              key={light.id}
              data = {light}
              updateLight = {(e, color) => this.updateLight(e, light.id, color)}
              refresh={() => this.props.lightsQuery.refetch()}
            />
          )
        }
        <Button floating fab='vertical' icon='add' className='red' large style={{bottom: '45px', right: '24px'}}>
          <Button floating icon='insert_chart' className='red' onClick={(e) => this.createLight(e)}/>
        </Button>        
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

const CREATE_LIGHT_MUTATION = gql`
  mutation CreateLightMutation($color: String!){
    createLight(color:$color){
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
  }),
  graphql(CREATE_LIGHT_MUTATION, {
    name:'createLight'
  }),
)(ColorList)