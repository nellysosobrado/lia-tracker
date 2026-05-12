type GreetingPros = {
    name: string
    role: string
}

export default function Greeting({name, role}: GreetingPros) {
    return (
        <div>
            <h1>Hello {name}</h1>
            <p>{role}</p>
        </div>
    )
}