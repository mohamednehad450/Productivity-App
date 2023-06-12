import { FC } from "react"
import { Select, IconButton } from '.'

import { ReactComponent as MoreIcon } from '../../icons/more.svg'

interface Action {
    label: string
    action: () => void
}

interface ActionSelectProps {
    actions: Action[]
}

const ActionSelect: FC<ActionSelectProps> = ({
    actions,
}) => {
    return (
        <div>
            <Select
                right
                border
                options={actions.map(a => ({ ...a, id: a.label }))}
                CustomInput={({ onClick }) => (
                    <IconButton
                        icon={<MoreIcon />}
                        onClick={(e) => { e.stopPropagation(); onClick() }}
                        className="icon-gray"
                    />
                )}
                CustomRow={({ onClick, option }) => (<div onClick={(e) => { e.stopPropagation(); onClick() }} className="select-item select-item-sm align-row">{option.label}</div>)}
                onChange={(o) => o.action()}
            />
        </div>
    )
}

export default ActionSelect