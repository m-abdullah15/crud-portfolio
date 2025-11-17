import React from "react";
import DataContext from "./DataContext";

const DataContextProvider = ({children}) => {
    // user should be an object or null, not an array. Initialize as null until loaded.
    const [user, setUser] = React.useState(null)
    const [projects, setProjects] = React.useState([])
    const [skills, setSkills] = React.useState([])
    return(
        <DataContext.Provider value={{user, setUser,projects, setProjects, skills, setSkills}}>
        {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider