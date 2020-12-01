import React, { useState } from 'react';
import { useForm } from "react-hook-form";

export default function JmbgHandler() {
    const { register, handleSubmit, errors } = useForm({ mode: 'onBlur' });
    const [jmbg, setJmbg] = useState();
    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [region, setRegion] = useState();
    const [sex, setSex] = useState();
    const [controlNumber, setControlNumber] = useState();
    const onSubmit = data => {
        console.log(jmbg);
        let stringifiedData = String(data.jmbg);
        setDay(stringifiedData.substring(0, 2));
        setMonth(stringifiedData.substring(2, 4));
        setYear(stringifiedData.substring(4, 7));
        setRegion(stringifiedData.substring(7, 9));
        setSex(stringifiedData.substring(9, 12));
        setControlNumber(stringifiedData.substring(12, 14));
        console.log(day + ' month ' + month + ' year ' + year + ' region ' + region + ' sex ' + sex + ' controlno ' + controlNumber);
    };
    const dateValidator = () => {
        if (month > 12)
            return alert("Neispravan JMBG, godina ne moze imati vise od 12 meseci");
    }

    return (
        <div>
            <div>
                <h1>Aplikacija za validaciju jmbg-a:</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input name="jmbg" pattern="\d*" placeholder="Unesite JMBG za validaciju" ref={register({ required: true, maxLength: 13, minLength: 13 })} /> <br />
                    {errors.jmbg && <span>Jmbg mora biti trinaestocifreni broj</span>}
                    <small>JMBG mora imati 13 cifara</small><br />
                </div>
                <div>
                    <input type="submit" value="Validiraj" />
                </div>
            </form>
        </div>
    );
}

// import React from 'react';
//   import { useForm } from 'react-hook-form';
//   import { Question } from '../shared/interfaces';

//   const QUESTIONS: Question[] = [
//     {
//       id: 'q201',
//       question:
//         '1. Family elders are expressing disapproval of you to the rest of the family. Do you:',
//       option1: 'Accept the criticism and change your ways?',
//       option2: 'Seek a compromise with them?',
//       option3:
//         'Besmirch the reputation of those expressing disapproval as you ignore their scorn?',
//       option4: 'Silence them any way you can?',
//     },
//   ];
// export default function App() {
//     const { register, handleSubmit } = useForm();
//     const onSubmit = (data: any) => console.log(data);
//     return (
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {QUESTIONS.map((question) => (
//           <Question {...question} register={register} key={question.id} /> //<-- notice register and key attribute
//         ))}
//         <input type="submit" />
//       </form>
//     );
//   }