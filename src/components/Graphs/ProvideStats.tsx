import { FC } from "react";
import { statsContext, useProvideStats } from "./hooks";




const ProvideStats: FC = ({ children }) => {

    const stats = useProvideStats()

    return (
        <statsContext.Provider value={stats}>
            {children}
        </statsContext.Provider>
    )
}

export default ProvideStats