import React from 'react';
//import ReactDOM from 'react-dom';
import Sidebar from 'react-sidebar';
//import List from './List'
import './App.css';
// import { Route, Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import MainContent from './MainContent';
import data from './content.json'


const mql = window.matchMedia(`(min-width: 800px)`);

const List = (props) => (
  <div>
    <header>
      <h1>
        <a href="https://threejs.org/">three.js</a>
      </h1>
    </header>
    <ul>
      {data.map(q => (
      <li key={q.title}><span onClick={()=>(props.func(q.title))}>{q.title}</span></li>
      ))}
    </ul>
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: true,
      pageTitle: 'mythree.js'
    };
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.handleContentChanged = this.handleContentChanged.bind(this)
  }

  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
    console.log('call did m app')
  }

  componentDidUpdate() {
    console.log('call did up app')
    const listner = (event) => {
      window.threeStart()
      window.removeEventListener('load', listner)
    }
    window.addEventListener('load', listner)
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  handleContentChanged(e) {
    this.setState({pageTitle: e.charAt(0).toUpperCase() + e.slice(1)})  //頭文字を大文字に
  }

  render() {
    return (
      <div className="App">
        <Sidebar
          sidebar={<List func={this.handleContentChanged}/>}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          sidebarClassName="sidebar"
        >
          {/*<Link  to="/test">gfdg</Link>*/}
          <MainContent title={this.state.pageTitle} />
        </Sidebar>
      </div>
    );
  }
}

export default App