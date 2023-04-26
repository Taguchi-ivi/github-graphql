import './Container.css';

const Container = ({title, children}: {title: string, children: React.ReactNode}) => {
    return (
        <div className="container">
            <h3>{title}</h3>
            {children}
        </div>
    )
}

export default Container