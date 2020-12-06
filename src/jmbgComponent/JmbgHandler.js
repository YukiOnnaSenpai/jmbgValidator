import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { regions } from './regions';
export default function JmbgHandler() {


    const { register, handleSubmit, errors } = useForm({ mode: 'onBlur' });
    const [jmbgObject, setJmbgFields] = useState([{ day: 0, month: 0, year: 0, region: "", sex: "", checksum: 0 }]);

    const onSubmit = data => {

        let stringifiedData = String(data.jmbg);

        const day = getDay(stringifiedData.substring(0, 2), stringifiedData.substring(2, 4), stringifiedData.substring(4, 7));

        const month = getMonthName(stringifiedData.substring(2, 4));

        const year = getYear(stringifiedData.substring(4, 7));

        const region = regions[stringifiedData.substring(7, 9)];

        console.log(day + '/' + month + '/' + year);

        setJmbgFields({
            day: day,
            month: month,
            year: year,
            region: region,
            sex: "",
            checksum: ""
        });

    };

    const getDay = (day, month, year) => {
        if (month % 2 === 0) {
            if (month == 2) {
                if (year % 4 === 0) {
                    if (day > 29) {
                        return alert("Neispravan JMBG, dan ne moze biti veci od 29 u februaru prestupne");
                    }
                    return day;
                }
                else {
                    if (day > 28) {
                        return alert("Neispravan JMBG, dan ne moze biti veci od 28 u februaru");
                    }
                    return day;
                }
            }
            if (day > 30) {
                return alert("Neispravan JMBG, dan ne moze biti veci od 30 u parnom mesecu");
            }
            return day;
        }
        if (day > 31) {
            return alert("Neispravan JMBG, dan ne moze biti veci od 31 u neparnom mesecu");
        } 
        return day;
    }

    const getYear = yearStr => {
        let year = yearStr.charAt(0) === 0 ? "2" + yearStr : "1" + yearStr;

        if (year > Date.getYear) {
            return alert("Neispravan JMBG, godina ne moze imati u buducnosti");
        }
        return year;
    }

    const getMonthName = month => {
        if (month > 12 && month < 1) {
            return alert("Neispravan JMBG, godina ne moze imati vise od 12 meseci");
        }

        switch (month) {
            case '01': return 'Januar';
            case '02': return 'Februar';
            case '03': return 'Mart';
            case '04': return 'April';
            case '05': return 'Maj';
            case '06': return 'Jun';
            case '07': return 'Jul';
            case '08': return 'Avgust';
            case '09': return 'Septembar';
            case '10': return 'Oktobar';
            case '11': return 'Novembar';
            case '12': return 'Decembar';
        }

    }

    return (
        <div>
            <div>
                <h1>Aplikacija za validaciju jmbg-a:</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input
                        name="jmbg"
                        pattern="\d*"
                        placeholder="Unesite JMBG za validaciju"
                        ref={register({ required: true, maxLength: 13, minLength: 13 })}
                    />
                    <br />

                    {errors.jmbg && <span>Jmbg mora biti trinaestocifreni broj</span>}

                    <small>JMBG mora imati 13 cifara</small><br />
                </div>
                <div>
                    <input type="submit" value="Validiraj" />
                </div>
            </form>

            {jmbgObject && (
                <div>
                <h4>{jmbgObject.day}</h4>
                <h4>{jmbgObject.month}</h4>
                <h4>{jmbgObject.year}</h4>
                <h4>{jmbgObject.region}</h4>
                <h4>{jmbgObject.sex}</h4>
                <h4>{jmbgObject.checksum}</h4>
            </div>
            )}

        </div>
    );
}