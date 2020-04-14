import React from 'react';
// import Sidebar from 'react-sidebar';
// import List from './List'
import './App.css';
import { Helmet } from 'react-helmet';

class MainContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    console.log("call did m")

  }

  componentDidUpdate() {
    //canvasノードを削除
    // let canvasFrame = document.getElementById('canvas-frame')
    // canvasFrame.innerHTML = ''
    // window.threeStart()

    console.log("call did up")
    // window.threeStart()

    //Eventlistenerを削除
    //window.removeEventListener("keydown", arguments.callee)
  }

  render(){
    return (
      <React.Fragment>
        <Helmet
          title={this.props.title}
          defaultTitle={'my three.js'}
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
        <iframe title="inlineFrame" src={"./temp/" + this.props.title + ".html"} width="512px" height="512px"></iframe>
        {/* <div id="canvas-frame"></div> */}
      </React.Fragment>
    );
  }
}

export default MainContent