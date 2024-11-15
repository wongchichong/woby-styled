import { render } from 'woby'
import { styled } from '../styled';
import { css } from '../css';

// Define the styled button component using Styled
const Button = styled("button")`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333333;
  }

  &::after {
    content: '🔥 ';
    display: inline-block;
    margin-right: 5px;
  }
`;

// Use the styled Button component in JSX
function App() {
  return (
    <div>
      <Button>Click Me</Button>
      <button class={styled`
        padding: 10px 20px;
        background-color: #ffAF50;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s;

        &:hover {
          background-color: #333333;
        }

        &::before {
          content: '🔥 ';
        display: inline-block;
        margin-right: 5px;
  }
`} >Direct styled</button>
    </div>
  );
}

render(App, document.body)

export default App;
