
import Hello, { Btn } from './Hello';

const HelloTop: React.FC = () => {
    return (
    <>
        <Btn fn={(text) => console.log(`Hello ${text}`)} />
        <Hello text="script">これがchildrenの中身になる</Hello>
    </>

    )
}