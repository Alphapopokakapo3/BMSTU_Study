import type { BaseSyntheticEvent } from "react"
import { currentWeek } from "../lib/scheduleUtils.js"

type SliderProps = {
    buttonList: Map<string, string>,
    state: string,
    setState: (value: string) => void
}

type SliderButtonProps = {
    buttonKey: string,
    text: string,
    isActive: boolean,
    onClick: (value: string) => void
}

type SelectProps = {
    variants: string[],
    state: string,
    setState: (value: string) => void
}

type ButtonProps = {
    text: string,
    onClick: () => void,
    aClass: string
}

type WeekSelectProps = {
    weeksList: number[],
    state: number,
    setState: (value: number) => void
}

function SliderButton({buttonKey, text, isActive, onClick}: SliderButtonProps) {
    return (
        <button className={isActive ? "slider-button active" : "slider-button"} onClick={() => {onClick(buttonKey)}}>
            <span className={isActive ? "slider-button-text active" : "slider-button-text"}>{text}</span>
        </button>
    )
}


export function Slider({buttonList, state, setState}: SliderProps) {
    return (
        <div className="slider">
            {[...buttonList].map(([key, value]) => (
                <SliderButton key={key} buttonKey={key ? key : ""} text={value ? value : ""} isActive={key===state} onClick={setState}/>
            ))}
        </div>
    )
}

export function Select({variants, state, setState}: SelectProps) {

    const handleChange = (event: BaseSyntheticEvent) =>
    {
        const value = event.target.value;
        setState(value);
    }

    return (
        <select className="select-custom" onChange={handleChange}>
            {
                variants.map(value => (
                    <option className="select-custom-option" value={value}>{value}</option>
                ))
            }
        </select>
    )
}

export function Button({text, onClick, aClass=""}: ButtonProps) {
    return (
        <button className={`button-custom ${aClass}`} onClick={onClick}>
            <span className="button-custom-text">{text}</span>
        </button>
    );
}


export function WeekSelect({weeksList, state, setState}: WeekSelectProps) {
    
    const handleChange = (event: BaseSyntheticEvent) =>
    {
        const value = Number(event.target.value);
        setState(value);
        console.log(value, typeof value);
    }

    return (
        <select className="select-week" onChange={handleChange}>
            {
                weeksList.map(num => (
                    <option className="select-week-option" value={num} selected={num==state}>{num}</option>
                ))
            }
        </select>
    )
}