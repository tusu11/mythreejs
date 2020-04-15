import React from 'react';
// import Sidebar from 'react-sidebar';
// import List from './List'
import './App.css';
import { Helmet } from 'react-helmet';
import ScriptTag from 'react-script-tag'
import TopPage from './TopPage'

class MainContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    console.log("call did m main")
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("judge")
    if (this.props.title !== nextProps.title){
      return true
    }
    else {
      return false
    }
  }

  componentDidUpdate() {
    console.log("call did up")
    const canvas = document.getElementById('canvas-frame')
    canvas.innerHTML = ''
    const timer = window.setTimeout(()=> {
      try {
        window.threeStart()
      }
      catch(e) {
        console.log('error', e)
        canvas.innerHTML = ''
        canvas.appendChild(document.createElement('p')).innerHTML= e
      }
    }, 500)
  }

  render(){
    return (
      <React.Fragment>
        <Helmet
          title={this.props.title}
          defaultTitle={'mythree.js'}
          // script={[
          //   {src: "./pages/js/" + this.props.title + ".js" , type: "text/javascript"} // jsonで渡せば良かった
          // ]}
        >
          {/* {(this.props.title !== 'top') &&
            <script type="text/javascript" src={"./pages/js/" + this.props.title + ".js"}></script>
          } */}
        </Helmet>
        <h1>
          {this.props.title}
        </h1>
        {(this.props.title !== 'mythree.js') ?
          // <iframe title="inlineFrame" src={"./pages/" + this.props.title + ".html"} width="512px" height="512px"></iframe> :
          <ScriptTag src={"./pages/js/" + this.props.title + ".js"} /> :
          // null :
          <TopPage />
        }
        <div id="canvas-frame"></div>
      </React.Fragment>
    );
  }
}

export default MainContent