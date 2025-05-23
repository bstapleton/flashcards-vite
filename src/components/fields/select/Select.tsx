import React from "react";
import {useTranslation} from "react-i18next";
import Hint from "../../hint/Hint.tsx";

type SelectProps = {
    value?: string,
    id: string,
    options: string[],
    hasHint: boolean,
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function Select(props: SelectProps) {
    const [value, setValue] = React.useState(props.options[0]);
    const { t } = useTranslation();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(event.target.value);
        if (props.onChange) {
            props.onChange(event);
        }
    };

    return (
        <div className={'mb-5 md:w-full'}>
            <label htmlFor={props.id} className={'block mb-2 text-sm font-medium text-white'}>
                {t(props.id)}
            </label>
            <>
                <select
                    value={value}
                    id={props.id}
                    className={'block w-full p-4 rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary focus:border-primary'}
                    onChange={handleChange}
                    aria-describedby={props.hasHint ? props.id + '-hint' :  t(props.id)}
                >
                    {props.options.map((option, index) => (
                        <option key={index} value={option}>
                            {t('select.options.' + option)}
                        </option>
                    ))}
                </select>
                {props.hasHint &&
                    <Hint id={props.id} />
                }
            </>
        </div>
    )
}