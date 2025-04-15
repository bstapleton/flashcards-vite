import {useTranslation} from "react-i18next";
import React from "react";

type TextareaProps = {
    value?: string;
    label: string;
    id: string;
    validationRule?: string;
    hasHint?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea(props: TextareaProps) {
    const [value, setValue] = React.useState(props.value);
    const { t } = useTranslation();

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
        if (props.onChange) {
            props.onChange(event);
        }
    };

    return (
        <div className={'mb-5 md:w-full'}>
            <label htmlFor={props.id} className={'block mb-2 text-sm font-medium text-white'}>
                {props.label}
            </label>
            <>
                <textarea
                       id={props.id}
                       className={'block w-full p-4 rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary focus:border-primary'}
                       value={value}
                       onChange={handleChange}
                       aria-describedby={props.hasHint ? props.id + '-hint' : t(props.id)}
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