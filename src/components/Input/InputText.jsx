import { useState } from "react"
import { formatName } from './Format'


function InputText({ labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType, disabled = false, format }) {

    const [value, setValue] = useState(defaultValue)

    const updateInputValue = (val) => {
        if (format === 'fullName') {
            val = formatName(val)
        }
        setValue(val)
        updateFormValue({ updateType, value: val })
    }

    return (
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content text-base text-teal " + labelStyle}>{labelTitle}</span>
            </label>
            <div className="rounded-md border-gray-400">

                <input type={type || "text"} value={value} disabled={disabled} placeholder={placeholder || ""}
                    onChange={(e) => updateInputValue(e.target.value)} className=" outline-none border-0 block focus:shadow-shadow_color border-border_color input-bordered w-full " />
            </div>
        </div>
    )
}


export default InputText