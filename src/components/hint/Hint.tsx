import {useTranslation} from "react-i18next";

type HintProps = {
    id: string;
}

export default function Hint(props: HintProps) {
    const { t } = useTranslation();

    return (
        <p id={props.id + '-hint'} className={'mt-2 text-sm text-gray-400 italic'}>
            {t(props.id + '_hint')}
        </p>
    )
}