import './Child.css';

type Props = {
    name: string
    age: number
}

// const Child = ({ color: c = 'blue', num = 1, fn }) => {
const Child = ({ color: c,num,fn,obj }: {color: string, num: number, fn: (value: string) => string, obj: Props}) => {
    return (
        <div className={`component ${c}`}>
            <h3>Hello component</h3>
            <h3>{num}</h3>
            <h3>{fn('props')}</h3>
            <h3>{obj.name + obj.age}</h3>
        </div>
    )
}

export default Child