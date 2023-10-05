import React from 'react';
import { useState } from 'react';

import "../styles/splash.css"
import { useNavigate } from 'react-router-dom';

import Bio from "../components/Bio"
import Build from "../components/Build"

import { bioService } from '../services/bio.service';

const CreatePage: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [skills, setSkills] = useState('');
    const [food, setFood] = useState('');
    const [slogan, setSlogan] = useState('');
    const [error, setError] = useState('');
	const [viewing, setViewing] = useState("build");
    const [color, setColor] = useState("");
    const [face, setFace] = useState("");
    const [hat, setHat] = useState("");
    const [shirt, setShirt] = useState("");

    let updateActiveBuild = (option: any, url: any) => {
        if (option === "color") {
            if (url === color) {
                setColor("");
            } else {
                setColor(url);
            }
        } else if (option === "face") {
            if (url === face) {
                setFace("");
            } else {
                setFace(url);
            }
        } else if (option === "hat") {
            if (url === hat) {
                setHat("");
            } else {
                setHat(url);
            }
        } else if (option === "shirt") {
            if (url === shirt) {
                setShirt("");
            } else {
                setShirt(url);
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          await bioService.send({ name, skills, food, slogan });
        } catch (error) {
          setError((error as Error).message);
        }
      };

    return (
        <div className="splash-container">
            <h1>Create Your Character!</h1>
			{viewing === "bio" && <Bio name={name} setName={setName} 
            skills={skills} setSkills={setSkills} 
            food={food} setFood={setFood}
            slogan={slogan} setSlogan={setSlogan}
            handleSubmit={handleSubmit}></Bio>}
			{viewing === "build" && <Build color={color} face={face} hat={hat} shirt={shirt} updateActive={updateActiveBuild}></Build>}
            <button className="cta-button" onClick={() => { navigate("/dashboard") }}>Back</button>
			<button className="cta-button" onClick={() => { setViewing(viewing === "build" ? "bio" : "build") }}>{viewing === "build" ? "bio" : "build"}</button>
        </div>
    );
};

export default CreatePage;
