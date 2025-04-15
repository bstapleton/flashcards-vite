import {TextFieldType} from "./TextFieldType.ts";
import React from "react";
import {useTranslation} from "react-i18next";

type TextInputProps = {
    value?: string;
    type: TextFieldType
    id: string;
    validationRule?: string;
    hasHint?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

export default function TextInput(props: TextInputProps) {
    const [value, setValue] = React.useState(props.value);
    const { t } = useTranslation();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        if (props.onChange) {
            props.onChange(event);
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (props.onBlur) {
            props.onBlur(event);
        }
    };

    return (
        <div className={'mb-5 md:w-full'}>
            <label htmlFor={props.id} className={'block mb-2 text-sm font-medium text-white'}>
                {t(props.id)}
            </label>
            <>
                <input type={props.type}
                       id={props.id}
                       className={'block w-full p-4 rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary focus:border-primary'}
                       value={value}
                       onChange={handleChange}
                       onBlur={handleBlur}
                       aria-describedby={props.hasHint ? props.id + '-hint' :  t(props.id)}
                />
                {props.hasHint &&
                    <p id={props.id + '-hint'} className={'mt-2 text-sm text-gray-400 italic'}>
                        {t(props.id + '_hint')}
                    </p>
                }
            </>
        </div>
    )
}