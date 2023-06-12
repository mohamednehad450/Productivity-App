import React, { FC, useState } from 'react'
import { IconButton, Select } from '../common'
import NewTagOverlay from './NewTagOverlay'
import { useTodo } from '.'
import TagSelectRow from './TagSelectRow'

import { ReactComponent as Circle } from '../../icons/circle.svg'
import { ReactComponent as Add } from '../../icons/add-fill.svg'

import type { Tag } from '../../API'

interface TagSelectProps {
    selected?: Tag['id']
    onChange: (tag?: Tag) => void
}

const TagSelect: FC<TagSelectProps> = ({ selected, onChange }) => {

    const [addTagOverlay, setAddTagOverlay] = useState(false)

    const { tags, addNewTag, getTag } = useTodo()


    return (
        <>
            {addTagOverlay &&
                <NewTagOverlay
                    submit={addNewTag}
                    done={() => setAddTagOverlay(false)}
                />
            }
            <Select
                border
                scroll
                options={tags}
                selected={getTag(selected)}
                onChange={onChange}
                CustomInput={({ selected, onClick }) => (
                    <IconButton
                        className='select-input'
                        onClick={onClick}
                        icon={<Circle fill={selected?.color || '#fff'} />}
                    />
                )}
                CustomRow={({ option, onClick, isSelected }) => (
                    <TagSelectRow
                        tag={option}
                        onClick={onClick}
                        isSelected={!!isSelected}
                    />
                )}
                Header={({ close }) => (
                    <>
                        <IconButton
                            className="select-item icon-gray"
                            icon={<Add />}
                            onClick={() => { setAddTagOverlay(true); close() }}
                            label="New Tag"
                        />
                        <IconButton
                            className="select-item"
                            icon={<Circle fill={"#fff"} />}
                            onClick={() => { onChange(); close() }}
                            label="None"
                        />
                    </>
                )}
            />
        </>
    )
}

export default TagSelect