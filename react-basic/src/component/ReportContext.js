import { useContext } from "react"
import DataContext from "../data/DataContext"

const ReportContext = () => {
    const {Todo,status} = useContext(DataContext)
    return (
        <div>
            <DataContext.Consumer>
                {context=><p>Global Context {context.Todo} Status is {context.status}</p>}
            </DataContext.Consumer>
            <strong>Local Context : {Todo} Status is {status}</strong>
        </div>
    )
}

export default ReportContext