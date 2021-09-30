
import styled from 'styled-components';

export const ClickTypo = styled.span`
    color : orange;
    border: 0px solid white;
    ${({select}) => 
        select === "yes" && `
        border: 1px solid white;
        `
    };
`;


export const AudioCell = styled.div`
    font-size: 15px;
    text-align: left;
`

export const Cell = styled.div`
    opacity: 0.9;
    font-size: 15px;
    text-align: left;
    font-weight: normal;
`

export const Table = styled.div`
    display: flex;
    flex-direction : row;
    align-items : center;
    border-bottom: solid 1px rgba(255,255,255,0.2);
    &:hover{
        border: solid 1px white;
    }
`;

export const Clickdiv = styled.span`
    // width:250px;
    // height:250px;
    border: 0px solid white;
    ${({select}) => 
        select === "yes" && `
        border: 1px solid white;
        `
    };
`;

export const LoadContainer = styled.div`
    height: 80vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    margin-top: 50px;
    font-size: 30px;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-top: 50px;
`;

export const Form = styled.form`
  all: unset;
  width: 100%;
`;

export const Input = styled.input`
  all: unset;
  font-size: 3rem;
  color: white;
  width: 100%;
  padding-bottom: 10px;
`;

export const InfoBar = styled.div `
    display : flex;
    justify-content: space-between;
    align-items: center;
    position : fixed;
    bottom: 0;
    width: 100vw;
    height : 80px;
    background-color: rgba(15,15,15,1);
    z-index: 20;
    color : white;
`;

export const InfoDiv = styled.div `
    left: 5%;
    position : fixed;
`;


export const ButtonDiv = styled.div `
    display: block;
`;

export const CenterDiv = styled.div `
    display: flex;
    flex-direction : column;
    align-items: center;
    left: 30%;
    width : 40%;
    position : fixed;
`;

export const ControlDiv = styled.div `
    right: 5%;
    position : fixed;
`;

export const RowDiv = styled.div `
    display : flex;
    flex-direction: row;
    align-items: center;
    margin-top: 3rem;
`;

export const ColumnsDiv = styled.div `
    margin-left : 10px;
    display : flex;
    flex-direction: column;
    align-items: left;
    margin-left: 3rem;
`;

export const DefaultButton = styled.button `
    cursor: pointer;
    background: none;
    border: none;
    text-decoration: none;
    color : white;
    margin: 0em;
    transition: 0.5s all ease-out;
    &:hover {
        color: yellow;
    }
`;

export const SongButton = styled.button `
    cursor: pointer;
    background: none;
    border: none;
    color : white;
    margin: 1em;
    transition: 0.5s all ease-out;
    &:hover {
    color: white;
    }
`;

export const BarStyle = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
`;

export const BarTime = styled.span `
    color: rgba(255,255,255,0.5);
    font-size: 12px;
`;

export const BarProgress = styled.div `
    flex: 1;
    margin: 0 20px;
    height: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

export const BarProgressKnob = styled.span `
    position: relative;
    height: 5px;
    width: 5px;
    background-color: darkgray;
    border-radius: 50%;
`;


export const Title = styled.span `
    font-size: 15px;
    font-weight: bold;
    display: block;
`;

export const ArtistName = styled.span `
  font-size: 15px;
  color: rgba(255, 255, 255, 0.5);
  display: block;
`;

export const Searchbutton = styled.button`
display: inline-flex;
background : none;
font-size : 18px;
border: 2px solid white;
margin: 0;
color: white;
text-transform: uppercase;
text-decoration: none;
align-items: center;
justify-content: center;
overflow: hidden;
cursor: pointer;
&:hover {
    transition: all .35s ease-Out;
    background: white;
    color: black;   
  }
`;


// SoungImage
export const FirstCircle = styled.div `
  position: absolute;
  z-index: 10;
  top: 0px;
`;

export const ImageContainer = styled.div`
  margin-bottom: 10px;
  position: relative;
  background-color: rgba(25,25,25,0.8);
`;
