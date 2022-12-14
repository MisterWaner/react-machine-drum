import { useState, useEffect, useRef } from "react";
import * as Tone from "tone";

import snare from "assets/sounds/snare.wav";
import kick from "assets/sounds/kick.wav";
import tom3 from "assets/sounds/tom3.wav";
import tom4 from "assets/sounds/tom4.wav";
import tom1 from "assets/sounds/tom1.wav";
import tom2 from "assets/sounds/tom2.wav";


export default function useSounds() {

    const mySampler = useRef(null);

    const [isSnarePlayed, isSnarePlayedChange] = useState(false);
    const [isKickPlayed, isKickPlayedChange] = useState(false);
    const [isTom3Played, isTom3PlayedChange] = useState(false);
    const [isTom4Played, isTom4PlayedChange] = useState(false);
    const [isTom1Played, isTom1PlayedChange] = useState(false);
    const [isTom2Played, isTom2PlayedChange] = useState(false);

    useEffect(() => {
        const sampler = new Tone.Sampler(
            {
                "C4": snare,
                "D#4": kick,
                "F#4": tom3,
                "A4": tom4,
                "G4": tom1,
                "E4": tom2
            }
        ).toDestination();

        Tone.loaded().then(() => {
            mySampler.current = sampler;
        });
    }, []);

    function soundPlay(note) {
        mySampler.current.triggerAttackRelease([note], 6);
    }

    function handleKeyDown({ key }) {
        switch (key) {
            case "a":
                isSnarePlayedChange(true);
                window.setTimeout(() => {
                    isSnarePlayedChange(false);
                }, 300);
                soundPlay("C4");
                break;
            case "z":
                isKickPlayedChange(true);
                window.setTimeout(() => {
                    isKickPlayedChange(false);
                }, 300);
                soundPlay("D#4");
                break;
            case "e":
                isTom3PlayedChange(true);
                window.setTimeout(() => {
                    isTom3PlayedChange(false);
                }, 300);
                soundPlay("F#4");
                break;
            case "r":
                isTom4PlayedChange(true);
                window.setTimeout(() => {
                    isTom4PlayedChange(false);
                }, 300);
                soundPlay("A4");
                break;
            case "t":
                isTom1PlayedChange(true);
                window.setTimeout(() => {
                    isTom1PlayedChange(false);
                }, 300);
                soundPlay("G4");
                break;
            case "y":
                isTom2PlayedChange(true);
                window.setTimeout(() => {
                    isTom2PlayedChange(false);
                }, 300);
                soundPlay("E4");
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    });

    function handleSampleChange(note, file) {
        let fileURL = URL.createObjectURL(file);
        let buffer = new Tone.Buffer(fileURL);
        mySampler.current.add(note, buffer, () =>
            alert("Sampler successfully changed")
        );
    }

    const buttonsList = [
        {
            soundPlay: () => soundPlay("C4"),
            isPlayed: isSnarePlayed,
            id: "snare",
            handleSampleChange: (e) => handleSampleChange("C4", e.target.files[0])
        },
        {
            soundPlay: () => soundPlay("D#4"),
            isPlayed: isKickPlayed,
            id: "kick",
            handleSampleChange: (e) => handleSampleChange("D#4", e.target.files[0])
        },
        {
            soundPlay: () => soundPlay("F#4"),
            isPlayed: isTom3Played,
            id: "tom3",
            handleSampleChange: (e) => handleSampleChange("F#4", e.target.files[0])
        },
        {
            soundPlay: () => soundPlay("A4"),
            isPlayed: isTom4Played,
            id: "tom4",
            handleSampleChange: (e) => handleSampleChange("A4", e.target.files[0])
        },
        {
            soundPlay: () => soundPlay("G4"),
            isPlayed: isTom1Played,
            id: "tom1",
            handleSampleChange: (e) => handleSampleChange("G4", e.target.files[0])
        },
        {
            soundPlay: () => soundPlay("E4"),
            isPlayed: isTom2Played,
            id: "tom2",
            handleSampleChange: (e) => handleSampleChange("E4", e.target.files[0])
        }
    ];

    return { buttonsList };
}