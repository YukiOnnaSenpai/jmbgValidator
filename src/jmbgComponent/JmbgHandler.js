import './Jmbg.css';
import { regions } from './regions';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";


export default function JmbgHandler() {

    const initialState = [{ day: 0, month: 0, year: 0, region: "", sex: "", checksum: 0 }];
    const { register, handleSubmit } = useForm({ mode: 'onBlur' });
    const [jmbgObject, setJmbgFields] = useState(initialState);
    const [showFields, setShowFields] = useState(false);
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');

    const onSubmit = async data => {

        try {
            let stringifiedData = getJmbg(data.jmbg);

            setIme(data.ime);

            setPrezime(data.prezime);

            const day = getDay(stringifiedData.substring(0, 2), stringifiedData.substring(2, 4), stringifiedData.substring(4, 7));

            const month = getMonthName(stringifiedData.substring(2, 4));

            const year = getYear(stringifiedData.substring(4, 7));

            const region = regions[stringifiedData.substring(7, 9)];

            const sex = getSex(stringifiedData.substring(9, 12));

            const checksum = getControlNumber(stringifiedData);

            setJmbgFields({
                day: day,
                month: month,
                year: year,
                region: region,
                sex: sex,
                checksum: checksum
            });
            setShowFields(true);

        }
        catch (error) {
            setJmbgFields(initialState)
            setShowFields(false);
        }
    };

    const getJmbg = jmbg => {
        if (jmbg.length !== 13) {
            alert("Jmbg mora biti trinaestocifreni broj.");
            throw new Error();
        }
        return String(jmbg);
    }

    const getDay = (day, month, year) => {
        if (month % 2 === 0) {
            if (Number(month) === 2) {
                if (year % 4 === 0) {
                    if (day > 29) {
                        alert("Nevalidan JMBG, dan ne moze biti veci od 29 u februaru prestupne godine.");
                        throw new Error();
                    }
                    return day;
                }
                else {
                    if (day > 28) {
                        alert("Nevalidan JMBG, dan ne moze biti veci od 28 u mesecu februaru.");
                        throw new Error();
                    }
                    return day;
                }
            }
            if (day > 30) {
                alert("Nevalidan JMBG, dan ne moze biti veci od 30 u parnom mesecu.");
                throw new Error();
            }
            return day;
        }
        if (day > 31) {
            alert("Nevalidan JMBG, dan ne moze biti veci od 31 u neparnom mesecu.");
            throw new Error();
        }
        return day;
    }

    const getYear = yearStr => {
        let year = Number(yearStr.charAt(0)) === 0 ? "2" + yearStr : "1" + yearStr;

        if (year > Date.getYear) {
            alert("Nevalidan JMBG, godina ne moze biti u buducnosti.");
            throw new Error();
        }
        return year;
    }

    const getMonthName = month => {
        if (month > 12 || month < 1) {
            alert("Nevalidan JMBG, godina ne moze imati vise od 12 meseci.");
            throw new Error();
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
            default: new Error();
        }
    }

    const getSex = sex => {
        if (Number(sex) >= 0 && Number(sex) <= 499) {
            return 'Osoba muskog pola, rodjena kao ' + Number(sex) + ' osoba muskog pola za dati datum.';
        }
        else if (Number(sex) > 500 && Number(sex) < 999) {
            let babyNo = Number(sex) - 500;
            return 'Osoba zenskog pola, rodjena kao ' + babyNo + ' osoba zenskog pola za dati datum.';
        } else {
            alert('Nevalidan JMBG, neispravan jedinstveni broj pola.');
            throw new Error();
        }

    }

    const getControlNumber = (JMBG) => {
        let calculatedControlNumber = 11 - ((
            7 * (Number(JMBG.charAt(0)) + Number(JMBG.charAt(6)))
            + 6 * (Number(JMBG.charAt(1)) + Number(JMBG.charAt(7)))
            + 5 * (Number(JMBG.charAt(2)) + Number(JMBG.charAt(8)))
            + 4 * (Number(JMBG.charAt(3)) + Number(JMBG.charAt(9)))
            + 3 * (Number(JMBG.charAt(4)) + Number(JMBG.charAt(10)))
            + 2 * (Number(JMBG.charAt(5)) + Number(JMBG.charAt(11)))) % 11);
        let checksum;
        if (calculatedControlNumber >= 1 && calculatedControlNumber <= 9) {
            checksum = calculatedControlNumber;
        } else {
            checksum = 0;
        }
        if (Number(JMBG.charAt(12)) !== checksum) {
            alert('Nevalidan JMBG, neispravna kontrona cifra.');
            throw new Error();
        } else {
            return 'Kontrolna cifra ' + checksum + ' je validna.';
        }
    }

    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <div className="form-style">
            <div>
                <h1> Validiraj JMBG: <span>Aplikacija za validaciju JMBG-a.</span> </h1>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="section"></div>
                    <div className="inner-wrap">
                        <label> Unesite Ime <br />
                            <input
                                name="ime"
                                ref={register({ required: true, pattern: /^[A-Za-z]+$/i })}
                            /></label>
                        <label> Unesite Prezime <br />
                            <input
                                name="prezime"
                                ref={register({ required: true, pattern: /^[A-Za-z]+$/i })}
                            /></label>
                        <label> Unesite JMBG <br />
                            <input
                                name="jmbg"
                                pattern="\d*"
                                ref={register({ required: true })}
                            /></label>
                        <small>JMBG mora imati 13 cifara</small><br />
                    </div>
                    <div className="button-section">
                        <input type="submit" value="Validiraj" />
                    </div>
                </form>
            </div>
            <br /><br /><br />
            {showFields && (
                <div>
                    <div className="section">Rezultati validacije: </div>
                    <div className="inner-wrap">
                        <h4><b>Dati JMBG je validan.</b></h4>
                        <h4><b>Ime: </b> {ime}</h4>
                        <h4><b>Prezime: </b>{prezime}</h4>
                        <h4><b>Dan rođenja:</b> {jmbgObject.day}</h4>
                        <h4><b>Mesec rođenja:</b> {jmbgObject.month}</h4>
                        <h4><b>Godina rođenja:</b> {jmbgObject.year}</h4>
                        <h4><b>Politička regija rođenja:</b> {jmbgObject.region}</h4>
                        <h4><b>Pol i jedinstveni broj:</b> {jmbgObject.sex}</h4>
                        <h4><b>Kontrolna cifra:</b> {jmbgObject.checksum}</h4>
                    </div>
                    <div className="button-section">
                        <input type="submit" onClick={refreshPage} value="Validiraj novi JMBG" />
                    </div>
                </div>
            )}
        </div>
    );
}