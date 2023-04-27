// 勉強環境
// import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react'
import { useState } from 'react'
import { MyList } from './components/List'
import Expression from './components/Expression'
import Child from './components/Child';
import Container from './components/Container';
import MyTodo from './components/MyTodo'

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

  // const listItems = products.map(product =>
  //   <li key={product.id}>{product.title}</li>
  // );

  function handleClick() {
    setCount(count + 1);
  }

  const hello = (arg: string):string => `${arg} Function`

  const o = {
    color: "red",
    num: 123
  }

  let [val, setVal] = useState("")
  const [cnt, setCnt] = useState(0)
  const countUp = () => {
    setCnt(cnt + 1)
  }
  const countDown = () => {
    setCnt(cnt - 1)
  }

  const personObj = {name: "Tom", age: 18}
  const [person, setPerson] = useState(personObj)

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setPerson({ name: e.target.value, age: person.age })
    setPerson({ ...person, name: e.target.value })
  }

  const changeAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const age = parseInt(e.target.value)
    // setPerson({ name: person.name, age: age })
    setPerson({ ...person, age: age })
  }

  const resetPerson = () => {
    setPerson({ name: "", age: 0 })
  }

  const numArray = [1 , 2, 3, 4, 5]
  const [nums, setNums] = useState(numArray)

  const shuffle = () => {
    const newNums = [...nums];
    const value: number | undefined = newNums.pop();
    if(value !== undefined) {
      newNums.unshift(value);
      setNums(newNums);
    }
  }

  const animals = ["dog", "cat", "mouse"]
  const [filterVal, setFilterVal] = useState("")

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
      {/* <ul>{listItems}</ul> */}
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
      <input
        type="text"
        onChange={(e) => {
          setVal(e.target.value)
        }}
      /> = {val}
      <p>現在のカウント数：{cnt}</p>
      <button
        onClick={countUp}
      >
        +
      </button>
      <button
        onClick={countDown}
      >
        -
      </button>

      <h3>Name:{person.name}</h3>
      <h3>Age:{person.age}</h3>
      <input type="text" value={person.name} onChange={changeName}/>
      <input type="number" value={person.age} onChange={changeAge}/>
      <div>
        <button onClick={resetPerson}>リセット</button>
      </div>
      <h1>
        {nums}
      </h1>
      <button onClick={shuffle}>shuffle</button>
      {/* for文はJSX内に記載できないが,mapなどの式は記載できる */}
      <ul>
        {products.map(product =><li key={product.id}>{product.title}</li>)}
      </ul>

      <input type="text" value={filterVal} onChange={(e) => setFilterVal(e.target.value)}/>
      <ul>
      {/* // .map((animal) => <li key={animal}>{animal}</li>) */}
        {animals
          .filter(animal => animal.indexOf(filterVal) !== -1)
          .map((animal) => {
            // 真偽値は画面に表示されない
            return <li key={animal}>{animal === "dog" && "★"}</li>
            // 三項演算子
            // return <li key={animal}>{animal === "dog" ? animal + "★" : animal}</li>
            // if文
            // if(animal === "dog") {
            //   return <li key={animal}>{animal}★</li>
            // } else {
            //   return <li key={animal}>{animal}</li>
            // }
          })
        }
      </ul>
      <div>
        <ChakraProvider>
          <MyTodo />
        </ChakraProvider>
      </div>
    </div>
  );
}

export default App;
