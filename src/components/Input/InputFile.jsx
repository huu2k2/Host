import { useState } from "react"


function InputFile({ labelTitle, labelStyle, type, containerStyle, defaultValue, placeholder, updateFormValue, updateType }) {

    const [value, setValue] = useState(defaultValue)

    const updateInputValue = (val) => {

        const reader = new FileReader();
        reader.onload = () => {
            const base64String = btoa(reader.result);
            // setBase64Data(base64String);
            updateFormValue({ updateType, value: base64String })

        };

        reader.readAsBinaryString(val);
        // setValue(val)



    }

    return (
        <div className={`form-control w-full ${containerStyle}`}>
            <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            </label>
            <input type={type || "file"} value={value} placeholder={placeholder || ""} onChange={(e) => updateInputValue(e.target.files[0])} className="input  input-bordered w-full pt-2 custom-file-input" />

        </div>
    )
}


export default InputFile