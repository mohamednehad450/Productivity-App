import { FC } from "react"

interface NumCheckBoxProps {
    disabled?: boolean
    checked?: boolean
    number: number
    onChange: (checked: boolean) => void
    className?: string
}


const NumCheckBox: FC<NumCheckBoxProps> = ({
    onChange,
    checked,
    className,
    disabled,
    number
}) => {

    return (
        <span
            className={`num-checkbox-container ${disabled ? 'checkbox-disabled' : ''} ${className}`}
            onClick={() => !disabled && onChange(!checked)}
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M0 0h24v24H0V0z" fill="none" />
                {checked ?
                    (<>
                        <path d="M21 3H3v18h18V3zM10" />
                        <text className="num-checkbox num-checkbox-checked" x="50%" y="52%" dominantBaseline="middle" textAnchor="middle">
                            {number}
                        </text>
                    </>) :
                    (<>
                        <text className="num-checkbox" x="50%" y="52%" dominantBaseline="middle" textAnchor="middle">
                            {number}
                        </text>
                        <path d="M19 5v14H5V5h14m2-2H3v18h18V3z" />
                    </>)
                }
            </svg>
        </span>

    )
}

export default NumCheckBox