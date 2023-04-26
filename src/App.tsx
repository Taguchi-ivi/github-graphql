// 勉強環境
// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import { MyList } from './components/List'
import Expression from './components/Expression'
import Child from './components/Child';
import Container from './components/Container'

// let content;
// if (flg) {
//   content = 'content True'
// } else {
//   content = 'content False'
// }
const user = "Hello"
let flg = true;




function App() {
  const [count, setCount] = useState(0);
  const products = [
    { title: 'Cabbage', id: 1 },
    { title: 'Garlic', id: 2 },
    { title: 'Apple', id: 3 },
  ];

  const listItems = products.map(product =>
    <li key={product.id}>{product.title}</li>
  );

  function handleClick() {
    setCount(count + 1);
  }

  const hello = (arg: string):string => `${arg} Function`

  const o = {
    color: "red",
    num: 123
  }

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div>
      <h1 className='App-doda'>my name is taguchi <span className='App-blue'>{ user }</span></h1>
      {flg ? <p>content True</p> : <p>content False</p>}
      <ul>{listItems}</ul>
      <button onClick={handleClick}>
        clicked {count} times
      </button>
      <MyList />
      <Expression />
      {/* <Child color="red" /> */}
      <Child
        {...o}
        fn={hello}
        obj={{ name: 'taguchi', age: 20 }}
      />

      {/* 開始タグと閉じタグ内のものをchildrenとすることができる */}
      <Container title="hello">
        <Child
          {...o}
          fn={hello}
          obj={{ name: 'taguchi', age: 20 }}
        />
      </Container>
    </div>
  );
}

export default App;
