import axios from 'axios'
import capitalize from 'capitalize-the-first-letter'
import React, { useState, useEffect } from 'react'
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'

function SelectBox(props) {
    const { labelTitle, labelDescription, defaultValue, containerStyle, placeholder, labelStyle, options, updateType, updateFormValue } = props

    // Set initial value to first option's id if defaultValue is not provided
    const initialValue = defaultValue || (options.length > 0 ? options[0].id : "PLACEHOLDER")
    const [value, setValue] = useState(defaultValue)

    useEffect(() => {
        setValue(defaultValue || (options.length > 0 ? options[0].id : "PLACEHOLDER"));
    }, [defaultValue, options]);

    const updateValue = (newValue) => {
        updateFormValue({ updateType, value: newValue })
        setValue(newValue)
    }

    return (
        <div className={`form-control flex ${containerStyle}`}>
            <label className={` ${(labelTitle === '' || placeholder === 'Lựa chọn chức vụ') ? 'hidden' : 'label'}`}>
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            </label>

            <select
                className="pl-2 h-[38px] p-[9px 13px 9px 13px] select select-bordered w-full"
                defaultValue={value}
                onChange={(e) => updateValue(e.target.value)}
            >
                <option disabled value="PLACEHOLDER">{placeholder || "Chọn tầng"}</option>
                {
                    options.map((o, k) => (
                        <option value={o.id || o.name} key={k}>
                            {o.roomCode ? `P.${o.roomCode}` : o.name}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

export default SelectBox
