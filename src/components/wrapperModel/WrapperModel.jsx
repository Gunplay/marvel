// import React, {Component} from 'react';
// import styled from 'styled-components';

// const ButtonCLose = styled.div`
// position: fixed;
// font-size: 20px;
// top: 10px;
// left: 50px;
// z-index: 6;; 
// height: 30px; 
// width: 60px;
// color: white;
// font-size: 40px; 
// transition: 0.3s transform;
//  &:hover {
//  color: red;
//  cursor: pointer;
//  transform: translate(-15px, -5px);
//  }
// `
// class WrapperModel extends Component {
//   constructor (props) {
//     super(props)
//   }
//   render() {
//     const { charInfo, onBtnClose,  } = this.props;
   
//     return (
//       <>
//         {charInfo && (
//           <div className="Wrapper__Model">
//           <ButtonCLose type="button" onClick={onBtnClose}>BACK</ButtonCLose>
//             {this.props.children}
//           </div>
//         )}
//       </>
//     );
//   }
// }

// export default WrapperModel;