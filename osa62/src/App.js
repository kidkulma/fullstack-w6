import React from 'react'
import { BrowserRouter as Router, Route, NavLink, Link } from 'react-router-dom'
import { ListGroup, ListGroupItem, Col, Row, Grid, FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap'


const Menu = () => {
  const menuStyle = {
    backgroundColor: 'hsl(0, 10%, 75%)',
    borderRadius: 4,
    padding: 10
  }
  const linkStyle = {
    backgroundColor: 'hsl(120, 100%, 75%)',
    color: 'black',
    borderRadius: 4,
    padding: 5,
    textDecoration: 'none',
    marginRight: 5
  }
  const activeLinkStyle = {
    backgroundColor: 'hsl(120, 100%, 25%)',
    color: 'white',
    borderRadius: 4,
    padding: 5,
    textDecoration: 'none',
    marginRight: 5
  }
  return (
    <div style={menuStyle}>
      <NavLink exact to='/' style={linkStyle} activeStyle={activeLinkStyle}>anecdotes</NavLink>&nbsp;
    <NavLink exact to='/create' style={linkStyle} activeStyle={activeLinkStyle}>create new</NavLink>&nbsp;
    <NavLink exact to='/about' style={linkStyle} activeStyle={activeLinkStyle}>about</NavLink>&nbsp;
  </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote =>
        <ListGroupItem key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroupItem>
      )}
    </ListGroup>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)

const About = () => (
  <Grid>
    <Row>
      <Col xs={12} md={6}>
        <h2>About anecdote app</h2>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
        An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Col>
      <Col xs={6} md={4}>
        <img width='70%' height='70%' alt='Linus Torvalds' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg/800px-LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg"></img>
      </Col>
    </Row>
  </Grid>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)


class Notification extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notification: this.props.notification
    }
  }

  render() {
    const newStyle = {
      height: 55,
      padding: 5
    }
    if (this.props.notification !== null) {
      return (
        <div style={newStyle}>
          <Alert color='success'>{this.props.notification}</Alert>
        </div>
      )
    }

    return <div style={newStyle}></div>
  }
}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    await this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>Create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <div>
              <ControlLabel>content:</ControlLabel>
              <FormControl name='content' value={this.state.content} onChange={this.handleChange} />
            </div>
            <div>
              <ControlLabel>author</ControlLabel>
              <FormControl name='author' value={this.state.author} onChange={this.handleChange} />
            </div>
            <div>
              <ControlLabel>url for more info</ControlLabel>
              <FormControl name='info' value={this.state.info} onChange={this.handleChange} />
            </div>
            <Button bsStyle="success" type="submit">create</Button>
          </FormGroup>
        </form>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: null
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote), notification: `a new anecdote ${anecdote.content} created!` })
    setTimeout(() => this.setState({ notification: null }), 5000)
  }

  anecdoteById = (id) => this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)
    this.setState({ anecdotes })
  }

  render() {
    return (
      <Router>
        <div className="container">
          <h1>Software anecdotes</h1>
          <Menu />
          <Notification notification={this.state.notification} />
          <Route exact path='/' render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
          <Route exact path='/about' render={() => <About />} />
          <Route path='/create' render={({ history }) => <CreateNew history={history} addNew={this.addNew} />} />
          <Route exact path="/anecdotes/:id" render={({ match }) =>
            <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
          />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;